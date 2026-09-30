from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from database.database import get_db
from schemas.base import BaseResponse

router = APIRouter()

# Mock categories for Phase 1
mock_categories = [
    {
        "id": 1,
        "name": "Furniture",
        "description": "Living room, bedroom, dining, and outdoor furniture",
        "slug": "furniture",
        "level": 1,
        "parent_id": None,
        "image_url": "",
        "icon": "🛋️",
        "product_count": 45,
        "is_active": True,
        "is_featured": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": 2,
        "name": "Home Decor",
        "description": "Wall art, lighting, rugs, curtains, and decorative items",
        "slug": "home-decor",
        "level": 1,
        "parent_id": None,
        "image_url": "",
        "icon": "🏠",
        "product_count": 32,
        "is_active": True,
        "is_featured": True,
        "created_at": datetime.utcnow()
    },
    {
        "id": 3,
        "name": "Office Furniture",
        "description": "Desks, chairs, storage, and office accessories",
        "slug": "office-furniture",
        "level": 1,
        "parent_id": None,
        "image_url": "",
        "icon": "💼",
        "product_count": 28,
        "is_active": True,
        "is_featured": False,
        "created_at": datetime.utcnow()
    },
    {
        "id": 4,
        "name": "Lighting",
        "description": "Ceiling lights, table lamps, floor lamps, and smart lighting",
        "slug": "lighting",
        "level": 2,
        "parent_id": 2,
        "image_url": "",
        "icon": "💡",
        "product_count": 18,
        "is_active": True,
        "is_featured": False,
        "created_at": datetime.utcnow()
    },
    {
        "id": 5,
        "name": "Storage",
        "description": "Wardrobes, shelves, cabinets, and organizational solutions",
        "slug": "storage",
        "level": 2,
        "parent_id": 1,
        "image_url": "",
        "icon": "🗄️",
        "product_count": 22,
        "is_active": True,
        "is_featured": False,
        "created_at": datetime.utcnow()
    }
]

class CategoryResponse(BaseResponse):
    category: dict

class CategoriesResponse(BaseResponse):
    categories: List[dict]

@router.get("/", response_model=CategoriesResponse)
async def get_categories(
    featured: bool = False,
    active: bool = True,
    db: Session = Depends(get_db)
):
    """
    Get all categories with optional filtering.
    """
    filtered_categories = mock_categories.copy()
    
    if featured:
        filtered_categories = [c for c in filtered_categories if c["is_featured"]]
    
    if active:
        filtered_categories = [c for c in filtered_categories if c["is_active"]]
    
    # Organize by hierarchy
    top_level = [c for c in filtered_categories if c["parent_id"] is None]
    
    # Add subcategories to parent categories
    organized_categories = []
    for category in top_level:
        category_dict = dict(category)
        subcategories = [c for c in filtered_categories if c["parent_id"] == category["id"]]
        category_dict["subcategories"] = subcategories
        organized_categories.append(category_dict)
    
    return CategoriesResponse(
        success=True,
        message=f"Found {len(filtered_categories)} categories",
        categories=organized_categories
    )

@router.get("/featured", response_model=CategoriesResponse)
async def get_featured_categories(
    db: Session = Depends(get_db)
):
    """
    Get featured categories.
    """
    featured_categories = [c for c in mock_categories if c["is_featured"]]
    
    return CategoriesResponse(
        success=True,
        message=f"Found {len(featured_categories)} featured categories",
        categories=featured_categories
    )

@router.get("/top-level", response_model=CategoriesResponse)
async def get_top_level_categories(
    db: Session = Depends(get_db)
):
    """
    Get top-level categories (no parent).
    """
    top_level_categories = [c for c in mock_categories if c["parent_id"] is None]
    
    return CategoriesResponse(
        success=True,
        message=f"Found {len(top_level_categories)} top-level categories",
        categories=top_level_categories
    )

@router.get("/{category_id}", response_model=CategoryResponse)
async def get_category(
    category_id: int,
    db: Session = Depends(get_db)
):
    """
    Get category by ID.
    """
    category = next((c for c in mock_categories if c["id"] == category_id), None)
    
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    
    # Get subcategories
    subcategories = [c for c in mock_categories if c["parent_id"] == category_id]
    category_with_subs = dict(category)
    category_with_subs["subcategories"] = subcategories
    
    return CategoryResponse(
        success=True,
        message="Category found",
        category=category_with_subs
    )

@router.get("/slug/{slug}", response_model=CategoryResponse)
async def get_category_by_slug(
    slug: str,
    db: Session = Depends(get_db)
):
    """
    Get category by slug.
    """
    category = next((c for c in mock_categories if c["slug"] == slug), None)
    
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    
    # Get subcategories
    subcategories = [c for c in mock_categories if c["parent_id"] == category["id"]]
    category_with_subs = dict(category)
    category_with_subs["subcategories"] = subcategories
    
    return CategoryResponse(
        success=True,
        message="Category found",
        category=category_with_subs
    )

@router.get("/{category_id}/products")
async def get_category_products(
    category_id: int,
    include_subcategories: bool = True,
    db: Session = Depends(get_db)
):
    """
    Get products for a category, optionally including subcategories.
    
    Note: This endpoint would need product data integration.
    For Phase 1, returns basic category info.
    """
    category = next((c for c in mock_categories if c["id"] == category_id), None)
    
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    
    # Get subcategory IDs if including subcategories
    category_ids = [category_id]
    if include_subcategories:
        subcategory_ids = [c["id"] for c in mock_categories if c["parent_id"] == category_id]
        category_ids.extend(subcategory_ids)
    
    return {
        "success": True,
        "message": f"Found category with {category['product_count']} products",
        "category_id": category_id,
        "category_name": category["name"],
        "category_ids": category_ids,
        "product_count": category["product_count"],
        "include_subcategories": include_subcategories
    }