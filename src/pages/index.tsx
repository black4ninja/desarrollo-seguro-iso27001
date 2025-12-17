import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Comenzar el Curso →
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  const features = [
    {
      title: '📚 5 Días Intensivos',
      description: (
        <>
          40 horas de formación presencial que combina teoría, práctica y
          laboratorios reales para dominar el desarrollo seguro.
        </>
      ),
    },
    {
      title: '🔒 ISO 27001/27002:2022',
      description: (
        <>
          Aprende a implementar controles de seguridad alineados con los
          estándares internacionales más recientes.
        </>
      ),
    },
    {
      title: '⚡ OWASP Top 10',
      description: (
        <>
          Identifica, explota y corrige las vulnerabilidades más críticas
          en aplicaciones web y APIs.
        </>
      ),
    },
    {
      title: '🛠️ Herramientas Profesionales',
      description: (
        <>
          Domina SonarQube, OWASP ZAP, Dependency-Check y más herramientas
          de análisis de seguridad.
        </>
      ),
    },
    {
      title: '🔄 DevSecOps',
      description: (
        <>
          Integra seguridad en el ciclo de desarrollo con CI/CD security gates
          y automatización de análisis.
        </>
      ),
    },
    {
      title: '👥 Metodología Práctica',
      description: (
        <>
          Laboratorios hands-on, threat modeling, pentesting y auditorías
          completas de código real.
        </>
      ),
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map((feature, idx) => (
            <div key={idx} className={clsx('col col--4')}>
              <div className="text--center padding-horiz--md">
                <Heading as="h3">{feature.title}</Heading>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Curso completo de Desarrollo Seguro e ISO 27001/27002:2022">
      <HomepageHeader />
      <main>
        <HomepageFeatures />

        <section className={styles.courseInfo}>
          <div className="container">
            <div className="row">
              <div className="col col--12">
                <Heading as="h2" className="text--center margin-bottom--lg">
                  Información del Curso
                </Heading>
              </div>
            </div>
            <div className="row">
              <div className="col col--6">
                <div className="card margin-bottom--lg">
                  <div className="card__header">
                    <h3>👥 Audiencia</h3>
                  </div>
                  <div className="card__body">
                    <ul>
                      <li>Desarrolladores de software</li>
                      <li>Arquitectos de soluciones</li>
                      <li>DevOps Engineers</li>
                      <li>Analistas de seguridad</li>
                      <li>QA/Testing Engineers</li>
                      <li>Project Managers técnicos</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col col--6">
                <div className="card margin-bottom--lg">
                  <div className="card__header">
                    <h3>🎯 Objetivos</h3>
                  </div>
                  <div className="card__body">
                    <ul>
                      <li>Implementar desarrollo seguro (SDLC)</li>
                      <li>Aplicar controles ISO 27001/27002</li>
                      <li>Identificar vulnerabilidades OWASP</li>
                      <li>Usar herramientas SAST/DAST</li>
                      <li>Integrar seguridad en CI/CD</li>
                      <li>Realizar auditorías de código</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col col--12">
                <div className="card">
                  <div className="card__header">
                    <h3>📅 Estructura del Curso</h3>
                  </div>
                  <div className="card__body">
                    <ul>
                      <li><strong>Día 1:</strong> Controles ISO 27001/27002:2022 y OWASP Top 10</li>
                      <li><strong>Día 2:</strong> Preparación para Implementar Controles</li>
                      <li><strong>Día 3:</strong> Implementación de Controles de Seguridad</li>
                      <li><strong>Día 4:</strong> Mejora del Ciclo de Vida con Controles</li>
                      <li><strong>Día 5:</strong> Fortalecimiento de Capacidades y Evaluación</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
