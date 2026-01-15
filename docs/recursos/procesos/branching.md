---
sidebar_position: 3
---

# Gestión de Ramas (Branching)

## Objetivo
Organizar el desarrollo de software de forma paralela, ordenada y segura, permitiendo que múltiples desarrolladores trabajen simultáneamente sin conflictos, manteniendo la estabilidad del código y facilitando la trazabilidad de cambios.

## Entradas

- User story, issue o ticket de trabajo
- Definición del tipo de cambio (nueva funcionalidad, corrección, hotfix)
- Rama base desde la cual se creará la nueva rama
- Criterios de aceptación del cambio

## Proceso

| Fase | Actividades | Aspectos de Seguridad |
|----------|----------|----------|
| Planificación | <ul><li>Identificar el tipo de trabajo a realizar (feature, bugfix, hotfix, release)</li><li>Determinar la rama base apropiada (develop, main, release branch)</li><li>Verificar que el ticket/issue esté claramente definido</li><li>Definir nomenclatura de la rama según convención del equipo</li></ul> | Verificar si el cambio tiene impacto de seguridad |
| Creación de Rama | <ul><li>Actualizar la rama base localmente (pull)</li><li>Crear la nueva rama con nomenclatura estándar</li><li>Publicar la rama en el repositorio remoto</li><li>Configurar rama para hacer tracking del remoto</li></ul> | Verificar permisos de creación de ramas |
| Desarrollo | <ul><li>Realizar cambios en la rama de trabajo</li><li>Hacer commits continuos y descriptivos (ver Proceso de Commits)</li><li>Ejecutar pruebas locales regularmente</li><li>Mantener la rama actualizada con la rama base (rebase o merge periódico)</li><li>Ejecutar herramientas de análisis de seguridad localmente si aplica</li></ul> | SAST local, verificación de dependencias, secret scanning |
| Integración (Pull Request) | <ul><li>Actualizar rama con últimos cambios de la rama base</li><li>Resolver conflictos si existen</li><li>Ejecutar todas las pruebas</li><li>Crear Pull Request con descripción estructurada</li><li>Asignar revisores apropiados</li><li>Esperar aprobaciones requeridas (mínimo 1-2 revisores)</li><li>Validar que pasen todos los checks automáticos (CI, pruebas, análisis de seguridad)</li></ul> | Code review de seguridad, SAST/DAST automatizado, análisis de vulnerabilidades |
| Cierre | <ul><li>Hacer merge a la rama base una vez aprobado</li><li>Eliminar la rama remota (si aplica la política del equipo)</li><li>Eliminar la rama local</li><li>Verificar que el deployment automático fue exitoso (si aplica)</li><li>Actualizar el estado del ticket/issue a completado</li></ul> | Verificar deployment seguro, actualizar documentación de seguridad si aplica |

## Salidas

- Código integrado en rama principal
- Pull Request documentado y aprobado
- Historial de revisiones y aprobaciones
- Ticket/issue cerrado con trazabilidad
- Rama de trabajo eliminada (limpieza de repositorio)

---

## Estrategia de Branching: Git Flow

Git Flow es un modelo de branching que define una estructura clara de ramas para organizar el desarrollo, releases y correcciones de emergencia.

### Tipos de Ramas

```
main (producción)
│
├── hotfix/*          (correcciones urgentes en producción)
│
develop (integración)
│
├── feature/*         (nuevas funcionalidades)
├── bugfix/*          (corrección de bugs)
└── release/*         (preparación de releases)
```

### Descripción de Ramas

#### 1. Ramas Permanentes

**`main` (o `master`)**
- **Propósito:** Código en producción, siempre estable
- **Protección:** Altamente protegida, solo se integra mediante Pull Requests aprobados
- **Origen de:** Hotfixes, releases
- **Destino de:** Releases finales, hotfixes urgentes

**`develop`**
- **Propósito:** Rama de integración donde se juntan todas las funcionalidades en desarrollo
- **Protección:** Protegida, requiere Pull Requests
- **Origen de:** Features, bugfixes, releases
- **Destino de:** Integración continua del desarrollo

#### 2. Ramas Temporales

**`feature/*`**
- **Propósito:** Desarrollo de nuevas funcionalidades
- **Ciclo de vida:** Se crea desde `develop`, se integra de vuelta a `develop`
- **Duración:** Mientras dure el desarrollo de la funcionalidad (idealmente menos de 2 semanas)
- **Ejemplo:** `feature/user-authentication`, `feature/payment-gateway`

**`bugfix/*`**
- **Propósito:** Corrección de bugs encontrados en desarrollo (no en producción)
- **Ciclo de vida:** Se crea desde `develop`, se integra de vuelta a `develop`
- **Duración:** Corta, hasta corregir el bug
- **Ejemplo:** `bugfix/login-validation`, `bugfix/date-format-error`

**`hotfix/*`**
- **Propósito:** Correcciones urgentes en producción
- **Ciclo de vida:** Se crea desde `main`, se integra a `main` Y `develop`
- **Duración:** Muy corta, alta prioridad
- **Ejemplo:** `hotfix/critical-sql-injection`, `hotfix/payment-failure`

**`release/*`**
- **Propósito:** Preparación de una nueva versión para producción
- **Ciclo de vida:** Se crea desde `develop`, se integra a `main` y `develop`
- **Actividades:** Ajustes finales, actualización de versiones, documentación
- **Ejemplo:** `release/v1.2.0`, `release/2024-Q1`

---

## Nomenclatura de Ramas

### Formato Estándar

```
<tipo>/<descripcion-corta>
```

o con referencia a ticket:

```
<tipo>/<ticket-id>-<descripcion-corta>
```

### Convenciones

- Usar **minúsculas**
- Separar palabras con **guiones** (kebab-case)
- Ser **descriptivo pero conciso**
- Incluir **ID del ticket** si aplica
- **No usar** caracteres especiales (excepto `-` y `/`)

### Ejemplos por Tipo de Rama

| Tipo | Ejemplo | Cuándo Usar |
|------|---------|-------------|
| `feature/` | `feature/two-factor-auth` | Nueva funcionalidad de autenticación de dos factores |
| `feature/` | `feature/JIRA-123-user-profile` | Nueva funcionalidad con referencia a ticket JIRA-123 |
| `bugfix/` | `bugfix/fix-null-pointer-login` | Corregir error de null pointer en login (en develop) |
| `bugfix/` | `bugfix/ISSUE-456-date-validation` | Corregir validación de fechas, referencia a ISSUE-456 |
| `hotfix/` | `hotfix/critical-sql-injection` | Corregir inyección SQL crítica en producción |
| `hotfix/` | `hotfix/v1.2.1-session-leak` | Hotfix para versión 1.2.1, fuga de sesión |
| `release/` | `release/v1.3.0` | Preparación de release versión 1.3.0 |
| `release/` | `release/2025-january` | Release programado para enero 2025 |
| `chore/` | `chore/update-dependencies` | Actualización de dependencias (trabajo de mantenimiento) |
| `docs/` | `docs/update-api-documentation` | Actualización de documentación de API |

### Ejemplos de Nombres a Evitar

❌ `feature/NewFeature` (usar minúsculas)
❌ `fix/bug` (demasiado genérico)
❌ `feature/agregar_login` (usar guiones, no guiones bajos)
❌ `my-branch` (sin contexto del tipo de cambio)
❌ `test` (sin tipo ni descripción)

---

## Pull Requests Estructurados

### Propósito del Pull Request

Un Pull Request (PR) es más que solo integrar código:
- **Documentación** del cambio realizado
- **Punto de revisión** por pares (code review)
- **Validación automática** mediante CI/CD
- **Trazabilidad** de decisiones técnicas

### Estructura de un Pull Request

#### 1. Título del PR

Seguir el mismo formato que los commits (Conventional Commits):

```
<tipo>(<ámbito>): <descripción breve>
```

**Ejemplo:**
```
feat(auth): implementar autenticación de dos factores
```

#### 2. Descripción del PR

Usar una plantilla estructurada:

```markdown
## 📝 Descripción
[Breve descripción de qué hace este PR y por qué es necesario]

## 🎯 Tipo de Cambio
- [ ] Nueva funcionalidad (feature)
- [ ] Corrección de bug (bugfix)
- [ ] Corrección crítica (hotfix)
- [ ] Refactorización
- [ ] Cambio de documentación
- [ ] Cambio de seguridad

## 🔗 Issue/Ticket Relacionado
Fixes #123
Refs #456

## 💡 Solución Propuesta
[Explicación técnica de cómo se resuelve el problema]

## 🧪 Pruebas Realizadas
- [ ] Pruebas unitarias agregadas/actualizadas
- [ ] Pruebas de integración agregadas/actualizadas
- [ ] Pruebas manuales realizadas
- [ ] Análisis de seguridad ejecutado (SAST/SCA)

## 📸 Capturas de Pantalla (si aplica)
[Imágenes de UI antes/después, o resultados relevantes]

## ⚠️ Impacto y Riesgos
[Describir impacto en otras partes del sistema, breaking changes, riesgos]

## 🔒 Consideraciones de Seguridad
[Indicar si el cambio tiene implicaciones de seguridad, validaciones agregadas, etc.]

## ✅ Checklist
- [ ] El código sigue los estándares del proyecto
- [ ] Se ejecutaron pruebas y pasan correctamente
- [ ] Se actualizó la documentación relevante
- [ ] Los commits siguen Conventional Commits
- [ ] Se verificó que no hay secretos en el código
- [ ] Se agregaron/actualizaron pruebas necesarias
```

### Proceso de Revisión (Code Review)

1. **Asignación de revisores:**
   - Mínimo 1 revisor para cambios normales
   - Mínimo 2 revisores para cambios críticos o de seguridad
   - Incluir experto en seguridad si el cambio afecta autenticación, autorización, datos sensibles

2. **Criterios de aprobación:**
   - Código cumple estándares del proyecto
   - Pruebas cubren casos relevantes
   - No introduce vulnerabilidades de seguridad
   - Documentación actualizada
   - Todos los checks automáticos pasan

3. **Checks automáticos esperados:**
   - ✅ Build exitoso
   - ✅ Pruebas unitarias pasan
   - ✅ Pruebas de integración pasan
   - ✅ Análisis de código estático (linting)
   - ✅ Análisis de seguridad (SAST)
   - ✅ Análisis de dependencias (SCA)
   - ✅ Sin secretos detectados

4. **Tiempo de revisión:**
   - **Target:** Menos de 24 horas para PRs normales
   - **Prioridad alta:** Menos de 4 horas para hotfixes
   - Si un PR está pendiente por más de 48 horas, escalar al líder técnico

---

## Plataformas de Control de Versiones

### GitHub

**Características principales:**
- Pull Requests con revisión integrada
- GitHub Actions para CI/CD
- Branch protection rules (protección de ramas)
- Code owners (asignación automática de revisores)
- Security scanning integrado (Dependabot, Secret scanning)

**Terminología:**
- Pull Request (PR)
- Fork (para contribuciones externas)
- GitHub Flow (modelo simplificado de branching)

### Azure DevOps (Azure Repos)

**Características principales:**
- Pull Requests con políticas de rama
- Azure Pipelines para CI/CD
- Branch policies (políticas de protección)
- Required reviewers (revisores obligatorios)
- Work item integration (integración con tickets)

**Terminología:**
- Pull Request (PR)
- Branch policies (en lugar de "protection rules")
- Integración directa con Azure Boards

### Similitudes

Ambas plataformas ofrecen:
- Protección de ramas principales
- Revisión de código obligatoria
- Integración con CI/CD
- Análisis de seguridad
- Historial de cambios completo

### Diferencias Conceptuales Principales

| Aspecto | GitHub | Azure DevOps |
|---------|--------|--------------|
| Enfoque | Open source, comunidad | Enterprise, integración Microsoft |
| Integración | GitHub Actions, marketplace | Azure Pipelines, ecosistema Azure |
| Gestión de trabajo | GitHub Issues, Projects | Azure Boards (más robusto) |
| Naming | "Organization" | "Organization/Project" |

**Recomendación:** Independientemente de la plataforma, los conceptos de branching, commits y Pull Requests son los mismos. Elige según el ecosistema de tu organización.

---

## Aspectos de Seguridad de la Información

### Protección de Ramas

**Configuración mínima recomendada para `main` y `develop`:**

1. **Requerir Pull Requests:**
   - No permitir pushes directos
   - Todos los cambios mediante PR aprobado

2. **Revisores requeridos:**
   - Mínimo 1-2 aprobaciones
   - Revisión de experto en seguridad para cambios críticos

3. **Checks automáticos obligatorios:**
   - Build exitoso
   - Pruebas pasando
   - SAST sin vulnerabilidades críticas/altas
   - Sin secretos detectados

4. **Historial lineal (opcional):**
   - Requerir rebase en lugar de merge commits
   - Mantener historial limpio y trazable

5. **Firma de commits (recomendado):**
   - Verificar identidad mediante GPG/SSH
   - Trazabilidad de autor real del cambio

### Ramas de Seguridad

Para correcciones de vulnerabilidades críticas:

1. **Usar ramas privadas** si la vulnerabilidad no es pública
2. **Limitar acceso** solo a equipo de seguridad
3. **Coordinar divulgación** antes de hacer merge público
4. **Documentar en issue privado**, no en el PR público

### Auditoría y Trazabilidad

Las ramas y PRs contribuyen a:
- **Trazabilidad completa** de quién cambió qué y cuándo
- **Historial de decisiones** en comentarios de PRs
- **Auditoría de seguridad** mediante logs de aprobaciones
- **Cumplimiento** de controles de gestión de cambios

### Mapeo ISO 27002:2022

- **8.25** - Ciclo de vida de desarrollo seguro (revisión de código)
- **8.32** - Gestión de cambios (control mediante PRs)
- **5.33** - Registro de eventos (historial de commits y merges)
- **5.37** - Procedimientos operativos documentados (proceso de branching)
- **8.18** - Derechos de acceso (protección de ramas, revisores)

---

## Bibliografía

1. **A successful Git branching model (Git Flow)**
   Driessen, V. (2010, revisado 2024)
   [https://nvie.com/posts/a-successful-git-branching-model/](https://nvie.com/posts/a-successful-git-branching-model/)

2. **GitHub Flow**
   GitHub (2024)
   [https://docs.github.com/en/get-started/quickstart/github-flow](https://docs.github.com/en/get-started/quickstart/github-flow)

3. **Trunk Based Development**
   Hammant, P. (2024)
   [https://trunkbaseddevelopment.com/](https://trunkbaseddevelopment.com/)

4. **Accelerate: The Science of Lean Software and DevOps**
   Forsgren, N., Humble, J., & Kim, G. (2018)
   IT Revolution Press
   *Capítulo sobre integración continua y frecuencia de merges*

5. **Code Review Best Practices**
   Google Engineering Practices (2024)
   [https://google.github.io/eng-practices/review/](https://google.github.io/eng-practices/review/)

6. **Pull Request Best Practices**
   Atlassian (2024)
   [https://www.atlassian.com/git/tutorials/making-a-pull-request](https://www.atlassian.com/git/tutorials/making-a-pull-request)

7. **Azure DevOps Branch Policies**
   Microsoft (2024)
   [https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies](https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies)

8. **GitHub Branch Protection**
   GitHub (2024)
   [https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)

9. **OWASP Secure Coding Practices**
   OWASP Foundation (2024)
   [https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
   *Sección sobre control de versiones y revisión de código*

10. **ISO/IEC 27002:2022 - Information security controls**
    International Organization for Standardization (2022)
    Controles 8.25, 8.32, 5.33, 5.37, 8.18

---

**Última actualización:** Enero 2025
