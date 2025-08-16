import { Sequelize } from 'sequelize-typescript';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import { config } from '../config';

// PostgreSQL connection
export const sequelize = new Sequelize({
  host: config.database.postgres.host,
  port: config.database.postgres.port,
  database: config.database.postgres.database,
  username: config.database.postgres.username,
  password: config.database.postgres.password,
  dialect: config.database.postgres.dialect,
  logging: config.database.postgres.logging,
  pool: config.database.postgres.pool,
  models: [__dirname + '/../models'], // Path to models
  modelMatch: (filename: string, member: string) => {
    return filename.substring(0, filename.indexOf('.model')).toLowerCase() === member.toLowerCase();
  }
});

// MongoDB connection
export const connectMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.database.mongodb.uri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

// Redis connection
export const redisClient = createClient({
  socket: {
    host: config.database.redis.host,
    port: config.database.redis.port
  },
  password: config.database.redis.password,
  database: config.database.redis.db
});

export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
    console.log('✅ Redis connected successfully');
  } catch (error) {
    console.error('❌ Redis connection error:', error);
    throw error;
  }
};

// Main database connection function
export const connectDatabase = async (): Promise<void> => {
  try {
    // Test PostgreSQL connection
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully');
    
    // Import initialization functions
    const { initializeDatabase, checkDatabaseSchema } = await import('./init');
    
    // Initialize database tables (both development and production)
    await initializeDatabase();
    
    // Check database schema
    await checkDatabaseSchema();
    
    // Connect to MongoDB
    await connectMongoDB();
    
    // Connect to Redis
    await connectRedis();
    
    console.log('🎉 All databases connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

// Graceful shutdown
export const closeDatabaseConnections = async (): Promise<void> => {
  try {
    await sequelize.close();
    await mongoose.connection.close();
    await redisClient.quit();
    console.log('🔌 Database connections closed');
  } catch (error) {
    console.error('❌ Error closing database connections:', error);
  }
};

// Handle process termination
process.on('SIGINT', async () => {
  await closeDatabaseConnections();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeDatabaseConnections();
  process.exit(0);
});
