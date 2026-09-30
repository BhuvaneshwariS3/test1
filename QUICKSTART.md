# ARCart AI - Quick Start Guide

Get ARCart AI up and running in 5 minutes!

## 🚀 One-Command Setup (Windows)

Run this command in PowerShell to set up everything automatically:

```powershell
# Clone and setup ARCart AI
git clone <repository-url>
cd ARCart-AI
.\setup.ps1
```

## 📋 Manual Setup Steps

### Step 1: Environment Setup
```bash
# Copy environment file
cp .env.example .env

# Edit .env if needed (defaults work for local development)
# nano .env  # or use any text editor
```

### Step 2: Frontend Setup
```bash
cd frontend
npm install
```

### Step 3: Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate

# macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 4: Database Setup
```bash
cd database
python seed.py
```

## 🏃 Running the Application

### Terminal 1: Backend Server
```bash
cd backend
uvicorn main:app --reload
```
**Access at:** http://localhost:8000

### Terminal 2: Frontend Server
```bash
cd frontend
npm run dev
```
**Access at:** http://localhost:5173

## 🔑 Demo Credentials

The seed script creates these demo accounts:

| Email | Password | Role | Purpose |
|-------|----------|------|---------|
| admin@arcart.ai | admin123 | Admin | Full system access |
| seller@arcart.ai | seller123 | Seller | Product management |
| customer@arcart.ai | customer123 | Customer | Regular shopping |
| demo@arcart.ai | demo123 | Customer | Testing features |

## 🌐 Application URLs

### Development URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs (Swagger)**: http://localhost:8000/docs
- **API Docs (ReDoc)**: http://localhost:8000/redoc

### Key Pages to Visit
1. **Landing Page**: http://localhost:5173/
2. **Login**: http://localhost:5173/login
3. **Home Dashboard**: http://localhost:5173/home
4. **Products**: http://localhost:5173/products (coming in Phase 2)

## 🧪 Testing the Setup

### Test Backend Health
```bash
curl http://localhost:8000/health
```
Should return: `{"status":"healthy","service":"arcart-ai-backend",...}`

### Test Frontend Connection
Open browser console (F12) and check for:
```
Backend connected: Backend connected: healthy
```

## 🐛 Common Issues & Solutions

### Issue: Port already in use
**Solution:** Change ports in configuration
- Backend: Edit `backend/main.py` line with `port=8000`
- Frontend: Edit `frontend/vite.config.ts` line with `port: 5173`

### Issue: Python dependencies fail to install
**Solution:** Upgrade pip first
```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### Issue: Node.js/npm not found
**Solution:** Install Node.js from https://nodejs.org/

### Issue: Database seeding fails
**Solution:** Check Python path and permissions
```bash
cd database
python -c "import sys; print(sys.path)"
```

## ⚡ Quick Commands Reference

### Development
```bash
# Start both servers (using separate terminals)
npm run dev        # Frontend
uvicorn main:app --reload  # Backend

# Run tests
cd backend && pytest       # Backend tests
cd frontend && npm test    # Frontend tests

# Reset database
cd database && python seed.py
```

### Database
```bash
# View database (requires sqlite3)
sqlite3 database/arcart.db

# Common SQLite commands
.tables                 # List tables
SELECT * FROM users;    # View users
.schema products        # View table schema
.exit                   # Exit SQLite
```

### Debugging
```bash
# Check logs
# Backend logs appear in terminal running uvicorn
# Frontend logs appear in browser console (F12)

# Network requests
# Check Network tab in browser devtools for API calls
```

## 📞 Getting Help

If you encounter issues:

1. **Check error messages** in terminal/browser console
2. **Verify all steps** in this guide were followed
3. **Check file permissions** on database/ directory
4. **Ensure ports 5173 and 8000** are not blocked

For additional help:
- Check the main README.md for detailed documentation
- Review API documentation at http://localhost:8000/docs
- Search existing issues or create a new one

## 🎉 Success Checklist

- [ ] Frontend loads at http://localhost:5173
- [ ] Backend responds at http://localhost:8000/health
- [ ] Can login with demo credentials
- [ ] See products on home page
- [ ] API docs load at http://localhost:8000/docs
- [ ] Frontend shows "Backend connected" status

Once all checkboxes are checked, you're ready to start developing ARCart AI! 🚀