@echo off
echo ========================================================
echo   Launching EstateHub MERN Real Estate Platform
echo ========================================================

start "EstateHub Backend API (Port 5000)" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul
start "EstateHub Frontend (Port 5173)" cmd /k "cd frontend && npm run dev"

echo.
echo Servers started successfully!
echo Backend API : http://localhost:5000/api/health
echo Frontend UI : http://localhost:5173
echo ========================================================
pause
