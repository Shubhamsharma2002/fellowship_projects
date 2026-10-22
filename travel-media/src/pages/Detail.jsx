import  { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, loading } = useSelector((state) => state.posts);
  const [activeTab, setActiveTab] = useState('detail'); // 'detail' | 'userInfo'

  const currentPost = posts.find((p) => p.id === parseInt(id, 10));
  const morePosts = posts.filter((p) => p.id !== parseInt(id, 10)).slice(0, 4);

  if (loading && !currentPost) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading post details...</p>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="main-content">
        <button className="back-link" onClick={() => navigate('/')}>← Go Back</button>
        <p className="error-banner">Post with ID #{id} was not found.</p>
      </div>
    );
  }

  return (
    <div className="main-content">
      <button className="back-link" onClick={() => navigate('/')}>
        &lt; Post Number #{currentPost.id}
      </button>

      {/* Main Single Post View */}
      <div className="detail-hero-box">
        {/* Left Side: Big Image with overlay title */}
        <div className="detail-image-wrapper">
          <img
            src={`https://picsum.photos/600/400?random=${currentPost.id}`}
            alt={currentPost.title}
            className="detail-main-image"
          />
          <div className="detail-image-overlay">
            <span className="overlay-title">{currentPost.title}</span>
            <div className="overlay-icons">
              <span title="Share">↗</span>
              <span title="Like">♡</span>
            </div>
          </div>
        </div>

        {/* Right Side: Tab Buttons + Info */}
        <div className="detail-content-side">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${activeTab === 'detail' ? 'active' : ''}`}
              onClick={() => setActiveTab('detail')}
            >
              Detail
            </button>
            <button
              className={`tab-btn ${activeTab === 'userInfo' ? 'active' : ''}`}
              onClick={() => setActiveTab('userInfo')}
            >
              User Info
            </button>
          </div>

          <div className="tab-body-box">
            {activeTab === 'detail' ? (
              <p className="post-full-body">{currentPost.body}</p>
            ) : (
              <p className="user-info-text">
                Post was posted by <strong>User #{currentPost.userId}</strong>.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* More Posts Section */}
      <h2 className="more-posts-heading">More Posts</h2>
      <div className="more-posts-grid">
        {morePosts.map((post) => (
          <div
            key={post.id}
            className="travel-card mini-card"
            onClick={() => {
              navigate(`/item/${post.id}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="card-image-box">
              <img
                src={`https://picsum.photos/400/260?random=${post.id}`}
                alt={post.title}
                className="card-image"
              />
            </div>
            <div className="card-body">
              <h4 className="card-title">
                {post.title.length > 20 ? `${post.title.slice(0, 20)}...` : post.title}
              </h4>
              <p className="card-desc">{post.body.slice(0, 60)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;