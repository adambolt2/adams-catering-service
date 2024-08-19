'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the context data
interface LoginContextData {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// Create the context with default values
const LoginContext = createContext<LoginContextData | undefined>(undefined);

// Define the provider component
export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to check authentication status based on token
  const checkAuthStatus = () => {
    const token = sessionStorage.getItem('UserToken');
    if (token) {
      // Optional: Add more logic here to validate the token if necessary
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuthStatus(); // Check auth status on component mount
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('UserToken'); // Clear token on logout
    sessionStorage.removeItem('UserInfo');  // Clear user info on logout
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

// Create a custom hook to easily access the context
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};
