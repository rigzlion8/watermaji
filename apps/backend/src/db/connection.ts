import { Sequelize } from 'sequelize-typescript';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import { config } from '../config';

// PostgreSQL connection
console.log('🔍 Database Config Debug:');
console.log('🔍 Raw Environment Variables:');
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('POSTGRES_HOST:', process.env.POSTGRES_HOST);
console.log('POSTGRES_PORT:', process.env.POSTGRES_PORT);
console.log('POSTGRES_DB:', process.env.POSTGRES_DB);
console.log('🔍 Processed Config:');
console.log('DATABASE_URL:', config.database.postgres.url);
console.log('POSTGRES_HOST:', config.database.postgres.host);
console.log('POSTGRES_PORT:', config.database.postgres.port);

const sequelizeConfig = config.database.postgres.url 
  ? { url: config.database.postgres.url }
  : {
      host: config.database.postgres.host,
      port: config.database.postgres.port,
      database: config.database.postgres.database,
      username: config.database.postgres.username,
      password: config.database.postgres.password,
      dialect: config.database.postgres.dialect,
      logging: config.database.postgres.logging,
      pool: config.database.postgres.pool,
    };

console.log('🔍 Final Sequelize Config:', JSON.stringify(sequelizeConfig, null, 2));

export const sequelize = new Sequelize({
  ...sequelizeConfig,
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
export const redisClient = createClient(
  config.database.redis.url ? { url: config.database.redis.url } : {
    socket: {
      host: config.database.redis.host,
      port: config.database.redis.port
    },
    password: config.database.redis.password,
    database: config.database.redis.db
  }
);

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
