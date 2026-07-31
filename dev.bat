@echo off
title nirjar.me - Dev Server (live reload)
cd /d "%~dp0"

echo Stopping any previous server on port 8082...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8082 ^| findstr LISTENING') do taskkill /PID %%a /F >nul 2>&1
timeout /t 2 /nobreak >nul

echo.
echo ==============================================
echo  Dev server:  http://localhost:8082
echo  Keep this window open while working.
echo  Every save in any file = instant change.
echo  Close window or press Ctrl+C to stop.
echo ==============================================
echo.
start "" http://localhost:8082

call npm run dev
pause
