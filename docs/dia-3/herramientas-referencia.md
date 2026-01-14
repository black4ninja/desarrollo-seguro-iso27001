---
sidebar_position: 2
---

# Herramientas de Referencia para Seguridad

Esta página contiene un catálogo de herramientas recomendadas para implementar controles de seguridad y analizar vulnerabilidades en aplicaciones. Todas las herramientas listadas están activas y mantenidas a enero de 2026.

---

## 🔍 Análisis Estático de Código (SAST)

### Para C# / .NET

#### ✅ SonarQube (Community Edition)
- **Tipo:** Open Source (Community) / Pago (Enterprise)
- **Descripción:** Plataforma completa de inspección continua de código. Detecta bugs, vulnerabilidades y code smells.
- **Tecnologías:** C#, VB.NET, ASP.NET Core
- **Controles ISO 27002:2022:** 8.8 (Gestión de vulnerabilidades técnicas)
- **OWASP Top 10:** Cubre múltiples categorías (A01, A03, A06, A08)
- **Fuente:** [https://www.sonarsource.com/products/sonarqube/](https://www.sonarsource.com/products/sonarqube/)
- **Usado en:** Lab 3.2 - Code Reviews del curso

#### ✅ Security Code Scan
- **Tipo:** Open Source
- **Descripción:** Analizador de seguridad para .NET integrado con Roslyn. Detecta vulnerabilidades OWASP en código C#/VB.NET.
- **Tecnologías:** C#, VB.NET, .NET Framework, .NET Core/.NET 5+
- **Controles ISO 27002:2022:** 8.8, 8.25 (Ciclo de vida de desarrollo seguro)
- **OWASP Top 10:** A03 (Injection), A01 (Broken Access Control), A02 (Cryptographic Failures)
- **Fuente:** [https://security-code-scan.github.io/](https://security-code-scan.github.io/)
- **Instalación:** NuGet package

#### ✅ Roslynator
- **Tipo:** Open Source
- **Descripción:** Colección de 500+ analizadores de código, refactorings y fixes para C#. Incluye reglas de seguridad.
- **Tecnologías:** C#
- **Controles ISO 27002:2022:** 8.25 (Ciclo de vida de desarrollo seguro)
- **Fuente:** [https://github.com/dotnet/roslynator](https://github.com/dotnet/roslynator)

#### 💰 Veracode (Pago)
- **Tipo:** Comercial
- **Descripción:** Plataforma enterprise de análisis de seguridad con SAST, DAST, SCA y más.
- **Tecnologías:** C#, VB.NET, ASP.NET, y 70+ lenguajes
- **Controles ISO 27002:2022:** 8.8, 8.25, 5.23 (Seguridad de la información en el cloud)
- **Fuente:** [https://www.veracode.com/](https://www.veracode.com/)

#### 💰 Checkmarx SAST (Pago)
- **Tipo:** Comercial
- **Descripción:** Solución enterprise de SAST con análisis profundo de flujo de datos.
- **Tecnologías:** C#, .NET, y 25+ lenguajes
- **Controles ISO 27002:2022:** 8.8, 8.25
- **Fuente:** [https://checkmarx.com/product/cxsast-source-code-scanning/](https://checkmarx.com/product/cxsast-source-code-scanning/)

---

### Para Android

#### ✅ MobSF (Mobile Security Framework)
- **Tipo:** Open Source
- **Descripción:** Framework automatizado de pentesting para aplicaciones móviles (Android, iOS). Análisis estático y dinámico.
- **Tecnologías:** Android APK, AAB, iOS IPA
- **Controles ISO 27002:2022:** 8.8, 8.26 (Requisitos de seguridad de aplicaciones)
- **OWASP Mobile Top 10:** Cubre todas las categorías
- **Fuente:** [https://github.com/MobSF/Mobile-Security-Framework-MobSF](https://github.com/MobSF/Mobile-Security-Framework-MobSF)
- **Instalación:** Docker o Python

#### ✅ QARK (Quick Android Review Kit)
- **Tipo:** Open Source
- **Descripción:** Herramienta de análisis de seguridad para aplicaciones Android. Encuentra vulnerabilidades comunes.
- **Tecnologías:** Android (Java/Kotlin)
- **Controles ISO 27002:2022:** 8.8, 8.26
- **OWASP Mobile Top 10:** M1, M2, M3, M5
- **Fuente:** [https://github.com/linkedin/qark](https://github.com/linkedin/qark)

#### ✅ AndroBugs Framework
- **Tipo:** Open Source
- **Descripción:** Scanner de vulnerabilidades para Android que analiza APKs.
- **Tecnologías:** Android APK
- **Controles ISO 27002:2022:** 8.8
- **Fuente:** [https://github.com/AndroBugs/AndroBugs_Framework](https://github.com/AndroBugs/AndroBugs_Framework)

#### 💰 Guardsquare (AppSweep + DexGuard)
- **Tipo:** Comercial (AppSweep tiene versión gratuita)
- **Descripción:** Suite completa de seguridad para Android con SAST, ofuscación y runtime protection.
- **Tecnologías:** Android
- **Controles ISO 27002:2022:** 8.8, 8.24 (Uso de criptografía), 8.26
- **Fuente:** [https://www.guardsquare.com/](https://www.guardsquare.com/)

---

### Para iOS

#### ✅ MobSF (Mobile Security Framework)
- **Tipo:** Open Source
- **Descripción:** Mencionado arriba - soporta iOS además de Android
- **Tecnologías:** iOS IPA, Swift, Objective-C
- **Controles ISO 27002:2022:** 8.8, 8.26
- **Fuente:** [https://github.com/MobSF/Mobile-Security-Framework-MobSF](https://github.com/MobSF/Mobile-Security-Framework-MobSF)

#### ✅ iblessing
- **Tipo:** Open Source
- **Descripción:** Herramienta de análisis de seguridad para binarios iOS/macOS.
- **Tecnologías:** iOS, macOS binaries
- **Controles ISO 27002:2022:** 8.8
- **Fuente:** [https://github.com/Soulghost/iblessing](https://github.com/Soulghost/iblessing)

#### 💰 Ostorlab (Pago)
- **Tipo:** Comercial
- **Descripción:** Plataforma de análisis de seguridad móvil con SAST/DAST para iOS y Android.
- **Tecnologías:** iOS, Android
- **Controles ISO 27002:2022:** 8.8, 8.26
- **Fuente:** [https://www.ostorlab.co/](https://www.ostorlab.co/)

---

### Multiplataforma / General

#### ✅ Semgrep
- **Tipo:** Open Source (Community) / Pago (Team/Enterprise)
- **Descripción:** Analizador estático rápido que usa patrones para encontrar bugs y vulnerabilidades.
- **Tecnologías:** 30+ lenguajes (C#, Java, Python, JavaScript, Go, Kotlin, Swift, etc.)
- **Controles ISO 27002:2022:** 8.8, 8.25
- **OWASP Top 10:** Reglas pre-configuradas para todas las categorías
- **Fuente:** [https://semgrep.dev/](https://semgrep.dev/)
- **Instalación:** CLI, CI/CD integration

#### ✅ CodeQL (GitHub)
- **Tipo:** Free para repositorios públicos / Pago para privados
- **Descripción:** Motor de análisis semántico de código desarrollado por GitHub/Microsoft.
- **Tecnologías:** C#, Java, JavaScript/TypeScript, Python, C/C++, Go, Ruby
- **Controles ISO 27002:2022:** 8.8, 8.25
- **Fuente:** [https://codeql.github.com/](https://codeql.github.com/)

#### ✅ Bandit (Python)
- **Tipo:** Open Source
- **Descripción:** Herramienta para encontrar problemas de seguridad comunes en código Python.
- **Tecnologías:** Python
- **Controles ISO 27002:2022:** 8.8
- **Fuente:** [https://github.com/PyCQA/bandit](https://github.com/PyCQA/bandit)

#### ✅ ESLint + Security Plugins (JavaScript/TypeScript)
- **Tipo:** Open Source
- **Descripción:** Linter con plugins de seguridad como eslint-plugin-security.
- **Tecnologías:** JavaScript, TypeScript, Node.js
- **Controles ISO 27002:2022:** 8.8, 8.25
- **Fuente:** [https://eslint.org/](https://eslint.org/)
- **Plugins:**
  - eslint-plugin-security
  - @microsoft/eslint-plugin-sdl

---

## 📦 Análisis de Dependencias (SCA)

#### ✅ OWASP Dependency-Check
- **Tipo:** Open Source
- **Descripción:** Herramienta que identifica dependencias con vulnerabilidades conocidas (CVEs).
- **Tecnologías:** Java, .NET, JavaScript/Node.js, Python, Ruby, y más
- **Controles ISO 27002:2022:** 8.8 (Gestión de vulnerabilidades técnicas), 8.30 (Outsourcing)
- **OWASP Top 10:** A06 (Vulnerable and Outdated Components)
- **Fuente:** [https://owasp.org/www-project-dependency-check/](https://owasp.org/www-project-dependency-check/)
- **Usado en:** Lab 2.4 - Dependency Check del curso
- **Instalación:** CLI, Maven, Gradle, MSBuild

#### ✅ Snyk Open Source
- **Tipo:** Free (limitado) / Pago
- **Descripción:** Plataforma de seguridad para dependencias con base de datos de vulnerabilidades actualizada.
- **Tecnologías:** Todos los principales gestores de paquetes
- **Controles ISO 27002:2022:** 8.8, 8.30
- **Fuente:** [https://snyk.io/product/open-source-security-management/](https://snyk.io/product/open-source-security-management/)

#### ✅ npm audit / yarn audit
- **Tipo:** Open Source (incluido en npm/yarn)
- **Descripción:** Auditoría de seguridad integrada en gestores de paquetes de Node.js.
- **Tecnologías:** JavaScript, Node.js
- **Controles ISO 27002:2022:** 8.8
- **Fuente:** Incluido en npm y yarn

#### ✅ Safety (Python)
- **Tipo:** Open Source / Pago
- **Descripción:** Escanea dependencias Python en busca de vulnerabilidades conocidas.
- **Tecnologías:** Python
- **Controles ISO 27002:2022:** 8.8
- **Fuente:** [https://pyup.io/safety/](https://pyup.io/safety/)

#### ✅ Trivy
- **Tipo:** Open Source
- **Descripción:** Scanner de vulnerabilidades para containers, filesystems, git repos y más.
- **Tecnologías:** Contenedores, imágenes Docker, IaC (Terraform, CloudFormation)
- **Controles ISO 27002:2022:** 8.8, 8.9 (Gestión de configuración)
- **Fuente:** [https://github.com/aquasecurity/trivy](https://github.com/aquasecurity/trivy)

---

## 🎯 Pruebas Dinámicas (DAST) y Pentesting

### Pentesting Web

#### ✅ OWASP ZAP (Zed Attack Proxy)
- **Tipo:** Open Source
- **Descripción:** Herramienta de pentesting para aplicaciones web. Scanner activo/pasivo, proxy interceptor.
- **Tecnologías:** Aplicaciones web (cualquier tecnología)
- **Controles ISO 27002:2022:** 8.8, 8.29 (Testing de seguridad en desarrollo)
- **OWASP Top 10:** Detecta todas las categorías principales
- **Fuente:** [https://www.zaproxy.org/](https://www.zaproxy.org/)
- **Usado en:** Herramientas del curso
- **Instalación:** Desktop app, Docker, CLI

#### ✅ Burp Suite Community Edition
- **Tipo:** Free (Community) / Pago (Professional/Enterprise)
- **Descripción:** Plataforma de pentesting web con proxy interceptor, scanner y extensiones.
- **Tecnologías:** Aplicaciones web
- **Controles ISO 27002:2022:** 8.8, 8.29
- **Fuente:** [https://portswigger.net/burp/communitydownload](https://portswigger.net/burp/communitydownload)

#### ✅ Nikto
- **Tipo:** Open Source
- **Descripción:** Scanner de vulnerabilidades de servidores web.
- **Tecnologías:** Servidores web
- **Controles ISO 27002:2022:** 8.8
- **Fuente:** [https://github.com/sullo/nikto](https://github.com/sullo/nikto)

#### ✅ Nuclei
- **Tipo:** Open Source
- **Descripción:** Scanner de vulnerabilidades rápido y customizable basado en templates.
- **Tecnologías:** Web, APIs, infraestructura
- **Controles ISO 27002:2022:** 8.8, 8.29
- **Fuente:** [https://github.com/projectdiscovery/nuclei](https://github.com/projectdiscovery/nuclei)

#### 💰 Acunetix (Pago)
- **Tipo:** Comercial
- **Descripción:** Scanner de vulnerabilidades web automatizado enterprise.
- **Tecnologías:** Aplicaciones web
- **Controles ISO 27002:2022:** 8.8, 8.29
- **Fuente:** [https://www.acunetix.com/](https://www.acunetix.com/)

---

### Análisis de APIs

#### ✅ OWASP ZAP (API Scanning)
- **Tipo:** Open Source
- **Descripción:** ZAP incluye soporte para testing de APIs REST y GraphQL
- **Tecnologías:** REST APIs, GraphQL, SOAP
- **Controles ISO 27002:2022:** 8.8, 8.29
- **Fuente:** [https://www.zaproxy.org/docs/api/](https://www.zaproxy.org/docs/api/)

#### ✅ Postman (Security Testing)
- **Tipo:** Free / Pago
- **Descripción:** Plataforma de API testing con capacidades de security testing.
- **Tecnologías:** REST APIs
- **Controles ISO 27002:2022:** 8.29
- **Fuente:** [https://www.postman.com/](https://www.postman.com/)

#### ✅ RESTler
- **Tipo:** Open Source (Microsoft)
- **Descripción:** Fuzzer de APIs REST que genera automáticamente tests a partir de especificaciones OpenAPI.
- **Tecnologías:** REST APIs
- **Controles ISO 27002:2022:** 8.8, 8.29
- **Fuente:** [https://github.com/microsoft/restler-fuzzer](https://github.com/microsoft/restler-fuzzer)

---

### Pentesting Móvil

#### ✅ Frida
- **Tipo:** Open Source
- **Descripción:** Framework de instrumentación dinámica para análisis de aplicaciones móviles.
- **Tecnologías:** Android, iOS
- **Controles ISO 27002:2022:** 8.29
- **Fuente:** [https://frida.re/](https://frida.re/)

#### ✅ Drozer
- **Tipo:** Open Source
- **Descripción:** Framework de security assessment para Android.
- **Tecnologías:** Android
- **Controles ISO 27002:2022:** 8.29
- **Fuente:** [https://github.com/WithSecureLabs/drozer](https://github.com/WithSecureLabs/drozer)

---

## 📊 Logging y Monitoreo

### Open Source

#### ✅ ELK Stack (Elasticsearch, Logstash, Kibana)
- **Tipo:** Open Source / Pago (Elastic Cloud)
- **Descripción:** Suite completa de logging, búsqueda y visualización.
- **Tecnologías:** Multiplataforma
- **Controles ISO 27002:2022:** 8.15 (Logging), 8.16 (Actividades de monitoreo)
- **Fuente:** [https://www.elastic.co/elk-stack](https://www.elastic.co/elk-stack)
- **Usado en:** Lab 3.1 - Logging y Monitoreo del curso

#### ✅ Grafana + Loki
- **Tipo:** Open Source
- **Descripción:** Plataforma de visualización con sistema de agregación de logs.
- **Tecnologías:** Multiplataforma
- **Controles ISO 27002:2022:** 8.15, 8.16
- **Fuente:** [https://grafana.com/](https://grafana.com/)

#### ✅ Serilog (.NET)
- **Tipo:** Open Source
- **Descripción:** Librería de logging estructurado para .NET con múltiples sinks.
- **Tecnologías:** .NET
- **Controles ISO 27002:2022:** 8.15
- **Fuente:** [https://serilog.net/](https://serilog.net/)

#### ✅ NLog (.NET)
- **Tipo:** Open Source
- **Descripción:** Librería de logging flexible para .NET.
- **Tecnologías:** .NET
- **Controles ISO 27002:2022:** 8.15
- **Fuente:** [https://nlog-project.org/](https://nlog-project.org/)

---

### Comercial

#### 💰 Splunk
- **Tipo:** Comercial (Trial disponible)
- **Descripción:** Plataforma enterprise de análisis de logs y SIEM.
- **Tecnologías:** Multiplataforma
- **Controles ISO 27002:2022:** 8.15, 8.16, 6.8 (Gestión de eventos de seguridad de la información)
- **Fuente:** [https://www.splunk.com/](https://www.splunk.com/)

#### 💰 Datadog
- **Tipo:** Comercial (Trial disponible)
- **Descripción:** Plataforma de monitoreo y analytics cloud.
- **Tecnologías:** Multiplataforma, cloud native
- **Controles ISO 27002:2022:** 8.15, 8.16
- **Fuente:** [https://www.datadoghq.com/](https://www.datadoghq.com/)

---

## 🔎 Code Review y Calidad

#### ✅ SonarQube
- **Tipo:** Open Source / Pago
- **Descripción:** Ya mencionado en SAST - también excelente para code reviews
- **Fuente:** [https://www.sonarsource.com/products/sonarqube/](https://www.sonarsource.com/products/sonarqube/)
- **Usado en:** Lab 3.2 - Code Reviews del curso

#### ✅ Review Board
- **Tipo:** Open Source
- **Descripción:** Herramienta web para code review colaborativo.
- **Tecnologías:** Multiplataforma
- **Controles ISO 27002:2022:** 8.25
- **Fuente:** [https://www.reviewboard.org/](https://www.reviewboard.org/)

#### ✅ Gerrit
- **Tipo:** Open Source
- **Descripción:** Sistema de code review basado en web para Git.
- **Tecnologías:** Git
- **Controles ISO 27002:2022:** 8.25
- **Fuente:** [https://www.gerritcodereview.com/](https://www.gerritcodereview.com/)

#### 💰 GitHub Advanced Security
- **Tipo:** Comercial (incluido en GitHub Enterprise)
- **Descripción:** Suite de seguridad con CodeQL, secret scanning, dependency review.
- **Tecnologías:** Multiplataforma
- **Controles ISO 27002:2022:** 8.8, 8.25, 8.11 (Enmascaramiento de datos)
- **Fuente:** [https://github.com/features/security](https://github.com/features/security)

---

## 🛡️ Herramientas de Infraestructura como Código (IaC)

#### ✅ Checkov
- **Tipo:** Open Source
- **Descripción:** Scanner de seguridad para IaC (Terraform, CloudFormation, Kubernetes, etc.)
- **Tecnologías:** Terraform, CloudFormation, Kubernetes, ARM, Docker
- **Controles ISO 27002:2022:** 8.9 (Gestión de configuración), 8.8
- **Fuente:** [https://www.checkov.io/](https://www.checkov.io/)

#### ✅ tfsec
- **Tipo:** Open Source
- **Descripción:** Análisis de seguridad estático para código Terraform.
- **Tecnologías:** Terraform
- **Controles ISO 27002:2022:** 8.9, 8.8
- **Fuente:** [https://github.com/aquasecurity/tfsec](https://github.com/aquasecurity/tfsec)

---

## 🔐 Secret Scanning

#### ✅ TruffleHog
- **Tipo:** Open Source
- **Descripción:** Escanea repositorios Git en busca de secretos y credenciales.
- **Tecnologías:** Git, GitHub, GitLab, filesystems
- **Controles ISO 27002:2022:** 8.11 (Enmascaramiento de datos), 8.3 (Gestión de acceso privilegiado)
- **Fuente:** [https://github.com/trufflesecurity/trufflehog](https://github.com/trufflesecurity/trufflehog)

#### ✅ GitGuardian
- **Tipo:** Free (limitado) / Pago
- **Descripción:** Plataforma de detección de secretos en código.
- **Tecnologías:** Git, CI/CD
- **Controles ISO 27002:2022:** 8.11, 8.3
- **Fuente:** [https://www.gitguardian.com/](https://www.gitguardian.com/)

#### ✅ Gitleaks
- **Tipo:** Open Source
- **Descripción:** Scanner rápido de secretos para Git.
- **Tecnologías:** Git
- **Controles ISO 27002:2022:** 8.11, 8.3
- **Fuente:** [https://github.com/gitleaks/gitleaks](https://github.com/gitleaks/gitleaks)

---

## 📚 Recursos Adicionales

### Bases de Datos de Vulnerabilidades

- **CVE (Common Vulnerabilities and Exposures):** [https://cve.mitre.org/](https://cve.mitre.org/)
- **NVD (National Vulnerability Database):** [https://nvd.nist.gov/](https://nvd.nist.gov/)
- **OWASP Top 10:** [https://owasp.org/www-project-top-ten/](https://owasp.org/www-project-top-ten/)
- **OWASP Mobile Top 10:** [https://owasp.org/www-project-mobile-top-10/](https://owasp.org/www-project-mobile-top-10/)
- **CWE (Common Weakness Enumeration):** [https://cwe.mitre.org/](https://cwe.mitre.org/)

### Frameworks y Estándares

- **NIST Cybersecurity Framework:** [https://www.nist.gov/cyberframework](https://www.nist.gov/cyberframework)
- **ISO/IEC 27001:2022:** Estándar de gestión de seguridad de la información
- **OWASP SAMM:** [https://owaspsamm.org/](https://owaspsamm.org/) - Software Assurance Maturity Model
- **BSIMM:** [https://www.bsimm.com/](https://www.bsimm.com/) - Building Security In Maturity Model

---

## 💡 Recomendaciones de Implementación

### Para Proyectos C# / .NET

**Stack Mínimo Recomendado:**
1. **SAST:** SonarQube Community + Security Code Scan
2. **SCA:** OWASP Dependency-Check
3. **Logging:** Serilog con sinks a ELK o archivo
4. **Code Review:** SonarQube + GitHub/Azure DevOps PR reviews
5. **DAST:** OWASP ZAP para APIs

**Stack Enterprise:**
1. **SAST:** Checkmarx o Veracode
2. **SCA:** Snyk Enterprise
3. **Logging:** Splunk o Datadog
4. **Code Review:** GitHub Advanced Security
5. **DAST:** Acunetix o Burp Suite Professional

---

### Para Proyectos Android

**Stack Mínimo Recomendado:**
1. **SAST:** MobSF + QARK
2. **SCA:** OWASP Dependency-Check
3. **DAST:** MobSF (análisis dinámico) + Frida
4. **Code Review:** SonarQube + Android Studio inspections

---

### Para Proyectos iOS

**Stack Mínimo Recomendado:**
1. **SAST:** MobSF
2. **SCA:** OWASP Dependency-Check (CocoaPods/Carthage)
3. **DAST:** MobSF + Frida
4. **Code Review:** SonarQube + Xcode analyzer

---

## ⚠️ Consideraciones Importantes

### Seguridad de las Herramientas

- Mantén las herramientas actualizadas
- Verifica la integridad de las descargas (checksums, firmas)
- Usa contenedores (Docker) cuando sea posible para aislamiento
- Revisa los permisos necesarios antes de instalar

### Integración en CI/CD

La mayoría de estas herramientas se pueden integrar en pipelines de CI/CD:
- **GitHub Actions:** Soporta CodeQL, Dependency-Check, Semgrep
- **Azure DevOps:** Soporta SonarQube, Checkmarx, WhiteSource
- **GitLab CI/CD:** Soporta SAST, DAST, dependency scanning nativo
- **Jenkins:** Plugins para casi todas las herramientas

### Manejo de Falsos Positivos

- Configura baselines para reducir ruido
- Usa archivos de supresión (.sonarqube/suppressions, etc.)
- Documenta decisiones de suprimir hallazgos (compliance)
- Revisa periódicamente hallazgos suprimidos

---

**Última actualización:** Enero 2026
**Versión:** 1.0
