#!/bin/bash

# Watermaji Frontend Development Port Manager
# This script helps you run the frontend on different ports

echo "🚰 Watermaji Frontend Development Port Manager"
echo "=============================================="
echo ""
echo "Available ports:"
echo "  3000 - Default frontend port"
echo "  3001 - Backend API port"
echo "  3002 - Alternative frontend port"
echo "  3003 - Alternative frontend port"
echo "  3004 - Alternative frontend port"
echo "  3005 - Alternative frontend port"
echo ""
echo "Usage:"
echo "  npm run dev          # Run on port 3000 (default)"
echo "  npm run dev:3002     # Run on port 3002"
echo "  npm run dev:3003     # Run on port 3003"
echo "  npm run dev:3004     # Run on port 3004"
echo "  npm run dev:3005     # Run on port 3005"
echo ""
echo "Note: Port 3001 is reserved for the backend API server"
echo ""

# Check if a specific port is provided
if [ $# -eq 1 ]; then
    PORT=$1
    echo "Starting frontend on port $PORT..."
    npm run dev:$PORT
else
    echo "Starting frontend on default port 3000..."
    npm run dev
fi
