import { DataTypes } from 'sequelize';
import sequelize from '../lib/db';

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

export default Analytics; 