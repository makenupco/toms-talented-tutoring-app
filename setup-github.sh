#!/bin/bash

# Tom's Talented Tutoring - GitHub Setup Script
# This script automates the GitHub setup process

echo "🚀 Tom's Talented Tutoring - GitHub Setup"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   Windows: https://git-scm.com/download/win"
    echo "   Mac: brew install git"
    echo "   Linux: sudo apt-get install git"
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Configure git
echo "📝 Configuring Git..."
read -p "Enter your full name: " git_name
read -p "Enter your email: " git_email

git config --global user.name "$git_name"
git config --global user.email "$git_email"

echo "✅ Git configured"
echo ""

# Initialize repository
echo "📦 Initializing Git repository..."
git init
git add .
git commit -m "Initial commit: Tom's Talented Tutoring app with music creation, AI tools, and live tutoring"

echo "✅ Repository initialized"
echo ""

# Add remote
echo "🔗 Adding GitHub remote..."
read -p "Enter your GitHub username: " github_username
read -p "Enter your repository name (default: toms-talented-tutoring-app): " repo_name
repo_name=${repo_name:-toms-talented-tutoring-app}

git remote add origin "https://github.com/$github_username/$repo_name.git"
git branch -M main

echo "✅ Remote added"
echo ""

# Push to GitHub
echo "📤 Pushing to GitHub..."
echo "Note: You may be prompted to authenticate. Use a Personal Access Token or GitHub CLI."
git push -u origin main

echo ""
echo "✅ Setup complete!"
echo ""
echo "Your repository is now available at:"
echo "https://github.com/$github_username/$repo_name"
echo ""
echo "Next steps:"
echo "1. Visit your GitHub repository"
echo "2. Go to Settings > Secrets and variables > Actions"
echo "3. Add your environment variables:"
echo "   - STRIPE_SECRET_KEY"
echo "   - STRIPE_PUBLISHABLE_KEY"
echo "   - PAYPAL_CLIENT_ID"
echo "   - PAYPAL_SECRET"
echo "4. Enable GitHub Pages for deployment"
echo ""
echo "For detailed instructions, see GITHUB_SETUP_GUIDE.md"
