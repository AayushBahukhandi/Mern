import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './userSignup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupError, setSignupError] = useState('');
  const navigate=useNavigate()

  const handleSignUpClick = async (e) => {
    e.preventDefault();
  
    if (!passwordMatch || password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
  
    try {
      const data = { email, password };
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setSignupError(''); // Clear the signup error message on successful signup
        navigate('/login')
      } else {
        const errorData = await response.json();
        setSignupError(errorData); // Set the error message received from the backend
      }
    } catch (error) {
      console.log(error);
      // Handle error (e.g., display an error message)
    }
  };
  

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(true);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="wrapper animate-signIn">
      <div className="form-wrapper sign-up">
        <form onSubmit={handleSignUpClick}>
          <h2>Sign Up</h2>
          {signupError && <div className="error-message">{signupError}</div>}
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
          <div className={`input-group ${!passwordMatch ? 'error' : ''}`}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <label>Confirm Password</label>
            <span
              className={`password-toggle ${showConfirmPassword ? 'visible' : ''}`}
              onClick={toggleShowConfirmPassword}
            >
              {showConfirmPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </span>
          </div>
          {!passwordMatch && (
            <div className="password-match-error">
              Passwords do not match. Please try again.
            </div>
          )}
          <button type="submit" className="btn5">
            Sign Up
          </button>
          <div className="sign-link">
            <p>
              Already have an account?{' '}
              <Link to="/login">
                <button className="sign-in-link">Login</button>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
