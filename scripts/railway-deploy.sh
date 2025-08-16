#!/bin/bash

# 🚂 Watermaji Railway Deployment Quick-Start Script
# This script helps you prepare for Railway deployment

echo "🚂 Watermaji Railway Deployment Quick-Start"
echo "============================================"
echo ""

# Check if we're in the right directory
if [ ! -f "docker-compose.prod.yml" ]; then
    echo "❌ Error: Please run this script from the Watermaji project root"
    exit 1
fi

echo "✅ Project structure verified"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "⚠️  Warning: Docker is not running"
    echo "   This won't affect Railway deployment, but you can't test locally"
    echo ""
fi

echo "📋 Pre-Deployment Checklist:"
echo "============================="
echo ""

# Check if files exist
echo "🔍 Checking required files..."

if [ -f "apps/backend/Dockerfile" ]; then
    echo "✅ Backend Dockerfile exists"
else
    echo "❌ Backend Dockerfile missing"
fi

if [ -f "apps/frontend/Dockerfile" ]; then
    echo "✅ Frontend Dockerfile exists"
else
    echo "❌ Frontend Dockerfile missing"
fi

if [ -f "apps/backend/package.json" ]; then
    echo "✅ Backend package.json exists"
else
    echo "❌ Backend package.json missing"
fi

if [ -f "apps/frontend/package.json" ]; then
    echo "✅ Frontend package.json exists"
else
    echo "❌ Frontend package.json missing"
fi

echo ""

# Check package.json scripts
echo "🔍 Checking package.json scripts..."

BACKEND_BUILD=$(grep -q '"build"' apps/backend/package.json && echo "✅" || echo "❌")
BACKEND_START=$(grep -q '"start"' apps/backend/package.json && echo "✅" || echo "❌")
FRONTEND_BUILD=$(grep -q '"build"' apps/frontend/package.json && echo "✅" || echo "❌")
FRONTEND_START=$(grep -q '"start"' apps/frontend/package.json && echo "✅" || echo "❌")

echo "$BACKEND_BUILD Backend build script"
echo "$BACKEND_START Backend start script"
echo "$FRONTEND_BUILD Frontend build script"
echo "$FRONTEND_START Frontend start script"

echo ""

# Environment variables template
echo "🔧 Environment Variables Template:"
echo "=================================="
echo ""

echo "Backend Service Variables:"
echo "-------------------------"
echo "# Database (Railway will provide these)"
echo "POSTGRES_HOST=\${POSTGRES_HOST}"
echo "POSTGRES_PORT=\${POSTGRES_PORT}"
echo "POSTGRES_DB=\${POSTGRES_DB}"
echo "POSTGRES_USER=\${POSTGRES_USER}"
echo "POSTGRES_PASSWORD=\${POSTGRES_PASSWORD}"
echo "MONGODB_URI=\${MONGODB_URI}"
echo "REDIS_HOST=\${REDIS_HOST}"
echo "REDIS_PORT=\${REDIS_PORT}"
echo "REDIS_PASSWORD=\${REDIS_PASSWORD}"
echo ""
echo "# App Configuration"
echo "NODE_ENV=production"
echo "PORT=3001"
echo "JWT_SECRET=your-super-secret-jwt-key-change-in-production"
echo "JWT_ACCESS_TOKEN_EXPIRY=15m"
echo "JWT_REFRESH_TOKEN_EXPIRY=7d"
echo ""
echo "# CORS (Update with your Railway domains)"
echo "CORS_ORIGINS=https://your-app.railway.app,https://your-frontend.railway.app"
echo ""
echo "# Frontend URL"
echo "FRONTEND_URL=https://your-frontend.railway.app"
echo ""

echo "Frontend Service Variables:"
echo "--------------------------"
echo "NODE_ENV=production"
echo "NEXT_PUBLIC_API_URL=https://your-backend.railway.app"
echo ""

# Railway setup steps
echo "🚀 Railway Setup Steps:"
echo "======================="
echo ""

echo "1. Go to [railway.app](https://railway.app)"
echo "2. Create new project from GitHub repo"
echo "3. Add services:"
echo "   - PostgreSQL (Database)"
echo "   - MongoDB (Database)"
echo "   - Redis (Database)"
echo "   - Backend (GitHub repo, root: apps/backend)"
echo "   - Frontend (GitHub repo, root: apps/frontend)"
echo "4. Set environment variables (see template above)"
echo "5. Deploy and test"
echo ""

echo "📚 Full Guide:"
echo "==============="
echo "See RAILWAY_DEPLOYMENT.md for complete instructions"
echo ""

echo "🎯 Next Steps:"
echo "==============="
echo "1. Push your code to GitHub"
echo "2. Set up Railway account"
echo "3. Follow the deployment guide"
echo "4. Test your live app"
echo ""

echo "💡 Tips:"
echo "========"
echo "- Railway automatically deploys on git push"
echo "- Use Railway's environment variable references (e.g., \${POSTGRES_HOST})"
echo "- Check build logs if deployment fails"
echo "- Test CORS configuration after deployment"
echo ""

echo "🚂 Your Watermaji app will be live and ready for client demos! 🎉"
