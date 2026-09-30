from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Optional
import os
from dotenv import load_dotenv

from database.database import get_db
from models.user import User
from schemas.user import UserCreate, UserLogin, TokenResponse, UserResponse
from schemas.base import BaseResponse

# Load environment variables
load_dotenv()

router = APIRouter()
security = HTTPBearer()

# JWT Configuration (for Phase 1, using simple token simulation)
SECRET_KEY = os.getenv("SECRET_KEY", "arcart-ai-secret-key-phase-1")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

# Mock user database for Phase 1
mock_users = {}

@router.post("/register", response_model=BaseResponse)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user.
    
    For Phase 1, this simulates user registration.
    In Phase 2, this will be connected to real database.
    """
    # Check if user already exists (mock check)
    if user_data.email in mock_users:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create mock user
    mock_user = {
        "id": len(mock_users) + 1,
        "email": user_data.email,
        "username": user_data.username,
        "full_name": user_data.full_name,
        "role": user_data.role,
        "is_active": True,
        "is_verified": False,
        "is_seller_verified": False,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    mock_users[user_data.email] = mock_user
    
    return BaseResponse(
        success=True,
        message=f"User {user_data.email} registered successfully"
    )

@router.post("/login", response_model=TokenResponse)
async def login(user_data: UserLogin, db: Session = Depends(get_db)):
    """
    Login user and return access token.
    
    For Phase 1, this accepts any email/password.
    In Phase 2, this will validate against real database.
    """
    # For Phase 1, create user if not exists
    if user_data.email not in mock_users:
        mock_user = {
            "id": len(mock_users) + 1,
            "email": user_data.email,
            "username": user_data.email.split('@')[0],
            "full_name": "Demo User",
            "role": "customer",
            "is_active": True,
            "is_verified": False,
            "is_seller_verified": False,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        mock_users[user_data.email] = mock_user
    
    user = mock_users[user_data.email]
    
    # Create mock token
    access_token = f"demo_token_{user['id']}_{datetime.utcnow().timestamp()}"
    
    # Create user response
    user_response = UserResponse(**user)
    
    return TokenResponse(
        access_token=access_token,
        expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        user=user_response
    )

@router.get("/me", response_model=UserResponse)
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    """
    Get current user information.
    
    For Phase 1, this returns demo user.
    In Phase 2, this will validate JWT token.
    """
    token = credentials.credentials
    
    # For Phase 1, return first mock user
    if not mock_users:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    # Get first user (for Phase 1 demo)
    user_email = list(mock_users.keys())[0]
    user = mock_users[user_email]
    
    return UserResponse(**user)

@router.post("/logout", response_model=BaseResponse)
async def logout():
    """
    Logout user (client-side token invalidation).
    """
    return BaseResponse(
        success=True,
        message="Logged out successfully"
    )

@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    """
    Refresh access token.
    
    For Phase 1, this creates a new mock token.
    """
    # For Phase 1, create new token for first user
    if not mock_users:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    user_email = list(mock_users.keys())[0]
    user = mock_users[user_email]
    
    # Create new mock token
    access_token = f"demo_token_refresh_{user['id']}_{datetime.utcnow().timestamp()}"
    
    user_response = UserResponse(**user)
    
    return TokenResponse(
        access_token=access_token,
        expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        user=user_response
    )