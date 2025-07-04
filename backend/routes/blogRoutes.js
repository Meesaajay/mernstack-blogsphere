const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  toggleLike
} = require('../controllers/blogController');

// Public Routes
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// Protected Routes
router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);
router.post('/:id/like', protect, toggleLike);

module.exports = router;
