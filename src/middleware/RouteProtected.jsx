
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import{ jwtDecode } from 'jwt-decode';

// Función para verificar el token y el rol
const verifyTokenAndRole = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return { isValid: false, role: null };
  }

  try {
    const decoded = jwtDecode(token);
    const storedRole = localStorage.getItem('role');

    if (decoded.role !== storedRole) {
      localStorage.setItem('role', decoded.role);
    }

    return { isValid: true, role: decoded.role };
  } catch (error) {
    console.error('Token inválido', error);
    return { isValid: false, role: null };
  }
};

// Componente RoleChecker
export const RoleChecker = ({ requiredRole, children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = () => {
      const { isValid, role } = verifyTokenAndRole();

      if (isValid && role === requiredRole) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }

      setLoading(false);
    };

    checkRole();
  }, [requiredRole]);
  
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!authorized) {
    return <Navigate to="/loginpublic" />;
  }

  return children;
};

// Componente ProtectedRoute
export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/loginpublic" />;
  }

  return children;
};
