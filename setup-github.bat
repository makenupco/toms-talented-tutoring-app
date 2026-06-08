@echo off
REM Tom's Talented Tutoring - GitHub Setup Script (Windows)
REM This script automates the GitHub setup process

echo.
echo 🚀 Tom's Talented Tutoring - GitHub Setup
echo ==========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed. Please install Git first:
    echo    https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✅ Git is installed
echo.

REM Configure git
echo 📝 Configuring Git...
set /p git_name="Enter your full name: "
set /p git_email="Enter your email: "

git config --global user.name "%git_name%"
git config --global user.email "%git_email%"

echo ✅ Git configured
echo.

REM Initialize repository
echo 📦 Initializing Git repository...
git init
git add .
git commit -m "Initial commit: Tom's Talented Tutoring app with music creation, AI tools, and live tutoring"

echo ✅ Repository initialized
echo.

REM Add remote
echo 🔗 Adding GitHub remote...
set /p github_username="Enter your GitHub username: "
set /p repo_name="Enter your repository name (default: toms-talented-tutoring-app): "

if "%repo_name%"=="" set repo_name=toms-talented-tutoring-app

git remote add origin "https://github.com/%github_username%/%repo_name%.git"
git branch -M main

echo ✅ Remote added
echo.

REM Push to GitHub
echo 📤 Pushing to GitHub...
echo Note: You may be prompted to authenticate. Use a Personal Access Token or GitHub CLI.
git push -u origin main

echo.
echo ✅ Setup complete!
echo.
echo Your repository is now available at:
echo https://github.com/%github_username%/%repo_name%
echo.
echo Next steps:
echo 1. Visit your GitHub repository
echo 2. Go to Settings ^> Secrets and variables ^> Actions
echo 3. Add your environment variables:
echo    - STRIPE_SECRET_KEY
echo    - STRIPE_PUBLISHABLE_KEY
echo    - PAYPAL_CLIENT_ID
echo    - PAYPAL_SECRET
echo 4. Enable GitHub Pages for deployment
echo.
echo For detailed instructions, see GITHUB_SETUP_GUIDE.md
echo.
pause
