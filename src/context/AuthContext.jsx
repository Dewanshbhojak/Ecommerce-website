import React, { createContext, useContext, useState, useEffect } from "react";
import { getProfile, logoutUser as logoutApi } from "../Services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth session status on app initialization
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await getProfile();
        if (response && response.data && (response.data.body || response.data.email)) {
          setUser(response.data.body || response.data);
        } else {
          // Check local stored session as fallback
          const savedUser = localStorage.getItem("vibe_user");
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        }
      } catch (err) {
        // If API profile fails, check local mock session
        const savedUser = localStorage.getItem("vibe_user");
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (e) {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("vibe_user", JSON.stringify(userData));
  };

  const logoutUser = async () => {
    try {
      await logoutApi();
    } catch (e) {
      console.log("Logout API call completed");
    } finally {
      setUser(null);
      localStorage.removeItem("vibe_user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, loginUser, logoutUser }}>
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
