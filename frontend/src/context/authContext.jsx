import Cookies from "js-cookie";
import React, { createContext, useContext, useState, useEffect } from "react"; // Added useEffect

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuthenticated = (value) => {
    setIsAuthenticated(value);
  };

  const checkAuth = () => {
    const token = Cookies.get("authToken");
    console.log("Checking authentication...");
    if (token) {
      console.log("Token exists. Setting authenticated to true.");
      setAuthenticated(true);
      // console.log(isAuthenticated); // No need to log here, state update is asynchronous
    } else {
      console.log("Token does not exist. Setting authenticated to false."); // Completed the log message
      setAuthenticated(false);
    }
  };

  const logout = () => {
    Cookies.remove("authToken");
    setAuthenticated(false);
  };

  // Optional: Run checkAuth on component mount to initialize authentication state
  useEffect(() => {
    checkAuth();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, checkAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};