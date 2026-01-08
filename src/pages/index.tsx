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
      title: '📚 5 Días',
      description: (
        <>
          25 horas de formación presencial que combina teoría, práctica y
          laboratorios aplicadosa al propio trabajo para dominar el desarrollo seguro.
        </>
      ),
    },
    {
      title: '🔒 ISO 27001:2022',
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
          Identifica, corrige y previene las vulnerabilidades más críticas
          en aplicaciones web y APIs.
        </>
      ),
    },
    {
      title: '🛠️ Controles de seguridad de la información',
      description: (
        <>
          Implementa 19 controles de seguridad de la información en tu ciclo 
          de vida de desarrollo.
        </>
      ),
    },
    {
      title: '🔄 Prevención de Problemas de Seguridad de la Información',
      description: (
        <>
          Prevención de problemas, reducción de costos y riesgos
          de seguridad de la información.
        </>
      ),
    },
    {
      title: '👥 Metodología Práctica',
      description: (
        <>
          Laboratorios hands-on, threat modeling, inspecciones y mejora del
          ciclo de vida.
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
      description="Curso Código Seguro">
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
                      <li>Aplicar controles de segurida de la información ISO 27001/27002</li>
                      <li>Identificar, corregir y prevenir vulnerabilidades OWASP</li>
                      <li>Realizar inspecciones de seguridad de la información</li>
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
                      <li><strong>Día 1:</strong> ISO 27001:2022 y OWASP Top 10</li>
                      <li><strong>Día 2:</strong> Preparación para Implementar Controles de Seguridad de la Información</li>
                      <li><strong>Día 3:</strong> Fortalecimiento de Capacidades para Implementar Controles de Seguridad de la Información</li>
                      <li><strong>Día 4:</strong> Inspecciones de Seguridad de la Información</li>
                      <li><strong>Día 5:</strong> Mejora del Ciclo de Vida de Desarrollo con Controles de Seguridad de la Información</li>
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
