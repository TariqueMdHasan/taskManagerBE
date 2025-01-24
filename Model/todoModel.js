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
    // description:{
    //     type: String,
    //     required: true
    // },
    description: [
        {
            text: {type: String, required: true},
            isCompleted: {type: Boolean, default: false}
        }
    ],
    priority: {
        type: String,
        enum: ["High", "Low", "Moderate"],
        default: "Low",
        required: true
    },
    
    status: {
        type: String,
        enum: ['todo', 'done', 'inProgress', 'backlog'],
        default: 'done'
    },
    // status: {
    //     type: String,
    //     enum: ['Personal', 'Work', 'Family', 'General'],
    //     default: 'General'
    // },
    toStart: {
        type: Date,
        default: Date.now
    },
    toEnd: {
        type: String,
        required: true
    },
},{timestamps: true})

module.exports = mongoose.model('Todo', todoSchema);