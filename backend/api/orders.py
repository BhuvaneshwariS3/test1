from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from database.database import get_db
from schemas.base import BaseResponse, PaginatedResponse

router = APIRouter()

# Mock orders data for Phase 1
mock_orders = []

@router.get("/", response_model=PaginatedResponse)
async def get_orders(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """
    Get user's orders.
    """
    # For Phase 1, return mock orders
    total = len(mock_orders)
    paginated_orders = mock_orders[skip:skip + limit]
    
    return PaginatedResponse(
        success=True,
        message="Orders retrieved successfully",
        page=skip // limit + 1 if limit > 0 else 1,
        per_page=limit,
        total=total,
        total_pages=(total + limit - 1) // limit if limit > 0 else 1,
        data={
            "orders": paginated_orders
        }
    )

@router.get("/{order_id}", response_model=BaseResponse)
async def get_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    """
    Get order by ID.
    """
    order = next((o for o in mock_orders if o["id"] == order_id), None)
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    return BaseResponse(
        success=True,
        message="Order found",
        data={"order": order}
    )

@router.post("/", response_model=BaseResponse)
async def create_order(
    db: Session = Depends(get_db)
):
    """
    Create new order.
    """
    # For Phase 1, create mock order
    order_id = len(mock_orders) + 1
    new_order = {
        "id": order_id,
        "order_number": f"ORD-{order_id:06d}",
        "date": datetime.utcnow().isoformat(),
        "total": 0,
        "status": "pending"
    }
    mock_orders.append(new_order)
    
    return BaseResponse(
        success=True,
        message="Order created successfully",
        data={"order": new_order}
    )

@router.put("/{order_id}/cancel", response_model=BaseResponse)
async def cancel_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    """
    Cancel order.
    """
    order = next((o for o in mock_orders if o["id"] == order_id), None)
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    order["status"] = "cancelled"
    order["updated_at"] = datetime.utcnow().isoformat()
    
    return BaseResponse(
        success=True,
        message="Order cancelled successfully",
        data={"order": order}
    )

@router.put("/{order_id}/status", response_model=BaseResponse)
async def update_order_status(
    order_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    """
    Update order status.
    """
    order = next((o for o in mock_orders if o["id"] == order_id), None)
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    order["status"] = status
    order["updated_at"] = datetime.utcnow().isoformat()
    
    return BaseResponse(
        success=True,
        message="Order status updated",
        data={"order": order}
    )