    const User = require('../models/User');
    const Blog = require('../models/Blog');

    // @desc Get user profile with blogs
    exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        const blogs = await Blog.find({ author: req.user._id }).sort({ createdAt: -1 });

        res.json({ user, blogs });
    } catch (err) {
        res.status(500).json({ error: 'Failed to load profile' });
    }
    };
