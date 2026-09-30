from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime

from database.database import get_db
from schemas.base import HealthResponse

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
async def health_check(db: Session = Depends(get_db)):
    """
    Health check endpoint to verify API and database connectivity.
    """
    try:
        # Test database connection
        db.execute("SELECT 1")
        database_status = "connected"
    except Exception:
        database_status = "disconnected"
    
    return HealthResponse(
        status="healthy",
        service="arcart-ai-backend",
        timestamp=datetime.utcnow(),
        database=database_status
    )

@router.get("/ping")
async def ping():
    """
    Simple ping endpoint to check if API is responsive.
    """
    return {
        "message": "pong",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "arcart-ai-backend"
    }

@router.get("/info")
async def api_info():
    """
    Get API information and version.
    """
    return {
        "name": "ARCart AI Backend API",
        "version": "1.0.0",
        "description": "AI-powered AR furniture shopping platform",
        "docs": "/docs",
        "redoc": "/redoc",
        "status": "operational"
    }