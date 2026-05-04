"""Data models for KPIs, analytics, and responses."""

from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel


# ================== KPI Models ==================

class KPICard(BaseModel):
    """Single KPI card data."""
    id: str
    title: str
    value: float
    unit: str
    change_percent: float
    trend: str  # "up", "down", "stable"
    color: str  # "success", "warning", "danger"
    icon: str


class OverviewKPI(BaseModel):
    """Overview KPI response."""
    status: str = "success"
    timestamp: datetime
    data: Dict[str, KPICard]


# ================== Station & Line Models ==================

class Station(BaseModel):
    """Bus station data."""
    id: str
    name: str
    zone: str
    commune: str
    latitude: float
    longitude: float
    type: str  # "standard", "pole", "terminus"
    daily_avg_ridership: float


class Line(BaseModel):
    """Bus line data."""
    code: str  # B1, B2, B3, B4
    name: str
    line_type: str  # "omnibus", "semi-express", "express"
    stations: List[str]  # station IDs
    frequency_minutes: float


class StationsResponse(BaseModel):
    """Stations list response."""
    status: str = "success"
    data: List[Station]
    total: int


class LinesResponse(BaseModel):
    """Lines list response."""
    status: str = "success"
    data: List[Line]
    total: int


# ================== Analytics Models ==================

class TimeSeriesDataPoint(BaseModel):
    """Single time series data point."""
    timestamp: datetime
    value: float
    station_id: Optional[str] = None
    line_code: Optional[str] = None


class TimeSeriesResponse(BaseModel):
    """Time series data response."""
    status: str = "success"
    data: List[TimeSeriesDataPoint]
    aggregation: str  # "hourly", "daily", "weekly", "monthly"


class RidershipAnalytics(BaseModel):
    """Ridership analytics."""
    total_passengers: float
    peak_hour_value: float
    peak_hour_time: str
    average_occupancy_percent: float
    capacity_utilization: float
    on_time_performance: float  # %
    satisfaction_score: float


class FinanceAnalytics(BaseModel):
    """Financial analytics."""
    total_revenue: float
    revenue_per_passenger: float
    daily_avg_revenue: float
    cost_per_km: float
    operational_cost: float
    margin_percent: float


class FleetAnalytics(BaseModel):
    """Fleet health analytics."""
    total_buses: int
    buses_operational: int
    buses_maintenance: int
    availability_percent: float
    avg_age_years: float
    electric_charge_percent: float
    maintenance_due: int


class HRAnalytics(BaseModel):
    """HR analytics."""
    total_employees: int
    drivers_available: int
    maintenance_staff: int
    average_salary: float
    turnover_percent: float


# ================== Aggregated Analytics Response ==================

class AnalyticsResponse(BaseModel):
    """Complete analytics response."""
    status: str = "success"
    timestamp: datetime
    ridership: RidershipAnalytics
    finance: FinanceAnalytics
    fleet: FleetAnalytics
    hr: HRAnalytics


# ================== Filter Query Models ==================

class DataFilterQuery(BaseModel):
    """Data filtering parameters."""
    station_ids: Optional[List[str]] = None
    line_codes: Optional[List[str]] = None
    date_from: Optional[datetime] = None
    date_to: Optional[datetime] = None
    aggregation: str = "daily"  # hourly, daily, weekly, monthly


# ================== Generic Response Wrapper ==================

class ApiResponse(BaseModel):
    """Generic API response."""
    status: str
    data: Optional[Any] = None
    error: Optional[str] = None
    message: Optional[str] = None
    timestamp: datetime


class ErrorResponse(BaseModel):
    """Error response."""
    status: str = "error"
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None
    timestamp: datetime
