const { DataTypes } = require('sequelize');
const pgDB = require('./pg');
const mysqlDB = require('./mysql');
const MenuModel = {
    pg: pgDB.define('Menu', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        meal: { type: DataTypes.STRING, allowNull: false, unique: true  },
        price: { type: DataTypes.DECIMAL, allowNull: false},
        category: { type: DataTypes.INTEGER, allowNull: true}
    }),
    mysql: mysqlDB.define('Menu', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        meal: { type: DataTypes.STRING, allowNull: false, unique: true  },
        price: { type: DataTypes.DECIMAL, allowNull: false},
        category: { type: DataTypes.INTEGER, allowNull: true}
    })
};
module.exports = MenuModel;