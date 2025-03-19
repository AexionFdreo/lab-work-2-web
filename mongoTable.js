const mongoose = require('mongoose');
const Counter = require('./counterModel');
const tableSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    number: { type: Number, required: true, unique: true },
    capacity: { type: Number, required: true}
});
tableSchema.pre('save', async function (next) {
    if (!this.id) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'tableId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.id = counter.seq;
    }
    next();
});

const Table = mongoose.model('Table', tableSchema);
module.exports = Table;