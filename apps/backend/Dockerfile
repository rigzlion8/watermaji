FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for build)
RUN npm install

# Copy source code (excluding .env file)
COPY . .
RUN rm -f .env
RUN rm -f .env.local
RUN rm -f .env.production

# Build the application
RUN npm run build

# Remove dev dependencies
RUN npm prune --omit=dev

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
