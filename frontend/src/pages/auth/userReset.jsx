import React, { useState } from 'react';
import './userReset.css';
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}auth/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        console.log('Reset password request for email:', email);
        const data = await response.json();
        const { token, userId } = data; // Extract token and userId from the response data
        console.log(data);
        setEmail('');
        setMessage('Reset password link sent successfully.');
        setTimeout(() => {
          setMessage('');
          navigate(`/newpassword?token=${token}&userId=${userId}`);
        }, 1000);
      } else {
        setMessage('Wrong email.');
      }
    } catch (error) {
      console.error('Failed to send reset password request:', error);
      setMessage('Unable to send reset password link.');
    }
  };
  

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      {message && <p>{message}</p>}
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='label3' htmlFor="email">Email</label>
          <input
            className='input3'
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button type="submit" className="reset-password-button">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default Reset;
