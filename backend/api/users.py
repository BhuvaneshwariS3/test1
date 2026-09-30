from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import List

from database.database import get_db
from schemas.user import UserResponse, UserUpdate, UserProfile
from schemas.base import BaseResponse

router = APIRouter()
security = HTTPBearer()

# Mock users database for Phase 1
mock_users = {}

@router.get("/", response_model=List[UserResponse])
async def get_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Get list of users (admin only).
    
    For Phase 1, returns mock users.
    """
    # Convert mock_users dict to list
    users_list = list(mock_users.values())
    return users_list[skip:skip + limit]

@router.get("/{user_id}", response_model=UserProfile)
async def get_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    """
    Get user by ID (public profile).
    """
    # Find user in mock database
    for user in mock_users.values():
        if user["id"] == user_id:
            return UserProfile(**user)
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found"
    )

@router.put("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int,
    user_data: UserUpdate,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    """
    Update user profile.
    
    For Phase 1, updates mock user.
    """
    # Find user in mock database
    user_to_update = None
    user_email = None
    
    for email, user in mock_users.items():
        if user["id"] == user_id:
            user_to_update = user
            user_email = email
            break
    
    if not user_to_update:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update user data
    update_data = user_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        if value is not None:
            user_to_update[key] = value
    
    user_to_update["updated_at"] = datetime.utcnow()
    
    # Update in mock database
    mock_users[user_email] = user_to_update
    
    return UserResponse(**user_to_update)

@router.delete("/{user_id}", response_model=BaseResponse)
async def delete_user(
    user_id: int,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    """
    Delete user (admin only).
    """
    # Find and remove user from mock database
    user_to_delete = None
    user_email = None
    
    for email, user in mock_users.items():
        if user["id"] == user_id:
            user_to_delete = user
            user_email = email
            break
    
    if not user_to_delete:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Remove from mock database
    del mock_users[user_email]
    
    return BaseResponse(
        success=True,
        message=f"User {user_id} deleted successfully"
    )

@router.post("/{user_id}/verify", response_model=BaseResponse)
async def verify_user(
    user_id: int,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    """
    Verify user account (admin only).
    """
    # Find user in mock database
    user_to_verify = None
    user_email = None
    
    for email, user in mock_users.items():
        if user["id"] == user_id:
            user_to_verify = user
            user_email = email
            break
    
    if not user_to_verify:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Verify user
    user_to_verify["is_verified"] = True
    user_to_verify["updated_at"] = datetime.utcnow()
    
    # Update in mock database
    mock_users[user_email] = user_to_verify
    
    return BaseResponse(
        success=True,
        message=f"User {user_id} verified successfully"
    )

from datetime import datetime  # Add this import at the top if not already present