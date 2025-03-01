import { Sequelize } from 'sequelize';

const isDevelopment = process.env.NODE_ENV !== 'production';

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: isDevelopment ? 'localhost' : process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
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
    console.log('Database connected to:', isDevelopment ? 'localhost' : process.env.MYSQL_HOST);
    
    // Sync the Analytics model with the database
    await sequelize.sync();
    console.log('Models synchronized with database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

export default sequelize;