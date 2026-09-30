#!/usr/bin/env python3
"""
ARCart AI - Simple Standalone Backend
Mock server for Phase 1 without complex dependencies
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import hashlib
from urllib.parse import urlparse, parse_qs

class MockARCartHandler(BaseHTTPRequestHandler):
    """Simple HTTP handler that returns mock data"""
    
    def do_GET(self):
        """Handle GET requests"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        query_params = parse_qs(parsed_path.query)
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        
        response_data = {}
        
        if path == '/health':
            response_data = {
                "status": "healthy",
                "service": "arcart-ai-backend",
                "database": "connected"
            }
        elif path == '/ping':
            response_data = {"message": "pong"}
        elif path == '/info':
            response_data = {
                "name": "ARCart AI Backend API",
                "version": "1.0.0",
                "status": "operational"
            }
        elif path == '/api/products/':
            response_data = {
                "success": True,
                "message": "Found 7 products",
                "page": 1,
                "per_page": 20,
                "total": 7,
                "total_pages": 1,
                "products": [
                    {
                        "id": 1,
                        "name": "Modern Fabric 3-Seater Sofa",
                        "price": 29999,
                        "compare_at_price": 34999,
                        "category": "Sofas",
                        "image_url": "/products/sofa-02.jpg",
                        "image_urls": ["/products/sofa-02.jpg", "/products/sofa-03.jpg"],
                        "rating": 4.5,
                        "review_count": 42,
                        "description": "Contemporary 3-seater sofa with premium fabric upholstery and modern design",
                        "material": "Premium Fabric, Solid Wood",
                        "color": "Charcoal Grey",
                        "stock_quantity": 15,
                        "length": 220, "width": 95, "height": 85,
                        "is_featured": True,
                        "ar_compatible": True,
                        "discount_percentage": 14
                    },
                    {
                        "id": 2,
                        "name": "Luxury Leather Corner Sofa",
                        "price": 64999,
                        "compare_at_price": 79999,
                        "category": "Sofas",
                        "image_url": "/products/sofa-03.jpg",
                        "image_urls": ["/products/sofa-03.jpg", "/products/sofa-04.jpg"],
                        "rating": 4.8,
                        "review_count": 28,
                        "description": "Elegant corner sofa with premium leather. Features plush cushions and modern design.",
                        "material": "Italian Leather, Metal Frame",
                        "color": "Dark Brown",
                        "stock_quantity": 8,
                        "length": 280, "width": 180, "height": 90,
                        "is_featured": True,
                        "ar_compatible": True,
                        "discount_percentage": 19
                    },
                    {
                        "id": 3,
                        "name": "Sectional Modular Sofa",
                        "price": 54999,
                        "compare_at_price": 69999,
                        "category": "Sofas",
                        "image_url": "/products/sofa-04.jpg",
                        "image_urls": ["/products/sofa-04.jpg", "/products/sofa-02.jpg"],
                        "rating": 4.6,
                        "review_count": 35,
                        "description": "Modular sofa with customizable sections. Create your perfect seating arrangement.",
                        "material": "Fabric, Foam, Wood",
                        "color": "Beige",
                        "stock_quantity": 5,
                        "length": 350, "width": 200, "height": 85,
                        "is_featured": True,
                        "ar_compatible": True,
                        "discount_percentage": 21
                    },
                    {
                        "id": 4,
                        "name": "Ergonomic Office Chair",
                        "price": 12999,
                        "compare_at_price": 15999,
                        "category": "Chairs",
                        "image_url": "/products/chair-01.jpg",
                        "image_urls": ["/products/chair-01.jpg", "/products/chair-02.jpg"],
                        "rating": 4.7,
                        "review_count": 125,
                        "description": "Professional office chair with full lumbar support, adjustable height, and 360-degree swivel.",
                        "material": "Mesh, Aluminum, Plastic",
                        "color": "Black",
                        "stock_quantity": 30,
                        "length": 65, "width": 65, "height": 120,
                        "is_featured": False,
                        "ar_compatible": False,
                        "discount_percentage": 19
                    },
                    {
                        "id": 5,
                        "name": "Mid-Century Modern Chair",
                        "price": 15999,
                        "compare_at_price": None,
                        "category": "Chairs",
                        "image_url": "/products/chair-02.jpg",
                        "image_urls": ["/products/chair-02.jpg", "/products/chair-01.jpg"],
                        "rating": 4.5,
                        "review_count": 22,
                        "description": "Classic mid-century design with wooden legs and velvet upholstery.",
                        "material": "Velvet, Solid Wood",
                        "color": "Emerald Green",
                        "stock_quantity": 12,
                        "length": 70, "width": 75, "height": 80,
                        "is_featured": True,
                        "ar_compatible": True,
                        "discount_percentage": 0
                    },
                    {
                        "id": 6,
                        "name": "Oak Coffee Table",
                        "price": 22999,
                        "compare_at_price": 27999,
                        "category": "Tables",
                        "image_url": "/products/table-01.jpg",
                        "image_urls": ["/products/table-01.jpg"],
                        "rating": 4.5,
                        "review_count": 45,
                        "description": "Solid oak coffee table with drawer storage. Rustic finish with modern design.",
                        "material": "Solid Oak Wood",
                        "color": "Natural Oak",
                        "stock_quantity": 10,
                        "length": 120, "width": 60, "height": 45,
                        "is_featured": True,
                        "ar_compatible": True,
                        "discount_percentage": 18
                    },
                    {
                        "id": 7,
                        "name": "Platform Bed Frame Queen",
                        "price": 34999,
                        "compare_at_price": 44999,
                        "category": "Beds",
                        "image_url": "/products/bed-01.jpg",
                        "image_urls": ["/products/bed-01.jpg"],
                        "rating": 4.6,
                        "review_count": 28,
                        "description": "Modern platform bed frame with built-in storage drawers. No box spring needed.",
                        "material": "Wood, Metal",
                        "color": "White",
                        "stock_quantity": 5,
                        "length": 210, "width": 165, "height": 40,
                        "is_featured": True,
                        "ar_compatible": True,
                        "discount_percentage": 22
                    }
                ]
            }
        elif path == '/api/products/featured':
            response_data = {
                "success": True,
                "message": "Found 4 featured products",
                "page": 1, "per_page": 10, "total": 4, "total_pages": 1,
                "products": [
                    {"id": 1, "name": "Modern Fabric 3-Seater Sofa", "price": 29999, "compare_at_price": 34999,
                     "category": "Sofas", "image_url": "/products/sofa-02.jpg", "rating": 4.5, "review_count": 42, "discount_percentage": 14},
                    {"id": 3, "name": "Sectional Modular Sofa", "price": 54999, "compare_at_price": 69999,
                     "category": "Sofas", "image_url": "/products/sofa-04.jpg", "rating": 4.6, "review_count": 35, "discount_percentage": 21},
                    {"id": 6, "name": "Oak Coffee Table", "price": 22999, "compare_at_price": 27999,
                     "category": "Tables", "image_url": "/products/table-01.jpg", "rating": 4.5, "review_count": 45, "discount_percentage": 18},
                    {"id": 7, "name": "Platform Bed Frame Queen", "price": 34999, "compare_at_price": 44999,
                     "category": "Beds", "image_url": "/products/bed-01.jpg", "rating": 4.6, "review_count": 28, "discount_percentage": 22}
                ]
            }
        elif path == '/api/products/bestsellers':
            response_data = {
                "success": True,
                "message": "Found 3 bestseller products",
                "page": 1, "per_page": 10, "total": 3, "total_pages": 1,
                "products": [
                    {"id": 1, "name": "Modern Fabric 3-Seater Sofa", "price": 29999, "compare_at_price": 34999,
                     "category": "Sofas", "image_url": "/products/sofa-02.jpg", "rating": 4.5, "review_count": 42, "discount_percentage": 14},
                    {"id": 4, "name": "Ergonomic Office Chair", "price": 12999, "compare_at_price": 15999,
                     "category": "Chairs", "image_url": "/products/chair-01.jpg", "rating": 4.7, "review_count": 125, "discount_percentage": 19},
                    {"id": 6, "name": "Oak Coffee Table", "price": 22999, "compare_at_price": 27999,
                     "category": "Tables", "image_url": "/products/table-01.jpg", "rating": 4.5, "review_count": 45, "discount_percentage": 18}
                ]
            }
        elif path == '/api/products/1':
            response_data = {"success": True, "message": "Product found", "product": {
                "id": 1, "name": "Modern Fabric 3-Seater Sofa", "price": 29999, "compare_at_price": 34999,
                "description": "Contemporary 3-seater sofa with premium fabric upholstery and sturdy wooden frame. Perfect for modern living rooms.",
                "category": "Sofas", "image_url": "/products/sofa-02.jpg",
                "image_urls": ["/products/sofa-02.jpg", "/products/sofa-03.jpg"],
                "rating": 4.5, "review_count": 42, "material": "Premium Fabric, Solid Wood",
                "color": "Charcoal Grey", "stock_quantity": 15, "length": 220, "width": 95, "height": 85,
                "ar_compatible": True, "discount_percentage": 14
            }}
        elif path == '/api/products/2':
            response_data = {"success": True, "message": "Product found", "product": {
                "id": 2, "name": "Luxury Leather Corner Sofa", "price": 64999, "compare_at_price": 79999,
                "description": "Elegant corner sofa with premium leather. Features plush cushions and modern design.",
                "category": "Sofas", "image_url": "/products/sofa-03.jpg",
                "image_urls": ["/products/sofa-03.jpg", "/products/sofa-04.jpg"],
                "rating": 4.8, "review_count": 28, "material": "Italian Leather, Metal Frame",
                "color": "Dark Brown", "stock_quantity": 8, "length": 280, "width": 180, "height": 90,
                "ar_compatible": True, "discount_percentage": 19
            }}
        elif path == '/api/products/3':
            response_data = {"success": True, "message": "Product found", "product": {
                "id": 3, "name": "Sectional Modular Sofa", "price": 54999, "compare_at_price": 69999,
                "description": "Modular sofa with customizable sections. Create your perfect seating arrangement.",
                "category": "Sofas", "image_url": "/products/sofa-04.jpg",
                "image_urls": ["/products/sofa-04.jpg", "/products/sofa-02.jpg"],
                "rating": 4.6, "review_count": 35, "material": "Fabric, Foam, Wood",
                "color": "Beige", "stock_quantity": 5, "length": 350, "width": 200, "height": 85,
                "ar_compatible": True, "discount_percentage": 21
            }}
        elif path == '/api/products/4':
            response_data = {"success": True, "message": "Product found", "product": {
                "id": 4, "name": "Ergonomic Office Chair", "price": 12999, "compare_at_price": 15999,
                "description": "Professional office chair with full lumbar support, adjustable height, and 360-degree swivel.",
                "category": "Chairs", "image_url": "/products/chair-01.jpg",
                "image_urls": ["/products/chair-01.jpg", "/products/chair-02.jpg"],
                "rating": 4.7, "review_count": 125, "material": "Mesh, Aluminum, Plastic",
                "color": "Black", "stock_quantity": 30, "length": 65, "width": 65, "height": 120,
                "ar_compatible": False, "discount_percentage": 19
            }}
        elif path == '/api/products/5':
            response_data = {"success": True, "message": "Product found", "product": {
                "id": 5, "name": "Mid-Century Modern Chair", "price": 15999, "compare_at_price": None,
                "description": "Classic mid-century design with wooden legs and velvet upholstery.",
                "category": "Chairs", "image_url": "/products/chair-02.jpg",
                "image_urls": ["/products/chair-02.jpg", "/products/chair-01.jpg"],
                "rating": 4.5, "review_count": 22, "material": "Velvet, Solid Wood",
                "color": "Emerald Green", "stock_quantity": 12, "length": 70, "width": 75, "height": 80,
                "ar_compatible": True, "discount_percentage": 0
            }}
        elif path == '/api/products/6':
            response_data = {"success": True, "message": "Product found", "product": {
                "id": 6, "name": "Oak Coffee Table", "price": 22999, "compare_at_price": 27999,
                "description": "Solid oak coffee table with drawer storage. Rustic finish with modern design.",
                "category": "Tables", "image_url": "/products/table-01.jpg",
                "image_urls": ["/products/table-01.jpg"],
                "rating": 4.5, "review_count": 45, "material": "Solid Oak Wood",
                "color": "Natural Oak", "stock_quantity": 10, "length": 120, "width": 60, "height": 45,
                "ar_compatible": True, "discount_percentage": 18
            }}
        elif path == '/api/products/7':
            response_data = {"success": True, "message": "Product found", "product": {
                "id": 7, "name": "Platform Bed Frame Queen", "price": 34999, "compare_at_price": 44999,
                "description": "Modern platform bed frame with built-in storage drawers. No box spring needed.",
                "category": "Beds", "image_url": "/products/bed-01.jpg",
                "image_urls": ["/products/bed-01.jpg"],
                "rating": 4.6, "review_count": 28, "material": "Wood, Metal",
                "color": "White", "stock_quantity": 5, "length": 210, "width": 165, "height": 40,
                "ar_compatible": True, "discount_percentage": 22
            }}
        elif path == '/api/products/search/suggestions':
            response_data = {"success": True, "query": query_params.get('q', [''])[0], "suggestions": []}
        elif path == '/api/categories/':
            response_data = {
                "success": True,
                "message": "Found 8 categories",
                "categories": [
                    {"id": 1, "name": "Sofas", "product_count": 8},
                    {"id": 2, "name": "Chairs", "product_count": 10},
                    {"id": 3, "name": "Tables", "product_count": 7},
                    {"id": 4, "name": "Beds", "product_count": 6},
                    {"id": 5, "name": "Office Furniture", "product_count": 8},
                    {"id": 6, "name": "Lamps", "product_count": 6},
                    {"id": 7, "name": "Home Decor", "product_count": 10},
                    {"id": 8, "name": "Wardrobes", "product_count": 5}
                ]
            }
        elif path == '/api/auth/login' and self.command == 'POST':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode() if content_length > 0 else '{}'
            try:
                data = json.loads(body)
                email = data.get('email', '')
                token_hash = hashlib.md5(email.encode()).hexdigest()[:16]
                response_data = {
                    "success": True,
                    "access_token": f"demo_token_{token_hash}",
                    "user": {
                        "id": 1,
                        "email": email,
                        "username": "customer1",
                        "full_name": "Demo Customer",
                        "role": "customer"
                    }
                }
            except:
                response_data = {"error": "Invalid JSON"}
        elif path == '/api/auth/register' and self.command == 'POST':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode() if content_length > 0 else '{}'
            try:
                data = json.loads(body)
                email = data.get('email', '')
                response_data = {
                    "success": True,
                    "message": "User registered successfully",
                    "user": {
                        "id": 2,
                        "email": email,
                        "username": email.split('@')[0],
                        "full_name": data.get('name', 'New User'),
                        "role": "customer"
                    }
                }
            except:
                response_data = {"error": "Invalid JSON"}
        elif path == '/api/auth/login' and self.command == 'POST':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode() if content_length > 0 else '{}'
            try:
                data = json.loads(body)
                email = data.get('email', '')
                token_hash = hashlib.md5(email.encode()).hexdigest()[:16]
                response_data = {
                    "success": True,
                    "access_token": f"demo_token_{token_hash}",
                    "user": {
                        "id": 1,
                        "email": email,
                        "username": "customer1",
                        "full_name": "Demo Customer",
                        "role": "customer"
                    }
                }
            except:
                response_data = {"error": "Invalid JSON"}
        elif path == '/api/auth/register' and self.command == 'POST':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode() if content_length > 0 else '{}'
            try:
                data = json.loads(body)
                email = data.get('email', '')
                response_data = {
                    "success": True,
                    "message": "User registered successfully",
                    "user": {
                        "id": 2,
                        "email": email,
                        "username": email.split('@')[0],
                        "full_name": data.get('name', 'New User'),
                        "role": "customer"
                    }
                }
            except:
                response_data = {"error": "Invalid JSON"}
        elif path == '/api/cart/':
            response_data = {
                "success": True,
                "data": {"items": [], "subtotal": 0, "total": 0}
            }
        elif path == '/api/wishlist/':
            response_data = {
                "success": True,
                "data": {"items": [], "count": 0}
            }
        elif path == '/api/orders/':
            response_data = {
                "success": True,
                "page": 1,
                "per_page": 20,
                "total": 0,
                "total_pages": 1,
                "data": {"orders": []}
            }
        elif path == '/api/sellers/products':
            response_data = {
                "success": True,
                "data": {"products": [], "total": 0}
            }
        else:
            response_data = {"error": "Not found", "path": path}
        
        self.wfile.write(json.dumps(response_data).encode())
    
    def do_OPTIONS(self):
        """Handle OPTIONS requests for CORS"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
    
    def do_POST(self):
        """Handle POST requests"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode() if content_length > 0 else '{}'
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        response_data = {}
        
        if path == '/api/auth/login':
            try:
                data = json.loads(body)
                email = data.get('email', '')
                token_hash = hashlib.md5(email.encode()).hexdigest()[:16]
                response_data = {
                    "success": True,
                    "access_token": f"demo_token_{token_hash}",
                    "user": {
                        "id": 1,
                        "email": email,
                        "username": "customer1",
                        "full_name": "Demo Customer",
                        "role": "customer"
                    }
                }
            except:
                response_data = {"error": "Invalid JSON"}
        elif path == '/api/auth/register':
            try:
                data = json.loads(body)
                email = data.get('email', '')
                response_data = {
                    "success": True,
                    "message": "User registered successfully",
                    "user": {
                        "id": 2,
                        "email": email,
                        "username": email.split('@')[0],
                        "full_name": data.get('name', 'New User'),
                        "role": "customer"
                    }
                }
            except:
                response_data = {"error": "Invalid JSON"}
        elif path == '/api/cart/':
            try:
                data = json.loads(body)
                response_data = {
                    "success": True,
                    "message": "Item added to cart",
                    "cart": {"items": [], "subtotal": 0, "total": 0}
                }
            except:
                response_data = {"error": "Invalid JSON"}
        elif path == '/api/wishlist/':
            try:
                data = json.loads(body)
                response_data = {
                    "success": True,
                    "message": "Item added to wishlist"
                }
            except:
                response_data = {"error": "Invalid JSON"}
        elif path == '/api/orders/':
            try:
                data = json.loads(body)
                response_data = {
                    "success": True,
                    "message": "Order created",
                    "order_id": f"ORD-{hashlib.md5(email.encode()).hexdigest()[:8].upper()}"
                }
            except:
                response_data = {"error": "Invalid JSON"}
        else:
            response_data = {"success": True, "message": "Action completed"}
        
        self.wfile.write(json.dumps(response_data).encode())
    
    def log_message(self, format, *args):
        """Suppress log messages"""
        pass

if __name__ == "__main__":
    server_address = ('127.0.0.1', 8000)
    httpd = HTTPServer(server_address, MockARCartHandler)
    
    print("=" * 70)
    print("🚀 ARCart AI - Mock Backend Server")
    print("=" * 70)
    print()
    print("✅ Mock Backend Server running on http://127.0.0.1:8000")
    print()
    print("📊 Available Endpoints:")
    print("  • http://127.0.0.1:8000/health")
    print("  • http://127.0.0.1:8000/ping")
    print("  • http://127.0.0.1:8000/info")
    print("  • http://127.0.0.1:8000/api/products/")
    print("  • http://127.0.0.1:8000/api/products/featured")
    print("  • http://127.0.0.1:8000/api/products/bestsellers")
    print("  • http://127.0.0.1:8000/api/products/1")
    print("  • http://127.0.0.1:8000/api/categories/")
    print("  • http://127.0.0.1:8000/api/auth/login")
    print("  • http://127.0.0.1:8000/api/auth/register")
    print("  • http://127.0.0.1:8000/api/cart/")
    print("  • http://127.0.0.1:8000/api/wishlist/")
    print("  • http://127.0.0.1:8000/api/orders/")
    print()
    print("🔑 Demo Credentials:")
    print("  • Email: customer1@arcart.ai")
    print("  • Password: customer123")
    print()
    print("📱 Frontend Setup (in separate terminal):")
    print("  • cd frontend")
    print("  • npm install  # First time only")
    print("  • npm run dev")
    print("  • Then visit: http://localhost:5173")
    print()
    print("Press Ctrl+C to stop the server")
    print()
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n✅ Server stopped")