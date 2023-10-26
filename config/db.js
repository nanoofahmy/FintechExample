const path = require('path');
const envFilePath = path.resolve(`./config/.env.${process.env.NODE_ENV}`);
require('dotenv').config({ path: envFilePath });
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  timestamps:true,
  logging: false,
  // timezone: '+02:00',
  dialectOptions: {
    useUTC: false, // for reading from database
  },
  timezone: '+02:00', // for writing to database
  pool: {
    max: 1000,
    min: 0,
    acquire: 1000000,
    idle: 650000
  }
});
module.exports = { sequelize, Sequelize }