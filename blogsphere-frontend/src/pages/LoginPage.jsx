// LoginPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/api';
import { toast } from 'react-toastify';
import '../styles/auth.css';

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      login(res.data);
      toast.success('Login successful');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-illustration">
        <div className="illustration-content">
          <h2>Welcome Back to BlogSphere</h2>
          <p>Share your knowledge with the world through our professional publishing platform designed for modern creators.</p>
        </div>
      </div>
      <div className="auth-form-container">
        <div className="auth-form">
          <div className="auth-header">
            <h1>Sign In</h1>
            <p>Enter your credentials to access your account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="your@email.com"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="••••••••"
                required
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn-primary">Sign In</button>
          </form>
          <div className="auth-footer">
            Don't have an account? <Link to="/register">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;