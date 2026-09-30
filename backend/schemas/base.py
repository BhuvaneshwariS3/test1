from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List, Dict, Any

class BaseResponse(BaseModel):
    """Base response schema with common fields."""
    success: bool = True
    message: Optional[str] = None
    timestamp: datetime = datetime.utcnow()

class PaginatedResponse(BaseResponse):
    """Base schema for paginated responses."""
    page: int
    per_page: int
    total: int
    total_pages: int

class TokenData(BaseModel):
    """Token data schema for JWT."""
    user_id: int
    email: str
    role: str

class HealthResponse(BaseModel):
    """Health check response schema."""
    status: str
    service: str
    timestamp: datetime
    database: str