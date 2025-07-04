const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getUserProfile } = require('../controllers/userController');

router.get('/me', protect, getUserProfile);

module.exports = router;
