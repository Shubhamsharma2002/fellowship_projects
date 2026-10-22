import  { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-content">
      <h1 className="page-heading">Social Media For Travellers</h1>

      {/* Search Bar */}
      <div className="search-bar-wrapper">
        <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading state indicator */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Fetching travel stories...</p>
        </div>
      )}

      {/* Error indicator */}
      {error && <div className="error-banner">{error}</div>}

      {/* Posts Cards Grid */}
      {!loading && !error && (
        <div className="cards-grid">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="travel-card"
              onClick={() => navigate(`/item/${post.id}`)}
            >
              <div className="card-image-box">
                <img
                  src={`https://picsum.photos/400/260?random=${post.id}`}
                  alt={post.title}
                  className="card-image"
                  loading="lazy"
                />
              </div>

              <div className="card-body">
                {/* Title sliced to fit */}
                <h3 className="card-title">
                  {post.title.length > 25 ? `${post.title.slice(0, 25)}...` : post.title}
                </h3>

                {/* Description sliced with Read More... */}
                <p className="card-desc">
                  {post.body.slice(0, 95)}...
                  <span className="read-more"> Read More...</span>
                </p>

                <div className="card-footer">
                  <button
                    className="arrow-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/item/${post.id}`);
                    }}
                    title="View details"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;