import React, { useEffect, useState } from 'react';
import { AuthService } from '../services/auth';
import AuthProvider from '../components/AuthProvider';

// List of public paths that don't require authentication
const PUBLIC_PATHS = [
  '/login',
  '/404.html',
];

export default function Root({ children }): JSX.Element {
  const [isChecking, setIsChecking] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side
    setIsClient(true);

    // Only run on client side
    if (typeof window === 'undefined') {
      return;
    }

    const currentPath = window.location.pathname;
    const baseUrl = '/desarrollo-seguro-iso27001';

    // Normalize path (remove base URL)
    const normalizedPath = currentPath.replace(baseUrl, '') || '/';

    // Check if current path is public
    const isPublicPath = PUBLIC_PATHS.some(path =>
      normalizedPath === path || normalizedPath.startsWith(path + '/')
    );

    if (!isPublicPath) {
      // Check authentication
      const authenticated = AuthService.isAuthenticated();

      if (!authenticated) {
        // Not authenticated, redirect to login
        const redirectUrl = `${baseUrl}/login?redirect=${encodeURIComponent(currentPath)}`;
        window.location.href = redirectUrl;
        return;
      }
    }

    setIsChecking(false);
  }, []);

  // During SSR or while checking authentication on client
  if (!isClient || (isChecking && typeof window !== 'undefined')) {
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

  return <AuthProvider>{children}</AuthProvider>;
}
