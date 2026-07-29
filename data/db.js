import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = new Sequelize(
  process.env.DATABASE_URL
);

export default dbConnection;