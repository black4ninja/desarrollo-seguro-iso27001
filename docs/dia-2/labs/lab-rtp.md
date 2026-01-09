---
sidebar_position: 2
---

# Lab 2.3: Risk Treatment Plan (RTP)

## 🎯 ¿Qué es el RTP?

El **Risk Treatment Plan (RTP)** o **Plan de Tratamiento de Riesgos** es un documento fundamental en ISO 27001 que define cómo una organización abordará los riesgos de seguridad de la información identificados durante el análisis de riesgos.

### Importancia para ISO 27001

El RTP es un requisito obligatorio de la norma ISO 27001:2022 (Cláusula 6.1.3) y cumple las siguientes funciones:

- 📋 **Documenta decisiones de riesgo:** Registra qué hacer con cada riesgo identificado
- 🎯 **Define acciones concretas:** Especifica controles y medidas de mitigación
- 📊 **Prioriza recursos:** Ayuda a asignar presupuesto y esfuerzo según criticidad
- ✅ **Evidencia para auditoría:** Demuestra gestión sistemática de riesgos

### Opciones de Tratamiento de Riesgos

Según ISO 27001, existen 4 opciones para tratar un riesgo:

1. **Mitigar** - Implementar controles para reducir el riesgo
2. **Transferir** - Compartir el riesgo con terceros (seguros, outsourcing)
3. **Evitar** - Eliminar la actividad que genera el riesgo
4. **Aceptar** - Asumir el riesgo conscientemente (con aprobación de dirección)

---

## ⏱️ Duración Estimada

**60 minutos** (15 min consolidación + 30 min decisiones + 15 min priorización)

---

## 💡 Contexto

En los laboratorios anteriores has identificado múltiples vulnerabilidades:
- **Lab 1.1:** 7 vulnerabilidades mapeadas a ISO 27002 y OWASP
- **Lab 2 (Inspección):** Defectos encontrados en componente real
- **Lab 3 (Análisis):** Métricas y patrones de defectos
- **Lab 5 (Code Review):** 15+ hallazgos de seguridad en PR

**Pregunta clave:** ¿Qué hacemos con TODO esto?

Este laboratorio te enseña a tomar **decisiones estratégicas de tratamiento de riesgo** según ISO 27001, no solo listar problemas.

---

## 📝 Parte 1: Consolidar Hallazgos (15 min)

### Paso 1: Reunir todas las vulnerabilidades

Crea una lista consolidada de TODAS las vulnerabilidades encontradas en labs anteriores. Usa esta tabla:

| ID | Vulnerabilidad | Fuente Lab | Severidad Técnica | Activo Afectado | Proceso de Negocio |
|----|----------------|------------|-------------------|-----------------|-------------------|
| V1 | SQL Injection | Lab 1.1 | 🔴 Crítica | Base de datos productos | Catálogo e-commerce |
| V2 | Credenciales hardcodeadas | Lab 1.1 | 🔴 Crítica | Servidor aplicación | Toda la aplicación |
| V3 | IDOR en órdenes | Lab 1.1 | 🟠 Alta | Base de datos órdenes | Proceso de compra |
| ... | ... | ... | ... | ... | ... |

**Instrucciones:**
1. Revisa tus matrices/reportes de labs anteriores
2. Agrupa vulnerabilidades similares (ej: si encontraste SQL injection en Lab 1.1 y Code Review, agrúpalas)
3. Identifica el **activo afectado** (del inventario de activos del Día 4)
4. Mapea al **proceso de negocio** impactado

---

## 📝 Parte 2: Aplicar Opciones de Tratamiento ISO 27005 (30 min)

### Las 4 Opciones de Tratamiento

Según ISO 27005, para CADA riesgo puedes:

#### 1. 🛠️ Modificar (Mitigar)
Implementar controles para reducir el riesgo.
- **Cuándo usarla:** Riesgo alto/crítico en proceso importante
- **Costo:** Variable (desde horas hasta semanas de desarrollo)
- **Ejemplo:** Fix SQL injection con consultas parametrizadas

#### 2. 📋 Retener (Aceptar)
Asumir el riesgo conscientemente sin más acciones.
- **Cuándo usarla:** Costo de mitigación > beneficio, o riesgo muy bajo
- **Requisito:** Aprobación formal de dirección + controles compensatorios
- **Ejemplo:** IDOR en feature poco usado, pero agregar logging extensivo

#### 3. 🚫 Evitar (Eliminar)
Eliminar la actividad/funcionalidad que genera el riesgo.
- **Cuándo usarla:** Feature no es crítica para el negocio
- **Costo:** Impacto funcional (perder la feature)
- **Ejemplo:** Desactivar API endpoint vulnerable que no se usa en producción

#### 4. 🤝 Compartir (Transferir)
Transferir el riesgo a tercero (seguro, outsourcing, SaaS).
- **Cuándo usarla:** Existe solución managed confiable
- **Costo:** Suscripción mensual / seguro
- **Ejemplo:** Reemplazar autenticación custom con Auth0 / Azure AD

---

### Paso 2: Tomar decisiones de tratamiento

Para CADA vulnerabilidad de tu lista consolidada, completa esta tabla:

| ID | Vulnerabilidad | Severidad | Impacto Negocio | Opción Tratamiento | Justificación | Costo Estimado | Controles Compensatorios |
|----|----------------|-----------|-----------------|-------------------|---------------|----------------|-------------------------|
| V1 | SQL Injection en ProductController | 🔴 Crítica | Alto - Catálogo es core | 🛠️ Modificar | Explotable remotamente, daño a reputación | 4 horas dev | N/A |
| V2 | Credenciales hardcodeadas | 🔴 Crítica | Alto - Toda app | 🤝 Compartir | Migrar a Azure Key Vault | $50/mes + 8h migración | N/A |
| V3 | IDOR en OrderController | 🟠 Alta | Medio - Solo 5% pedidos | 📋 Retener | Fix costoso, bajo volumen | $0 | Logging + alertas + revisión semanal |
| V4 | Debug mode en producción | 🟡 Media | Bajo - Exposición limitada | 🛠️ Modificar | Fix trivial | 15 minutos | N/A |
| V5 | Missing security headers | 🔵 Baja | Muy bajo | 🚫 Evitar | Feature experimental sin usar | $0 (deshabilitar) | N/A |

**Criterios para tu decisión:**

```
Prioridad = (Severidad Técnica × Impacto Negocio) / (Costo Remediación + Esfuerzo)

Considera:
- ¿Qué tan probable es la explotación?
- ¿Cuál es el impacto real al negocio? (no solo técnico)
- ¿Cuánto cuesta arreglarlo vs cuánto perdemos si nos hackean?
- ¿Hay alternativas más económicas? (transferir, evitar)
```

---

### Paso 3: Documentar Aceptaciones de Riesgo

Para CADA vulnerabilidad con opción **Retener**, crea una carta de aceptación formal:

```markdown
## Carta de Aceptación de Riesgo #003

**Fecha:** [Fecha actual]
**Riesgo ID:** V3
**Descripción:** IDOR (Insecure Direct Object Reference) en OrderController.cs permite a usuarios ver órdenes de otros sin validación de ownership.

**Análisis de Riesgo:**
- Severidad técnica: Alta (OWASP A01, CWE-639)
- Probabilidad de explotación: Media (requiere enumerar IDs)
- Impacto de negocio: Medio ($5,000 - $50,000 en caso de explotación)
- Volumen afectado: ~5% de órdenes (feature poco usada)

**Decisión de Tratamiento:**
Se decide **RETENER** (aceptar) este riesgo por las siguientes razones:
1. El costo de remediar correctamente es alto (40 horas de refactorización + 20 horas de testing)
2. La funcionalidad afectada se usa en <5% de transacciones
3. No se han identificado intentos de explotación en logs históricos

**Controles Compensatorios Implementados:**
1. ✅ Logging extensivo de accesos a /api/order/{id} (ISO 27002 Control 8.15)
2. ✅ Alertas automáticas si un usuario accede >10 órdenes en 1 minuto (8.16 Monitoring)
3. ✅ Revisión manual semanal de logs de acceso a órdenes (8.16)
4. ✅ Rate limiting en API de órdenes (5 req/segundo) (8.23)

**Período de Aceptación:**
- Válido por: 6 meses (hasta [Fecha + 6 meses])
- Revisión obligatoria: Mensual en comité de seguridad
- Reevaluar si: Volumen de uso aumenta >20%, o se detecta explotación

**Aprobaciones Requeridas:**
- [ ] CISO / Responsable de Seguridad: _________________
- [ ] Product Owner: _________________
- [ ] Dirección / Management: _________________

**Fecha de aprobación:** __________
```

---

## 📝 Parte 3: Priorización Estratégica (15 min)

### Paso 4: Matriz de Priorización

NO todas las vulnerabilidades "Críticas" deben arreglarse primero. Usa criterio de negocio.

Crea una matriz de priorización:

| Prioridad | Vulnerabilidad | Opción | Justificación Estratégica | Sprint/Timeline |
|-----------|----------------|--------|---------------------------|-----------------|
| **P0 (AHORA)** | SQL Injection | Modificar | Explotable remotamente sin autenticación, alto impacto reputacional | Sprint actual (esta semana) |
| **P0 (AHORA)** | Credenciales hardcodeadas | Compartir | Compromiso total de sistema si se filtran al repositorio público | Sprint actual |
| **P1 (30 días)** | IDOR | Retener | Riesgo aceptado con compensatorios, revisar en 30 días | Backlog seguridad |
| **P2 (60 días)** | Missing Auth en endpoint | Modificar | Endpoint interno, VPN requerida | Sprint 2 |
| **P3 (90 días)** | Weak crypto (MD5) | Modificar | Datos no críticos, migración a SHA-256 planificada | Q2 roadmap |
| **P4 (Backlog)** | Security headers | Modificar | Mejora incremental, bajo riesgo | Cuando haya tiempo |

### Paso 5: Calcular Reducción de Riesgo

Estima el nivel de riesgo **antes** y **después** del tratamiento:

| ID | Vulnerabilidad | Riesgo Inicial | Tratamiento | Riesgo Residual | Reducción |
|----|----------------|----------------|-------------|-----------------|-----------|
| V1 | SQL Injection | 🔴 Crítico (9.8/10) | Modificar → Parametrizar queries | 🟢 Muy bajo (1.0/10) | -90% |
| V2 | Hardcoded creds | 🔴 Crítico (9.5/10) | Compartir → Azure Key Vault | 🟡 Bajo (2.0/10) | -79% |
| V3 | IDOR | 🟠 Alto (7.5/10) | Retener + Compensatorios | 🟡 Medio (5.0/10) | -33% |

**Objetivo:** Reducir riesgo total de la aplicación de **8.5/10** a **2.5/10** después de implementar el RTP.

---

## 📦 Entregable

**Risk Treatment Plan (RTP)** completo que incluya:

### 1. Lista Consolidada de Vulnerabilidades
- Todas las vulnerabilidades de labs anteriores
- Mapeadas a activos y procesos de negocio
- Agrupadas y sin duplicados

### 2. Decisiones de Tratamiento
- Tabla con opción de tratamiento para CADA vulnerabilidad
- Justificación estratégica de cada decisión
- Costo estimado de implementación
- Controles compensatorios (para riesgos retenidos)

### 3. Cartas de Aceptación de Riesgo
- Documento formal para CADA riesgo retenido
- Aprobaciones de dirección/management
- Controles compensatorios detallados
- Período de validez y revisión

### 4. Matriz de Priorización
- Orden de implementación (P0, P1, P2, P3, P4)
- Timeline realista (sprints, quarters)
- Justificación de negocio (no solo técnica)

### 5. Métricas de Reducción de Riesgo
- Nivel de riesgo inicial vs residual
- % de reducción esperada
- KPIs de seguimiento

---

## 🎯 Criterios de Éxito

Tu RTP está completo cuando:

- ✅ El 100% de vulnerabilidades encontradas tienen una decisión de tratamiento
- ✅ Cada decisión tiene justificación estratégica (no solo "es crítico, hay que arreglarlo")
- ✅ Los riesgos retenidos tienen carta de aceptación formal + compensatorios
- ✅ La priorización considera impacto de negocio, no solo severidad técnica
- ✅ Hay un timeline realista (no "arreglarlo todo la próxima semana")
- ✅ Dirección/Management aprobaría este plan (es defendible en auditoría)

---

## 📦 Entregable

**Risk Treatment Plan (RTP)** que incluya:

1. ✅ Lista de riesgos identificados
2. ✅ Opción de tratamiento seleccionada para cada riesgo
3. ✅ Controles ISO 27002 asignados
4. ✅ Responsables y fechas de implementación
5. ✅ Nivel de riesgo antes y después del tratamiento

---

## 📚 Referencias

- **ISO 27001:2022 Cláusula 6.1.3:** Risk treatment
- **ISO 27005:** Information security risk management
- **Anexo A ISO 27001:2022:** Controles de referencia

---

**Versión:** 1.0
**Última actualización:** Enero 2025
