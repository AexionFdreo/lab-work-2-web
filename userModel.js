const { DataTypes } = require('sequelize');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const pgDB = require('./pg');
const mysqlDB = require('./mysql');

const UserModel = {
    pg: pgDB.define('User', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, defaultValue: 'user' },
    }),
    mysql: mysqlDB.define('User', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false }, 
        role: { type: DataTypes.STRING, defaultValue: 'user' },
    }),
};

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },

    password: String,
    role: { type: String, default: 'user' }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const MongoUser = mongoose.model('User', userSchema);
module.exports = { UserModel, MongoUser };