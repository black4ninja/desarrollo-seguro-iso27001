---
sidebar_position: 4
---

# Template: Reporte de Auditoría de Seguridad

## Información General

| Campo | Valor |
|-------|-------|
| **Proyecto** | [Nombre del proyecto] |
| **Tipo de Auditoría** | [ ] Code Review [ ] Inspección [ ] Pentesting [ ] SAST [ ] DAST |
| **Fecha de Auditoría** | [DD/MM/YYYY] |
| **Auditor(es)** | [Nombres] |
| **Alcance** | [Archivos, componentes o funcionalidades auditadas] |
| **Versión del Código** | [Commit hash o tag] |

---

## Resumen Ejecutivo

### Hallazgos por Severidad

| Severidad | Cantidad | % |
|-----------|----------|---|
| 🔴 **Crítica** | 0 | 0% |
| 🟠 **Alta** | 0 | 0% |
| 🟡 **Media** | 0 | 0% |
| 🔵 **Baja** | 0 | 0% |
| ℹ️ **Informativa** | 0 | 0% |
| **TOTAL** | 0 | 100% |

### Estado de Cumplimiento

- **Vulnerabilidades Críticas Bloqueantes**: [X]
- **Cumple estándares mínimos de seguridad**: [ ] Sí [ ] No
- **Recomendación**: [ ] Aprobar [ ] Aprobar con correcciones [ ] Rechazar

---

## Hallazgos Detallados

### [ID] - [Título del Hallazgo]

**Severidad**: 🔴 Crítica / 🟠 Alta / 🟡 Media / 🔵 Baja / ℹ️ Informativa

**Archivo/Ubicación**: `[ruta/del/archivo.cs:línea]`

**Descripción**:
[Explicación clara del problema de seguridad identificado]

**Evidencia (Código Vulnerable)**:
```csharp
// Código vulnerable aquí
```

**Impacto**:
- [ ] Compromiso de confidencialidad
- [ ] Compromiso de integridad
- [ ] Compromiso de disponibilidad
- [ ] Exposición de datos sensibles
- [ ] Escalación de privilegios
- [ ] Otro: _________________

**Riesgo**:
[Explicación del riesgo que representa esta vulnerabilidad]

**Mapeo**:
- **OWASP Top 10**: [A01, A02, etc.]
- **CWE**: [CWE-XXX]
- **ISO 27002:2022**: [Control X.XX]

**Recomendación**:
[Solución específica y accionable]

**Código Remediado (Ejemplo)**:
```csharp
// Código seguro aquí
```

**Prioridad de Remediación**: P0 (Inmediata) / P1 (Sprint actual) / P2 (Próximo sprint) / P3 (Backlog)

**Fecha Límite Sugerida**: [DD/MM/YYYY]

---

## Hallazgos Positivos (Buenas Prácticas Identificadas)

1. ✅ [Práctica de seguridad implementada correctamente]
2. ✅ [Otra práctica positiva]

---

## Estadísticas de Cobertura

### Archivos Auditados

| Componente | Archivos Revisados | Vulnerabilidades | Estado |
|------------|-------------------|------------------|--------|
| Controllers | 5 | 8 | ⚠️ Requiere correcciones |
| Services | 3 | 2 | ✅ Aceptable |
| Models | 4 | 0 | ✅ Seguro |
| Configuration | 2 | 3 | ⚠️ Requiere correcciones |

### Cobertura por Categoría OWASP

| Categoría | Vulnerabilidades Encontradas | Estado |
|-----------|----------------------------|--------|
| A01: Broken Access Control | 3 | ⚠️ |
| A02: Cryptographic Failures | 1 | ⚠️ |
| A03: Injection | 2 | 🔴 |
| A04: Insecure Design | 0 | ✅ |
| A05: Security Misconfiguration | 4 | ⚠️ |
| A06: Vulnerable Components | 1 | ⚠️ |
| A07: Authentication Failures | 1 | 🔴 |
| A08: Software and Data Integrity | 0 | ✅ |
| A09: Security Logging Failures | 2 | ⚠️ |
| A10: Server-Side Request Forgery | 0 | ✅ |

---

## Plan de Remediación Recomendado

### Sprint Actual (Prioridad P0 - Críticas)

| ID | Vulnerabilidad | Responsable | Esfuerzo Estimado | Fecha Objetivo |
|----|---------------|-------------|-------------------|----------------|
| V1 | [Título] | [Nombre] | [X horas] | [DD/MM] |
| V2 | [Título] | [Nombre] | [X horas] | [DD/MM] |

### Siguiente Sprint (Prioridad P1 - Altas)

| ID | Vulnerabilidad | Responsable | Esfuerzo Estimado | Fecha Objetivo |
|----|---------------|-------------|-------------------|----------------|
| V3 | [Título] | [Nombre] | [X horas] | [DD/MM] |

### Backlog (Prioridad P2-P3)

[Lista de vulnerabilidades de menor prioridad]

---

## Métricas de Calidad

- **Densidad de Defectos**: [X vulnerabilidades / 1000 líneas de código]
- **Tiempo Promedio de Remediación Estimado**: [X horas/días]
- **Índice de Riesgo Global**: [Bajo / Medio / Alto / Crítico]

---

## Recomendaciones Generales

1. **Capacitación**: [Áreas donde el equipo necesita capacitación]
2. **Procesos**: [Mejoras en procesos de desarrollo]
3. **Herramientas**: [Herramientas adicionales recomendadas]
4. **Checklists**: [Checklists que deben actualizarse]

---

## Anexos

### A. Configuración de Herramientas Utilizadas

[Detalles de configuración de SonarQube, OWASP ZAP, etc.]

### B. Logs de Escaneo

[Outputs relevantes de herramientas automatizadas]

### C. Referencias

- [OWASP Top 10 2021](https://owasp.org/Top10/)
- [ISO 27002:2022](https://www.iso.org/standard/75652.html)
- [CWE Top 25](https://cwe.mitre.org/top25/)

---

## Firmas

| Rol | Nombre | Firma | Fecha |
|-----|--------|-------|-------|
| **Auditor Principal** | | | |
| **Revisor Técnico** | | | |
| **Aprobador (Tech Lead)** | | | |

---

**Versión del Template**: 1.0
**Última Actualización**: Enero 2025
