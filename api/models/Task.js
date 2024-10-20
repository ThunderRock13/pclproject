// /models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    completed: {type: Boolean, required: true}// Date type to store both date and time
});

module.exports = mongoose.model('Task', taskSchema);
