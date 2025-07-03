import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const verifyToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp && decoded.exp < currentTime) {
        throw new Error("Token expired");
      }
      return decoded;
    } catch (error) {
      console.error("Token verification error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = verifyToken(token);
          setUser({
            username: decoded.name || "User",
            userType: decoded.userType,
            email: decoded.email,
          });
        } catch (error) {
          localStorage.removeItem("token");
          setUser(null);
          // Navigation removed from here; handled by components
        }
      } else {
        setUser(null);
      }
    };
    checkAuth();
  }, []); // Removed navigate from dependencies

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser({
      username: userData.name || "User",
      userType: userData.userType,
      email: userData.email,
    });
    // Navigation handled by caller (e.g., GoogleLoginButton)
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    // Navigation handled by caller (e.g., Header)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};