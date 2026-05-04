"""Authentication service for JWT token management."""

from datetime import datetime, timedelta, timezone
from typing import Optional, Dict
from jose import JWTError, jwt
from passlib.context import CryptContext
from loguru import logger

from config.settings import get_settings
from .models.auth import TokenData, User, Token


# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService:
    """JWT authentication service."""
    
    # Mock user database - In production, use actual database
    USERS_DB: Dict[str, Dict] = {
        "admin@brt-dakar.sn": {
            "id": "user-001",
            "email": "admin@brt-dakar.sn",
            "full_name": "Admin User",
            "hashed_password": pwd_context.hash("admin123"),  # Change in production!
            "role": "admin",
            "scopes": ["read_all", "write_all", "delete_all", "manage_users"],
            "is_active": True
        },
        "manager@brt-dakar.sn": {
            "id": "user-002",
            "email": "manager@brt-dakar.sn",
            "full_name": "Manager User",
            "hashed_password": pwd_context.hash("manager123"),
            "role": "manager",
            "scopes": ["read_all", "write_operations", "write_analytics"],
            "is_active": True
        },
        "finance@brt-dakar.sn": {
            "id": "user-003",
            "email": "finance@brt-dakar.sn",
            "full_name": "Finance User",
            "hashed_password": pwd_context.hash("finance123"),
            "role": "finance",
            "scopes": ["read_finance", "write_finance", "read_analytics"],
            "is_active": True
        },
        "viewer@brt-dakar.sn": {
            "id": "user-004",
            "email": "viewer@brt-dakar.sn",
            "full_name": "Viewer User",
            "hashed_password": pwd_context.hash("viewer123"),
            "role": "viewer",
            "scopes": ["read_all"],
            "is_active": True
        }
    }

    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        """Verify password against hash."""
        return pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    def get_password_hash(password: str) -> str:
        """Hash password."""
        return pwd_context.hash(password)

    @staticmethod
    def authenticate_user(email: str, password: str) -> Optional[User]:
        """Authenticate user by email and password."""
        user_data = AuthService.USERS_DB.get(email)
        if not user_data:
            logger.warning(f"Login attempt with non-existent email: {email}")
            return None
        
        if not AuthService.verify_password(password, user_data["hashed_password"]):
            logger.warning(f"Login attempt with wrong password for: {email}")
            return None
        
        return User(
            id=user_data["id"],
            email=user_data["email"],
            full_name=user_data["full_name"],
            role=user_data["role"],
            scopes=user_data["scopes"],
            is_active=user_data["is_active"]
        )

    @staticmethod
    def create_access_token(user: User, expires_delta: Optional[timedelta] = None) -> str:
        """Create JWT access token."""
        settings = get_settings()
        
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(
                hours=settings.jwt_expiration_hours
            )
        
        token_data = {
            "sub": user.id,
            "email": user.email,
            "role": user.role,
            "scopes": user.scopes,
            "exp": expire,
            "iat": datetime.now(timezone.utc)
        }
        
        encoded_jwt = jwt.encode(
            token_data,
            settings.jwt_secret,
            algorithm=settings.jwt_algorithm
        )
        
        logger.info(f"Access token created for user: {user.email}")
        return encoded_jwt

    @staticmethod
    def create_refresh_token(user: User) -> str:
        """Create JWT refresh token (longer expiration)."""
        settings = get_settings()
        
        expire = datetime.now(timezone.utc) + timedelta(days=7)  # 7 days
        
        token_data = {
            "sub": user.id,
            "email": user.email,
            "type": "refresh",
            "exp": expire,
            "iat": datetime.now(timezone.utc)
        }
        
        encoded_jwt = jwt.encode(
            token_data,
            settings.jwt_secret,
            algorithm=settings.jwt_algorithm
        )
        
        return encoded_jwt

    @staticmethod
    def verify_token(token: str) -> Optional[TokenData]:
        """Verify JWT token and return payload."""
        settings = get_settings()
        
        try:
            payload = jwt.decode(
                token,
                settings.jwt_secret,
                algorithms=[settings.jwt_algorithm]
            )
            
            user_id: str = payload.get("sub")
            email: str = payload.get("email")
            role: str = payload.get("role")
            
            if user_id is None or email is None:
                logger.warning("Invalid token: missing sub or email")
                return None
            
            return TokenData(
                sub=user_id,
                email=email,
                role=role,
                exp=datetime.fromtimestamp(payload.get("exp"), tz=timezone.utc),
                iat=datetime.fromtimestamp(payload.get("iat"), tz=timezone.utc),
                scopes=payload.get("scopes", [])
            )
        
        except JWTError as e:
            logger.warning(f"Token verification failed: {e}")
            return None

    @staticmethod
    def create_token_pair(user: User) -> Token:
        """Create both access and refresh tokens."""
        access_token = AuthService.create_access_token(user)
        refresh_token = AuthService.create_refresh_token(user)
        
        return Token(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
            expires_in=get_settings().jwt_expiration_hours * 3600
        )

    @staticmethod
    def get_user_by_email(email: str) -> Optional[User]:
        """Get user by email."""
        user_data = AuthService.USERS_DB.get(email)
        if not user_data:
            return None
        
        return User(
            id=user_data["id"],
            email=user_data["email"],
            full_name=user_data["full_name"],
            role=user_data["role"],
            scopes=user_data["scopes"],
            is_active=user_data["is_active"]
        )

    @staticmethod
    def get_user_by_id(user_id: str) -> Optional[User]:
        """Get user by ID."""
        for user_data in AuthService.USERS_DB.values():
            if user_data["id"] == user_id:
                return User(
                    id=user_data["id"],
                    email=user_data["email"],
                    full_name=user_data["full_name"],
                    role=user_data["role"],
                    scopes=user_data["scopes"],
                    is_active=user_data["is_active"]
                )
        return None
