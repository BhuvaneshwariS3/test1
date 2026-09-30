#!/usr/bin/env python3
"""
Test script to verify React frontend setup.
"""

import os
import json
import sys

def check_frontend_structure():
    """Check if frontend directory structure is correct."""
    print("📁 Checking frontend structure...")
    
    required_files = [
        "frontend/package.json",
        "frontend/vite.config.ts",
        "frontend/index.html",
        "frontend/src/App.tsx",
        "frontend/src/main.tsx",
        "frontend/src/services/api.ts",
        "frontend/src/pages/LandingPage.tsx",
        "frontend/src/pages/HomePage.tsx",
        "frontend/src/pages/LoginPage.tsx",
        "frontend/src/pages/RegisterPage.tsx",
        "frontend/src/layouts/MainLayout.tsx",
        "frontend/src/styles/global.css",
        "frontend/tailwind.config.js",
        "frontend/postcss.config.js",
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
    
    print("✅ Frontend structure is correct")
    return True

def check_package_json():
    """Check if package.json has required dependencies."""
    print("\n📦 Checking package.json...")
    
    package_json_path = os.path.join(os.path.dirname(__file__), "frontend", "package.json")
    
    try:
        with open(package_json_path, 'r') as f:
            package_data = json.load(f)
        
        print(f"  ✅ Package name: {package_data.get('name', 'N/A')}")
        print(f"  ✅ Version: {package_data.get('version', 'N/A')}")
        
        # Check required dependencies
        required_deps = ["react", "react-dom", "react-router-dom", "axios"]
        dependencies = package_data.get("dependencies", {})
        
        missing_deps = []
        for dep in required_deps:
            if dep in dependencies:
                print(f"  ✅ Dependency: {dep}")
            else:
                missing_deps.append(dep)
                print(f"  ❌ Dependency missing: {dep}")
        
        # Check dev dependencies
        required_dev_deps = ["@vitejs/plugin-react", "typescript", "tailwindcss", "autoprefixer"]
        dev_dependencies = package_data.get("devDependencies", {})
        
        missing_dev_deps = []
        for dep in required_dev_deps:
            if dep in dev_dependencies:
                print(f"  ✅ Dev dependency: {dep}")
            else:
                missing_dev_deps.append(dep)
                print(f"  ❌ Dev dependency missing: {dep}")
        
        if missing_deps or missing_dev_deps:
            print(f"\n⚠️  Missing dependencies: {', '.join(missing_deps + missing_dev_deps)}")
            print("Install them with: npm install")
            return False
        
        print("✅ Package.json is properly configured")
        return True
        
    except Exception as e:
        print(f"  ❌ Error reading package.json: {e}")
        return False

def check_vite_config():
    """Check if Vite configuration is correct."""
    print("\n⚡ Checking Vite configuration...")
    
    vite_config_path = os.path.join(os.path.dirname(__file__), "frontend", "vite.config.ts")
    
    try:
        with open(vite_config_path, 'r') as f:
            content = f.read()
        
        # Check for required configurations
        required_configs = [
            "port: 5173",
            "host: true",
            "proxy",
            "target: 'http://localhost:8000'",
        ]
        
        missing_configs = []
        for config in required_configs:
            if config in content:
                print(f"  ✅ Config found: {config}")
            else:
                missing_configs.append(config)
                print(f"  ❌ Config missing: {config}")
        
        if missing_configs:
            print(f"\n⚠️  Missing Vite configurations: {', '.join(missing_configs)}")
            return False
        
        print("✅ Vite configuration is correct")
        return True
        
    except Exception as e:
        print(f"  ❌ Error reading Vite config: {e}")
        return False

def check_typescript_config():
    """Check if TypeScript configuration is correct."""
    print("\n📝 Checking TypeScript configuration...")
    
    tsconfig_path = os.path.join(os.path.dirname(__file__), "frontend", "tsconfig.json")
    
    try:
        with open(tsconfig_path, 'r') as f:
            tsconfig_data = json.load(f)
        
        # Check required compiler options
        compiler_options = tsconfig_data.get("compilerOptions", {})
        
        required_options = [
            ("target", "ES2020"),
            ("jsx", "react-jsx"),
            ("strict", True),
        ]
        
        missing_options = []
        for option_name, expected_value in required_options:
            actual_value = compiler_options.get(option_name)
            if actual_value == expected_value:
                print(f"  ✅ Compiler option: {option_name} = {expected_value}")
            else:
                missing_options.append(option_name)
                print(f"  ❌ Compiler option: {option_name} = {actual_value} (expected {expected_value})")
        
        # Check path aliases
        paths = compiler_options.get("paths", {})
        if paths:
            print(f"  ✅ Path aliases configured: {len(paths)} aliases")
        else:
            print(f"  ⚠️  No path aliases configured")
        
        if missing_options:
            print(f"\n⚠️  Missing TypeScript options: {', '.join(missing_options)}")
            return False
        
        print("✅ TypeScript configuration is correct")
        return True
        
    except Exception as e:
        print(f"  ❌ Error reading TypeScript config: {e}")
        return False

def check_tailwind_config():
    """Check if Tailwind CSS configuration is correct."""
    print("\n🎨 Checking Tailwind CSS configuration...")
    
    tailwind_config_path = os.path.join(os.path.dirname(__file__), "frontend", "tailwind.config.js")
    
    try:
        with open(tailwind_config_path, 'r') as f:
            content = f.read()
        
        # Check for required configurations
        required_configs = [
            "content:",
            "theme:",
            "extend:",
            "fontFamily:",
            "colors:",
        ]
        
        missing_configs = []
        for config in required_configs:
            if config in content:
                print(f"  ✅ Config found: {config}")
            else:
                missing_configs.append(config)
                print(f"  ❌ Config missing: {config}")
        
        if missing_configs:
            print(f"\n⚠️  Missing Tailwind configurations: {', '.join(missing_configs)}")
            return False
        
        print("✅ Tailwind CSS configuration is correct")
        return True
        
    except Exception as e:
        print(f"  ❌ Error reading Tailwind config: {e}")
        return False

def check_routes():
    """Check if React routes are defined."""
    print("\n🛣️  Checking React routes...")
    
    app_file_path = os.path.join(os.path.dirname(__file__), "frontend", "src", "App.tsx")
    
    try:
        with open(app_file_path, 'r') as f:
            content = f.read()
        
        # Check for required routes
        required_routes = [
            'path="/"',
            'path="/home"',
            'path="/login"',
            'path="/register"',
            'BrowserRouter',
            'Routes',
            'Route',
        ]
        
        missing_routes = []
        for route in required_routes:
            if route in content:
                print(f"  ✅ Route/Component found: {route}")
            else:
                missing_routes.append(route)
                print(f"  ❌ Route/Component missing: {route}")
        
        if missing_routes:
            print(f"\n⚠️  Missing routes/components: {', '.join(missing_routes)}")
            return False
        
        print("✅ React routes are properly configured")
        return True
        
    except Exception as e:
        print(f"  ❌ Error checking routes: {e}")
        return False

def main():
    """Main test function."""
    print("=" * 60)
    print("ARCart AI - Frontend Test Suite")
    print("=" * 60)
    
    tests_passed = 0
    total_tests = 6
    
    # Run tests
    if check_frontend_structure():
        tests_passed += 1
    
    if check_package_json():
        tests_passed += 1
    
    if check_vite_config():
        tests_passed += 1
    
    if check_typescript_config():
        tests_passed += 1
    
    if check_tailwind_config():
        tests_passed += 1
    
    if check_routes():
        tests_passed += 1
    
    # Print summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    print(f"Tests passed: {tests_passed}/{total_tests}")
    
    if tests_passed == total_tests:
        print("\n🎉 SUCCESS: All frontend tests passed!")
        print("\nTo start the frontend development server:")
        print("  1. cd frontend")
        print("  2. npm install  # First time only")
        print("  3. npm run dev")
        print("\nFrontend will be available at: http://localhost:5173")
        print("Backend proxy: http://localhost:8000")
    elif tests_passed >= total_tests - 1:
        print("\n⚠️  WARNING: Some tests failed but frontend should work")
        print("Check the warnings above and fix any issues")
    else:
        print("\n❌ FAILURE: Multiple tests failed")
        print("Please fix the issues above before running the frontend")
    
    return tests_passed == total_tests

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)