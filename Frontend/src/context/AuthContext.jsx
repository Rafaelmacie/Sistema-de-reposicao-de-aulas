// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  // Sincroniza o estado do usuário se o token mudar (opcional)
  useEffect(() => {
    if (!token) {
      setUsuario(null);
    }
  }, [token]);

  const login = async (email, senha) => {
    try {
      const data = await apiLogin(email, senha);
      setUsuario(data.usuario);
      setToken(data.token);
      localStorage.setItem('authToken', data.token);
      return data.usuario;
    } catch (error) {
      logout();
      throw error;
    }
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ usuario, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);