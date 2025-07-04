import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { useAuth } from '../context/AuthContext';
import BlogCard from '../components/BlogCard';
import '../styles/dashboard.css';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', tags: '' });
  const [editingId, setEditingId] = useState(null);

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const res = await API.get('/blogs');
      setBlogs(res.data);
    } catch {
      toast.error('Failed to load blogs');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      content: formData.content,
      tags: formData.tags.split(',').map(tag => tag.trim())
    };

    try {
      if (editingId) {
        await API.put(`/blogs/${editingId}`, payload);
        toast.success('Blog updated');
      } else {
        await API.post('/blogs', payload);
        toast.success('Blog created');
      }
      setFormData({ title: '', content: '', tags: '' });
      setEditingId(null);
      fetchBlogs();
    } catch {
      toast.error('Failed to submit blog');
    }
  };

  // Edit blog
  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      content: blog.content,
      tags: blog.tags.join(', ')
    });
    setEditingId(blog._id);
    window.scrollTo(0, 0);
  };

  // Delete blog
  const handleDelete = async (id) => {
    try {
      await API.delete(`/blogs/${id}`);
      toast.success('Blog deleted');
      fetchBlogs();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Hello, {user?.username}</h2>
      </div>

      <form className="blog-form" onSubmit={handleSubmit}>
        <h3>{editingId ? 'Edit Blog' : 'Create New Post'}</h3>
        <input
          type="text"
          placeholder="Blog Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Write your content here..."
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        />
        <button type="submit">{editingId ? 'Update Post' : 'Publish Post'}</button>
      </form>

      <div className="blogs-feed">
        <h3>Your Blog Posts</h3>
        {blogs.map(blog => (
          <BlogCard
            key={blog._id}
            blog={blog}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
            refresh={fetchBlogs}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;