const express = require('express');
const { getTodos, addTodo, updateTodo, deleteTodo } = require('../Controllers/todoController.js');
const protect = require('../Middleware/authMiddleware.js');
const router = express.Router();

router.get('/', protect, getTodos);
router.post('/', protect, addTodo);
router.put('/:id', protect, updateTodo);
router.delete('/:id', protect, deleteTodo);

module.exports = router;
