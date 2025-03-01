require('dotenv').config({ path: '.env.local' });
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: console.log
  }
);

async function initializeDatabase() {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('Connection established successfully.');

    // Define Analytics model
    const Analytics = sequelize.define('Analytics', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      visits: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      resumesCreated: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      downloadsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: true
    });

    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database initialized successfully');

    // Create a test record
    await Analytics.create({
      date: new Date(),
      userId: 'test-user',
      visits: 1
    });
    console.log('Test record created');

    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

initializeDatabase(); 