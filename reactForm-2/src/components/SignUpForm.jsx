import { useState } from 'react';

const SignUpForm = () => {
  // Input values state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Validation / Error message states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Track validity for email border styling (null = untouched, true = valid, false = invalid)
  const [isEmailValid, setIsEmailValid] = useState(null);

  // Email format regex validation
  const validateEmailFormat = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  // Real-time Email Change Handler
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);

    if (!val.trim()) {
      setEmailError('Email cannot be empty');
      setIsEmailValid(false);
    } else if (!validateEmailFormat(val)) {
      setEmailError('Invalid email address');
      setIsEmailValid(false);
    } else {
      setEmailError('');
      setIsEmailValid(true);
    }
  };

  // Real-time Password Change Handler
  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);

    if (val.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else {
      setPasswordError('');
    }

    // Re-check confirm password consistency if user edits password
    if (confirmPassword && val !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else if (confirmPassword && val === confirmPassword) {
      setConfirmPasswordError('');
    }
  };

  // Real-time Confirm Password Change Handler
  const handleConfirmPasswordChange = (e) => {
    const val = e.target.value;
    setConfirmPassword(val);

    if (val !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  // Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check all criteria before submission
    const isEmailOk = validateEmailFormat(email);
    const isPasswordOk = password.length >= 8;
    const isConfirmPasswordOk = confirmPassword === password && confirmPassword.length > 0;

    if (isEmailOk && isPasswordOk && isConfirmPasswordOk) {
      alert('Form submitted successfully');
    } else {
      alert("Can't submit the form");
    }
  };

  // Dynamic class for email border color
  const getEmailBorderClass = () => {
    if (isEmailValid === true) return 'input-valid';
    if (isEmailValid === false) return 'input-invalid';
    return '';
  };

  return (
    <div className="signup-card">
      <h2 className="form-title">Create Account</h2>
      <form onSubmit={handleSubmit} noValidate className="form-content">
        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className={`form-input ${getEmailBorderClass()}`}
          />
          {emailError && <p className="error-text">{emailError}</p>}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Minimum 8 characters"
            value={password}
            onChange={handlePasswordChange}
            className={`form-input ${passwordError ? 'input-invalid' : ''}`}
          />
          {passwordError && <p className="error-text">{passwordError}</p>}
        </div>

        {/* Confirm Password Field */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={`form-input ${confirmPasswordError ? 'input-invalid' : ''}`}
          />
          {confirmPasswordError && (
            <p className="error-text">{confirmPasswordError}</p>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;