import { Router } from 'express';
import { sequelize } from '../db/connection';

const router = Router();

router.get('/', async (req, res) => {
  try {
    // Test database connection
    await sequelize.authenticate();
    
    res.status(200).json({
      status: 'OK',
      service: 'Watermaji Backend',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      database: 'Connected',
      port: process.env.PORT || 3001
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(503).json({
      status: 'ERROR',
      service: 'Watermaji Backend',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      database: 'Disconnected'
    });
  }
});

export default router;
