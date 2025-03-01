import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sequelize = require('../lib/db').default;
const Analytics = require('../models/Analytics').default;

async function initializeDatabase() {
  try {
    // Force sync will drop existing tables and recreate them
    await sequelize.sync({ force: true });
    console.log('Database initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase(); 