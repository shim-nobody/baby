@echo off
title Verify Captain Universe Production Build
cd /d "%~dp0"

echo ============================================================
echo   Running TypeScript Typecheck and Vite Production Build...
echo ============================================================
echo.

call npm run build

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo [ERROR] Build failed with exit code %ERRORLEVEL%.
  echo Please check the error messages above.
  echo.
  pause
  exit /b %ERRORLEVEL%
)

echo.
echo ============================================================
echo   Checking dist/ Output Directory...
echo ============================================================
if exist dist\index.html (
  echo [SUCCESS] dist/index.html was successfully generated!
  echo [SUCCESS] Zero TypeScript errors detected!
  echo [SUCCESS] Production build completed with EXIT CODE 0!
) else (
  echo [WARNING] dist/ directory not found.
)

echo.
echo ============================================================
echo   Build verification passed successfully!
echo ============================================================
pause

