import React from 'react';
import '../styles/home.css';

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Premium Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              <span className="highlight">Publish</span> with<br />Professional Precision
            </h1>
            <p className="hero-description">
              The most sophisticated blogging platform for serious creators. 
              Beautiful designs, powerful analytics, and effortless publishing.
            </p>
            <div className="cta-buttons">
              <a href="/register" className="primary-button">
                Start Writing — It's Free
              </a>
              <a href="/dashboard" className="secondary-button">
                <span>See Examples</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 8 16 12 12 16"></polyline>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Professional blogging interface"
              className="hero-image"
            />
          </div>
        </div>
      </header>

      {/* Value Proposition */}
      <section className="value-props">
        <div className="prop-cards">
          <div className="prop-card">
            <div className="prop-icon">✍️</div>
            <h3>Elegant Editor</h3>
            <p>Distraction-free writing with Markdown support and real-time preview</p>
          </div>
          <div className="prop-card">
            <div className="prop-icon">📈</div>
            <h3>Powerful Analytics</h3>
            <p>Understand your audience with detailed engagement metrics</p>
          </div>
          <div className="prop-card">
            <div className="prop-icon">🎨</div>
            <h3>Custom Branding</h3>
            <p>Full control over colors, fonts, and layouts to match your style</p>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="showcase">
        <div className="showcase-content">
          <div className="showcase-text">
            <h2>Designed for Professional Results</h2>
            <p>
              Our platform helps you create content that stands out with beautiful typography, 
              perfect spacing, and responsive designs that work on any device.
            </p>
            <ul className="feature-list">
              <li>SEO-optimized out of the box</li>
              <li>Built-in social sharing</li>
              <li>Newsletter integration</li>
              <li>Custom domain support</li>
            </ul>
          </div>
          <div className="showcase-image">
            <img 
              src="https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80" 
              alt="Blog showcase"
              className="showcase-img"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>BlogSphere</h3>
            <p>The professional publishing platform</p>
          </div>
          <div className="footer-copyright">
            <p>© {new Date().getFullYear()} BlogSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;