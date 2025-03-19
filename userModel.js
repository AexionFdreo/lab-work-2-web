const { DataTypes } = require('sequelize');
const pgDB = require('./pg');
const mysqlDB = require('./mysql');
const UserModel = {
    pg: pgDB.define('User', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true }
    }),
    mysql: mysqlDB.define('User', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true }
    })
};
module.exports = UserModel;