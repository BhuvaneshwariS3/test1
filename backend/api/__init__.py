"""
API routers for ARCart AI backend.
"""

from .auth import router as auth_router
from .users import router as users_router
from .products import router as products_router
from .categories import router as categories_router
from .health import router as health_router
from .cart import router as cart_router
from .wishlist import router as wishlist_router
from .orders import router as orders_router
from .sellers import router as sellers_router

__all__ = [
    "auth_router",
    "users_router", 
    "products_router",
    "categories_router",
    "health_router",
    "cart_router",
    "wishlist_router",
    "orders_router",
    "sellers_router"
]