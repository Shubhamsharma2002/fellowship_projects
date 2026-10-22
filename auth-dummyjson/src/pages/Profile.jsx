import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    // Protect route: Redirect if token or id is missing
    if (!token || !id) {
      navigate('/');
      return;
    }

    // Fetch user details from dummyjson users endpoint
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/users/${id}`);
        if (!res.ok) {
          throw new Error('Failed to retrieve user details.');
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message || 'Error loading profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="page-container">
        <p className="loader">Loading profile details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <p className="error-text">{error}</p>
        <button onClick={handleLogout} className="btn-primary">
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Profile</h1>

      {user && (
        <div className="profile-info">
          <div className="profile-field">
            <strong>Full Name :</strong> {user.firstName} {user.lastName}
          </div>
          <div className="profile-field">
            <strong>Email :</strong> {user.email}
          </div>
          <div className="profile-field">
            <strong>Username :</strong> {user.username}
          </div>
          <div className="profile-field">
            <strong>Gender :</strong> {user.gender}
          </div>
          <div className="profile-field">
            <strong>Phone :</strong> {user.phone}
          </div>
          <div className="profile-field">
            <strong>Age :</strong> {user.age}
          </div>
          <div className="profile-field">
            <strong>Birth Date :</strong> {user.birthDate}
          </div>
          <div className="profile-field">
            <strong>Company :</strong> {user.company?.name || 'N/A'}
          </div>
        </div>
      )}

      <button onClick={handleLogout} className="btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Profile;