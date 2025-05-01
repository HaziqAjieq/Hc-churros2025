import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Unified authentication check
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        // Verify token with backend
        const response = await axios.get('http://localhost:3000/api/admin/verify-token', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          setAdmin({ 
            username: response.data.username,
            token // Store token in state for future requests
          });
        } else {
          localStorage.removeItem('adminToken');
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('adminToken');
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/admin/login', 
        { username, password }
      );
      
      localStorage.setItem('adminToken', response.data.token);
      setAdmin({ 
        username: response.data.username,
        token: response.data.token
      });
      
      navigate('/admin/data');
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ 
      admin, 
      loading, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);