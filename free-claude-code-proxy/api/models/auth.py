"""Authentication models for JWT tokens and user management."""

from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field


class TokenData(BaseModel):
    """JWT token payload data."""
    sub: str = Field(..., description="User ID")
    email: str
    role: str
    exp: datetime
    iat: datetime
    scopes: List[str] = []


class Token(BaseModel):
    """JWT token response."""
    access_token: str
    refresh_token: Optional[str] = None
    token_type: str = "bearer"
    expires_in: int


class User(BaseModel):
    """User model."""
    id: str
    email: str
    full_name: str
    role: str
    scopes: List[str] = []
    is_active: bool = True


class LoginRequest(BaseModel):
    """Login request payload."""
    email: str
    password: str


class LoginResponse(BaseModel):
    """Login response."""
    status: str = "success"
    data: Token
    user: User


class RefreshTokenRequest(BaseModel):
    """Refresh token request."""
    refresh_token: str


class UserResponse(BaseModel):
    """Current user response."""
    id: str
    email: str
    full_name: str
    role: str
    scopes: List[str]
    is_active: bool
