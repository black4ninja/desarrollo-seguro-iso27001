// Authentication service for client-side password protection
const SESSION_KEY = 'curso_auth_session';
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

// WARNING: This password is hardcoded and visible in the client code
// This is NOT secure for sensitive data - only for basic access control
const VALID_PASSWORD = 'curso2025'; // Change this to your desired password!

export interface AuthSession {
  authenticated: boolean;
  loginTime: number;
  expiresAt: number;
}

export class AuthService {
  /**
   * Validates the provided password
   */
  static validatePassword(password: string): boolean {
    return password === VALID_PASSWORD;
  }

  /**
   * Creates a new authentication session
   */
  static login(password: string): boolean {
    if (this.validatePassword(password)) {
      const now = Date.now();
      const session: AuthSession = {
        authenticated: true,
        loginTime: now,
        expiresAt: now + SESSION_DURATION,
      };

      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        return true;
      } catch (error) {
        console.error('Error saving session:', error);
        return false;
      }
    }
    return false;
  }

  /**
   * Removes the authentication session
   */
  static logout(): void {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (error) {
      console.error('Error removing session:', error);
    }
  }

  /**
   * Checks if the current session is valid
   */
  static isAuthenticated(): boolean {
    try {
      const sessionData = localStorage.getItem(SESSION_KEY);

      if (!sessionData) {
        return false;
      }

      const session: AuthSession = JSON.parse(sessionData);
      const now = Date.now();

      // Check if session has expired
      if (now > session.expiresAt) {
        this.logout();
        return false;
      }

      return session.authenticated;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  /**
   * Gets the current session data
   */
  static getSession(): AuthSession | null {
    try {
      const sessionData = localStorage.getItem(SESSION_KEY);
      if (!sessionData) {
        return null;
      }
      return JSON.parse(sessionData);
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  }

  /**
   * Gets remaining session time in milliseconds
   */
  static getRemainingTime(): number {
    const session = this.getSession();
    if (!session) {
      return 0;
    }
    return Math.max(0, session.expiresAt - Date.now());
  }

  /**
   * Extends the current session (renews for another 8 hours)
   */
  static extendSession(): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }

    try {
      const session = this.getSession();
      if (session) {
        session.expiresAt = Date.now() + SESSION_DURATION;
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        return true;
      }
    } catch (error) {
      console.error('Error extending session:', error);
    }
    return false;
  }
}
