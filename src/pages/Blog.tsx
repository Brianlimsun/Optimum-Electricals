import React from 'react';
import Navbar from '../components/Navbar';

const Blog: React.FC = () => {
  return (
    <div className="blog-page">
      <Navbar />
      <main className="blog-content">
        <div className="blog-container">
          <h1 className="blog-title">Coming Soon</h1>
          <p className="blog-subtitle">Our blog is under development. Stay tuned for updates!</p>
          
        </div>
      </main>
    </div>
  );
};

export default Blog;
