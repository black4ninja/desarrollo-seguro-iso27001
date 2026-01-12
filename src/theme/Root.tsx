import React, { useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';
import { AuthService } from '../services/auth';
import AuthProvider from '../components/AuthProvider';

// Base URL of the application
const BASE_URL = '/desarrollo-seguro-iso27001';

// List of public paths that don't require authentication
const PUBLIC_PATHS = [
  '/login',
  '/404.html',
];

function AuthGuard({ children }): JSX.Element {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setIsChecking(false);
      return;
    }

    const currentPath = window.location.pathname;

    // Normalize path (remove base URL)
    const normalizedPath = currentPath.replace(BASE_URL, '') || '/';

    // Check if current path is public
    const isPublicPath = PUBLIC_PATHS.some(path =>
      normalizedPath === path || normalizedPath.startsWith(path + '/')
    );

    // Check authentication
    const authenticated = AuthService.isAuthenticated();

    if (!isPublicPath && !authenticated) {
      // Not authenticated and trying to access protected content
      // Redirect to login
      const redirectUrl = `${BASE_URL}/login?redirect=${encodeURIComponent(currentPath)}`;
      window.location.href = redirectUrl;
      return;
    }

    // If we're on base URL or root without auth, redirect to login
    if ((normalizedPath === '/' || normalizedPath === '') && !authenticated) {
      const redirectUrl = `${BASE_URL}/login`;
      window.location.href = redirectUrl;
      return;
    }

    setIsChecking(false);
  }, [location.pathname]); // Re-run when route changes

  if (isChecking) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Verificando acceso...
      </div>
    );
  }

  return <>{children}</>;
}

export default function Root({ children }): JSX.Element {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR
  if (!isClient) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Cargando...
      </div>
    );
  }

  return (
    <AuthProvider>
      <AuthGuard>{children}</AuthGuard>
    </AuthProvider>
  );
}
