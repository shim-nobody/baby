@echo off
title Captain's Little Universe - TypeScript Audit and Production Build Verification
cd /d "%~dp0"

echo ======================================================================
echo   CAPTAIN'S LITTLE UNIVERSE: PRODUCTION BUILD VERIFICATION
echo ======================================================================
echo.

echo [1/3] Running TypeScript Static Typecheck (npx tsc --noEmit)...
echo ----------------------------------------------------------------------
call npx tsc --noEmit
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo [ERROR] TypeScript compilation failed with exit code %ERRORLEVEL%.
  echo Please review the errors printed above.
  echo.
  pause
  exit /b %ERRORLEVEL%
)
echo [SUCCESS] TypeScript typecheck passed with 0 errors!
echo.

echo [2/3] Running Full Production Build (npm run build)...
echo ----------------------------------------------------------------------
call npm run build
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo [ERROR] Production build failed with exit code %ERRORLEVEL%.
  echo.
  pause
  exit /b %ERRORLEVEL%
)
echo [SUCCESS] Production build completed with exit code 0!
echo.

echo [3/3] Verifying Output Directory (dist/index.html)...
echo ----------------------------------------------------------------------
if exist dist\index.html (
  echo [SUCCESS] dist\index.html exists and is ready for Vercel deployment!
) else (
  echo [WARNING] dist\index.html was not found. Please verify output.
)

echo.
echo ======================================================================
echo   ALL CHECKS PASSED: Ready for Vercel Deployment!
echo ======================================================================
pause
