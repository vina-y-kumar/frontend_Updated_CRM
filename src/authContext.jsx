import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("authenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  const [userId, setUserId] = useState(() => {
    const storedUserId = localStorage.getItem("user_id");
    return storedUserId ? JSON.parse(storedUserId) : null;
  });

  useEffect(() => {
    try {
      localStorage.setItem("authenticated", JSON.stringify(authenticated));
    } catch (error) {
      console.error("Error saving 'authenticated' to localStorage:", error);
    }
  }, [authenticated]);

  useEffect(() => {
    try {
      localStorage.setItem("user_id", JSON.stringify(userId));
    } catch (error) {
      console.error("Error saving 'user_id' to localStorage:", error);
    }
  }, [userId]);

  const login = (userId) => {
    setAuthenticated(true);
    setUserId(userId);
  };

  const logout = () => {
    try {
      localStorage.removeItem("authenticated");
      localStorage.removeItem("user_id");
      setAuthenticated(false);
      setUserId(null);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ authenticated, userId, login, logout, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
