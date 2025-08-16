# 🚂 Watermaji Railway Deployment Guide

## 🎯 **Overview**
This guide will help you deploy your Watermaji app to Railway for client demos. Railway provides a complete platform for hosting full-stack applications with databases.

## 🚀 **Why Railway for Watermaji?**

### **Perfect Match:**
- ✅ **Full-stack hosting** - Frontend + Backend + Databases
- ✅ **Docker support** - Your existing setup works seamlessly
- ✅ **Database hosting** - PostgreSQL, MongoDB, Redis
- ✅ **Environment management** - Secure secrets handling
- ✅ **Custom domains** - Professional URLs for clients
- ✅ **SSL certificates** - Automatic HTTPS
- ✅ **Easy scaling** - Perfect for demos

## 📋 **Prerequisites**

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **Docker Knowledge**: Basic understanding (you already have this!)

## 🗄️ **Step 1: Set Up Railway Project**

### **1.1 Create New Project**
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Choose "Deploy from GitHub repo"
4. Select your Watermaji repository

### **1.2 Add Services**
You'll need these services:
- **PostgreSQL** (Database)
- **MongoDB** (Logs)
- **Redis** (Cache)
- **Backend** (Your Node.js API)
- **Frontend** (Your Next.js app)

## 🐳 **Step 2: Database Setup**

### **2.1 PostgreSQL Service**
1. Click "New Service" → "Database" → "PostgreSQL"
2. Railway will automatically create:
   - `POSTGRES_HOST`
   - `POSTGRES_PORT`
   - `POSTGRES_DB`
   - `POSTGRES_USER`
   - `POSTGRES_PASSWORD`

### **2.2 MongoDB Service**
1. Click "New Service" → "Database" → "MongoDB"
2. Railway will create:
   - `MONGODB_URI`

### **2.3 Redis Service**
1. Click "New Service" → "Database" → "Redis"
2. Railway will create:
   - `REDIS_HOST`
   - `REDIS_PORT`
   - `REDIS_PASSWORD`

## 🔧 **Step 3: Backend Deployment**

### **3.1 Create Backend Service**
1. Click "New Service" → "GitHub Repo"
2. Select your repository
3. Set **Root Directory** to `apps/backend`
4. Set **Build Command** to `npm run build`
5. Set **Start Command** to `npm start`

### **3.2 Environment Variables**
Add these to your backend service:

```bash
# Database
POSTGRES_HOST=${POSTGRES_HOST}
POSTGRES_PORT=${POSTGRES_PORT}
POSTGRES_DB=${POSTGRES_DB}
POSTGRES_USER=${POSTGRES_USER}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
MONGODB_URI=${MONGODB_URI}
REDIS_HOST=${REDIS_HOST}
REDIS_PORT=${REDIS_PORT}
REDIS_PASSWORD=${REDIS_PASSWORD}

# App Configuration
NODE_ENV=production
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_ACCESS_TOKEN_EXPIRY=15m
JWT_REFRESH_TOKEN_EXPIRY=7d

# CORS (Update with your Railway domains)
CORS_ORIGINS=https://your-app.railway.app,https://your-frontend.railway.app

# OAuth (if using Google)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-backend.railway.app/api/auth/google/callback

# Frontend URL
FRONTEND_URL=https://your-frontend.railway.app
```

## 🎨 **Step 4: Frontend Deployment**

### **4.1 Create Frontend Service**
1. Click "New Service" → "GitHub Repo"
2. Select your repository
3. Set **Root Directory** to `apps/frontend`
4. Set **Build Command** to `npm run build`
5. Set **Start Command** to `npm start`

### **4.2 Environment Variables**
Add these to your frontend service:

```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

## 🌐 **Step 5: Custom Domains**

### **5.1 Backend Domain**
1. Go to your backend service
2. Click "Settings" → "Domains"
3. Add custom domain (e.g., `api.yourcompany.com`)
4. Update CORS_ORIGINS with new domain

### **5.2 Frontend Domain**
1. Go to your frontend service
2. Click "Settings" → "Domains"
3. Add custom domain (e.g., `app.yourcompany.com`)
4. Update FRONTEND_URL in backend service

## 🔒 **Step 6: Security & Environment**

### **6.1 Update CORS Origins**
After getting your Railway domains, update the backend CORS_ORIGINS:

```bash
CORS_ORIGINS=https://your-frontend.railway.app,https://your-frontend.railway.app,https://your-custom-domain.com
```

### **6.2 Update OAuth Callbacks**
Update Google OAuth callback URLs:

```bash
GOOGLE_CALLBACK_URL=https://your-backend.railway.app/api/auth/google/callback
FRONTEND_URL=https://your-frontend.railway.app
```

## 🚀 **Step 7: Deploy & Test**

### **7.1 Deploy Services**
1. Railway automatically deploys on git push
2. Monitor deployment logs
3. Check health endpoints:
   - Backend: `https://your-backend.railway.app/health`
   - Frontend: `https://your-frontend.railway.app`

### **7.2 Test the App**
1. **Registration**: Create a new user account
2. **Login**: Test authentication flow
3. **Dashboard**: Verify user data loads
4. **CORS**: Ensure no cross-origin errors

## 📱 **Step 8: Client Demo Setup**

### **8.1 Professional URLs**
- **App**: `https://app.yourcompany.com`
- **API**: `https://api.yourcompany.com`
- **Health**: `https://api.yourcompany.com/health`

### **8.2 Demo Environment**
- **Database**: Fresh, clean data
- **Users**: Pre-created demo accounts
- **Features**: All functionality working

## 🐛 **Troubleshooting**

### **Common Issues:**

#### **CORS Errors**
```bash
# Check CORS_ORIGINS in backend
CORS_ORIGINS=https://your-frontend.railway.app,https://your-custom-domain.com
```

#### **Database Connection**
```bash
# Verify environment variables are set
# Check Railway service logs
# Ensure databases are running
```

#### **Build Failures**
```bash
# Check build logs
# Verify package.json scripts
# Ensure all dependencies are in package.json
```

## 💰 **Costs & Scaling**

### **Free Tier:**
- **$5 credit** monthly
- **Perfect for demos** and small projects

### **Scaling:**
- **Pay-per-use** pricing
- **Easy to scale up** for client demos
- **Automatic scaling** based on traffic

## 🎯 **Next Steps**

1. **Set up Railway account**
2. **Create project and services**
3. **Configure environment variables**
4. **Deploy and test**
5. **Set up custom domains**
6. **Prepare client demo**

## 📞 **Support**

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Community**: [discord.gg/railway](https://discord.gg/railway)
- **GitHub Issues**: Your repository issues

---

**Your Watermaji app will be live and ready for client demos in no time! 🚀**
