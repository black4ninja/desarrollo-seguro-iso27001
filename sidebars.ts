import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  cursoSidebar: [
    {
      type: 'category',
      label: 'Información General',
      items: [
        'intro',
        'objetivos',
        'metodologia',
      ],
    },
    {
      type: 'category',
      label: 'Día 1: ISO 27001 y OWASP Top 10',
      items: [
        'dia-1/intro',
        'dia-1/iso-27001-27002',
        {
          type: 'category',
          label: 'Laboratorios',
          items: [
            'dia-1/labs/lab-1-1-mapeo-controles',
            'dia-1/labs/lab-1-2-dvwa',
            'dia-1/labs/lab-1-3-reconocimiento',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Día 2: Preparación para Implementar',
      items: [
        'dia-2/intro',
        {
          type: 'category',
          label: 'Laboratorios',
          items: [
            'dia-2/labs/lab-2-1-threat-modeling',
            'dia-2/labs/lab-2-2-setup-entorno',
            'dia-2/labs/lab-2-3-sast-sonarqube',
            'dia-2/labs/lab-2-4-dependency-check',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Día 3: Implementación de Controles',
      items: [
        'dia-3/intro',
        {
          type: 'category',
          label: 'Laboratorios',
          items: [
            'dia-3/labs/lab-3-1-api-security',
            'dia-3/labs/lab-3-2-dast-zap',
            'dia-3/labs/lab-3-3-pentesting-apis',
            'dia-3/labs/lab-3-4-auditoria-configuraciones',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Día 4: Mejora del Ciclo de Vida',
      items: [
        'dia-4/intro',
        {
          type: 'category',
          label: 'Laboratorios',
          items: [
            'dia-4/labs/lab-4-1-security-gates',
            'dia-4/labs/lab-4-2-logging-monitoring',
            'dia-4/labs/lab-4-3-gestion-secretos',
            'dia-4/labs/lab-4-4-security-tests',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Día 5: Fortalecimiento',
      items: [
        'dia-5/intro',
        {
          type: 'category',
          label: 'Actividades Finales',
          items: [
            'dia-5/actividades/auditoria-completa',
            'dia-5/actividades/plan-accion',
            'dia-5/actividades/presentaciones',
            'dia-5/actividades/examen',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Recursos',
      items: [
        'recursos/guia-facilitador',
        {
          type: 'category',
          label: 'Checklists',
          items: [
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
            'recursos/templates/reporte-auditoria',
            'recursos/templates/threat-model',
            'recursos/templates/plan-mejora',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
