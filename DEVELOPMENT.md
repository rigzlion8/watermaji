# Watermaji Development Guide

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Version 9 or higher
- **Docker**: For running databases locally
- **Git**: For version control

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd watermaji
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development services**
   ```bash
   npm run docker:up
   ```

4. **Set up environment variables**
   ```bash
   cp apps/backend/.env.example apps/backend/.env
   cp apps/frontend/.env.example apps/frontend/.env
   cp apps/mobile/.env.example apps/mobile/.env
   ```

5. **Start development servers**
   ```bash
   # Terminal 1: Backend
   npm run dev:backend
   
   # Terminal 2: Frontend
   npm run dev:frontend
   
   # Terminal 3: Mobile (optional)
   npm run dev:mobile
   ```

## 🏗️ Project Structure

```
watermaji/
├── apps/
│   ├── backend/          # Node.js API server
│   │   ├── src/
│   │   │   ├── config/      # Configuration files
│   │   │   ├── controllers/ # Route controllers
│   │   │   ├── middleware/  # Express middleware
│   │   │   ├── models/      # Database models
│   │   │   ├── routes/      # API routes
│   │   │   ├── services/    # Business logic
│   │   │   ├── utils/       # Utility functions
│   │   │   └── types/       # TypeScript types
│   │   └── db/          # Database migrations & seeds
│   ├── frontend/        # Next.js admin dashboard
│   └── mobile/          # React Native mobile app
├── packages/
│   ├── shared/          # Common utilities & types
│   ├── database/        # Database models & migrations
│   └── notifications/   # Notification services
└── docker-compose.yml   # Development services
```

## 🗄️ Database Setup

### PostgreSQL (Primary Database)
- **Port**: 5432
- **Database**: watermaji
- **Username**: watermaji_user
- **Password**: watermaji_password

### MongoDB (Logs & Analytics)
- **Port**: 27017
- **Database**: watermaji_logs

### Redis (Cache & Sessions)
- **Port**: 6379

### Database Management
```bash
# Access pgAdmin (PostgreSQL)
http://localhost:5050
# Email: admin@watermaji.com
# Password: admin_password

# Run migrations
npm run db:migrate

# Seed database
npm run db:seed
```

## 🔧 Development Commands

### Backend Development
```bash
cd apps/backend

# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```

### Frontend Development
```bash
cd apps/frontend

# Development mode
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```

### Mobile Development
```bash
cd apps/mobile

# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## 📱 Mobile Development

### Expo Setup
1. Install Expo CLI globally: `npm install -g @expo/cli`
2. Install Expo Go app on your mobile device
3. Run `npm start` in the mobile directory
4. Scan QR code with Expo Go app

### Platform-Specific Development
- **Android**: Requires Android Studio and Android SDK
- **iOS**: Requires Xcode (macOS only)

## 🧪 Testing

### Backend Testing
```bash
cd apps/backend

# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Frontend Testing
```bash
cd apps/frontend

# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🔍 Code Quality

### Linting
```bash
# Lint all code
npm run lint

# Lint and fix automatically
npm run lint:fix
```

### TypeScript
- All packages use TypeScript
- Strict mode enabled
- Path mapping configured for clean imports

### Code Style
- ESLint configuration for consistent code style
- Prettier for code formatting
- Husky for pre-commit hooks

## 🚀 Deployment

### Production Build
```bash
# Build all applications
npm run build

# Build specific application
npm run build:backend
npm run build:frontend
```

### Docker Deployment
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d
```

## 📊 Monitoring & Debugging

### Backend Logging
- Winston for structured logging
- Log levels: error, warn, info, debug
- Log files stored in `logs/` directory

### Frontend Debugging
- React Developer Tools
- Redux DevTools
- Network tab for API calls

### Mobile Debugging
- Expo DevTools
- React Native Debugger
- Flipper for advanced debugging

## 🔐 Security

### Environment Variables
- Never commit `.env` files
- Use `.env.example` for documentation
- Rotate secrets regularly

### API Security
- JWT authentication
- Rate limiting
- CORS configuration
- Helmet for security headers

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Make changes with tests
3. Run linting and tests
4. Submit pull request
5. Code review and merge

### Commit Convention
```
feat: add user authentication
fix: resolve order status bug
docs: update API documentation
style: format code with prettier
refactor: restructure user service
test: add user controller tests
chore: update dependencies
```

## 🆘 Troubleshooting

### Common Issues

#### Database Connection Failed
```bash
# Check if Docker services are running
npm run docker:logs

# Restart services
npm run docker:down
npm run docker:up
```

#### Port Already in Use
```bash
# Find process using port
lsof -i :3001

# Kill process
kill -9 <PID>
```

#### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Native Documentation](https://reactnative.dev/)
- [Sequelize Documentation](https://sequelize.org/)
- [Socket.io Documentation](https://socket.io/docs/)

## 🎯 Next Steps

1. **Phase 1**: Implement core authentication and user management
2. **Phase 2**: Build order management system
3. **Phase 3**: Implement real-time tracking
4. **Phase 4**: Add subscription management
5. **Phase 5**: Develop mobile app features

---

**Happy Coding! 🚀**
