#!/bin/bash

# Script to run backend with Railway environment variables
echo "🚀 Starting Watermaji Backend with Railway configuration..."

export NODE_ENV=production
export DATABASE_URL="postgresql://postgres:AmxMusfbUShLtUlzrebSKOyqBQHniyud@trolley.proxy.rlwy.net:48632/railway"
export MONGODB_URI="mongodb+srv://rigzadmin:2794HSZxT6VTZZe@cluster0.9em0pjh.mongodb.net/watermaji_logs?retryWrites=true&w=majority&appName=Cluster0"
export REDIS_URL="redis://default:rJgjhjeuzobGsAadDFCxAhwFYTSQGvqQ@interchange.proxy.rlwy.net:33730"
export CORS_ORIGINS="http://localhost:3000,http://localhost:3001,http://localhost:3002,http://localhost:3003,http://localhost:3004,http://localhost:3005"
export JWT_SECRET="746971f560a53d639db8b3985b2bb295"
export JWT_ACCESS_TOKEN_EXPIRY="15m"
export JWT_REFRESH_TOKEN_EXPIRY="7d"
export FRONTEND_URL="https://watermajifrontend-production.up.railway.app"

echo "✅ Environment variables set for Railway"
echo "🔍 DATABASE_URL: $DATABASE_URL"
echo "🔍 REDIS_URL: $REDIS_URL"

# Start the backend
cd apps/backend
npm run dev
