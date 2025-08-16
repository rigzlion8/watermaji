# Watermaji Frontend Port Configuration & CORS Setup

## Overview
This document explains how to run the Watermaji frontend on different ports and how CORS is configured to work with the backend API.

## Port Configuration

### Available Ports
- **Port 3000**: Default frontend port (recommended for development)
- **Port 3001**: Backend API server (reserved)
- **Port 3002-3005**: Alternative frontend ports

### Running on Different Ports

#### Default Port (3000)
```bash
npm run dev
# or
npm run dev:3000
```

#### Alternative Ports
```bash
npm run dev:3002  # Run on port 3002
npm run dev:3003  # Run on port 3003
npm run dev:3004  # Run on port 3004
npm run dev:3005  # Run on port 3005
```

#### Port Manager Script
```bash
npm run ports        # Shows available ports and usage
./scripts/dev-ports.sh  # Direct script execution
```

## CORS Configuration

### Frontend CORS Headers
The frontend is configured with CORS headers to allow communication with the backend:

- **Access-Control-Allow-Origin**: `http://localhost:3001`
- **Access-Control-Allow-Methods**: `GET, POST, PUT, DELETE, OPTIONS`
- **Access-Control-Allow-Headers**: `Content-Type, Authorization, X-Requested-With`
- **Access-Control-Allow-Credentials**: `true`

### Backend CORS Configuration
The backend is configured to accept requests from all frontend ports (3000-3005):

```typescript
cors: {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001', 
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
    'http://localhost:3005'
  ],
  credentials: true
}
```

## Development Workflow

### 1. Start Backend Server
```bash
cd apps/backend
npm run dev
# Backend will run on port 3001
```

### 2. Start Frontend (Choose Port)
```bash
cd apps/frontend
npm run dev        # Port 3000 (default)
# or
npm run dev:3002   # Port 3002
# or
npm run dev:3003   # Port 3003
```

### 3. Verify Connection
- Backend API: `http://localhost:3001`
- Frontend: `http://localhost:3000` (or chosen port)
- Health check: `http://localhost:3001/health`

## Troubleshooting

### CORS Errors
If you encounter CORS errors:

1. **Check Port Configuration**: Ensure frontend and backend ports match CORS settings
2. **Restart Servers**: Restart both frontend and backend after changing ports
3. **Check Environment Variables**: Verify `.env` file has correct CORS_ORIGINS
4. **Clear Browser Cache**: Clear browser cache and cookies

### Port Already in Use
If a port is already in use:

1. **Find Process**: `lsof -i :3000` (replace 3000 with your port)
2. **Kill Process**: `kill -9 <PID>`
3. **Use Different Port**: Choose another port from the available range

## Environment Variables

### Backend (.env)
```bash
# CORS Origins (comma-separated) - Port range 3000-3005
CORS_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:3002,http://localhost:3003,http://localhost:3004,http://localhost:3005
```

### Frontend
No additional environment variables needed for CORS. The configuration is handled in:
- `next.config.js` - Static headers
- `middleware.ts` - Dynamic middleware

## Security Notes

- CORS is configured for development only
- In production, restrict CORS origins to your actual domain
- Credentials are enabled for authentication
- All HTTP methods are allowed for development flexibility
