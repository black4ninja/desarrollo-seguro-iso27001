---
sidebar_position: 2
---

# Creación de Commits

## Objetivo
Mantener un historial de cambios claro, trazable y útil que facilite la colaboración del equipo, la identificación de problemas y el cumplimiento de controles de seguridad de la información.

## Entradas

- Cambios en el código fuente
- Contexto del trabajo realizado (issue, ticket, user story)
- Pruebas que validan los cambios
- Revisión de seguridad básica (sin secretos, sin datos sensibles)

## Proceso

| Fase | Actividades | Aspectos de Seguridad |
|----------|----------|----------|
| Preparación | <ul><li>Revisar todos los cambios realizados en el working directory</li><li>Agrupar cambios relacionados lógicamente (un commit = una responsabilidad)</li><li>Ejecutar pruebas locales para verificar que no hay regresiones</li><li>Verificar que no se incluyen archivos o datos sensibles (credenciales, tokens, datos personales)</li></ul> | Verificación de secretos, validación de pruebas |
| Creación del Commit | <ul><li>Hacer staging solo de los archivos relacionados con el cambio lógico</li><li>Redactar el mensaje del commit siguiendo el estándar Conventional Commits</li><li>Incluir referencia al issue/ticket si aplica</li><li>Si el commit corrige una vulnerabilidad, incluir referencia al CVE o issue de seguridad</li></ul> | Trazabilidad de cambios de seguridad, referencia a vulnerabilidades |
| Revisión | <ul><li>Revisar el mensaje del commit antes de confirmarlo</li><li>Verificar que el mensaje sea claro y autoexplicativo</li><li>Confirmar que los archivos incluidos son los correctos</li><li>Si hay dudas sobre el impacto de seguridad, consultar con el equipo antes de hacer commit</li></ul> | Revisión de impacto de seguridad |

## Salidas

- Commit bien documentado en el historial
- Trazabilidad clara de cambios
- Facilidad para identificar origen de problemas (git blame, git bisect)
- Historial que facilita auditorías de seguridad

---

## Estándar de Commits: Conventional Commits

### Formato Principal

```
<tipo>[ámbito opcional]: <descripción>

[cuerpo opcional]

[nota(s) al pie opcional(es)]
```

### Tipos de Commit

| Tipo | Uso | Ejemplo |
|------|-----|---------|
| **feat** | Nueva funcionalidad para el usuario | `feat(auth): agregar autenticación de dos factores` |
| **fix** | Corrección de un bug | `fix(api): corregir validación de entrada en endpoint de login` |
| **security** | Corrección de vulnerabilidad de seguridad | `security(auth): mitigar inyección SQL en consulta de usuarios` |
| **docs** | Cambios en documentación | `docs(readme): actualizar instrucciones de instalación` |
| **style** | Cambios de formato (espacios, punto y coma, etc.) | `style(components): formatear código según prettier` |
| **refactor** | Refactorización de código sin cambiar funcionalidad | `refactor(services): extraer lógica de validación a servicio compartido` |
| **test** | Agregar o modificar pruebas | `test(auth): agregar pruebas unitarias para registro de usuarios` |
| **chore** | Cambios en build, dependencias, configuración | `chore(deps): actualizar dependencias de seguridad` |
| **perf** | Mejoras de rendimiento | `perf(database): optimizar consulta de usuarios activos` |
| **ci** | Cambios en CI/CD | `ci(github): agregar análisis de seguridad en pipeline` |
| **revert** | Revertir un commit anterior | `revert: revert "feat(api): nuevo endpoint de exportación"` |

### Ejemplos de Buenos Commits

✅ **Commit simple:**
```
feat(payment): agregar validación de tarjeta de crédito
```

✅ **Commit con alcance y descripción detallada:**
```
fix(auth): corregir fuga de sesión en logout

El token de sesión no se estaba revocando correctamente en el servidor,
permitiendo que sesiones antiguas permanecieran activas.

Fixes #234
```

✅ **Commit de seguridad con referencia:**
```
security(api): prevenir inyección SQL en búsqueda de productos

Implementa consultas parametrizadas para evitar SQL injection
en el endpoint de búsqueda.

Refs: CWE-89
Fixes #567
```

✅ **Commit con breaking change:**
```
feat(api)!: cambiar formato de respuesta de autenticación

BREAKING CHANGE: El endpoint /auth/login ahora retorna un objeto
con estructura { token, expiresIn, refreshToken } en lugar de solo el token.

Los clientes deben actualizar para usar la nueva estructura.
```

### Ejemplos de Commits a Evitar

❌ **Mensaje vago:**
```
fix: arreglar bug
```
*Problema: No indica qué se arregló ni dónde*

❌ **Mezcla de responsabilidades:**
```
feat: agregar login y actualizar documentación y corregir tests
```
*Problema: Debería ser 3 commits separados*

❌ **Sin contexto:**
```
update code
```
*Problema: No describe qué se actualizó ni por qué*

❌ **Mensaje no profesional:**
```
fix: arreglar cosa que no funcionaba lol
```
*Problema: Tono no profesional, falta de claridad*

---

## Otros Estándares de Referencia

### Angular Commit Convention
Similar a Conventional Commits, usado por el equipo de Angular. Define tipos estrictos y formato consistente.

- **Fuente:** [Angular Contributing Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md)
- **Diferencia principal:** Más estricto en el formato del ámbito (scope)

### Semantic Commit Messages (Gitmoji)
Variante que usa emojis para indicar el tipo de commit visualmente, mejorando la lectura del historial.

- **Fuente:** [Gitmoji](https://gitmoji.dev/)
- **Ejemplo:** `✨ feat: agregar autenticación OAuth`
- **Uso:** Popular en proyectos open source para hacer el historial más visual

### Karma Git Commit Msg
Estándar usado por el proyecto Karma, base para Conventional Commits.

- **Fuente:** [Karma Git Commit Msg](http://karma-runner.github.io/latest/dev/git-commit-msg.html)

---

## Buenas Prácticas: Commits Continuos

### ¿Por qué hacer commits frecuentes?

1. **Reducción de riesgo:** Cambios pequeños son más fáciles de revisar y revertir
2. **Mejor colaboración:** El equipo ve el progreso en tiempo real
3. **Facilita integración continua:** Detecta conflictos y errores tempranamente
4. **Mejora la trazabilidad:** Historial granular facilita entender la evolución del código
5. **Aumenta la calidad:** Commits pequeños fomentan revisión constante

### Frecuencia Recomendada

- **Mínimo:** Al menos 1 commit al día por desarrollador
- **Óptimo:** Múltiples commits pequeños (cada 1-2 horas de trabajo)
- **Regla de oro:** Si completaste una unidad lógica de trabajo, haz commit

### Integración Continua y Commits

Según Martin Fowler (2006, actualizado 2024), la integración continua requiere:
- Commits al menos diarios a la rama principal o de integración
- Cada commit debe pasar por un build automatizado
- Los defectos deben corregirse inmediatamente

> "La práctica principal de CI es que todos integren su trabajo frecuentemente, al menos diariamente. Esto reduce drásticamente los problemas de integración y permite desarrollar software cohesivo más rápidamente."
>
> — Martin Fowler, "Continuous Integration" (2024)

### Impacto en Seguridad

- **Auditoría mejorada:** Commits granulares facilitan auditorías de seguridad
- **Detección temprana:** Herramientas de seguridad (SAST, secret scanning) analizan cada commit
- **Reversión segura:** Fácil revertir cambios problemáticos sin afectar trabajo no relacionado
- **Cumplimiento:** Trazabilidad requerida por estándares como ISO 27001 (Control 8.32)

---

## Aspectos de Seguridad de la Información

### Verificación Antes del Commit

**Nunca incluir en commits:**
- Contraseñas, tokens, API keys
- Certificados o claves privadas
- Datos personales o sensibles
- Credenciales de bases de datos
- Configuraciones de producción con datos sensibles

**Herramientas de prevención:**
- [git-secrets](https://github.com/awslabs/git-secrets): Previene commits con secretos
- [detect-secrets](https://github.com/Yelp/detect-secrets): Detecta secretos en el código
- [gitleaks](https://github.com/gitleaks/gitleaks): Escaneo de secretos en repos Git
- Pre-commit hooks que ejecutan validaciones automáticas

### Commits de Seguridad

Cuando se corrige una vulnerabilidad:

1. **Usar tipo `security` o `fix` con descripción clara**
2. **Referenciar el CVE, CWE o issue de seguridad**
3. **No exponer detalles del exploit en el mensaje público** (usar issue privado)
4. **Considerar coordinar divulgación** si es vulnerabilidad crítica

**Ejemplo:**
```
security(auth): corregir bypass de autenticación en API

Valida correctamente el token antes de permitir acceso
a endpoints protegidos.

Refs: Internal Security Issue #SEC-2024-001
CWE-287: Improper Authentication
```

### Mapeo ISO 27002:2022

Aunque el proceso de commits es principalmente operacional, contribuye a:

- **8.25** - Ciclo de vida de desarrollo seguro
- **8.32** - Gestión de cambios
- **5.33** - Registro de eventos (trazabilidad de cambios)
- **5.37** - Procedimientos operativos documentados

---

## Bibliografía

1. **Conventional Commits Specification**
   Conventional Commits Contributors (2024)
   [https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)

2. **Continuous Integration**
   Fowler, M. (2024, última actualización)
   [https://martinfowler.com/articles/continuousIntegration.html](https://martinfowler.com/articles/continuousIntegration.html)

3. **Accelerate: The Science of Lean Software and DevOps**
   Forsgren, N., Humble, J., & Kim, G. (2018)
   IT Revolution Press
   *Evidencia empírica sobre frecuencia de commits y rendimiento del equipo*

4. **Git Best Practices: Commit Often, Perfect Later, Publish Once**
   Seth Robertson (2024, actualizado)
   [https://sethrobertson.github.io/GitBestPractices/](https://sethrobertson.github.io/GitBestPractices/)

5. **Semantic Versioning and Conventional Commits**
   SemVer Contributors (2024)
   [https://semver.org/](https://semver.org/)

6. **OWASP Code Review Guide**
   OWASP Foundation (2024)
   [https://owasp.org/www-project-code-review-guide/](https://owasp.org/www-project-code-review-guide/)
   *Sección sobre trazabilidad de cambios de seguridad*

7. **ISO/IEC 27002:2022 - Information security controls**
   International Organization for Standardization (2022)
   Controles 8.25, 8.32, 5.33, 5.37

---

**Última actualización:** Enero 2025
