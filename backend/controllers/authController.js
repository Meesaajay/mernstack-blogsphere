const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// @route POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic field check
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create user (password will be hashed via pre-save)
    const user = await User.create({
      username,
      email,
      password, // Will be hashed automatically
      role: 'user' // Ensure role is assigned
    });

    res.status(201).json({
      message: 'User registered successfully',
      token: generateToken(user),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error('Registration error:', err); // <-- log exact issue
    res.status(500).json({ error: 'Registration failed' });
  }
};

// @route POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      token: generateToken(user),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err); // <-- helpful for debugging
    res.status(500).json({ error: 'Login failed' });
  }
};
