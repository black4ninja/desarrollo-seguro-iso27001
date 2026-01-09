---
sidebar_position: 3
---

# Lab 2.3: Action Plan (AP)

## 🎯 ¿Qué es el Action Plan?

El **Action Plan (AP)** o **Plan de Acción** es el documento que traduce el Risk Treatment Plan (RTP) en acciones concretas y ejecutables para implementar los controles de seguridad seleccionados.

### Importancia para ISO 27001

El AP es fundamental para la implementación práctica del SGSI:

- 🎯 **Operacionaliza el RTP:** Convierte decisiones estratégicas en acciones tácticas
- 📋 **Define ejecución:** Especifica quién, cuándo y cómo se implementarán los controles
- ⚡ **Optimiza recursos:** Un control puede mitigar múltiples riesgos
- ✅ **Seguimiento de implementación:** Permite monitorear el progreso

### Relación entre RTP y AP

```
RTP (Risk Treatment Plan) → AP (Action Plan)
     "Qué riesgos tratar"  →  "Cómo implementar controles"
```

**Ejemplo práctico:**

- **RTP:** Identifica 5 riesgos diferentes que requieren "control de acceso físico"
- **AP:** Crea UN SOLO proyecto para "Implementar guardias de seguridad 24/7"
  - Este proyecto mitiga los 5 riesgos simultáneamente
  - Evita duplicar esfuerzos

### Características del Action Plan

El AP es a menudo un desarrollo o refinamiento del RTP:

- **Agrupa controles relacionados:** Un control puede aparecer múltiples veces en el RTP (uno por riesgo), pero solo una vez en el AP cuando se implementa
- **Detalla la ejecución:** Mientras el RTP dice "mitigar con control X", el AP especifica pasos, recursos, cronograma
- **Optimiza implementación:** Identifica sinergias entre controles que abordan múltiples riesgos

---

## ⏱️ Duración Estimada

**45 minutos** (15 min desglose + 20 min sprint planning + 10 min accountability)

---

## 💡 Contexto

Ya tienes un **Risk Treatment Plan (RTP)** con decisiones estratégicas sobre qué hacer con cada vulnerabilidad. Ahora necesitas convertir esas decisiones en un **plan ejecutable**.

**Pregunta clave:** ¿CÓMO implementamos esto en la realidad?

Este laboratorio te enseña a crear un **Action Plan** realista que tu equipo pueda ejecutar, no solo una lista de deseos.

---

## 📝 Parte 1: Desglose de Tareas (15 min)

### Paso 1: Convertir decisiones RTP en tareas ejecutables

Toma las vulnerabilidades con opción "**Modificar**" del RTP y desglósalas en tareas concretas.

**Ejemplo de conversión:**

**RTP dice:**
> V1: SQL Injection en ProductController → **Modificar** (4 horas estimadas)

**AP desglosa en:**

| ID Tarea | Descripción | Estimado | Responsable | Tipo | Dependencias |
|----------|-------------|----------|-------------|------|--------------|
| T1.1 | Refactorizar ProductController para usar consultas parametrizadas | 2h | Dev A | Desarrollo | Ninguna |
| T1.2 | Crear capa de validación de input para búsquedas de productos | 1.5h | Dev A | Desarrollo | T1.1 |
| T1.3 | Escribir unit tests para inyección SQL en ProductController | 1h | QA | Testing | T1.1 |
| T1.4 | Crear integration tests con payloads maliciosos | 1h | QA | Testing | T1.2 |
| T1.5 | Actualizar checklist de secure coding con "Usar parametrizadas" | 30min | Tech Lead | Documentación | T1.1 |
| T1.6 | Code review de cambios de seguridad | 1h | Dev B | Revisión | T1.1, T1.2 |
| T1.7 | Desplegar a staging y verificar | 30min | DevOps | Deployment | T1.3, T1.4, T1.6 |

**Total real:** 7.5 horas (no 4 horas como estimó el RTP)

---

### Paso 2: Agrupar controles que mitigan múltiples riesgos

**Optimización clave del AP:** Si varios riesgos se remedian con el mismo control, créalo UNA SOLA VEZ.

**Ejemplo:**

**RTP tiene:**
- V1: SQL Injection en ProductController
- V8: SQL Injection en OrderController
- V12: SQL Injection en UserController

**AP agrupa en UN proyecto:**

**Proyecto: "Implementar ORM y consultas parametrizadas en toda la aplicación"**
- Mitiga: V1, V8, V12 simultáneamente
- Esfuerzo: 12 horas (no 12h × 3 = 36 horas)
- Beneficio: Consistencia arquitectónica + reduce deuda técnica

---

### Paso 3: Crear proyectos del AP

Para CADA grupo de tareas relacionadas, crea un proyecto:

| Proyecto | Riesgos Mitigados | Tareas | Esfuerzo Total | Valor de Negocio |
|----------|-------------------|--------|----------------|------------------|
| **P1: Eliminar SQL Injections** | V1, V8, V12 | 7 tareas | 12h dev + 8h QA | 🔴 Crítico - evita compromiso de DB |
| **P2: Migrar a Azure Key Vault** | V2, V15 | 5 tareas | 8h dev + 2h ops | 🔴 Crítico - elimina secretos hardcodeados |
| **P3: Implementar rate limiting** | V3 (compensatorio) | 3 tareas | 4h dev | 🟡 Medio - parte de aceptación de riesgo |
| **P4: Agregar security headers** | V7, V11 | 2 tareas | 1h dev | 🔵 Bajo - mejora incremental |

---

## 📝 Parte 2: Sprint Planning Realista (20 min)

### Paso 4: Mapear proyectos a sprints

**Contexto del escenario:**
- Tu equipo tiene 2 desarrolladores
- Cada desarrollador tiene 60% de tiempo para seguridad (40% en features de negocio)
- Sprints de 2 semanas
- Auditoría ISO 27001 en 6 meses

**Calcular capacidad:**
```
Capacidad por sprint = 2 devs × 10 días × 8h × 60% = 96 horas
Menos: reuniones, imprevistos (20%) = 77 horas disponibles
```

### Ejemplo de planificación:

**Sprint 1 (Semanas 1-2): Prioridad P0**
| Proyecto | Esfuerzo | Responsible | Estado | Notas |
|----------|----------|-------------|--------|-------|
| P1: SQL Injections | 20h | Dev A + QA | 🟢 Fits | Crítico, debe ir primero |
| P2: Azure Key Vault | 10h | Dev B + Ops | 🟢 Fits | Paralelo a P1 |
| P3: Rate limiting (partial) | 4h | Dev A | 🟢 Fits | Si sobra tiempo |
| **Total estimado** | **34h** | | ✅ **Dentro de capacidad (77h)** | Buffer de 43h para imprevistos |

**Sprint 2 (Semanas 3-4): Prioridad P1**
| Proyecto | Esfuerzo | Responsible | Estado |
|----------|----------|-------------|--------|
| P3: Rate limiting (completo) | 8h | Dev A | 🟢 Fits |
| P5: Logging y monitoring | 16h | Dev B + Ops | 🟢 Fits |
| P6: Actualizar checklists | 4h | Tech Lead | 🟢 Fits |

**Sprint 3-6:** Proyectos P2-P4 (prioridad media/baja)

---

### Paso 5: Identificar dependencias y riesgos

**Tabla de dependencias:**

| Proyecto | Depende de | Bloqueador potencial | Mitigación |
|----------|------------|---------------------|------------|
| P2: Key Vault | Aprobación de Azure subscription | Procurement lento (2-4 semanas) | Solicitar aprobación HOY, no esperar a Sprint 1 |
| P5: Logging | P1 debe estar desplegado | Si P1 se retrasa | Preparar en paralelo, integrar después |
| P7: Pentesting | P1, P2, P3 completos | No se puede testear antes de fix | Agendar para Sprint 3 |

---

### Paso 6: Definir "Definition of Done"

Para CADA tarea/proyecto, especifica criterios de completitud:

**Ejemplo - Proyecto P1 (SQL Injections):**

**Definition of Done:**
- [x] Código refactorizado para usar consultas parametrizadas en ProductController, OrderController, UserController
- [x] Cero resultados de SAST (SonarQube) para CWE-89 (SQL Injection)
- [x] Unit tests cubren casos de inyección (mínimo 5 payloads maliciosos por controller)
- [x] Integration tests pasan en staging
- [x] Code review aprobado por 2 personas (incluyendo 1 senior)
- [x] Checklist de secure coding actualizado con nueva práctica
- [x] Documentación técnica actualizada (diagrama de arquitectura)
- [x] Desplegado a producción SIN incidentes
- [x] Monitoring configurado (alertas si query time > 2s)
- [x] Post-deployment verification (smoke tests) pasan

**NO está "done" si:**
- ❌ Solo cambiaste el código pero no hay tests
- ❌ Los tests fallan en staging
- ❌ No hubo code review
- ❌ La documentación no se actualizó

---

## 📝 Parte 3: Definir Accountability (10 min)

### Paso 7: Asignar ownership y tracking

**Tabla de Accountability:**

| Proyecto | Owner Principal | Backup | Reviewer | Fecha Inicio | Fecha Objetivo | Status Tracking |
|----------|----------------|--------|----------|--------------|----------------|-----------------|
| P1: SQL Injections | Dev A | Dev C | Tech Lead | Sprint 1, Día 1 | Sprint 1, Día 9 | Jira Epic SEC-101 |
| P2: Key Vault | Dev B | DevOps | Security Lead | Sprint 1, Día 1 | Sprint 1, Día 10 | Jira Epic SEC-102 |
| P3: Rate Limiting | Dev A | Dev B | Tech Lead | Sprint 2, Día 1 | Sprint 2, Día 5 | Jira Epic SEC-103 |

**Reglas de accountability:**
1. **Owner** es responsable de ejecutar y coordinar
2. **Backup** toma el rol si Owner no está disponible (vacaciones, enfermedad)
3. **Reviewer** valida que cumple Definition of Done
4. **Fecha objetivo** es compromiso de equipo (no del owner solo)

---

### Paso 8: Crear mecanismo de seguimiento

**Reuniones de seguimiento:**
- **Daily standup:** Actualización de progreso en tareas de seguridad (5 min diarios)
- **Weekly security review:** Revisar dashboard, ajustar prioridades (30 min semanal)
- **Sprint retrospective:** ¿Qué aprendimos? ¿Ajustar estimados? (1 hora cada 2 semanas)

**Dashboard de métricas:**

| Métrica | Valor Actual | Objetivo | Tendencia |
|---------|--------------|----------|-----------|
| Vulnerabilidades Críticas Abiertas | 5 | 0 | 🔴 ↓ (era 8 hace 2 semanas) |
| % Tareas completadas on-time | 75% | 90% | 🟡 → |
| Tiempo promedio de remediación | 12 días | 7 días | 🟡 ↓ |
| Cobertura de tests de seguridad | 45% | 80% | 🟢 ↑ |

---

### Paso 9: Plan de contingencia

**¿Qué pasa si...?**

| Riesgo | Impacto | Probabilidad | Plan B |
|--------|---------|--------------|--------|
| Dev A se enferma en Sprint 1 | 🔴 Alto | 🟡 Media | Dev C (backup) asume P1. Extender sprint 2 días. |
| Azure Key Vault no se aprueba a tiempo | 🔴 Alto | 🟠 Alta | Plan B: Usar variables de entorno + secretos de Kubernetes hasta que aprueben |
| Se descubre nueva vulnerabilidad crítica | 🔴 Alto | 🟡 Media | Pausar P3-P4, reasignar Dev B a nueva vulnerabilidad |
| Tests fallan en staging | 🟠 Medio | 🟠 Alta | NO desplegar a prod. Abrir hotfix sprint. Comunicar a stakeholders delay de 3 días. |

---

## 📦 Entregable

**Action Plan (AP)** completo que incluya:

### 1. Desglose Completo de Tareas
- Todas las vulnerabilidades "Modificar" del RTP convertidas en tareas ejecutables
- Tareas agrupadas en proyectos (eliminando duplicados)
- Estimados realistas con buffer para imprevistos
- Tipos de tarea identificados (Dev, QA, Ops, Docs, Review)

### 2. Sprint Planning con Capacidad Real
- Mapeo de proyectos a sprints (considerando capacidad del equipo)
- Timeline realista desde hoy hasta auditoría
- Cálculo de capacidad por sprint (horas disponibles)
- Buffer para trabajo no planificado (mínimo 20%)

### 3. Matriz de Dependencias
- Dependencias técnicas entre proyectos
- Dependencias externas (aprobaciones, compras, etc.)
- Bloqueadores potenciales identificados
- Planes de mitigación para cada bloqueador

### 4. Definition of Done por Proyecto
- Criterios claros y verificables
- No solo "código completo" sino también tests, docs, deployment
- Checklist de aprobación (code review, security review, etc.)
- Criterios de NO done explícitos

### 5. Tabla de Accountability
- Owner, Backup, y Reviewer asignados para cada proyecto
- Fechas de inicio y objetivo
- Referencia a tracking system (Jira, GitHub Projects, etc.)
- Reglas de escalación si hay retrasos

### 6. Dashboard de Seguimiento
- Métricas clave (vulnerabilidades abiertas, % completado, tiempo de remediación)
- Valores actuales, objetivos, y tendencias
- Frecuencia de revisión (daily, weekly, sprint)

### 7. Plan de Contingencia
- Riesgos de ejecución identificados (personas, procurement, technical)
- Impacto y probabilidad de cada riesgo
- Plan B para los riesgos más críticos

### 8. Gantt Chart o Roadmap Visual
- Timeline visual de todos los proyectos
- Hitos clave (auditoría, deployments mayores)
- Código de colores por prioridad (P0=rojo, P1=naranja, etc.)

---

## 🎯 Criterios de Éxito

Tu Action Plan está completo cuando:

- ✅ El 100% de decisiones "Modificar" del RTP tienen tareas ejecutables
- ✅ Los proyectos están agrupados (no hay duplicación de esfuerzo)
- ✅ La suma de esfuerzo estimado cabe en la capacidad del equipo
- ✅ Hay buffer de al menos 20% para imprevistos
- ✅ Todas las dependencias están identificadas y tienen mitigación
- ✅ Cada proyecto tiene Definition of Done clara y verificable
- ✅ Hay owners, backups, y reviewers asignados (accountability)
- ✅ El plan es defendible ante dirección ("¿por qué no podemos hacerlo más rápido?")
- ✅ Hay métricas para medir progreso y éxito
- ✅ Los riesgos de ejecución tienen Plan B

**El test final:** ¿Podrías entregar este AP a tu equipo mañana y empezar a ejecutar? Si la respuesta es no, falta detalle.

---

## 📚 Referencias

- **ISO 27001:2022 Cláusula 6.1.3:** Risk treatment (incluye implementación)
- **ISO 27001:2022 Cláusula 6.2:** Information security objectives and planning
- **ISO 27002:2022:** Guía de implementación de controles
- **PMBOK / Project Management:** Mejores prácticas de planificación de proyectos

---

**Versión:** 1.0
**Última actualización:** Enero 2025
