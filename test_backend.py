#!/usr/bin/env python3
"""
Test script to verify FastAPI backend can run successfully.
"""

import sys
import os
import subprocess
import time

def check_python_dependencies():
    """Check if required Python packages are installed."""
    print("🔍 Checking Python dependencies...")
    
    required_packages = [
        "fastapi",
        "uvicorn",
        "sqlalchemy",
        "python-dotenv",
    ]
    
    missing_packages = []
    for package in required_packages:
        try:
            __import__(package.replace("-", "_"))
            print(f"  ✅ {package}")
        except ImportError:
            missing_packages.append(package)
            print(f"  ❌ {package} (missing)")
    
    if missing_packages:
        print(f"\n⚠️  Missing packages: {', '.join(missing_packages)}")
        print("Install them with: pip install fastapi uvicorn sqlalchemy python-dotenv")
        return False
    
    print("✅ All Python dependencies are installed")
    return True

def check_backend_structure():
    """Check if backend directory structure is correct."""
    print("\n📁 Checking backend structure...")
    
    required_files = [
        "backend/main.py",
        "backend/requirements.txt",
        "backend/database/database.py",
        "backend/models/user.py",
        "backend/models/product.py",
        "backend/models/category.py",
        "backend/api/health.py",
        "backend/api/auth.py",
        "backend/api/users.py",
        "backend/api/products.py",
        "backend/api/categories.py",
    ]
    
    missing_files = []
    for file_path in required_files:
        full_path = os.path.join(os.path.dirname(__file__), file_path)
        if os.path.exists(full_path):
            print(f"  ✅ {file_path}")
        else:
            missing_files.append(file_path)
            print(f"  ❌ {file_path} (missing)")
    
    if missing_files:
        print(f"\n⚠️  Missing files: {', '.join(missing_files)}")
        return False
    
    print("✅ Backend structure is correct")
    return True

def check_environment():
    """Check if environment variables are set up."""
    print("\n🌍 Checking environment...")
    
    env_file = os.path.join(os.path.dirname(__file__), ".env")
    if os.path.exists(env_file):
        print("  ✅ .env file exists")
        
        # Read and check key variables
        with open(env_file, 'r') as f:
            content = f.read()
            
        required_vars = [
            "DATABASE_URL",
            "SECRET_KEY",
            "BACKEND_URL",
            "FRONTEND_URL",
        ]
        
        missing_vars = []
        for var in required_vars:
            if f"{var}=" in content:
                print(f"  ✅ {var}")
            else:
                missing_vars.append(var)
                print(f"  ❌ {var} (missing)")
        
        if missing_vars:
            print(f"\n⚠️  Missing environment variables: {', '.join(missing_vars)}")
            return False
    else:
        print("  ❌ .env file not found")
        print("  Create .env file from .env.example")
        return False
    
    print("✅ Environment is properly configured")
    return True

def test_health_endpoint():
    """Test the health endpoint."""
    print("\n🩺 Testing health endpoint structure...")
    
    try:
        # Check if health endpoint is defined in the API
        sys.path.insert(0, os.path.join(os.path.dirname(__file__), "backend"))
        
        from api.health import router as health_router
        
        # Check health router endpoints
        health_routes = []
        for route in health_router.routes:
            if hasattr(route, 'path'):
                health_routes.append(route.path)
        
        expected_routes = ["/health", "/ping", "/info"]
        found_routes = []
        
        for route in expected_routes:
            if any(route in r for r in health_routes):
                found_routes.append(route)
                print(f"  ✅ Health route found: {route}")
            else:
                print(f"  ❌ Health route missing: {route}")
        
        if len(found_routes) == len(expected_routes):
            print("  ✅ All health endpoints are defined")
            return True
        else:
            print(f"  ⚠️  Only {len(found_routes)}/{len(expected_routes)} health endpoints found")
            return False
            
    except Exception as e:
        print(f"  ❌ Error checking health endpoint: {e}")
        return False

def run_quick_test():
    """Run a quick test of the FastAPI application."""
    print("\n🚀 Running quick FastAPI test...")
    
    try:
        # Import and test the FastAPI app
        sys.path.insert(0, os.path.join(os.path.dirname(__file__), "backend"))
        
        from main import app
        
        print("  ✅ FastAPI app imported successfully")
        print(f"  📝 Title: {app.title}")
        print(f"  📚 Docs URL: {app.docs_url}")
        print(f"  🔗 Redoc URL: {app.redoc_url}")
        
        # Check routes
        routes = [(route.path, route.methods) for route in app.routes]
        print(f"  🛣️  Number of routes: {len(routes)}")
        
        # Check for key routes
        key_routes = [
            "/health",
            "/api/health",
            "/api/auth/login",
            "/api/auth/register",
            "/api/products/",
            "/api/categories/",
        ]
        
        found_routes = []
        for path, methods in routes:
            if path in key_routes:
                found_routes.append(path)
                print(f"  ✅ Route found: {path}")
        
        if len(found_routes) >= len(key_routes) / 2:
            print(f"  ✅ Found {len(found_routes)} key routes")
        else:
            print(f"  ⚠️  Only found {len(found_routes)} key routes")
        
        return True
        
    except Exception as e:
        print(f"  ❌ Error importing FastAPI app: {e}")
        return False

def main():
    """Main test function."""
    print("=" * 60)
    print("ARCart AI - Backend Test Suite")
    print("=" * 60)
    
    tests_passed = 0
    total_tests = 5
    
    # Run tests
    if check_python_dependencies():
        tests_passed += 1
    
    if check_backend_structure():
        tests_passed += 1
    
    if check_environment():
        tests_passed += 1
    
    if test_health_endpoint():
        tests_passed += 1
    
    if run_quick_test():
        tests_passed += 1
    
    # Print summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    print(f"Tests passed: {tests_passed}/{total_tests}")
    
    if tests_passed == total_tests:
        print("\n🎉 SUCCESS: All tests passed!")
        print("\nTo start the backend server:")
        print("  1. cd backend")
        print("  2. uvicorn main:app --reload")
        print("\nAPI will be available at: http://localhost:8000")
        print("Documentation: http://localhost:8000/docs")
    elif tests_passed >= total_tests - 1:
        print("\n⚠️  WARNING: Some tests failed but backend should work")
        print("Check the warnings above and fix any issues")
    else:
        print("\n❌ FAILURE: Multiple tests failed")
        print("Please fix the issues above before running the backend")
    
    return tests_passed == total_tests

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)