const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

// @desc Add a comment to a blog (blogId in URL)
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    const comment = await Comment.create({
      blog: blogId,
      user: req.user._id,
      content
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error("Add Comment Error:", err.message);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

// @desc Get all comments for a blog
exports.getCommentsByBlog = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// @desc Delete a comment (by owner or admin)
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (
      comment.user.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ error: 'Unauthorized to delete comment' });
    }

    await comment.remove();
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};
