#!/bin/bash

# Railway start script for Watermaji Frontend
# This script ensures the app listens on the PORT provided by Railway

# Set default port if not provided
PORT=${PORT:-3000}

echo "🚰 Starting Watermaji Frontend on port $PORT"

# Start Next.js with the correct port
exec npm start -- -p $PORT
