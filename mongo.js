const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {})
.then(() => console.log(' MongoDB підключено'))
.catch(err => console.error(' Помилка MongoDB:', err));

module.exports = mongoose;