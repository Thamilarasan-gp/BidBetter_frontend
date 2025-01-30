import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
   
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (token && userId) {
      fetchUserData(token, userId);
    }
  }, []);

  const fetchUserData = async (token, userId) => {
    try {
      const response = await fetch(`https://bidbetter-backend.onrender.com/api/users/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        console.log('Fetched user data:', userData);
        
        // Normalize user data
        const normalizedUserData = {
          id: userData.id || userData._id,
          name: userData.username || userData.name,
          email: userData.email
        };

        setUser(normalizedUserData);
      } else {
        // If token is invalid, remove it
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setUser(null);
    }
  };

  const login = async (token, userData) => {
    console.log('Login called with:', { token, userData });
    
    // Normalize user data
    const normalizedUserData = {
      id: userData.id || userData._id,
      name: userData.username || userData.name,
      email: userData.email
    };

    localStorage.setItem('token', token);
    localStorage.setItem('userId', normalizedUserData.id);
    
    setUser(normalizedUserData);
    console.log('User set in context:', normalizedUserData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      fetchUserData 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
