@echo off
echo Starting CelebNetwork Production Backend...
echo.
echo NOTE: Ensure PostgreSQL is running and configured
echo.
cd /d "%~dp0backend"
echo Installing dependencies...
call npm install
echo.
echo Building the application...
call npm run build
echo.
echo Running database migrations...
call npm run migration:run
echo.
echo Starting the server...
echo Backend will be available at http://localhost:3001
echo API Documentation will be available at http://localhost:3001/api/docs
echo.
echo Production Features:
echo - PostgreSQL database integration
echo - JWT authentication
echo - AI-powered celebrity search
echo - PDF generation
echo - Swagger API documentation
echo - Real-time celebrity discovery
echo.
npm run start:dev
pause
