// Import React and necessary packages
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from "./contexts/AuthContext"
import './index.css';
import '@mantine/core/styles.css';
import { GoogleOAuthProvider } from '@react-oauth/google';


// Render the root component inside the StrictMode
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <GoogleOAuthProvider clientId="878458162863-fad05ulpmi61eqhdqhs240fi5elh7f3j.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
    </AuthProvider>
  </StrictMode>
);
