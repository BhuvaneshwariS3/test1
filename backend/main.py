from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import database and models
from database.database import Base, engine, get_db
from models.user import User
from models.product import Product
from models.category import Category

# Import routers
from api import auth, users, products, categories, health, cart, wishlist, orders, sellers

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="ARCart AI Backend API",
    description="AI-powered AR furniture shopping platform backend",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security scheme for API docs
security = HTTPBearer()

# Include routers
app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(categories.router, prefix="/api/categories", tags=["Categories"])
app.include_router(cart.router, prefix="/api/cart", tags=["Cart"])
app.include_router(wishlist.router, prefix="/api/wishlist", tags=["Wishlist"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
app.include_router(sellers.router, prefix="/api/sellers", tags=["Sellers"])

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to ARCart AI Backend API",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "operational",
        "timestamp": datetime.utcnow().isoformat()
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "arcart-ai-backend",
        "timestamp": datetime.utcnow().isoformat(),
        "database": "connected" if engine else "disconnected"
    }

# Application startup event
@app.on_event("startup")
async def startup_event():
    print("🚀 ARCart AI Backend starting up...")
    print(f"📚 API Documentation available at: http://localhost:8000/docs")
    print(f"🔗 Database URL: {os.getenv('DATABASE_URL', 'sqlite:///../database/arcart.db')}")

# Application shutdown event  
@app.on_event("shutdown")
async def shutdown_event():
    print("🛑 ARCart AI Backend shutting down...")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )