const { Sequelize } = require('sequelize');
require('dotenv').config();
const pgDB = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER,
    process.env.PG_PASSWORD, {
    host: process.env.PG_HOST,
    dialect: 'postgres'
});
module.exports = pgDB;