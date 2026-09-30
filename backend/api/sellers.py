from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from database.database import get_db
from schemas.base import BaseResponse, PaginatedResponse

router = APIRouter()

# Mock seller products for Phase 1
seller_products = []

@router.get("/products", response_model=PaginatedResponse)
async def get_seller_products(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """
    Get seller's products.
    """
    total = len(seller_products)
    paginated_products = seller_products[skip:skip + limit]
    
    return PaginatedResponse(
        success=True,
        message="Products retrieved successfully",
        page=skip // limit + 1 if limit > 0 else 1,
        per_page=limit,
        total=total,
        total_pages=(total + limit - 1) // limit if limit > 0 else 1,
        data={
            "products": paginated_products
        }
    )

@router.post("/products", response_model=BaseResponse)
async def create_product(
    name: str,
    price: float,
    stock: int,
    category: str,
    description: str = "",
    db: Session = Depends(get_db)
):
    """
    Create new product.
    """
    product_id = len(seller_products) + 1
    new_product = {
        "id": product_id,
        "name": name,
        "price": price,
        "stock": stock,
        "category": category,
        "description": description,
        "status": "active"
    }
    seller_products.append(new_product)
    
    return BaseResponse(
        success=True,
        message="Product created successfully",
        data={"product": new_product}
    )

@router.put("/products/{product_id}", response_model=BaseResponse)
async def update_product(
    product_id: int,
    name: str = None,
    price: float = None,
    stock: int = None,
    description: str = None,
    db: Session = Depends(get_db)
):
    """
    Update product.
    """
    product = next((p for p in seller_products if p["id"] == product_id), None)
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    if name:
        product["name"] = name
    if price:
        product["price"] = price
    if stock:
        product["stock"] = stock
    if description:
        product["description"] = description
    
    return BaseResponse(
        success=True,
        message="Product updated successfully",
        data={"product": product}
    )

@router.delete("/products/{product_id}", response_model=BaseResponse)
async def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    """
    Delete product.
    """
    product = next((p for p in seller_products if p["id"] == product_id), None)
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    seller_products.remove(product)
    
    return BaseResponse(
        success=True,
        message="Product deleted successfully"
    )

@router.post("/products/{product_id}/enable-ar", response_model=BaseResponse)
async def enable_ar(
    product_id: int,
    db: Session = Depends(get_db)
):
    """
    Enable AR for product.
    """
    product = next((p for p in seller_products if p["id"] == product_id), None)
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    product["ar_enabled"] = True
    
    return BaseResponse(
        success=True,
        message="AR enabled for product",
        data={"product": product}
    )