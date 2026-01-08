import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  cursoSidebar: [
    {
      type: 'category',
      label: 'Información General',
      items: [
        'intro',
        // 'objetivos',     // Oculto temporalmente
        // 'metodologia',   // Oculto temporalmente
      ],
    },
    {
      type: 'category',
      label: 'Día 1: ISO 27001:2022 y OWASP Top 10',
      items: [
        'dia-1/intro',
        // 'dia-1/iso-27001-27002',                  // Oculto temporalmente
        {
          type: 'category',
          label: 'Laboratorios',
          items: [
            'dia-1/labs/lab-1-1-mapeo-controles',
            // 'dia-1/labs/lab-1-2-dvwa',             // Oculto temporalmente
            // 'dia-1/labs/lab-1-3-reconocimiento',   // Oculto temporalmente
            'dia-1/labs/lab-preparacion-inspeccion',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Día 2: Preparación para Implementar Controles de Seguridad de la Información',
      items: [
        'dia-2/intro',
        {
          type: 'category',
          label: 'Laboratorios',
          items: [
            'dia-2/labs/lab-inventario',
            'dia-2/labs/lab-rtp',
            'dia-2/labs/lab-ap',
            'dia-2/labs/lab-soa',
            // 'dia-2/labs/lab-4-1-security-gates',           // Oculto temporalmente
            // 'dia-2/labs/lab-4-2-logging-monitoring',       // Oculto temporalmente
            // 'dia-2/labs/lab-4-3-gestion-secretos',         // Oculto temporalmente
            // 'dia-2/labs/lab-4-4-security-tests',           // Oculto temporalmente
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Día 3: Fortalecimiento de Capacidades para Implementar Controles de Seguridad de la Información',
      items: [
        'dia-3/intro',
        {
          type: 'category',
          label: 'Laboratorios',
          items: [
            'dia-3/labs/lab-logging-monitoring',
            'dia-5/labs/lab-code-reviews',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Día 4: Inspecciones de Seguridad de la Información',
      items: [
        'dia-4/intro',
        'dia-4/threat-modeling-stride',
        {
          type: 'category',
          label: 'Laboratorios',
          items: [
            'dia-4/labs/lab-2-1-threat-modeling',
            'dia-4/labs/lab-inspeccion',
            'dia-4/labs/lab-analisis-inspeccion',
            // 'dia-4/labs/lab-2-2-setup-entorno',      // Oculto temporalmente
            // 'dia-4/labs/lab-2-3-sast-sonarqube',     // Oculto temporalmente
            'dia-4/labs/lab-2-4-dependency-check',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Día 5: Mejora del Ciclo de Vida de Desarrollo con Controles de Seguridad de la Información',
      items: [
        'dia-5/intro',
        {
          type: 'category',
          label: 'Laboratorios',
          items: [
            'dia-5/labs/lab-checklists',
            'dia-5/labs/lab-checklists-individuales',
            // 'dia-5/labs/lab-3-1-api-security',              // Oculto temporalmente
            // 'dia-5/labs/lab-3-2-dast-zap',                  // Oculto temporalmente
            // 'dia-5/labs/lab-3-3-pentesting-apis',           // Oculto temporalmente
            // 'dia-5/labs/lab-3-4-auditoria-configuraciones', // Oculto temporalmente
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Recursos',
      items: [
        'recursos/glosario',
        // 'recursos/guia-facilitador',  // Oculto temporalmente
        {
          type: 'category',
          label: 'Estándares y leyes',
          items: [
            'recursos/estandares/estandares',
            'recursos/estandares/leyes',
          ],
        },
        {
          type: 'category',
          label: 'Procesos',
          items: [
            'recursos/procesos/inspeccion',
          ],
        },
        {
          type: 'category',
          label: 'Checklists',
          items: [
            'recursos/checklists/inspeccion',
            'recursos/checklists/code-review',
            'recursos/checklists/configuraciones',
            'recursos/checklists/apis',
          ],
        },
        {
          type: 'category',
          label: 'Herramientas',
          items: [
            'recursos/herramientas/sonarqube',
            'recursos/herramientas/dependency-check',
            'recursos/herramientas/owasp-zap',
          ],
        },
        {
          type: 'category',
          label: 'Templates',
          items: [
            'recursos/templates/inspeccion',
            'recursos/templates/inventario',
            'recursos/templates/reporte-auditoria',
            'recursos/templates/threat-model',
            'recursos/templates/plan-mejora',
            'recursos/templates/experimentos',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
