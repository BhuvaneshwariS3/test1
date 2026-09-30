from sqlalchemy import Column, Integer, String, Float, Text, DateTime, Boolean, ForeignKey, Enum, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from database.database import Base

class ProductStatus(str, enum.Enum):
    DRAFT = "draft"
    ACTIVE = "active"
    OUT_OF_STOCK = "out_of_stock"
    DISCONTINUED = "discontinued"

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    
    # Basic information
    name = Column(String(255), nullable=False, index=True)
    slug = Column(String(300), unique=True, nullable=True, index=True)
    description = Column(Text, nullable=False)
    short_description = Column(String(500), nullable=True)
    
    # Pricing
    price = Column(Float, nullable=False)
    compare_at_price = Column(Float, nullable=True)
    cost_price = Column(Float, nullable=True)
    
    # Inventory
    sku = Column(String(100), unique=True, nullable=True)
    stock_quantity = Column(Integer, default=0)
    low_stock_threshold = Column(Integer, default=5)
    
    # Dimensions and weight
    length = Column(Float, nullable=True)
    width = Column(Float, nullable=True)
    height = Column(Float, nullable=True)
    weight = Column(Float, nullable=True)
    
    # Material and attributes
    material = Column(String(100), nullable=True)
    color = Column(String(50), nullable=True)
    style = Column(String(100), nullable=True)
    
    # AR/3D related
    has_3d_model = Column(Boolean, default=False)
    model_3d_url = Column(String(500), nullable=True)
    ar_compatible = Column(Boolean, default=False)
    
    # Images
    image_url = Column(String(500), nullable=True)
    image_urls = Column(JSON, nullable=True)
    
    # Status
    status = Column(Enum(ProductStatus), default=ProductStatus.ACTIVE)
    is_featured = Column(Boolean, default=False)
    is_bestseller = Column(Boolean, default=False)
    
    # Ratings
    average_rating = Column(Float, default=0.0)
    review_count = Column(Integer, default=0)
    
    # SEO
    meta_title = Column(String(255), nullable=True)
    meta_description = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    published_at = Column(DateTime(timezone=True), nullable=True)
    
    # Foreign keys
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    seller_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Relationships
    category = relationship("Category", back_populates="products")
    seller = relationship("User", back_populates="products")
    reviews = relationship("Review", back_populates="product")
    wishlist_items = relationship("WishlistItem", back_populates="product")
    cart_items = relationship("CartItem", back_populates="product")
    order_items = relationship("OrderItem", back_populates="product")
    product_images = relationship("ProductImage", back_populates="product")
    
    def __repr__(self):
        return f"<Product(id={self.id}, name={self.name}, price={self.price})>"
    
    @property
    def in_stock(self):
        return self.stock_quantity > 0 and self.status == ProductStatus.ACTIVE
    
    @property
    def is_on_sale(self):
        return self.compare_at_price and self.price < self.compare_at_price
    
    @property
    def discount_percentage(self):
        if self.is_on_sale and self.compare_at_price:
            discount = ((self.compare_at_price - self.price) / self.compare_at_price) * 100
            return round(discount, 1)
        return 0