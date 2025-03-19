const { DataTypes } = require('sequelize');
const pgDB = require('./pg');
const mysqlDB = require('./mysql');
const OrderModel = {
    pg: pgDB.define('Order', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        table_id: { type: DataTypes.INTEGER},
        menu_id: { type: DataTypes.INTEGER, allowNull: false},
        amount: { type: DataTypes.INTEGER, allowNull: false},
        state: { type: DataTypes.INTEGER, allowNull: false}
    }),
    mysql: mysqlDB.define('Order', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        table_id: { type: DataTypes.INTEGER},
        menu_id: { type: DataTypes.INTEGER, allowNull: false},
        amount: { type: DataTypes.INTEGER, allowNull: false},
        state: { type: DataTypes.INTEGER, allowNull: false}
    })
};
module.exports = OrderModel;