#!/bin/bash

# Watermaji Development Environment Script
# This script helps you run the development environment with proper CORS configuration

echo "🚰 Watermaji Development Environment Setup"
echo "=========================================="
echo ""

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "❌ Port $1 is already in use"
        return 1
    else
        echo "✅ Port $1 is available"
        return 0
    fi
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Check available ports
echo "🔍 Checking port availability..."
check_port 3000 || echo "   Frontend port 3000 is busy"
check_port 3001 || echo "   Backend port 3001 is busy"
check_port 5432 || echo "   PostgreSQL port 5432 is busy"
check_port 27017 || echo "   MongoDB port 27017 is busy"
check_port 6379 || echo "   Redis port 6379 is busy"
echo ""

# Ask user what they want to do
echo "What would you like to do?"
echo "1) Start all services (Docker)"
echo "2) Start only databases (Docker)"
echo "3) Start backend only (Docker)"
echo "4) Start frontend only (Docker)"
echo "5) Start frontend locally (npm)"
echo "6) Start backend locally (npm)"
echo "7) Stop all Docker services"
echo "8) View service status"
echo ""

read -p "Enter your choice (1-8): " choice

case $choice in
    1)
        echo "🚀 Starting all services with Docker..."
        docker-compose -f docker-compose.dev.yml up -d
        echo ""
        echo "✅ All services started!"
        echo "   Frontend: http://localhost:3000"
        echo "   Backend:  http://localhost:3001"
        echo "   Health:   http://localhost:3001/health"
        ;;
    2)
        echo "🗄️  Starting only databases..."
        docker-compose -f docker-compose.dev.yml up -d postgres mongodb redis
        echo "✅ Databases started!"
        ;;
    3)
        echo "🔧 Starting backend only..."
        docker-compose -f docker-compose.dev.yml up -d backend
        echo "✅ Backend started at http://localhost:3001"
        ;;
    4)
        echo "🎨 Starting frontend only..."
        docker-compose -f docker-compose.dev.yml up -d frontend
        echo "✅ Frontend started at http://localhost:3000"
        ;;
    5)
        echo "🎨 Starting frontend locally..."
        cd apps/frontend
        npm run dev
        ;;
    6)
        echo "🔧 Starting backend locally..."
        cd apps/backend
        npm run dev
        ;;
    7)
        echo "🛑 Stopping all Docker services..."
        docker-compose -f docker-compose.dev.yml down
        echo "✅ All services stopped!"
        ;;
    8)
        echo "📊 Service status:"
        docker-compose -f docker-compose.dev.yml ps
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "💡 Tips:"
echo "   - Use 'docker-compose -f docker-compose.dev.yml logs -f' to view logs"
echo "   - Use 'docker-compose -f docker-compose.dev.yml down' to stop services"
echo "   - CORS is configured for ports 3000-3005"
echo "   - Backend API is available at http://localhost:3001"
