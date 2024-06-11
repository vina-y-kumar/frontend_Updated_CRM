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

  const [tenantId, setTenantId] = useState(() => {
    const storedTenantId = localStorage.getItem("tenant_id");
    return storedTenantId ? JSON.parse(storedTenantId) : null;
  });

  const [userRole, setUserRole] = useState(() => {
    const storedUserRole = localStorage.getItem("user_role");
    try {
      return storedUserRole ? JSON.parse(storedUserRole) : null;
    } catch (error) {
      console.error("Error parsing 'user_role' from localStorage:", error);
      return null; // Provide a default value or handle the error as needed
    }
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

  useEffect(() => {
    try {
      localStorage.setItem("tenant_id", JSON.stringify(tenantId));
    } catch (error) {
      console.error("Error saving 'tenant_id' to localStorage:", error);
    }
  }, [tenantId]);

  useEffect(() => {
    try {
      localStorage.setItem("user_role", JSON.stringify(userRole));
    } catch (error) {
      console.error("Error saving 'user_role' to localStorage:", error);
    }
  }, [userRole]);

  const login = (userId, tenantId, role) => { // Change userRole to role
    setAuthenticated(true);
    setUserId(userId);
    setTenantId(tenantId);
    setUserRole(role); // default to "employee" if role is undefined
  };

  const logout = () => {
    try {
      localStorage.removeItem("authenticated");
      localStorage.removeItem("user_id");
      localStorage.removeItem("tenant_id");
      localStorage.removeItem("user_role");
      setAuthenticated(false);
      setUserId(null);
      setTenantId(null);
      setUserRole(null); // default to "employee"
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ authenticated, userId, tenantId, userRole, login, logout, setAuthenticated }}>
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
