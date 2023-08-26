import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAdminAuth = (WrappedComponent) => {
  const WithAdminAuth = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      // Check if the user is authenticated and isAdmin
      const token = localStorage.getItem('token');
      const decodedToken = parseJwt(token);
      const isAdmin = decodedToken?.isAdmin;

      // Redirect to login page if user is not authenticated or not an admin
      if (!token || !isAdmin) {
        navigate('/admin/login');
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return WithAdminAuth;
};

export default withAdminAuth;

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}
