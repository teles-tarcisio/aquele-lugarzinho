import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const persistedAuth = JSON.parse(localStorage.getItem('auth'));
  const [auth, setAuth] = useState(persistedAuth);

  function loginUser(authData) {
    setAuth(authData);
    localStorage.setItem('auth', JSON.stringify(authData));
  }

  function logoutUser() {
    setAuth(null);
    localStorage.clear();
  }

  return (
    <AuthContext.Provider value={{ auth, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
