const Blog = require('../models/Blog');

// @desc Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const blog = await Blog.create({
      title,
      content,
      tags,
      author: req.user._id
    });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Blog creation failed' });
  }
};

// @desc Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username').sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

// @desc Get single blog
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username');
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
};

// @desc Update blog
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.tags = req.body.tags || blog.tags;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update blog' });
  }
};

// ✅ FIXED: Delete blog with debug logs
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error("❌ DELETE ERROR:", err); // Logs actual reason to terminal
    res.status(500).json({ error: 'Failed to delete blog' });
  }
};

// @desc Like/unlike a blog
exports.toggleLike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    const userId = req.user._id;
    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      blog.likes.pull(userId);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();
    res.json({ likes: blog.likes.length });
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle like' });
  }
};
