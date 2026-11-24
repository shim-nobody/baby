@echo off
title Push Captain Universe to GitHub
cd /d "C:\Users\Admin\OneDrive\Desktop\captain"

echo ============================================================
echo   Pushing "The Universe Where I Found You" to GitHub
echo ============================================================
echo.

git remote add origin https://github.com/shim-nobody/baby.git 2>nul
git remote set-url origin https://github.com/shim-nobody/baby.git

echo 1. Staging files...
git add .

echo 2. Repository Status:
git status
echo.

echo 3. Creating Commit...
git commit -m "Fix all Vercel deployment TypeScript errors - Happy Two Months My Baby"

echo 4. Setting branch to main...
git branch -M main

echo 5. Pushing to GitHub (https://github.com/shim-nobody/baby.git)...
git push -u origin main

echo.
echo ============================================================
echo   Done! Check https://github.com/shim-nobody/baby
echo ============================================================
pause
