import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  auth: null,
  loading: true,
  login: () => {},
  logout: () => {},
  setAuth: () => {},
  checkAuth: () => {}
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          // Verify token with backend
          const response = await fetch('http://localhost:5000/api/users/verify', {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
          });

          if (response.ok) {
            setAuth(JSON.parse(userData));
          } else {
            // Clear invalid auth data
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setAuth(null);
          }
        } else {
          setAuth(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuth(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store auth data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setAuth(data.user);
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    try {
      // Clear all auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setAuth(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Verify token periodically
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token && auth) {
          const response = await fetch('http://localhost:5000/api/users/verify', {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
          });

          if (!response.ok) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setAuth(null);
          }
        }
      } catch (error) {
        console.error('Token verification error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuth(null);
      }
    };

    // Check token every 5 minutes
    const interval = setInterval(verifyToken, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [auth]);

  const value = {
    auth,
    loading,
    login,
    logout,
    setAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
