# Database - ARCart AI

Database configuration and seed scripts for ARCart AI platform.

## Database Structure

The application uses SQLite for development with SQLAlchemy ORM.

### Database File Location
```
database/arcart.db
```

### Models

#### User
- **id**: Primary key
- **email**: Unique email address
- **username**: Unique username
- **full_name**: User's full name
- **hashed_password**: Bcrypt hashed password
- **role**: Enum (customer, seller, admin)
- **is_active**: Account active status
- **is_verified**: Email verification status
- **is_seller_verified**: Seller verification status
- **created_at**: Account creation timestamp

#### Product
- **id**: Primary key
- **name**: Product name
- **description**: Detailed description
- **price**: Current price
- **compare_at_price**: Original price (for discounts)
- **category_id**: Foreign key to Category
- **seller_id**: Foreign key to User (seller)
- **stock_quantity**: Available quantity
- **material**: Material type
- **color**: Color
- **style**: Design style
- **has_3d_model**: Boolean for 3D model availability
- **model_3d_url**: URL to 3D model file (.glb, .gltf)
- **ar_compatible**: Boolean for AR compatibility
- **average_rating**: Average customer rating
- **review_count**: Number of reviews
- **is_featured**: Featured product flag
- **is_bestseller**: Bestseller flag
- **status**: Enum (draft, active, out_of_stock, discontinued)

#### Category
- **id**: Primary key
- **name**: Category name
- **description**: Category description
- **slug**: URL-friendly name
- **level**: Hierarchy level (1 = top-level)
- **parent_id**: Foreign key to parent category
- **product_count**: Number of products in category
- **is_active**: Active status
- **is_featured**: Featured category flag

## Database Setup

### Automatic Setup
The database tables are automatically created when the FastAPI application starts for the first time.

### Manual Setup
You can also create tables manually:
```bash
cd backend
python -c "from database.database import Base, engine; Base.metadata.create_all(bind=engine)"
```

## Seeding Database

### Running the Seed Script
To populate the database with sample data:
```bash
cd database
python seed.py
```

### Seed Data Includes

#### Categories (5)
1. **Furniture** - Main furniture category
2. **Home Decor** - Home decoration items
3. **Office Furniture** - Office equipment
4. **Lighting** - Lighting fixtures (subcategory of Home Decor)
5. **Storage** - Storage solutions (subcategory of Furniture)

#### Users (4)
1. **Admin** - Full system access
2. **Seller** - Furniture seller account
3. **Customer** - Regular customer account
4. **Demo User** - Additional customer account

#### Products (6)
1. **Modern Sofa** - 3-seater sofa (AR compatible)
2. **Wooden Dining Table** - 6-seater dining set (AR compatible)
3. **Ergonomic Office Chair** - Adjustable office chair
4. **Queen Size Bed Frame** - Platform bed with storage (AR compatible)
5. **Bookshelf with Glass Doors** - 5-shelf bookcase
6. **Coffee Table with Storage** - Lift-top coffee table (AR compatible)

### Demo Credentials
The seed script creates users with the following credentials:

| Email | Password | Role |
|-------|----------|------|
| admin@arcart.ai | admin123 | Admin |
| seller@arcart.ai | seller123 | Seller |
| customer@arcart.ai | customer123 | Customer |
| demo@arcart.ai | demo123 | Customer |

**Note:** These are bcrypt hashed passwords in the database.

## Database Migrations

### Alembic Setup (Future)
For production, Alembic migrations are set up in the `migrations/` directory.

To create a new migration:
```bash
alembic revision --autogenerate -m "Description of changes"
```

To apply migrations:
```bash
alembic upgrade head
```

## Development Notes

### SQLite for Development
- SQLite is used for development simplicity
- File-based database in `arcart.db`
- No separate database server required
- Easy to backup and share

### Production Database
For production deployment, consider:
1. **PostgreSQL**: Recommended for production
2. **MySQL**: Alternative option
3. **Database hosting**: AWS RDS, Azure SQL, Google Cloud SQL

### Changing Database
To switch to a different database:
1. Update `DATABASE_URL` in `.env` file
2. Install appropriate database driver
3. Update `requirements.txt` with driver package
4. Run database migrations

## Backup and Recovery

### Backup Database
```bash
cp database/arcart.db database/arcart.db.backup
```

### Restore Database
```bash
cp database/arcart.db.backup database/arcart.db
```

## Database Schema Diagram

```
Users
├── Products (as seller)
├── Wishlists
├── Carts
├── Orders
└── Reviews

Categories
└── Products

Products
├── Category
├── Seller (User)
├── Reviews
├── Wishlists
└── OrderItems
```

## Troubleshooting

### Database Connection Issues
1. Check `DATABASE_URL` in `.env` file
2. Ensure database file exists and is writable
3. Check file permissions on `database/` directory

### Seed Script Issues
1. Make sure Python dependencies are installed
2. Check that backend directory is in Python path
3. Verify database tables exist before seeding

### Performance Issues
1. SQLite may have performance limitations with large datasets
2. Consider switching to PostgreSQL for better performance
3. Add appropriate indexes for frequently queried columns