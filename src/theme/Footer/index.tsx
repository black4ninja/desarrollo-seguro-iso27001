import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Footer from '@theme-original/Footer';
import type FooterType from '@theme/Footer';
import type {WrapperProps} from '@docusaurus/types';
import { useAuth } from '../../components/AuthProvider';

type Props = WrapperProps<typeof FooterType>;

function LogoutButton() {
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
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#c82333';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#dc3545';
      }}
    >
      Cerrar Sesión
    </button>
  );
}

export default function FooterWrapper(props: Props): JSX.Element {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return;
    }

    // Find the container element
    const footerContainer = document.getElementById('footer-logout-container');
    setContainer(footerContainer);
  }, []);

  return (
    <>
      <Footer {...props} />
      {container && createPortal(<LogoutButton />, container)}
    </>
  );
}
