import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const EmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // Get email and v_code from the URL query string
  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get('email');
  const v_code = queryParams.get('v_code');

  useEffect(() => {
    if (email && v_code) {
      verifyEmail(email, v_code);
    } else {
      setErrorMessage('Invalid verification link');
    }
  }, [email, v_code]);

  const verifyEmail = async (email, v_code) => {
    try {
      setLoading(true);

      // Make API call to the backend
      const response = await axios.get(
        `http://localhost/rent-easy/auth/verify.php?email=${email}&v_code=${v_code}`
      );

      setLoading(false);
      if (response.data.success) {
        // Verification successful
        toast.success(response.data.message);
        // Redirect to login page after successful verification
        
          navigate('/login');
        
      } else {
        // Verification failed
        // setErrorMessage(response.data.message);
        // toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage('An error occurred. Please try again later.');
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="verification-container">
      <h2>Email Verification</h2>
      {loading ? (
        <div>Loading...</div>
      ) : errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : (
        <div>Verifying your email...</div>
      )}
    </div>
  );
};

export default EmailVerification;
