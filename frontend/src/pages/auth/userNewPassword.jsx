import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './userNewpassword.css';

const NewPassword = () => {
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const navigate=useNavigate()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get('token');
    const userIdParam = searchParams.get('userId');
    setToken(tokenParam);
    setUserId(userIdParam);
    console.log('userId:', userIdParam);
    console.log('token:', tokenParam);
  }, [location.search]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setIsPasswordMatch(true);

      const requestBody = {
        password: password,
        token: token,
        userId: userId,
      };

      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}auth/new-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          setTimeout(() => {
           
            navigate('/login');
          }, 1000);          setIsResetSuccess(true);
        } else {
          setIsResetSuccess(false);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setIsPasswordMatch(false);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-wrapper">
        <h2 className="reset-password-heading">Reset Password</h2>
        {isResetSuccess ? (
          <p className="reset-password-success">Your password has been reset successfully.</p>
        ) : (
          <form className="reset-password-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className={`form-input ${isPasswordMatch ? '' : 'password-mismatch'}`}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {!isPasswordMatch && (
                <p className="password-mismatch-error">Passwords do not match.</p>
              )}
            </div>
            <button type="submit" className="reset-password-btn">
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewPassword;
