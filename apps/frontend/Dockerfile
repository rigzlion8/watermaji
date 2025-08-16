FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for build)
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies
RUN npm prune --omit=dev

# Make the start script executable
RUN chmod +x railway-start.sh

# Expose port (Railway will provide PORT env var)
EXPOSE ${PORT:-3000}

# Start the application using our custom script
CMD ["./railway-start.sh"]
