# Watermaji 🚰

A comprehensive water delivery platform with real-time tracking, subscription management, and intelligent rider assignment.

## 🏗️ System Architecture

Watermaji is built with a modern, scalable architecture:

- **Backend**: Node.js with Express, TypeScript, and microservices architecture
- **Frontend**: Next.js admin dashboard with React
- **Mobile**: React Native cross-platform app
- **Database**: PostgreSQL (primary) + MongoDB (logs) + Redis (cache)
- **Real-time**: WebSockets + Server-Sent Events
- **Infrastructure**: Docker + AWS/GCP ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+
- Docker & Docker Compose
- Git

### 1. Clone and Setup

```bash
git clone <repository-url>
cd watermaji
npm install
```

### 2. Start Development Environment

```bash
# Start databases and services
npm run docker:up

# Start backend and frontend in development mode
npm run dev

# Start mobile app (in separate terminal)
npm run dev:mobile
```

### 3. Access Services

- **Backend API**: http://localhost:3001
- **Frontend Dashboard**: http://localhost:3000
- **PostgreSQL**: localhost:5432
- **MongoDB**: localhost:27017
- **Redis**: localhost:6379
- **pgAdmin**: http://localhost:5050

## 📁 Project Structure

```
watermaji/
├── apps/
│   ├── backend/          # Node.js API server
│   ├── frontend/         # Next.js admin dashboard
│   └── mobile/           # React Native mobile app
├── packages/
│   ├── shared/           # Shared utilities and types
│   ├── database/         # Database models and migrations
│   └── notifications/    # Notification service
├── docker-compose.yml    # Development services
└── package.json          # Root workspace configuration
```

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start backend + frontend
npm run dev:backend      # Start backend only
npm run dev:frontend     # Start frontend only
npm run dev:mobile       # Start mobile development server

# Building
npm run build            # Build all applications
npm run build:backend    # Build backend
npm run build:frontend   # Build frontend

# Testing
npm run test             # Run all tests
npm run test:backend     # Test backend
npm run test:frontend    # Test frontend

# Code Quality
npm run lint             # Lint all code
npm run lint:backend     # Lint backend
npm run lint:frontend    # Lint frontend

# Database
npm run db:migrate       # Run database migrations
npm run db:seed          # Seed database with sample data

# Docker
npm run docker:up        # Start development services
npm run docker:down      # Stop development services
npm run docker:logs      # View service logs
```

## 🗄️ Database Setup

The project uses three databases:

1. **PostgreSQL** - Primary relational database for core business logic
2. **MongoDB** - Document store for logs and unstructured data
3. **Redis** - In-memory cache for sessions and real-time data

Database schemas and migrations are located in `apps/backend/db/`.

## 🔐 Environment Configuration

Copy the example environment files and configure your local settings:

```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
cp apps/mobile/.env.example apps/mobile/.env
```

## 📱 Mobile Development

The mobile app is built with React Native and includes:

- Cross-platform compatibility (iOS/Android)
- Native modules for performance-critical features
- Offline-first architecture
- Real-time location tracking
- Push notifications

## 🌐 API Documentation

API documentation is available at `/api/docs` when the backend is running.

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run specific test suites
npm run test:backend:unit
npm run test:backend:integration
npm run test:frontend:unit
npm run test:frontend:e2e
```

## 📊 Monitoring & Analytics

- **Application Performance**: New Relic/Datadog integration
- **Error Tracking**: Sentry integration
- **Business Analytics**: Metabase/Looker integration
- **Infrastructure**: Prometheus + Grafana

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run docker:build
npm run docker:deploy
```

### Environment Variables

Set production environment variables for:
- Database connections
- API keys
- External service URLs
- Security configurations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ by the Watermaji Team**
