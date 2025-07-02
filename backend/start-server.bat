@echo off
title CelebNetwork Backend Server

echo ==========================================
echo    CelebNetwork Backend Server Startup
echo ==========================================
echo.

:: Check if we're in the backend directory
if not exist package.json (
    echo [ERROR] package.json not found. Make sure you're in the backend directory.
    echo Current directory: %CD%
    echo Expected: backend directory with package.json
    pause
    exit /b 1
)

:: Check if Node.js is installed
echo [INFO] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: Display Node.js version
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js version: %NODE_VERSION%

:: Check if npm is available
echo [INFO] Checking npm installation...
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed or not in PATH
    pause
    exit /b 1
)

:: Display npm version
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm version: %NPM_VERSION%

:: Check if node_modules exists
if not exist node_modules (
    echo [INFO] node_modules not found. Installing dependencies...
    npm install --legacy-peer-deps
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed successfully
) else (
    echo [OK] Dependencies already installed
)

:: Check if .env file exists
if not exist .env (
    echo [WARNING] .env file not found
    if exist .env.example (
        echo [INFO] Copying .env.example to .env
        copy .env.example .env
        echo [INFO] Please update .env with your actual configuration
    ) else (
        echo [ERROR] No .env.example file found
        echo Please create a .env file with your configuration
        pause
        exit /b 1
    )
)

:: Build the application
echo [INFO] Building the application...
npm run build
if errorlevel 1 (
    echo [WARNING] Build failed, but continuing with development mode...
) else (
    echo [OK] Build successful
)

echo.
echo ==========================================
echo        Starting CelebNetwork Backend
echo ==========================================
echo.
echo Server will start on: http://localhost:3001
echo API endpoints: http://localhost:3001/api
echo Health check: http://localhost:3001/health
echo.
echo Press Ctrl+C to stop the server
echo ==========================================
echo.

:: Start the development server
npm run start:dev
