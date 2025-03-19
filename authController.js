const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserModel, MongoUser } = require('./userModel');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        //const user = await MongoUser.create({ name, email, password: hashedPassword });
        await UserModel.mysql.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'Користувач створений!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.mysql.findOne({where: {email: email}});
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Невірний email або пароль' });
    }
    
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h' 
    });
    res.json({ token });
};

module.exports = {register, login};