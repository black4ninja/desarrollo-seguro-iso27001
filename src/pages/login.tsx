import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { AuthService } from '../services/auth';
import styles from './login.module.css';

export default function LoginPage(): JSX.Element {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If already authenticated, redirect to home
    if (AuthService.isAuthenticated()) {
      window.location.href = '/desarrollo-seguro-iso27001/';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Small delay to prevent brute force attempts
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = AuthService.login(password);

    if (success) {
      // Redirect to the referring page or home
      const urlParams = new URLSearchParams(window.location.search);
      const redirect = urlParams.get('redirect') || '/desarrollo-seguro-iso27001/';
      window.location.href = redirect;
    } else {
      setError('Contraseña incorrecta. Por favor, intenta de nuevo.');
      setPassword('');
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Iniciar Sesión" noFooter>
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h1>Acceso al Curso</h1>
          <p className={styles.subtitle}>
            Desarrollo Seguro e ISO 27001/27002:2022
          </p>

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña del curso"
                disabled={isLoading}
                autoFocus
                required
              />
            </div>

            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className={styles.loginButton}
              disabled={isLoading || !password}
            >
              {isLoading ? 'Verificando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className={styles.securityNotice}>
            <small>
              ⚠️ Nota: Esta es una protección básica por contraseña.
              No ingreses información sensible personal.
            </small>
          </div>
        </div>
      </div>
    </Layout>
  );
}
