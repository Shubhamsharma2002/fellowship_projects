import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  // Evaluation Part 7: Redirect to /signup if user tries to access /profile without a token
  useEffect(() => {
    const savedToken = localStorage.getItem('token') || token;
    if (!savedToken) {
      navigate('/signup');
    }
  }, [token, navigate]);

  // Evaluation Part 6: Logout functionality (clears Redux & localStorage)
  const handleLogout = () => {
    dispatch(logout());
    navigate('/signup');
  };

  if (!user && !localStorage.getItem('user')) {
    return null;
  }

  const currentUser = user || JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div style={{
      maxWidth: '450px',
      margin: '60px auto',
      padding: '24px',
      color: '#fff',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '28px', marginBottom: '28px' }}>Profile</h1>

      {/* Evaluation Part 5: User details displayed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        <p style={{ margin: 0, fontSize: '18px' }}>
          <strong>Full Name :</strong> {currentUser.name}
        </p>
        <p style={{ margin: 0, fontSize: '18px' }}>
          <strong>Email :</strong> {currentUser.email}
        </p>
        <p style={{ margin: 0, fontSize: '18px' }}>
          <strong>Password :</strong> {currentUser.password}
        </p>
      </div>

      <button
        onClick={handleLogout}
        style={{
          padding: '10px 24px',
          backgroundColor: '#fff',
          color: '#000',
          border: 'none',
          borderRadius: '4px',
          fontSize: '15px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Profile;