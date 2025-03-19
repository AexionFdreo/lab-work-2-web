const { DataTypes } = require('sequelize');
const pgDB = require('./pg');
const mysqlDB = require('./mysql');
const TableModel = {
    pg: pgDB.define('Table', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        number: { type: DataTypes.INTEGER, allowNull: false, unique: true  },
        capacity: { type: DataTypes.INTEGER, allowNull: false}
    }),
    mysql: mysqlDB.define('Table', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        number: { type: DataTypes.INTEGER, allowNull: false, unique: true  },
        capacity: { type: DataTypes.INTEGER, allowNull: false}
    })
};
module.exports = TableModel;