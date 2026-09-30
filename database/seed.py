#!/usr/bin/env python3
"""
Database seed script for ARCart AI.
Populates the database with realistic sample data.
"""

import sys
import os
from datetime import datetime
import random

# Add backend directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from sqlalchemy.orm import Session
from database.database import engine, SessionLocal, Base
from models.user import User, UserRole
from models.product import Product, ProductStatus
from models.category import Category
from models.cart import Cart
from models.wishlist import Wishlist
import hashlib

def create_tables():
    """Create database tables."""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created successfully")

def seed_categories(db: Session):
    """Seed categories."""
    print("Seeding categories...")
    
    categories = [
        {
            "name": "Sofas", "slug": "sofas", "description": "Comfortable sofas for your living room",
            "icon": "🛋️", "level": 1, "is_active": True, "is_featured": True, "product_count": 8
        },
        {
            "name": "Chairs", "slug": "chairs", "description": "Various chairs for home and office",
            "icon": "🪑", "level": 1, "is_active": True, "is_featured": True, "product_count": 10
        },
        {
            "name": "Tables", "slug": "tables", "description": "Dining, coffee, and study tables",
            "icon": "🪵", "level": 1, "is_active": True, "is_featured": True, "product_count": 7
        },
        {
            "name": "Beds", "slug": "beds", "description": "Bed frames and mattress bases",
            "icon": "🛏️", "level": 1, "is_active": True, "is_featured": True, "product_count": 6
        },
        {
            "name": "Wardrobes", "slug": "wardrobes", "description": "Storage solutions for your clothes",
            "icon": "🪴", "level": 1, "is_active": True, "is_featured": False, "product_count": 5
        },
        {
            "name": "Office Furniture", "slug": "office-furniture", "description": "Workplace furniture",
            "icon": "💼", "level": 1, "is_active": True, "is_featured": True, "product_count": 8
        },
        {
            "name": "Lamps", "slug": "lamps", "description": "Lighting solutions",
            "icon": "💡", "level": 1, "is_active": True, "is_featured": False, "product_count": 6
        },
        {
            "name": "Home Decor", "slug": "home-decor", "description": "Decorative items",
            "icon": "🎨", "level": 1, "is_active": True, "is_featured": True, "product_count": 10
        },
    ]
    
    for cat in categories:
        category = Category(**cat)
        db.add(category)
    
    db.commit()
    print(f"✅ Added {len(categories)} categories")
    return categories

def seed_users(db: Session):
    """Seed users."""
    print("Seeding users...")
    
    # Password: customer123, seller123, admin123 (bcrypt hashes)
    password_hash = "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW"
    
    users = [
        {
            "email": "admin@arcart.ai", "username": "admin", "full_name": "Administrator",
            "role": UserRole.ADMIN, "hashed_password": password_hash, "is_verified": True,
            "is_seller_verified": True
        },
        {
            "email": "seller@arcart.ai", "username": "furniture_seller", "full_name": "John Furniture",
            "role": UserRole.SELLER, "hashed_password": password_hash, "is_verified": True,
            "is_seller_verified": True, "phone_number": "+919876543210"
        },
        {
            "email": "customer1@arcart.ai", "username": "happy_customer", "full_name": "Jane Customer",
            "role": UserRole.CUSTOMER, "hashed_password": password_hash, "is_verified": True,
            "phone_number": "+919876543211"
        },
        {
            "email": "customer2@arcart.ai", "username": "design_lover", "full_name": "Design Enthusiast",
            "role": UserRole.CUSTOMER, "hashed_password": password_hash, "is_verified": True,
            "phone_number": "+919876543212"
        },
    ]
    
    for user_data in users:
        user = User(**user_data)
        db.add(user)
    
    db.commit()
    
    # Create cart and wishlist for regular users
    for i in range(1, 3):
        cart = Cart(user_id=i + 2)
        wishlist = Wishlist(user_id=i + 2)
        db.add(cart)
        db.add(wishlist)
    
    db.commit()
    print(f"✅ Added {len(users)} users with cart and wishlist")
    return users

def seed_products(db: Session, categories, users):
    """Seed products with realistic data."""
    print("Seeding products...")
    
    seller = next(u for u in users if u.role == UserRole.SELLER)
    
    products = [
        # Sofas
        {
            "name": "Modern Fabric 3-Seater Sofa", "slug": "modern-fabric-3-seater-sofa",
            "description": "Contemporary 3-seater sofa with premium fabric upholstery and sturdy wooden frame. Perfect for modern living rooms.",
            "short_description": "3-seater modern sofa with premium fabric",
            "price": 29999.0, "compare_at_price": 34999.0,
            "category_id": 1, "seller_id": seller.id,
            "stock_quantity": 15, "material": "Premium Fabric, Solid Wood",
            "color": "Charcoal Grey", "style": "Modern",
            "has_3d_model": True, "model_3d_url": "/products/sofa-01.glb",
            "ar_compatible": True,
            "image_url": "/products/sofa-01.jpg",
            "image_urls": '["C:/website/ARCart-AI/frontend/public/products/sofa-02.jpg
            "average_rating": 4.5, "review_count": 42,
            "is_featured": True, "is_bestseller": True,
            "length": 220.0, "width": 95.0, "height": 85.0, "weight": 45.0,
            "status": ProductStatus.ACTIVE
        },
        {
            "name": "Luxury Leather Corner Sofa", "slug": "luxury-leather-corner-sofa",
            "description": "Elegant corner sofa with premium Italian leather. Features plush cushions and modern design.",
            "short_description": "Luxury leather corner sofa",
            "price": 64999.0, "compare_at_price": 79999.0,
            "category_id": 1, "seller_id": seller.id,
            "stock_quantity": 8, "material": "Italian Leather, Metal Frame",
            "color": "Dark Brown", "style": "Luxury",
            "has_3d_model": True, "model_3d_url": "/products/sofa-02.glb",
            "ar_compatible": True,
            "image_url": "/products/sofa-02.jpg",
            "image_urls": '["/products/sofa-02.jpg", "/products/sofa-03.jpg"]',
            "average_rating": 4.8, "review_count": 28,
            "is_featured": True, "is_bestseller": False,
            "length": 280.0, "width": 180.0, "height": 90.0, "weight": 85.0,
            "status": ProductStatus.ACTIVE
        },
        {
            "name": "Small Apartment Sofa", "slug": "small-apartment-sofa",
            "description": "Compact sofa designed for small apartments. Foldable design with hidden storage.",
            "short_description": "Compact sofa for small spaces",
            "price": 19999.0,
            "category_id": 1, "seller_id": seller.id,
            "stock_quantity": 20, "material": "Fabric, Metal",
            "color": "Navy Blue", "style": "Compact",
            "has_3d_model": False, "ar_compatible": False,
            "image_url": "/products/sofa-03.jpg",
            "image_urls": '["/products/sofa-03.jpg"]',
            "average_rating": 4.2, "review_count": 15,
            "is_featured": False, "is_bestseller": False,
            "length": 180.0, "width": 80.0, "height": 75.0, "weight": 30.0,
            "status": ProductStatus.ACTIVE
        },
        {
            "name": "Sectional Modular Sofa", "slug": "sectional-modular-sofa",
            "description": "Modular sofa with customizable sections. Create your perfect seating arrangement.",
            "short_description": "Modular sofa with customizable sections",
            "price": 54999.0, "compare_at_price": 69999.0,
            "category_id": 1, "seller_id": seller.id,
            "stock_quantity": 5, "material": "Fabric, Foam, Wood",
            "color": "Beige", "style": "Modern",
            "has_3d_model": True, "model_3d_url": "/products/sofa-04.glb",
            "ar_compatible": True,
            "image_url": "/products/sofa-04.jpg",
            "image_urls": '["/products/sofa-04.jpg", "/products/sofa-05.jpg"]',
            "average_rating": 4.6, "review_count": 35,
            "is_featured": True, "is_bestseller": True,
            "length": 350.0, "width": 200.0, "height": 85.0, "weight": 120.0,
            "status": ProductStatus.ACTIVE
        },
        
        # Chairs
        {
            "name": "Ergonomic Office Chair", "slug": "ergonomic-office-chair",
            "description": "Professional office chair with full lumbar support, adjustable height, and 360-degree swivel.",
            "short_description": "Ergonomic office chair with lumbar support",
            "price": 12999.0, "compare_at_price": 15999.0,
            "category_id": 2, "seller_id": seller.id,
            "stock_quantity": 30, "material": "Mesh, Aluminum, Plastic",
            "color": "Black", "style": "Modern",
            "has_3d_model": False, "ar_compatible": False,
            "image_url": "/products/chair-01.jpg",
            "image_urls": '["/products/chair-01.jpg", "/products/chair-02.jpg"]',
            "average_rating": 4.7, "review_count": 125,
            "is_featured": False, "is_bestseller": True,
            "length": 65.0, "width": 65.0, "height": 120.0, "weight": 18.0,
            "status": ProductStatus.ACTIVE
        },
        {
            "name": "Mid-Century Modern Chair", "slug": "mid-century-modern-chair",
            "description": "Classic mid-century design with wooden legs and velvet upholstery.",
            "short_description": "Mid-century modern design chair",
            "price": 15999.0,
            "category_id": 2, "seller_id": seller.id,
            "stock_quantity": 12, "material": "Velvet, Solid Wood",
            "color": "Emerald Green", "style": "Mid-Century",
            "has_3d_model": True, "model_3d_url": "/products/chair-02.glb",
            "ar_compatible": True,
            "image_url": "/products/chair-02.jpg",
            "image_urls": '["/products/chair-02.jpg", "/products/chair-03.jpg"]',
            "average_rating": 4.5, "review_count": 22,
            "is_featured": True, "is_bestseller": False,
            "length": 70.0, "width": 75.0, "height": 80.0, "weight": 25.0,
            "status": ProductStatus.ACTIVE
        },
        {
            "name": "Armless Accent Chair", "slug": "armless-accent-chair",
            "description": "Minimalist armless chair perfect for small spaces. Modern design with comfortable cushioning.",
            "short_description": "Minimalist armless accent chair",
            "price": 8999.0,
            "category_id": 2, "seller_id": seller.id,
            "stock_quantity": 25, "material": "Fabric, Wood",
            "color": "Warm Taupe", "style": "Modern",
            "has_3d_model": False, "ar_compatible": False,
            "image_url": "/products/chair-03.jpg",
            "image_urls": '["/products/chair-03.jpg"]',
            "average_rating": 4.3, "review_count": 18,
            "is_featured": False, "is_bestseller": False,
            "length": 60.0, "width": 65.0, "height": 75.0, "weight": 20.0,
            "status": ProductStatus.ACTIVE
        },
        {
            "name": "Dining Room Chair Set", "slug": "dining-room-chair-set",
            "description": "Set of 4 elegant dining chairs with upholstered seats and wooden frames.",
            "short_description": "Set of 4 dining room chairs",
            "price": 24999.0,
            "category_id": 2, "seller_id": seller.id,
            "stock_quantity": 8, "material": "Fabric, Solid Wood",
            "color": "Grey", "style": "Traditional",
            "has_3d_model": False, "ar_compatible": False,
            "image_url": "/products/chair-04.jpg",
            "image_urls": '["/products/chair-04.jpg", "/products/chair-05.jpg"]',
            "average_rating": 4.4, "review_count": 32,
            "is_featured": False, "is_bestseller": False,
            "length": 60.0, "width": 60.0, "height": 90.0, "weight": 25.0,
            "status": ProductStatus.ACTIVE
        },
        {
            "name": "Recliner Lounge Chair", "slug": "recliner-lounge-chair",
            "description": "Luxurious recliner chair with footstool. Multiple reclining positions for maximum comfort.",
            "short_description": "Luxurious recliner with footstool",
            "price": 34999.0, "compare_at_price": 44999.0,
            "category_id": 2, "seller_id": seller.id,
            "stock_quantity": 6, "material": "Leather, Wood",
            "color": "Burgundy", "style": "Traditional",
            "has_3d_model": True, "model_3d_url": "/products/chair-05.glb",
            "ar_compatible": True,
            "image_url": "/products/chair-05.jpg",
            "image_urls": '["/products/chair-05.jpg", "/products/chair-06.jpg"]',
            "average_rating": 4.6, "review_count": 25,
            "is_featured": True, "is_bestseller": False,
            "length": 80.0, "width": 85.0, "height": 105.0, "weight": 45.0,
            "status": ProductStatus.ACTIVE
        },
        
        # Tables
        {
            "name": "Oak Coffee Table", "slug": "oak-coffee-table",
            "description": "Solid oak coffee table with drawer storage. Rustic finish with modern design.",
            "short_description": "Solid oak coffee table with storage",
            "price": 22999.0, "compare_at_price": 27999.0,
            "category_id": 3, "seller_id": seller.id,
            "stock_quantity": 10, "material": "Solid Oak Wood",
            "color": "Natural Oak", "style": "Rustic",
            "has_3d_model": True, "model_3d_url": "/products/table-01.glb",
            "ar_compatible": True,
            "image_url": "/products/table-01.jpg",
            "image_urls": '["/products/table-01.jpg", "/products/table-02.jpg"]',
            "average_rating": 4.5, "review_count": 45,
            "is_featured": True, "is_bestseller": True,
            "length": 120.0, "width": 60.0, "height": 45.0, "weight": 35.0,
            "status": ProductStatus.ACTIVE
        },
        {
            "name": "Glass Top Dining Table", "slug": "glass-top-dining-table",
            "description": "Modern dining table with tempered glass top and metal base. Seats 6 people.",
            "short_description": "Glass top dining table for 6",
            "price": 29999.0, "compare_at_price": 34999.0,
            "category_id": 3, "seller_id": seller.id,
            "stock_quantity": 8, "material": "Tempered Glass, Metal",
            "color": "Clear", "style": "Modern",
            "has_3d_model": True, "model_3d_url": "/products/table-02.glb",
            "ar_compatible": True,
            "image_url": "/products/table-02.jpg",
            "image_urls": '["/products/table-02.jpg", "/products/table-03.jpg"]',
            "average_rating": 4.3, "review_count": 38,
            "is_featured": False, "is_bestseller": False,
            "length": 180.0, "width": 90.0, "height": 75.0, "weight": 60.0,
            "status": ProductStatus.ACTIVE
        },
        {
            "name": "Study Desk with Storage", "slug": "study-desk-with-storage",
            "description": "Computer desk with multiple storage compartments and cable management.",
            "short_description": "Computer desk with storage",
            "price": 14999.0,
            "category_id": 3, "seller_id": seller.id,
            "stock_quantity": 15, "material": "Engineered Wood, Metal",
            "color": "White", "style": "Modern",
            "has_3d_model": False, "ar_compatible": False,
            "image_url": "/products/table-03.jpg",
            "image_urls": '["/products/table-03.jpg", "/products/table-04.jpg"]',
            "average_rating": 4.4, "review_count": 52,
            "is_featured": False, "is_bestseller": True,
            "length": 140.0, "width": 70.0, "height": 75.0, "weight": 35.0,
            "status": ProductStatus.ACTIVE
        },
        
        # Beds
        {
            "name": "Platform Bed Frame Queen", "slug": "platform-bed-frame-queen",
            "description": "Modern platform bed frame with built-in storage drawers. No box spring needed.",
            "short_description": "Platform bed with storage",
            "price": 34999.0, "compare_at_price": 44999.0,
            "category_id": 4, "seller_id": seller.id,
            "stock_quantity": 5, "material": "Wood, Metal",
            "color": "White", "style": "Modern",
            "has_3d_model": True, "model_3d_url": "/products/bed-01.glb",
            "ar_compatible": True,
            "image_url": "/products/bed-01.jpg",
            "image_urls": '["/products/bed-01.jpg", "/products/bed-02.jpg"]',
            "average_rating": 4.6, "review_count": 28,
            "is_featured": True, "is_bestseller": False,
            "length": 210.0, "width": 165.0, "height": 40.0, "weight": 65.0,
            "status": ProductStatus.ACTIVE
        },
        {
            "name": "Upholstered Bed Frame", "slug": "upholstered-bed-frame",
            "description": "Luxurious upholstered bed frame with button-tufted headboard. Elegant design.",
            "short_description": "Upholstered bed with tufted headboard",
            "price": 44999.0, "compare_at_price": 54999.0,
            "category_id": 4, "seller_id": seller.id,
            "stock_quantity": 4, "material": "Velvet, Wood",
            "color": "Navy Blue", "style": "Luxury",
            "has_3d_model": True, "model_3d_url": "/products/bed-02.glb",
            "ar_compatible": True,
            "image_url": "/products/bed-02.jpg",
            "image_urls": '["/products/bed-02.jpg", "/products/bed-03.jpg"]',
            "average_rating": 4.8, "review_count": 19,
            "is_featured": True, "is_bestseller": False,
            "length": 220.0, "width": 180.0, "height": 120.0, "weight": 85.0,
            "status": ProductStatus.ACTIVE
        },
        
        # Wardrobes
        {
            "name": "Sliding Door Wardrobe", "slug": "sliding-door-wardrobe",
            "description": "Modern sliding door wardrobe with mirror and multiple compartments.",
            "short_description": "Sliding door wardrobe with mirror",
            "price": 39999.0, "compare_at_price": 49999.0,
            "category_id": 5, "seller_id": seller.id,
            "stock_quantity": 6, "material": "Engineered Wood, Mirror",
            "color": "Walnut", "style": "Modern",
            "has_3d_model": True, "model_3d_url": "/products/wardrobe-01.glb",
            "ar_compatible": True,
            "image_url": "/products/wardrobe-01.jpg",
            "image_urls": '["/products/wardrobe-01.jpg", "/products/wardrobe-02.jpg"]',
            "average_rating": 4.4, "review_count": 35,
            "is_featured": False, "is_bestseller": False,
            "length": 200.0, "width": 60.0, "height": 220.0, "weight": 95.0,
            "status": ProductStatus.ACTIVE
        },
        
        # Office Furniture
        {
            "name": "Executive Office Desk", "slug": "executive-office-desk",
            "description": "Large executive desk with built-in cable management and premium finish.",
            "short_description": "Executive office desk with cable management",
            "price": 49999.0, "compare_at_price": 64999.0,
            "category_id": 6, "seller_id": seller.id,
            "stock_quantity": 3, "material": "Solid Wood, Metal",
            "color": "Dark Walnut", "style": "Executive",
            "has_3d_model": True, "model_3d_url": "/products/desk-01.glb",
            "ar_compatible": True,
            "image_url": "/products/desk-01.jpg",
            "image_urls": '["/products/desk-01.jpg", "/products/desk-02.jpg"]',
            "average_rating": 4.7, "review_count": 22,
            "is_featured": True, "is_bestseller": True,
            "length": 180.0, "width": 90.0, "height": 75.0, "weight": 85.0,
            "status": ProductStatus.ACTIVE
        },
        {
            "name": "Bookshelf with Glass Doors", "slug": "bookshelf-with-glass-doors",
            "description": "5-shelf bookcase with tempered glass doors. Adjustable shelves.",
            "short_description": "5-shelf bookcase with glass doors",
            "price": 14999.0, "compare_at_price": 17999.0,
            "category_id": 6, "seller_id": seller.id,
            "stock_quantity": 10, "material": "Engineered Wood, Glass",
            "color": "Oak", "style": "Modern",
            "has_3d_model": False, "ar_compatible": False,
            "image_url": "/products/bookshelf-01.jpg",
            "image_urls": '["/products/bookshelf-01.jpg", "/products/bookshelf-02.jpg"]',
            "average_rating": 4.3, "review_count": 42,
            "is_featured": False, "is_bestseller": False,
            "length": 120.0, "width": 40.0, "height": 180.0, "weight": 45.0,
            "status": ProductStatus.ACTIVE
        },
        
        # Lamps
        {
            "name": "Modern Floor Lamp", "slug": "modern-floor-lamp",
            "description": "Sleek modern floor lamp with adjustable height and warm LED light.",
            "short_description": "Modern floor lamp with LED",
            "price": 5999.0,
            "category_id": 7, "seller_id": seller.id,
            "stock_quantity": 20, "material": "Metal, Fabric",
            "color": "Black", "style": "Modern",
            "has_3d_model": False, "ar_compatible": False,
            "image_url": "/products/lamp-01.jpg",
            "image_urls": '["/products/lamp-01.jpg", "/products/lamp-02.jpg"]',
            "average_rating": 4.5, "review_count": 38,
            "is_featured": False, "is_bestseller": True,
            "length": 40.0, "width": 40.0, "height": 170.0, "weight": 12.0,
            "status": ProductStatus.ACTIVE
        },
        {
            "name": "Table Lamp Set", "slug": "table-lamp-set",
            "description": "Set of 2 elegant table lamps with fabric shades and wooden bases.",
            "short_description": "Set of 2 elegant table lamps",
            "price": 8999.0, "compare_at_price": 11999.0,
            "category_id": 7, "seller_id": seller.id,
            "stock_quantity": 15, "material": "Fabric, Wood",
            "color": "Gold", "style": "Traditional",
            "has_3d_model": False, "ar_compatible": False,
            "image_url": "/products/lamp-02.jpg",
            "image_urls": '["/products/lamp-02.jpg", "/products/lamp-03.jpg"]',
            "average_rating": 4.4, "review_count": 25,
            "is_featured": False, "is_bestseller": False,
            "length": 30.0, "width": 30.0, "height": 55.0, "weight": 8.0,
            "status": ProductStatus.ACTIVE
        },
        
        # Home Decor
        {
            "name": "Abstract Wall Art Set", "slug": "abstract-wall-art-set",
            "description": "Set of 3 abstract wall art prints in modern frames. Contemporary design.",
            "short_description": "Set of 3 abstract wall art prints",
            "price": 7999.0,
            "category_id": 8, "seller_id": seller.id,
            "stock_quantity": 25, "material": "Canvas, Wood",
            "color": "Multi", "style": "Abstract",
            "has_3d_model": False, "ar_compatible": False,
            "image_url": "/products/decor-01.jpg",
            "image_urls": '["/products/decor-01.jpg", "/products/decor-02.jpg"]',
            "average_rating": 4.6, "review_count": 55,
            "is_featured": True, "is_bestseller": True,
            "length": 150.0, "width": 5.0, "height": 150.0, "weight": 5.0,
            "status": ProductStatus.ACTIVE
        },
        {
            "name": "Rustic Wall Clock", "slug": "rustic-wall-clock",
            "description": "Wooden wall clock with minimalist design. Functional and decorative.",
            "short_description": "Wooden rustic wall clock",
            "price": 2999.0,
            "category_id": 8, "seller_id": seller.id,
            "stock_quantity": 30, "material": "Wood",
            "color": "Natural", "style": "Rustic",
            "has_3d_model": False, "ar_compatible": False,
            "image_url": "/products/decor-02.jpg",
            "image_urls": '["/products/decor-02.jpg"]',
            "average_rating": 4.3, "review_count": 28,
            "is_featured": False, "is_bestseller": False,
            "length": 60.0, "width": 5.0, "height": 60.0, "weight": 3.0,
            "status": ProductStatus.ACTIVE
        },
        {
            "name": "Decorative Vase Set", "slug": "decorative-vase-set",
            "description": "Set of 3 ceramic vases in varying sizes. Perfect for floral arrangements.",
            "short_description": "Set of 3 decorative ceramic vases",
            "price": 5999.0,
            "category_id": 8, "seller_id": seller.id,
            "stock_quantity": 18, "material": "Ceramic",
            "color": "White", "style": "Modern",
            "has_3d_model": False, "ar_compatible": False,
            "image_url": "/products/decor-03.jpg",
            "image_urls": '["/products/decor-03.jpg", "/products/decor-04.jpg"]',
            "average_rating": 4.5, "review_count": 32,
            "is_featured": False, "is_bestseller": False,
            "length": 30.0, "width": 30.0, "height": 35.0, "weight": 5.0,
            "status": ProductStatus.ACTIVE
        },
    ]
    
    for prod in products:
        product = Product(**prod)
        db.add(product)
    
    db.commit()
    print(f"✅ Added {len(products)} products")

def main():
    """Main function to seed the database."""
    print("="*60)
    print("🚀 Starting database seeding for ARCart AI...")
    print("="*60)
    
    create_tables()
    db = SessionLocal()
    
    try:
        categories = seed_categories(db)
        users = seed_users(db)
        seed_products(db, categories, users)
        
        print("\n" + "="*60)
        print("🎉 Database seeding completed successfully!")
        print("="*60)
        print(f"📊 Summary:")
        print(f"   • Categories: {db.query(Category).count()}")
        print(f"   • Users: {db.query(User).count()}")
        print(f"   • Products: {db.query(Product).count()}")
        print("\n🔑 Demo Credentials:")
        print("   • Email: customer1@arcart.ai")
        print("   • Password: customer123")
        print("\n✅ Ready to use!")
        
    except Exception as e:
        print(f"\n❌ Error during seeding: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    main()