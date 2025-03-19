const express = require("express");
//const axios = require("axios");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const mysqlDB = require("./mysql");
const { rmSync } = require("fs");
const TableModel = require("./tableModel");
const MenuModel = require("./menuModel");
const OrderModel = require("./orderModel");
const { Sequelize } = require("sequelize");
const { sql } = require('@sequelize/core');
const MongoDB = require("./mongo");
const Table = require("./mongoTable");
const authController = require("./authController");
const authMiddleware = require("./authMiddleware");
const adminMiddleware = require("./adminMiddleware");

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});

app.use(bodyParser.json());

const { ObjectId } = require('mongoose').Types;

/*app.put('/users/:id', async (req, res) => {
    let { id } = req.params;
    const { name } = req.body;
    try {
        let mongoId = null;
        if (ObjectId.isValid(id) && id.length === 24) {
            mongoId = new ObjectId(id);
        }
        if (!mongoId) {
            const parsedId = parseInt(id, 10);
            if (!isNaN(parsedId)) {
                await UserModel.pg.update({ name }, { where: { id: parsedId } });
                await UserModel.mysql.update({ name }, { where: { id: parsedId } });
            } else {
                return res.status(400).json({ error: ' Некоректний ID' });
            }
        }
        if (mongoId) {
            await User.findByIdAndUpdate(mongoId, { name });
        }
        res.json({ message: ' Користувач оновлений у всіх базах!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});*/

app.post('/register/', async (req, res) => {authController.register(req, res)})
app.post('/login/', async (req, res) => {authController.login(req, res)})

app.post('/mtables/', authMiddleware, async(req, res) => {
    const { number, capacity } = req.body;
    try{
        await Table.create({number: number, capacity: capacity})
        res.json({message: "done"});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

app.get('/mtables/', authMiddleware, async(req, res) => {
    const { number, capacity } = req.body;
    try{
        const tables = await Table.find(); 
        res.json(tables);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

app.get('/mtables/:id', authMiddleware, async(req, res) => {
    let { id } = req.params;
    const { number, capacity } = req.body;
    try{
        const tables = await Table.findOne({where: {id: id}}); 
        res.json(tables);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

app.get('/tables/', authMiddleware, async(req, res) => {
    try{
        const tables = await TableModel.mysql.findAll();
        res.json(tables);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

app.post('/tables/', authMiddleware, async(req, res) => {
    try {
        const {number, capacity} = req.body;
        TableModel.mysql.create({number: number, capacity: capacity});
        res.json({message: 'added'});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

app.get('/tables/free', authMiddleware, async(req, res) => {
    try{
        const [tables] = await mysqlDB.query('SELECT * FROM tables where id not in (select table_id from orders where state = 0)');
        console.log(tables);
        res.json(tables);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

app.put('/tables/:id', authMiddleware, async(req, res) => {
    let { id } = req.params;
    try {
        const {number, capacity} = req.body;
        TableModel.mysql.update({number: number, capacity: capacity}, {where: {id: id}});
        res.json({message: 'updated'});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

app.get('/tables/:id', authMiddleware, async(req, res) => {
    let { id } = req.params;
    try{
        const tables = await TableModel.mysql.findOne({where: {id: id}});
        res.json(tables);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

app.post('/menu/', authMiddleware, async(req, res) => {
    try {
        const {meal, price, category} = req.body;
        MenuModel.mysql.create({meal: meal, price: price, category: category});
        res.json({message: 'added'});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

app.post('/orders/', authMiddleware, async(req, res) => {
    try {
        const {table_id, menu_id, amount, state} = req.body;
        OrderModel.mysql.create({table_id: table_id, menu_id: menu_id, amount: amount, state: state});
        res.json({message: 'added'});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

app.delete('/tables/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        let { id } = req.params;
        TableModel.mysql.destroy({where: {id: id}});
        res.json({message: 'deleted'});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});