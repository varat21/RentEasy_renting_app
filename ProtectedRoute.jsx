

import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const Navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token; // Extract token if user exists


  useEffect(() => {
    if (!isAuthenticated) {
      console.log('ProtectedRoute - Redirecting to /login'); 

      Navigate('/login');
    }
  }, [isAuthenticated]);


  return children;
};

export default ProtectedRoute;
