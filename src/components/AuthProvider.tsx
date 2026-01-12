import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService } from '../services/auth';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl;

  const checkAuth = (): boolean => {
    const authenticated = AuthService.isAuthenticated();
    setIsAuthenticated(authenticated);
    return authenticated;
  };

  const login = (password: string): boolean => {
    const success = AuthService.login(password);
    if (success) {
      setIsAuthenticated(true);
    }
    return success;
  };

  const logout = (): void => {
    AuthService.logout();
    setIsAuthenticated(false);
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = `${baseUrl}login`;
    }
  };

  useEffect(() => {
    // Check authentication status on mount
    checkAuth();

    // Set up interval to check session expiration
    const interval = setInterval(() => {
      const stillAuthenticated = checkAuth();
      if (!stillAuthenticated && typeof window !== 'undefined') {
        // Session expired, redirect to login
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/login')) {
          window.location.href = `${baseUrl}login?redirect=${encodeURIComponent(currentPath)}`;
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [baseUrl]);

  const contextValue: AuthContextType = {
    isAuthenticated,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
