import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/api';
import '../styles/profile.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/users/me');
        setProfileData(res.data);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };

    fetchProfile();
  }, []);

  if (!profileData) return <div className="container">Loading...</div>;

  return (
    <div className="container profile-page">
      <h2>👤 Profile</h2>
      <p><strong>Username:</strong> {profileData.user.username}</p>
      <p><strong>Email:</strong> {profileData.user.email}</p>
      <p><strong>Role:</strong> {profileData.user.role}</p>

      <h3 className="blog-section-title">📝 My Blogs</h3>
      {profileData.blogs.length === 0 ? (
        <p>No blogs yet.</p>
      ) : (
        <ul className="blog-list">
          {profileData.blogs.map(blog => (
            <li key={blog._id} className="blog-item">
              <h4>{blog.title}</h4>
              <p>{blog.content.slice(0, 100)}...</p>
              <small>Tags: {blog.tags.join(', ')}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfilePage;
