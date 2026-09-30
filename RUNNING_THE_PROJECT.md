# ARCart AI - How to Run the Project

## Quick Start (5 minutes)

### Terminal 1 - Backend Mock Server

```powershell
cd c:\website\ARCart-AI
python run_simple.py
```

Expected output:
```
======================================================================
🚀 ARCart AI - Mock Backend Server
======================================================================

✅ Mock Backend Server running on http://127.0.0.1:8000
📊 Available Endpoints:
  • http://127.0.0.1:8000/health
  • http://127.0.0.1:8000/ping
  • http://127.0.0.1:8000/api/products/
  • http://127.0.0.1:8000/api/categories/
  • ... (more endpoints listed)
```

✅ **Backend is now running on http://localhost:8000**

---

### Terminal 2 - Frontend Development Server

#### Option A: Using Bundled Node.js (Recommended)

```cmd
cd c:\website\ARCart-AI\frontend
c:\website\ARCart-AI\nodejs\node-v20.11.0-win-x64\npm.cmd run dev
```

#### Option B: Using System Node.js (if installed)

```powershell
cd c:\website\ARCart-AI\frontend
npm run dev
```

#### Option C: Manual Vite Start

```cmd
cd c:\website\ARCart-AI\frontend
c:\website\ARCart-AI\nodejs\node-v20.11.0-win-x64\node.exe .\node_modules\.bin\vite
```

Expected output:
```
VITE v5.0.8  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

✅ **Frontend is now running on http://localhost:5173**

---

## Step-by-Step Setup

### Prerequisites Check

```powershell
# Check Node.js
node --version  # Should be v20.11.0 or similar
npm --version   # Should be npm 10.x or similar

# Check Python
python --version  # Should be any Python version for mock backend
```

### 1. Frontend Setup

```powershell
cd c:\website\ARCart-AI\frontend

# Install dependencies (only needed first time)
npm install

# Start development server
npm run dev
```

### 2. Backend Setup (Mock Server - No Dependencies Needed)

```powershell
cd c:\website\ARCart-AI

# Start mock backend
python run_simple.py
```

### 3. Access the Application

Open your browser and visit: **http://localhost:5173**

---

## Testing the Application Flow

### 1. Home Page
- ✅ Should display featured products
- ✅ Should display bestsellers
- ✅ Should show product categories

### 2. Register / Login
- Email: `customer1@arcart.ai` (or any email for registration)
- Password: `customer123` (any password works in mock mode)
- ✅ Should redirect to home page after login

### 3. Products Page
- ✅ Should list all products
- ✅ Should have category filters
- ✅ Should have search functionality
- ✅ Should display product cards with images, prices, ratings

### 4. Product Details
- Click on any product
- ✅ Should show full product details
- ✅ Should have "Add to Cart" and "Add to Wishlist" buttons
- ✅ Should display AR compatible indicator if available

### 5. Shopping Cart
- Add items from products page
- ✅ Cart should show all added items
- ✅ Should show quantity and price
- ✅ Should show total price
- ✅ Should have "Checkout" button

### 6. Wishlist
- Add items to wishlist from product details
- ✅ Should display wishlist items
- ✅ Should allow removing from wishlist
- ✅ Should allow adding to cart from wishlist

### 7. Checkout & Orders
- ✅ Should show order summary
- ✅ Should have place order button
- ✅ Should show order confirmation
- ✅ Should list orders in orders page

### 8. Search & Filters
- ✅ Should search products by name
- ✅ Should filter by category
- ✅ Should sort by price/rating

---

## Backend API Testing

### Health Check
```bash
curl http://localhost:8000/health
```

Response:
```json
{
  "status": "healthy",
  "service": "arcart-ai-backend",
  "database": "connected"
}
```

### Get All Products
```bash
curl http://localhost:8000/api/products/
```

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer1@arcart.ai",
    "password": "customer123"
  }'
```

### Add to Cart
```bash
curl -X POST http://localhost:8000/api/cart/ \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 1,
    "quantity": 1
  }'
```

---

## Demo Credentials

Use these to test login functionality:

| Email | Password | Role |
|-------|----------|------|
| customer1@arcart.ai | customer123 | Customer |
| seller@arcart.ai | seller123 | Seller |
| admin@arcart.ai | admin123 | Admin |

In mock mode, **any email and password combination works**.

---

## Troubleshooting

### Frontend won't start

**Error:** "npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded"

**Solution:** Use bundled Node.js instead:
```cmd
cd c:\website\ARCart-AI\frontend
c:\website\ARCart-AI\nodejs\node-v20.11.0-win-x64\npm.cmd run dev
```

Or use cmd.exe instead of PowerShell:
```cmd
cd c:\website\ARCart-AI\frontend
npm run dev
```

### Backend won't start

**Error:** "Connection refused on port 8000"

**Solution:**
1. Make sure Python is installed
2. Try running with explicit Python path:
   ```cmd
   c:\website\ARCart-AI\backend\venv\Scripts\python.exe run_simple.py
   ```
3. Check if port 8000 is already in use:
   ```cmd
   netstat -ano | findstr :8000
   ```

### Port already in use

**Error:** "Address already in use: ('127.0.0.1', 8000)"

**Solution:**
1. Kill the process using the port:
   ```cmd
   taskkill /PID <process_id> /F
   ```
2. Or edit `run_simple.py` and change port 8000 to a different port

### Frontend shows blank page

**Possible causes:**
1. Backend not running - check Terminal 1
2. Network error - check browser console (F12)
3. Vite not properly compiled - restart with `npm run dev`

**Solution:**
1. Check browser console for errors (F12)
2. Check network tab to see if API calls are working
3. Verify backend is running on http://localhost:8000

### Can't login

**In mock mode, any credentials work**, so:
1. Try any email and password
2. Check browser console for errors
3. Verify backend is returning login response

---

## Performance Tips

1. **Frontend:** Dev server hot-reloads on file save
2. **Backend:** Mock server responds instantly
3. **Network:** Both run locally, so no internet latency

---

## Next Steps After Testing

### If all tests pass:
1. ✅ Basic flow works
2. ✅ UI is responsive
3. ✅ Mock API is functional
4. 👉 Ready for Phase 2: Full backend implementation

### For full backend setup:
See `SETUP_BACKEND.md` for detailed FastAPI setup instructions

### For database setup:
See `database/README.md` for SQLite setup and seeding

---

## Common Commands

```powershell
# Start backend
python run_simple.py

# Start frontend
npm run dev

# Build frontend (production)
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Kill process on port
taskkill /PID <id> /F

# Check if port is in use
netstat -ano | findstr :<port>
```

---

## Project URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs (when using full FastAPI backend)
- **Health Check:** http://localhost:8000/health

---

## Support

If you encounter issues:

1. Check the browser console (F12) for client-side errors
2. Check the backend terminal for server-side errors
3. Verify both processes are running
4. Check the AUDIT_REPORT.md for known issues
5. Review the project README.md for detailed documentation

---

**Version:** 1.0  
**Last Updated:** August 11, 2026  
**Status:** Ready for testing
