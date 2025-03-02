import { Sequelize } from 'sequelize';

const isDevelopment = process.env.NODE_ENV !== 'production';

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: isDevelopment ? console.log : false,
    pool: {
      max: isDevelopment ? 5 : 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(`Database connected to ${process.env.MYSQL_HOST} (${process.env.NODE_ENV} mode)`);
    
    // Sync the Analytics model with the database
    await sequelize.sync();
    console.log('Models synchronized with database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    // In production, you might want to handle this differently
    if (!isDevelopment) {
      // Implement retry logic or notification system
      console.error('Production database connection failed');
    }
  }
}

testConnection();

export default sequelize; 