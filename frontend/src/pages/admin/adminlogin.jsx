import React, { useState } from 'react';
import './adminlogin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignInClick = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { token, isAdmin } = await response.json();

        if (isAdmin) {
          localStorage.setItem('token', token);
          setEmail('');
          setPassword('');
          setErrorMessage('');
          // Store the token in localStorage or perform any other actions
          console.log('Token:', token);
          console.log('isAdmin:', isAdmin);
          navigate('/admin-Page');
        } else {
          setErrorMessage('Access denied.');
          // Perform any other actions for access denied
        }
      } else {
        // Login failure
        // ...
      }
    } catch (error) {
      // Error occurred
      // ...
    }
  };


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordFocus = () => {
    if (password) {
      setShowPassword(true);
    }
  };

  const handlePasswordBlur = () => {
    setShowPassword(false);
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      return null;
    }
  };

  return (
    <div style={{ background: '#e0e0e0' }}>
      <div className="login3">
        <div className="form3">
          <p>Admin</p>
          <form className="login-form3" onSubmit={handleSignInClick}>
            <input
              type="text"
              placeholder="email"
              className="input3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="password"
                className="input3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
              />
              {password && (
                <span className="password-toggle" onClick={toggleShowPassword}>
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </span>
              )}
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button type="submit" className="button3">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
