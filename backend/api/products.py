from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from database.database import get_db
from schemas.base import BaseResponse, PaginatedResponse

router = APIRouter()

# Mock products for Phase 1
mock_products = [
    {
        "id": 1,
        "name": "Modern Sofa",
        "description": "Contemporary 3-seater sofa with premium fabric upholstery",
        "price": 29999.0,
        "compare_at_price": 34999.0,
        "category_id": 1,
        "category_name": "Furniture",
        "seller_id": 1,
        "stock_quantity": 15,
        "material": "Fabric",
        "color": "Grey",
        "style": "Modern",
        "has_3d_model": True,
        "ar_compatible": True,
        "average_rating": 4.5,
        "review_count": 42,
        "is_featured": True,
        "is_bestseller": True,
        "created_at": datetime.utcnow(),
        "image_urls": []
    },
    {
        "id": 2,
        "name": "Wooden Dining Table",
        "description": "Solid wood dining table with 6 chairs, perfect for family meals",
        "price": 24999.0,
        "compare_at_price": 29999.0,
        "category_id": 1,
        "category_name": "Furniture",
        "seller_id": 1,
        "stock_quantity": 8,
        "material": "Wood",
        "color": "Brown",
        "style": "Traditional",
        "has_3d_model": True,
        "ar_compatible": True,
        "average_rating": 4.2,
        "review_count": 28,
        "is_featured": True,
        "is_bestseller": False,
        "created_at": datetime.utcnow(),
        "image_urls": []
    },
    {
        "id": 3,
        "name": "Ergonomic Office Chair",
        "description": "Adjustable office chair with lumbar support and mesh back",
        "price": 8999.0,
        "compare_at_price": None,
        "category_id": 3,
        "category_name": "Office Furniture",
        "seller_id": 2,
        "stock_quantity": 25,
        "material": "Mesh",
        "color": "Black",
        "style": "Modern",
        "has_3d_model": False,
        "ar_compatible": False,
        "average_rating": 4.7,
        "review_count": 56,
        "is_featured": False,
        "is_bestseller": True,
        "created_at": datetime.utcnow(),
        "image_urls": []
    },
    {
        "id": 4,
        "name": "Queen Size Bed Frame",
        "description": "Modern platform bed frame with storage drawers",
        "price": 34999.0,
        "compare_at_price": 39999.0,
        "category_id": 1,
        "category_name": "Furniture",
        "seller_id": 1,
        "stock_quantity": 5,
        "material": "Wood & Metal",
        "color": "White",
        "style": "Scandinavian",
        "has_3d_model": True,
        "ar_compatible": True,
        "average_rating": 4.3,
        "review_count": 19,
        "is_featured": True,
        "is_bestseller": False,
        "created_at": datetime.utcnow(),
        "image_urls": []
    },
    {
        "id": 5,
        "name": "Bookshelf with Glass Doors",
        "description": "5-shelf bookcase with glass doors for dust protection",
        "price": 12999.0,
        "compare_at_price": 14999.0,
        "category_id": 2,
        "category_name": "Home Decor",
        "seller_id": 3,
        "stock_quantity": 12,
        "material": "Wood & Glass",
        "color": "Walnut",
        "style": "Modern",
        "has_3d_model": False,
        "ar_compatible": False,
        "average_rating": 4.0,
        "review_count": 31,
        "is_featured": False,
        "is_bestseller": False,
        "created_at": datetime.utcnow(),
        "image_urls": []
    },
    {
        "id": 6,
        "name": "Coffee Table with Storage",
        "description": "Modern coffee table with lift-top and storage compartment",
        "price": 15999.0,
        "compare_at_price": 18999.0,
        "category_id": 1,
        "category_name": "Furniture",
        "seller_id": 1,
        "stock_quantity": 18,
        "material": "Wood",
        "color": "Oak",
        "style": "Contemporary",
        "has_3d_model": True,
        "ar_compatible": True,
        "average_rating": 4.6,
        "review_count": 24,
        "is_featured": True,
        "is_bestseller": True,
        "created_at": datetime.utcnow(),
        "image_urls": []
    }
]

# Product response schema for documentation
class ProductResponse(BaseResponse):
    product: dict

class ProductsResponse(PaginatedResponse):
    products: List[dict]

@router.get("/", response_model=ProductsResponse)
async def get_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category_id: Optional[int] = None,
    min_price: Optional[float] = Query(None, ge=0),
    max_price: Optional[float] = Query(None, ge=0),
    search: Optional[str] = None,
    featured: Optional[bool] = None,
    ar_compatible: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    """
    Get products with filtering and pagination.
    """
    # Filter products
    filtered_products = mock_products.copy()
    
    if category_id:
        filtered_products = [p for p in filtered_products if p["category_id"] == category_id]
    
    if min_price is not None:
        filtered_products = [p for p in filtered_products if p["price"] >= min_price]
    
    if max_price is not None:
        filtered_products = [p for p in filtered_products if p["price"] <= max_price]
    
    if search:
        search_lower = search.lower()
        filtered_products = [
            p for p in filtered_products 
            if search_lower in p["name"].lower() or search_lower in p["description"].lower()
        ]
    
    if featured is not None:
        filtered_products = [p for p in filtered_products if p["is_featured"] == featured]
    
    if ar_compatible is not None:
        filtered_products = [p for p in filtered_products if p["ar_compatible"] == ar_compatible]
    
    # Calculate pagination
    total = len(filtered_products)
    total_pages = (total + limit - 1) // limit if limit > 0 else 1
    
    # Apply pagination
    paginated_products = filtered_products[skip:skip + limit]
    
    return ProductsResponse(
        success=True,
        message=f"Found {total} products",
        page=skip // limit + 1 if limit > 0 else 1,
        per_page=limit,
        total=total,
        total_pages=total_pages,
        products=paginated_products
    )

@router.get("/featured", response_model=ProductsResponse)
async def get_featured_products(
    limit: int = Query(10, ge=1, le=20),
    db: Session = Depends(get_db)
):
    """
    Get featured products.
    """
    featured_products = [p for p in mock_products if p["is_featured"]]
    limited_products = featured_products[:limit]
    
    return ProductsResponse(
        success=True,
        message=f"Found {len(limited_products)} featured products",
        page=1,
        per_page=limit,
        total=len(featured_products),
        total_pages=1,
        products=limited_products
    )

@router.get("/bestsellers", response_model=ProductsResponse)
async def get_bestseller_products(
    limit: int = Query(10, ge=1, le=20),
    db: Session = Depends(get_db)
):
    """
    Get bestseller products.
    """
    bestseller_products = [p for p in mock_products if p["is_bestseller"]]
    limited_products = bestseller_products[:limit]
    
    return ProductsResponse(
        success=True,
        message=f"Found {len(limited_products)} bestseller products",
        page=1,
        per_page=limit,
        total=len(bestseller_products),
        total_pages=1,
        products=limited_products
    )

@router.get("/ar-compatible", response_model=ProductsResponse)
async def get_ar_compatible_products(
    limit: int = Query(10, ge=1, le=20),
    db: Session = Depends(get_db)
):
    """
    Get AR-compatible products.
    """
    ar_products = [p for p in mock_products if p["ar_compatible"]]
    limited_products = ar_products[:limit]
    
    return ProductsResponse(
        success=True,
        message=f"Found {len(limited_products)} AR-compatible products",
        page=1,
        per_page=limit,
        total=len(ar_products),
        total_pages=1,
        products=limited_products
    )

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    """
    Get product by ID.
    """
    product = next((p for p in mock_products if p["id"] == product_id), None)
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    return ProductResponse(
        success=True,
        message="Product found",
        product=product
    )

@router.get("/{product_id}/similar", response_model=ProductsResponse)
async def get_similar_products(
    product_id: int,
    limit: int = Query(5, ge=1, le=10),
    db: Session = Depends(get_db)
):
    """
    Get similar products based on category.
    """
    # Find the product
    product = next((p for p in mock_products if p["id"] == product_id), None)
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    # Find similar products (same category, excluding current product)
    similar_products = [
        p for p in mock_products 
        if p["category_id"] == product["category_id"] and p["id"] != product_id
    ]
    
    limited_products = similar_products[:limit]
    
    return ProductsResponse(
        success=True,
        message=f"Found {len(limited_products)} similar products",
        page=1,
        per_page=limit,
        total=len(similar_products),
        total_pages=1,
        products=limited_products
    )

@router.get("/search/suggestions")
async def get_search_suggestions(
    q: str = Query(..., min_length=1),
    limit: int = Query(5, ge=1, le=10),
    db: Session = Depends(get_db)
):
    """
    Get search suggestions for autocomplete.
    """
    q_lower = q.lower()
    
    # Find matching product names
    suggestions = []
    for product in mock_products:
        if q_lower in product["name"].lower():
            suggestions.append({
                "id": product["id"],
                "name": product["name"],
                "category": product["category_name"],
                "price": product["price"]
            })
            if len(suggestions) >= limit:
                break
    
    return {
        "success": True,
        "query": q,
        "suggestions": suggestions
    }