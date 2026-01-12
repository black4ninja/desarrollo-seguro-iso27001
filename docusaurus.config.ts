import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Curso Desarrollo Seguro e ISO 27001/27002:2022',
  tagline: 'Formación integral en seguridad del desarrollo de software',
  favicon: 'img/favicon.ico',

  url: 'https://black4ninja.github.io',
  baseUrl: '/desarrollo-seguro-iso27001/',

  organizationName: 'black4ninja',
  projectName: 'desarrollo-seguro-iso27001',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Deployment configuration
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // editUrl: 'https://github.com/black4ninja/desarrollo-seguro-iso27001/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Desarrollo Seguro',
      logo: {
        alt: 'Logo del Curso',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'cursoSidebar',
          position: 'left',
          label: 'Contenido del Curso',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Contenido',
          items: [
            {
              label: 'Día 1: ISO 27001 y OWASP Top 10',
              to: '/docs/dia-1/intro',
            },
            // Días 2-5 ocultos temporalmente - se habilitarán conforme avance el curso
            // {
            //   label: 'Día 2: Preparación',
            //   to: '/docs/dia-2/intro',
            // },
            // {
            //   label: 'Día 3: Implementación',
            //   to: '/docs/dia-3/intro',
            // },
            // {
            //   label: 'Día 4: Mejora Continua',
            //   to: '/docs/dia-4/intro',
            // },
            // {
            //   label: 'Día 5: Fortalecimiento',
            //   to: '/docs/dia-5/intro',
            // },
          ],
        },
        {
          title: 'Sesión',
          items: [
            {
              html: '<div id="footer-logout-container"></div>',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Integral Vending | Curso creación código seguro`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['csharp', 'bash', 'json', 'yaml', 'powershell'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
