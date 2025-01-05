const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser, deleteUser } = require('../Controllers/authController.js');
const protect = require('../Middleware/authMiddleware.js')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update', protect, updateUser);
router.delete('/delete', protect,  deleteUser);

module.exports = router;