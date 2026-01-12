import React, { useEffect } from 'react';
import Navbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type {WrapperProps} from '@docusaurus/types';
import { AuthService } from '../../services/auth';

type Props = WrapperProps<typeof NavbarType>;

export default function NavbarWrapper(props: Props): JSX.Element {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return;
    }

    // Intercept clicks on navbar links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Find if we clicked on a link or inside a link
      const link = target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Check if it's an internal navigation link
      const baseUrl = '/desarrollo-seguro-iso27001';
      const isInternal = href.startsWith(baseUrl) || href.startsWith('/docs') || href === '/';

      if (isInternal) {
        // Check authentication for internal links
        const authenticated = AuthService.isAuthenticated();

        if (!authenticated) {
          e.preventDefault();
          e.stopPropagation();

          // Redirect to login
          const currentPath = window.location.pathname;
          window.location.href = `${baseUrl}/login?redirect=${encodeURIComponent(href.startsWith(baseUrl) ? href : baseUrl + href)}`;
        }
      }
    };

    // Attach listener to navbar
    const navbar = document.querySelector('nav.navbar');
    if (navbar) {
      navbar.addEventListener('click', handleClick, true);
    }

    return () => {
      if (navbar) {
        navbar.removeEventListener('click', handleClick, true);
      }
    };
  }, []);

  return <Navbar {...props} />;
}
