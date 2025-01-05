const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required']
    },
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ["high", "low", "medium"],
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['todo', 'done', 'inProgress', 'backlog'],
        default: 'done'
    }
},{timestamps: true})

module.exports = mongoose.model('Todo', todoSchema);