const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  addComment,
  getCommentsByBlog,
  deleteComment
} = require('../controllers/commentController');

// POST /api/comments/:blogId — Add comment to blog
router.post('/:blogId', protect, addComment);

// GET /api/comments/:blogId — Get all comments for blog
router.get('/:blogId', getCommentsByBlog);

// DELETE /api/comments/:id — Delete specific comment
router.delete('/:id', protect, deleteComment);

module.exports = router;
