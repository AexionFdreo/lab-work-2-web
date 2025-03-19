const mongoose = require('mongoose');
const Counter = require('./counterModel');
const userSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});
userSchema.pre('save', async function (next) {
    if (!this.id) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'userId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.id = counter.seq;
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;