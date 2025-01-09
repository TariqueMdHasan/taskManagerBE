const express = require('express');
const { getTodos, addTodo, updateTodo, deleteTodo,getStatusCounts, getPriorityCounts } = require('../Controllers/todoController.js');
const protect = require('../Middleware/authMiddleware.js');
const router = express.Router();
const {getTaskCountsByDateToEnd,
    getTaskCountsByYearsToEnd, 
    getTaskCountsByMontsToEnd,
    getTaskCountsByDateToStart,
    getTaskCountsByMonthToStart,
    getTaskCountsByYearToStart} = require('../Controllers/dateController.js')

router.get('/', protect, getTodos);
router.post('/', protect, addTodo);
router.put('/:id', protect, updateTodo);
router.delete('/:id', protect, deleteTodo);


// getting total status of the user
router.get('/status-counts', protect, getStatusCounts);

// getting priority counts of the user
router.get('/priority-counts', protect, getPriorityCounts)

// getting date for toStart
router.get('/task-counts-by-day-to-start', protect, getTaskCountsByDateToStart);
router.get('/task-counts-by-month-to-start', protect, getTaskCountsByMonthToStart);
router.get('/task-counts-by-year-to-start', protect, getTaskCountsByYearToStart);



// getting date for toEnd
router.get('/task-counts-by-day-to-end', protect, getTaskCountsByDateToEnd);
router.get('/task-counts-by-month-to-end', protect, getTaskCountsByMontsToEnd);
router.get('/task-counts-by-year-to-end', protect, getTaskCountsByYearsToEnd);



module.exports = router;
