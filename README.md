# ARCart AI - AI-Powered AR Furniture Shopping Platform

**ARCart AI** is a modern e-commerce platform that combines artificial intelligence with augmented reality to revolutionize furniture shopping. The platform allows customers to visualize furniture in their own space using AR before making a purchase, with AI-powered recommendations and assistance.

## 🚀 Features

### Core Features
- **AR Furniture Visualization**: Place furniture in your room using augmented reality
- **AI Shopping Assistant**: Personalized furniture recommendations based on style and space
- **Image Search**: Upload images to find visually similar products
- **AI Interior Designer**: Get room design suggestions and furniture placement
- **Smart Recommendations**: Machine learning-based product suggestions

### E-commerce Features
- **Modern Marketplace**: Browse curated furniture collections
- **Advanced Search & Filtering**: Find products by category, price, style, material
- **Wishlist & Shopping Cart**: Save and manage favorite items
- **Secure Checkout**: Payment gateway integration (placeholder for Phase 1)
- **Order Management**: Track orders and delivery status
- **Seller Dashboard**: Product management for sellers

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: FastAPI (Python) + SQLAlchemy + SQLite
- **Database**: SQLite (development) / PostgreSQL (production ready)
- **AR/3D**: Web-based AR with 3D model support (.glb, .gltf)
- **AI Services**: Modular AI service architecture (extensible)

## 📁 Project Structure

```
ARCart-AI/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page components
│   │   ├── layouts/      # Layout components
│   │   ├── services/     # API services
│   │   ├── hooks/        # Custom React hooks
│   │   ├── context/      # React context providers
│   │   ├── utils/        # Utility functions
│   │   └── styles/       # CSS and Tailwind styles
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies
│   └── vite.config.ts    # Vite configuration
├── backend/              # FastAPI backend application
│   ├── api/              # API routers
│   ├── models/           # SQLAlchemy models
│   ├── schemas/          # Pydantic schemas
│   ├── services/         # Business logic services
│   ├── repositories/     # Data access layer
│   ├── utils/            # Utility functions
│   ├── middleware/       # FastAPI middleware
│   ├── config/           # Configuration files
│   ├── tests/            # Backend tests
│   ├── main.py           # FastAPI application entry point
│   └── requirements.txt  # Python dependencies
├── database/             # Database configuration
│   ├── migrations/       # Database migrations (Alembic)
│   ├── seed.py          # Database seeding script
│   └── arcart.db        # SQLite database file
├── docs/                 # Documentation
├── .env                  # Environment variables
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore file
└── README.md            # This file
```

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** 18+ and **npm** (for frontend)
- **Python** 3.9+ and **pip** (for backend)
- **Git** (for version control)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ARCart-AI
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   ```

4. **Set up the backend**
   ```bash
   cd backend
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   
   pip install -r requirements.txt
   ```

5. **Set up the database**
   ```bash
   cd database
   python seed.py
   ```

### Running the Application

#### Start the Backend Server
```bash
cd backend
uvicorn main:app --reload
```
- **API URL**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

#### Start the Frontend Server
```bash
cd frontend
npm run dev
```
- **Frontend URL**: http://localhost:5173
- **Backend Proxy**: http://localhost:8000 (via Vite proxy)

## 📱 Application Flow

### User Journey
1. **Landing Page** → Browse features and sign up
2. **Registration/Login** → Create account or sign in
3. **Home Dashboard** → Browse products, use AI features
4. **Product Discovery** → Search, filter, view products
5. **AR Visualization** → Place furniture in room using AR
6. **Purchase Flow** → Add to cart → Checkout → Order

### AI Features Flow
1. **AI Assistant** → Ask for furniture recommendations
2. **Image Search** → Upload image → Find similar products
3. **Interior Design** → Upload room photo → Get design suggestions
4. **Recommendations** → Personalized product suggestions

## 🔧 Development

### Phase 1: Basic Setup (Current)
- ✅ Project structure creation
- ✅ React frontend with Vite
- ✅ FastAPI backend with SQLAlchemy
- ✅ SQLite database setup
- ✅ Basic authentication (mock)
- ✅ Sample product data
- ✅ CORS configuration
- ✅ Environment variables

### Phase 2: Core Features (Next)
- Real user authentication with JWT
- Product management (CRUD)
- Shopping cart functionality
- Wishlist feature
- Order management
- Basic AI service structure

### Phase 3: AI Integration
- AI shopping assistant
- Recommendation engine
- Image search service
- Interior design service

### Phase 4: AR Integration
- AR room scanning
- 3D product placement
- AR product visualization
- AR session management

### Phase 5: Advanced Features
- Seller dashboard
- Payment integration
- Email notifications
- Analytics dashboard
- Performance optimization

## 🗄️ Database Schema

### Key Models
- **User**: Customers, sellers, admins
- **Product**: Furniture items with AR/3D support
- **Category**: Product categorization
- **Wishlist**: Saved products by users
- **Cart & CartItem**: Shopping cart items
- **Order & OrderItem**: Purchase orders
- **Review**: Product reviews and ratings

### Relationships
```
User (1) → (N) Products (as seller)
User (1) → (N) Wishlists
User (1) → (1) Cart → (N) CartItems
User (1) → (N) Orders → (N) OrderItems
Category (1) → (N) Products
Product (1) → (N) Reviews
```

## 🔐 Security

### Implemented Security Features
- Password hashing (bcrypt placeholder)
- CORS configuration for development
- Environment variables for secrets
- Input validation with Pydantic
- SQLAlchemy ORM (SQL injection prevention)
- Role-based access control structure

### Security Best Practices
- Never store plain-text passwords
- Use HTTPS in production
- Validate all user inputs
- Implement rate limiting
- Regular security audits
- Dependency vulnerability scanning

## 🧪 Testing

### Backend Testing
```bash
cd backend
pytest
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Test Coverage
- API endpoint testing
- Database model testing
- Authentication testing
- Error handling testing
- Integration testing

## 🌐 API Documentation

### Base URL
```
http://localhost:8000
```

### Key Endpoints

#### Health Check
- `GET /health` - API health status
- `GET /ping` - Simple ping endpoint
- `GET /info` - API information

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

#### Products
- `GET /api/products/` - Get products with filters
- `GET /api/products/featured` - Get featured products
- `GET /api/products/bestsellers` - Get bestseller products
- `GET /api/products/ar-compatible` - Get AR-compatible products
- `GET /api/products/{id}` - Get product by ID

#### Categories
- `GET /api/categories/` - Get all categories
- `GET /api/categories/featured` - Get featured categories
- `GET /api/categories/{id}` - Get category by ID

### Interactive Documentation
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🚀 Deployment

### Development
- Local SQLite database
- Vite dev server with hot reload
- FastAPI with auto-reload
- CORS configured for localhost

### Production Considerations
1. **Database**: Switch to PostgreSQL or MySQL
2. **Caching**: Implement Redis for caching
3. **File Storage**: Use S3 or cloud storage for images/3D models
4. **CDN**: Use CDN for static assets
5. **Monitoring**: Implement logging and monitoring
6. **Scaling**: Containerize with Docker, use Kubernetes

### Deployment Options
- **Docker Compose** (recommended for development)
- **Kubernetes** (production scaling)
- **Cloud Platforms**: AWS, Azure, Google Cloud
- **Platform as a Service**: Render, Railway, Heroku

## 📊 Performance Optimization

### Frontend
- Code splitting with React.lazy()
- Image optimization
- Bundle optimization
- Caching strategies
- PWA capabilities

### Backend
- Database indexing
- Query optimization
- Response caching
- Connection pooling
- Async operations

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests
5. Submit a pull request

### Code Standards
- **Frontend**: ESLint + Prettier configuration
- **Backend**: Black + isort + flake8
- **Commit Messages**: Conventional commits
- **Documentation**: Keep docs updated

### Branch Naming
- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates

## 📈 Future Roadmap

### Q1 2024: MVP Launch
- Complete Phase 1-3 features
- Basic AR visualization
- AI recommendation engine
- Mobile-responsive design

### Q2 2024: Platform Enhancement
- Advanced AR features
- Social sharing
- User-generated content
- Marketplace expansion

### Q3 2024: Enterprise Features
- B2B seller tools
- Analytics dashboard
- API for third-party integration
- White-label solutions

### Q4 2024: Scale & Optimize
- Performance optimization
- Internationalization
- Advanced AI features
- Mobile app development

## 🆘 Troubleshooting

### Common Issues

#### Backend Won't Start
```bash
# Check Python version
python --version

# Check dependencies
pip list | grep fastapi

# Check port availability
netstat -ano | findstr :8000
```

#### Frontend Won't Start
```bash
# Check Node.js version
node --version

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Database Issues
```bash
# Check database file permissions
ls -la database/arcart.db

# Reset database
rm database/arcart.db
cd database
python seed.py
```

#### CORS Issues
- Check `.env` file for correct URLs
- Verify CORS configuration in `backend/main.py`
- Ensure frontend and backend ports match

### Getting Help
1. Check the documentation
2. Search existing issues
3. Create a new issue with details
4. Include error logs and system information

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing frontend library
- **FastAPI Team** - For the high-performance Python framework
- **SQLAlchemy Team** - For the powerful ORM
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite Team** - For the next-gen frontend tooling

## 📧 Contact

For questions, suggestions, or support:
- **GitHub Issues**: [Create an issue](<repository-url>/issues)
- **Email**: support@arcart.ai
- **Documentation**: [Read the docs](<repository-url>/docs)

---

**ARCart AI** - Transforming furniture shopping with AI and AR technology. 🛋️✨