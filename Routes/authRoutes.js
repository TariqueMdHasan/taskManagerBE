const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser, deleteUser, getUserData } = require('../Controllers/authController.js');
const protect = require('../Middleware/authMiddleware.js')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update', protect, updateUser);
router.delete('/delete', protect,  deleteUser);
router.get('/me', protect, getUserData)

module.exports = router;