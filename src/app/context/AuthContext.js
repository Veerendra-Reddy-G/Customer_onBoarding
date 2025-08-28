// //src/context/AuthContext.js

// 'use client';

// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if user is logged in on initial load
//     const token = localStorage.getItem('authToken');
//     const userData = localStorage.getItem('userData');
    
//     if (token && userData) {
//       setIsAuthenticated(true);
//       setUser(JSON.parse(userData));
//     }
    
//     setLoading(false);
//   }, []);

//   const login = (email, token) => {
//     localStorage.setItem('authToken', token);
//     localStorage.setItem('userData', JSON.stringify({ email }));
//     setIsAuthenticated(true);
//     setUser({ email });
//   };

//   const logout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userData');
//     localStorage.removeItem('onboardingData');
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   const value = {
//     isAuthenticated,
//     user,
//     login,
//     logout,
//     loading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }





'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    
    setLoading(false);
  }, []);

  const login = (email, token) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify({ email }));
    setIsAuthenticated(true);
    setUser({ email });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('onboardingData');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}