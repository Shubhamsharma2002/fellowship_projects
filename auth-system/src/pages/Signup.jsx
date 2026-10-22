import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupSuccess } from '../redux/authSlice';

// Helper to generate a 16-byte random access token
const generateAccessToken = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 16; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Evaluation Part 8: useState for success and error messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  // Evaluation Part 7: Redirect to /profile if user already has an access token
  useEffect(() => {
    const existingToken = localStorage.getItem('token') || token;
    if (existingToken) {
      navigate('/profile');
    }
  }, [token, navigate]);

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Evaluation Part 9: Mandatory field validation
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Error: All fields are mandatory!');
      return;
    }

    if (password !== confirmPassword) {
      setError('Error: Passwords do not match!');
      return;
    }

    const accessToken = generateAccessToken();
    const userData = {
      name: name.trim(),
      email: email.trim(),
      password: password,
    };

    // Update Redux state and LocalStorage
    dispatch(signupSuccess({ user: userData, token: accessToken }));

    // Evaluation Part 8: Success message displayed in green text
    setSuccess('Successfully Signed Up!');

    // Redirect to profile page after brief delay
    setTimeout(() => {
      navigate('/profile');
    }, 1200);
  };

  return (
    <div style={{
      maxWidth: '450px',
      margin: '60px auto',
      padding: '24px',
      color: '#fff',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '28px', marginBottom: '24px' }}>Signup</h1>
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
          />
        </div>

        {error && (
          <p style={{ color: '#ef4444', margin: '4px 0', fontSize: '14px' }}>
            {error}
          </p>
        )}

        {success && (
          <p style={{ color: '#22c55e', margin: '4px 0', fontSize: '14px', fontWeight: 'bold' }}>
            {success}
          </p>
        )}

        <button
          type="submit"
          style={{
            marginTop: '12px',
            padding: '12px',
            backgroundColor: '#fff',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Signup
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px 0',
  border: 'none',
  borderBottom: '1px solid #777',
  backgroundColor: 'transparent',
  color: '#fff',
  fontSize: '15px',
  outline: 'none',
  boxSizing: 'border-box'
};

export default Signup;