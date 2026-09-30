#!/usr/bin/env pwsh
<#
.SYNOPSIS
ARCart AI Setup Script for Windows

.DESCRIPTION
This script sets up the ARCart AI project with all dependencies and configurations.

.NOTES
Version: 1.0.0
Author: ARCart AI Team
#>

param(
    [switch]$SkipFrontend,
    [switch]$SkipBackend,
    [switch]$SkipDatabase,
    [switch]$Force
)

# Console colors
$ErrorColor = "Red"
$SuccessColor = "Green"
$InfoColor = "Cyan"
$WarningColor = "Yellow"

function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $InfoColor
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor $SuccessColor
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $WarningColor
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $ErrorColor
}

function Test-Command {
    param([string]$Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    } catch {
        return $false
    }
}

function Setup-Environment {
    Write-Info "Setting up environment..."
    
    # Check if .env exists, create from .env.example if not
    if (-not (Test-Path ".env") -or $Force) {
        if (Test-Path ".env.example") {
            Copy-Item ".env.example" ".env" -Force
            Write-Success "Created .env file from .env.example"
        } else {
            Write-Error ".env.example not found"
            return $false
        }
    } else {
        Write-Info ".env file already exists"
    }
    
    return $true
}

function Setup-Frontend {
    Write-Info "Setting up frontend..."
    
    # Check if Node.js is installed
    if (-not (Test-Command "node")) {
        Write-Error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
        return $false
    }
    
    # Check Node.js version
    $nodeVersion = node --version
    Write-Info "Node.js version: $nodeVersion"
    
    if ($nodeVersion -notmatch "^v(1[8-9]|[2-9][0-9])") {
        Write-Warning "Node.js version $nodeVersion detected. Recommended: Node.js 18+"
    }
    
    # Check if npm is installed
    if (-not (Test-Command "npm")) {
        Write-Error "npm is not installed. Please install npm with Node.js"
        return $false
    }
    
    # Install dependencies
    Set-Location "frontend"
    
    if (Test-Path "node_modules" -and -not $Force) {
        Write-Info "node_modules already exists. Skipping npm install..."
    } else {
        Write-Info "Installing frontend dependencies..."
        npm install
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Failed to install frontend dependencies"
            Set-Location ".."
            return $false
        }
    }
    
    Set-Location ".."
    Write-Success "Frontend setup completed"
    return $true
}

function Setup-Backend {
    Write-Info "Setting up backend..."
    
    # Check if Python is installed
    if (-not (Test-Command "python")) {
        Write-Error "Python is not installed. Please install Python 3.9+ from https://python.org/"
        return $false
    }
    
    # Check Python version
    $pythonVersion = python --version 2>&1
    Write-Info "Python version: $pythonVersion"
    
    if ($pythonVersion -notmatch "Python 3\.(9|1[0-9])\.") {
        Write-Warning "Python version $pythonVersion detected. Recommended: Python 3.9+"
    }
    
    # Check if pip is installed
    if (-not (Test-Command "pip")) {
        Write-Error "pip is not installed. Please install pip with Python"
        return $false
    }
    
    # Create virtual environment
    Set-Location "backend"
    
    if (Test-Path "venv" -and -not $Force) {
        Write-Info "Virtual environment already exists"
    } else {
        Write-Info "Creating virtual environment..."
        python -m venv venv
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Failed to create virtual environment"
            Set-Location ".."
            return $false
        }
    }
    
    # Activate virtual environment and install dependencies
    Write-Info "Activating virtual environment..."
    $activateScript = ".\venv\Scripts\Activate.ps1"
    if (Test-Path $activateScript) {
        & $activateScript
    } else {
        Write-Error "Virtual environment activation script not found"
        Set-Location ".."
        return $false
    }
    
    Write-Info "Installing backend dependencies..."
    pip install -r requirements.txt
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to install backend dependencies"
        Set-Location ".."
        return $false
    }
    
    # Deactivate virtual environment
    deactivate
    Set-Location ".."
    
    Write-Success "Backend setup completed"
    return $true
}

function Setup-Database {
    Write-Info "Setting up database..."
    
    # Check if database directory exists
    if (-not (Test-Path "database")) {
        Write-Error "database directory not found"
        return $false
    }
    
    Set-Location "database"
    
    # Check if seed script exists
    if (-not (Test-Path "seed.py")) {
        Write-Error "seed.py not found in database directory"
        Set-Location ".."
        return $false
    }
    
    # Run seed script
    Write-Info "Seeding database with sample data..."
    python seed.py
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to seed database"
        Set-Location ".."
        return $false
    }
    
    Set-Location ".."
    Write-Success "Database setup completed"
    return $true
}

function Show-Summary {
    Write-Host "`n" + "="*60 -ForegroundColor $InfoColor
    Write-Host "ARCart AI - Setup Summary" -ForegroundColor $InfoColor
    Write-Host "="*60 -ForegroundColor $InfoColor
    
    Write-Host "`n✅ SETUP COMPLETED SUCCESSFULLY" -ForegroundColor $SuccessColor
    
    Write-Host "`n📊 Setup Results:" -ForegroundColor $InfoColor
    Write-Host "  • Environment: $($envSetup ? '✅' : '❌')"
    if (-not $SkipFrontend) {
        Write-Host "  • Frontend: $($frontendSetup ? '✅' : '❌')"
    }
    if (-not $SkipBackend) {
        Write-Host "  • Backend: $($backendSetup ? '✅' : '❌')"
    }
    if (-not $SkipDatabase) {
        Write-Host "  • Database: $($databaseSetup ? '✅' : '❌')"
    }
    
    Write-Host "`n🚀 Next Steps:" -ForegroundColor $InfoColor
    Write-Host "  1. Start backend: cd backend; uvicorn main:app --reload"
    Write-Host "  2. Start frontend: cd frontend; npm run dev"
    Write-Host "  3. Open browser: http://localhost:5173"
    
    Write-Host "`n🔑 Demo Credentials:" -ForegroundColor $InfoColor
    Write-Host "  • Admin: admin@arcart.ai / admin123"
    Write-Host "  • Seller: seller@arcart.ai / seller123"
    Write-Host "  • Customer: customer@arcart.ai / customer123"
    Write-Host "  • Demo: demo@arcart.ai / demo123"
    
    Write-Host "`n🌐 Application URLs:" -ForegroundColor $InfoColor
    Write-Host "  • Frontend: http://localhost:5173"
    Write-Host "  • Backend API: http://localhost:8000"
    Write-Host "  • API Docs: http://localhost:8000/docs"
    
    Write-Host "`n📚 Documentation:" -ForegroundColor $InfoColor
    Write-Host "  • README.md - Complete project documentation"
    Write-Host "  • QUICKSTART.md - Quick start guide"
    Write-Host "  • backend/README.md - Backend documentation"
    Write-Host "  • database/README.md - Database documentation"
    
    Write-Host "`n" + "="*60 -ForegroundColor $InfoColor
    Write-Host "Happy coding! 🚀" -ForegroundColor $SuccessColor
    Write-Host "="*60 -ForegroundColor $InfoColor
}

# Main script execution
Write-Host "`n" + "="*60 -ForegroundColor $InfoColor
Write-Host "ARCart AI - Windows Setup Script" -ForegroundColor $InfoColor
Write-Host "Version 1.0.0" -ForegroundColor $InfoColor
Write-Host "="*60 -ForegroundColor $InfoColor

# Store original location
$originalLocation = Get-Location

try {
    # Run setup steps
    $envSetup = Setup-Environment
    
    if (-not $SkipFrontend) {
        $frontendSetup = Setup-Frontend
    } else {
        Write-Info "Skipping frontend setup"
        $frontendSetup = $true
    }
    
    if (-not $SkipBackend) {
        $backendSetup = Setup-Backend
    } else {
        Write-Info "Skipping backend setup"
        $backendSetup = $true
    }
    
    if (-not $SkipDatabase) {
        $databaseSetup = Setup-Database
    } else {
        Write-Info "Skipping database setup"
        $databaseSetup = $true
    }
    
    # Show summary
    Show-Summary
    
} catch {
    Write-Error "Setup failed: $_"
    Write-Host "`nFor manual setup instructions, see QUICKSTART.md" -ForegroundColor $WarningColor
    exit 1
} finally {
    # Return to original location
    Set-Location $originalLocation
}