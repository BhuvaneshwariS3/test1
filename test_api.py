#!/usr/bin/env python3
"""
Test ARCart AI Backend API Endpoints
This script tests all the backend API endpoints to ensure they're working correctly
"""

import json
import sys
from urllib import request, error
from urllib.parse import urlencode

class APITester:
    def __init__(self, base_url="http://localhost:8000"):
        self.base_url = base_url
        self.tests_passed = 0
        self.tests_failed = 0
    
    def test_endpoint(self, path, method="GET", data=None, expected_keys=None):
        """Test a single API endpoint"""
        try:
            url = f"{self.base_url}{path}"
            
            if method == "GET" and data:
                url += "?" + urlencode(data)
            
            req = request.Request(url, method=method)
            req.add_header('Content-Type', 'application/json')
            
            if method in ["POST", "PUT"] and data:
                req.data = json.dumps(data).encode('utf-8')
            
            with request.urlopen(req) as response:
                result = json.loads(response.read().decode())
                
                # Check if expected keys are present
                if expected_keys:
                    missing_keys = [k for k in expected_keys if k not in result]
                    if missing_keys:
                        print(f"  ⚠️  Missing keys: {missing_keys}")
                        self.tests_failed += 1
                        return False
                
                print(f"  ✅ {method} {path}")
                self.tests_passed += 1
                return True
                
        except error.HTTPError as e:
            print(f"  ❌ {method} {path} - HTTP Error {e.code}")
            self.tests_failed += 1
            return False
        except error.URLError as e:
            print(f"  ❌ {method} {path} - Connection Error: {e.reason}")
            self.tests_failed += 1
            return False
        except Exception as e:
            print(f"  ❌ {method} {path} - Error: {str(e)}")
            self.tests_failed += 1
            return False
    
    def run_tests(self):
        """Run all API tests"""
        print("\n" + "="*70)
        print("ARCart AI - Backend API Test Suite")
        print("="*70 + "\n")
        
        # Health check
        print("1. Health & Status Endpoints")
        self.test_endpoint("/health", expected_keys=["status"])
        self.test_endpoint("/ping")
        self.test_endpoint("/info", expected_keys=["name"])
        
        # Products
        print("\n2. Product Endpoints")
        self.test_endpoint("/api/products/", expected_keys=["success", "products"])
        self.test_endpoint("/api/products/featured", expected_keys=["success"])
        self.test_endpoint("/api/products/bestsellers", expected_keys=["success"])
        self.test_endpoint("/api/products/1", expected_keys=["success"])
        
        # Categories
        print("\n3. Category Endpoints")
        self.test_endpoint("/api/categories/", expected_keys=["success", "categories"])
        
        # Authentication
        print("\n4. Authentication Endpoints")
        login_data = {"email": "customer1@arcart.ai", "password": "customer123"}
        self.test_endpoint("/api/auth/login", method="POST", data=login_data, 
                         expected_keys=["success", "access_token"])
        
        register_data = {"email": "newuser@arcart.ai", "password": "password123", "name": "New User"}
        self.test_endpoint("/api/auth/register", method="POST", data=register_data,
                         expected_keys=["success"])
        
        # Cart
        print("\n5. Cart Endpoints")
        self.test_endpoint("/api/cart/", expected_keys=["success"])
        cart_data = {"product_id": 1, "quantity": 1}
        self.test_endpoint("/api/cart/", method="POST", data=cart_data,
                         expected_keys=["success"])
        
        # Wishlist
        print("\n6. Wishlist Endpoints")
        self.test_endpoint("/api/wishlist/", expected_keys=["success"])
        wishlist_data = {"product_id": 1}
        self.test_endpoint("/api/wishlist/", method="POST", data=wishlist_data,
                         expected_keys=["success"])
        
        # Orders
        print("\n7. Order Endpoints")
        self.test_endpoint("/api/orders/", expected_keys=["success"])
        
        # Print summary
        print("\n" + "="*70)
        print(f"Test Results: {self.tests_passed} passed, {self.tests_failed} failed")
        print("="*70 + "\n")
        
        if self.tests_failed == 0:
            print("✅ All tests passed! Backend is working correctly.")
            return True
        else:
            print(f"⚠️  {self.tests_failed} tests failed.")
            return False

if __name__ == "__main__":
    tester = APITester()
    success = tester.run_tests()
    sys.exit(0 if success else 1)
