import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './userSignin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
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
        localStorage.setItem('token', token);
        setEmail('');
        setPassword('');
        setErrorMessage('');
        // Store the token in localStorage or perform any other actions
        console.log('Token:', token);
        console.log('isAdmin:', isAdmin);
        navigate('/shop/products');
      } else {
        const errorMessage = await response.text();
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`wrapper`}>
      <div className="form-wrapper sign-up">
        <form onSubmit={handleSignInClick}>
          <h2>Login</h2>
          <div className="input-group">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
            <span
              className={`password-toggle ${showPassword ? 'visible' : ''}`}
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </span>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="btn7">
            Login
          </button>
          <div className="sign-link">
            <p>
              <Link to="/reset">Forgot your password?</Link>
              <Link to="/signup">
                <button className="sign-in-link">Sign Up</button>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
