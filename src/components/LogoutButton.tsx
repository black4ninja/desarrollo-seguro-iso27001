import React from 'react';
import { useAuth } from './AuthProvider';

export default function LogoutButton(): JSX.Element {
  const { logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={logout}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '600',
      }}
    >
      Cerrar Sesión
    </button>
  );
}
