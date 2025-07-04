import React, { useEffect, useState } from 'react';
import API from '../api/api';
import '../styles/blogcard.css';
import { FaHeart, FaRegHeart, FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

const BlogCard = ({ blog, user, onEdit, onDelete, refresh }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog.likes.length);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setLiked(blog.likes.includes(user._id));
    fetchComments();
    // eslint-disable-next-line
  }, []);

  const toggleLike = async () => {
    try {
      const res = await API.post(`/blogs/${blog._id}/like`);
      setLiked(!liked);
      setLikeCount(res.data.likes);
    } catch {
      toast.error('Failed to like');
    }
  };

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${blog._id}`);
      setComments(res.data);
    } catch {
      toast.error('Could not fetch comments');
    }
  };

  const postComment = async () => {
    if (!comment.trim()) return;
    try {
      await API.post(`/comments/${blog._id}`, { content: comment });
      setComment('');
      fetchComments();
    } catch {
      toast.error('Failed to post comment');
    }
  };

  const isOwner = user._id === blog.author._id || user.role === 'admin';

  return (
    <div className="blog-card">
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
      <div className="meta">
        <span>By <strong>{blog.author.username}</strong></span> • <span>{new Date(blog.createdAt).toLocaleString()}</span>
      </div>
      <div className="tags">
        {blog.tags.map((tag, i) => (
          <span key={i} className="tag">#{tag}</span>
        ))}
      </div>

      <div className="blog-actions">
        <button onClick={toggleLike}>
          {liked ? <FaHeart color="red" /> : <FaRegHeart />} {likeCount}
        </button>

        {isOwner && (
          <>
            <button onClick={() => onEdit(blog)}><FaEdit /></button>
            <button onClick={() => onDelete(blog._id)}><FaTrash /></button>
          </>
        )}
      </div>

      <div className="comment-section">
        <h4>Comments</h4>
        <div className="comment-list">
          {comments.map((c) => (
            <p key={c._id}><strong>{c.user.username}:</strong> {c.content}</p>
          ))}
        </div>
        <div className="comment-input">
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={postComment}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
