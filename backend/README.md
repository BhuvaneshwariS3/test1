# ARCart AI - Backend

FastAPI backend for the ARCart AI furniture shopping platform.

## Features

- **FastAPI**: Modern, fast web framework for building APIs with Python
- **SQLAlchemy**: SQL toolkit and Object-Relational Mapping (ORM) system
- **SQLite**: Lightweight database for development (can be replaced with PostgreSQL in production)
- **JWT Authentication**: Secure token-based authentication
- **CORS**: Cross-Origin Resource Sharing enabled for frontend development
- **Modular Architecture**: Clean separation of concerns with models, schemas, services, and API layers

## Project Structure

```
backend/
├── api/                    # API routers
│   ├── auth.py           # Authentication endpoints
│   ├── users.py          # User management endpoints
│   ├── products.py       # Product endpoints
│   ├── categories.py     # Category endpoints
│   └── health.py         # Health check endpoints
├── models/               # SQLAlchemy models
│   ├── user.py          # User model
│   ├── product.py       # Product model
│   └── category.py      # Category model
├── schemas/              # Pydantic schemas
│   ├── base.py          # Base schemas
│   └── user.py          # User schemas
├── database/             # Database configuration
│   └── database.py      # Database connection setup
├── main.py              # FastAPI application entry point
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## API Endpoints

### Health Check
- `GET /health` - Check API and database health
- `GET /ping` - Simple ping endpoint
- `GET /info` - API information

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token

### Users
- `GET /api/users/` - Get all users (admin)
- `GET /api/users/{user_id}` - Get user by ID
- `PUT /api/users/{user_id}` - Update user profile
- `DELETE /api/users/{user_id}` - Delete user (admin)
- `POST /api/users/{user_id}/verify` - Verify user (admin)

### Products
- `GET /api/products/` - Get products with filtering and pagination
- `GET /api/products/featured` - Get featured products
- `GET /api/products/bestsellers` - Get bestseller products
- `GET /api/products/ar-compatible` - Get AR-compatible products
- `GET /api/products/{product_id}` - Get product by ID
- `GET /api/products/{product_id}/similar` - Get similar products
- `GET /api/products/search/suggestions` - Get search suggestions

### Categories
- `GET /api/categories/` - Get all categories
- `GET /api/categories/featured` - Get featured categories
- `GET /api/categories/top-level` - Get top-level categories
- `GET /api/categories/{category_id}` - Get category by ID
- `GET /api/categories/slug/{slug}` - Get category by slug
- `GET /api/categories/{category_id}/products` - Get category products

## Development Setup

### Prerequisites

- Python 3.9 or higher
- pip (Python package manager)

### Installation

1. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

2. **Activate virtual environment:**
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   Create a `.env` file in the backend directory with:
   ```env
   DATABASE_URL=sqlite:///../database/arcart.db
   SECRET_KEY=your-secret-key-here
   BACKEND_URL=http://localhost:8000
   FRONTEND_URL=http://localhost:5173
   ```

### Running the Application

1. **Start the development server:**
   ```bash
   uvicorn main:app --reload
   ```

2. **Access the API:**
   - API: http://localhost:8000
   - Documentation: http://localhost:8000/docs
   - Alternative docs: http://localhost:8000/redoc

### Database Setup

The application uses SQLite by default. The database file will be created automatically in the `database/` directory.

To create the database tables:
```bash
python -c "from database.database import Base, engine; Base.metadata.create_all(bind=engine)"
```

## Phase 1 Implementation Notes

For Phase 1 (basic setup), the backend uses:

1. **Mock Data**: Users, products, and categories are stored in memory
2. **Simple Authentication**: Basic token simulation without real JWT
3. **SQLite Database**: File-based database for simplicity

These will be replaced with real implementations in Phase 2 and beyond.

## Testing

Run tests with pytest:
```bash
pytest
```

## API Documentation

Interactive API documentation is available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Next Steps (Phase 2+)

1. **Real Database Integration**: Replace mock data with real SQLAlchemy models
2. **JWT Authentication**: Implement proper JWT token generation and validation
3. **Password Hashing**: Add bcrypt password hashing
4. **File Uploads**: Implement product image uploads
5. **AI Services**: Add AI recommendation and image search services
6. **AR Integration**: Add AR session management and 3D model handling
7. **Payment Integration**: Add payment gateway integration
8. **Email Service**: Add email verification and notifications

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | Database connection URL | `sqlite:///../database/arcart.db` |
| SECRET_KEY | Secret key for JWT tokens | `arcart-ai-secret-key-phase-1` |
| BACKEND_URL | Backend server URL | `http://localhost:8000` |
| FRONTEND_URL | Frontend server URL | `http://localhost:5173` |

## Development Notes

- The backend is designed to be stateless
- All business logic should be in service layer (to be implemented in Phase 2)
- Error handling is implemented with proper HTTP status codes
- Input validation uses Pydantic schemas
- CORS is configured for local frontend development