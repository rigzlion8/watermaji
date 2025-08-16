import { sequelize } from './connection';
import User from '../models/User';
import Order from '../models/Order';
import Subscription from '../models/Subscription';

export const initializeDatabase = async (): Promise<void> => {
  try {
    console.log('🔄 Initializing database tables...');
    
    // Force sync all models (this will drop and recreate tables - use with caution in production)
    // In a real production environment, you'd want proper migrations instead
    await sequelize.sync({ force: false, alter: true });
    
    console.log('✅ Database tables initialized successfully');
    
    // Verify tables exist
    const tables = await sequelize.showAllSchemas({ logging: false });
    console.log('📊 Available tables:', tables);
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

export const checkDatabaseSchema = async (): Promise<void> => {
  try {
    // Check if User table exists and has the isActive column
    const userTableInfo = await sequelize.getQueryInterface().describeTable('users');
    console.log('📋 User table schema:', Object.keys(userTableInfo));
    
    if (!userTableInfo.isActive) {
      console.log('⚠️ isActive column missing from users table');
    } else {
      console.log('✅ isActive column exists in users table');
    }
    
  } catch (error) {
    console.error('❌ Database schema check failed:', error);
  }
};
