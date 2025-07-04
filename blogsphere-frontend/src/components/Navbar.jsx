import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const showBack = location.pathname !== '/';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">📝 <span>BlogSphere</span></Link>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>

          {!user ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={logout} className="nav-btn logout">Logout</button></li>
            </>
          )}

          {showBack && (
            <li>
              <button className="nav-btn back-btn" onClick={() => navigate(-1)}>
                ← Back
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
