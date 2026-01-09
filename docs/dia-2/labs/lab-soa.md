---
sidebar_position: 4
---

# Lab 2.3: Statement of Applicability (SOA)

## 🎯 ¿Qué es el SOA?

El **Statement of Applicability (SOA)** o **Declaración de Aplicabilidad** es el documento oficial de ISO 27001 que registra qué controles de seguridad del Anexo A se implementan en la organización, cuáles no, y por qué.

### Importancia para ISO 27001

El SOA es uno de los documentos **más importantes y obligatorios** de ISO 27001:2022 (Cláusula 6.1.3.d):

- 🔐 **Documento vivo del SGSI:** Evoluciona con la organización
- 📋 **Requisito de certificación:** Sin SOA no hay certificación
- 🎯 **Conexión riesgos-controles:** Vincula análisis de riesgos con controles
- ✅ **Evidencia central de auditoría:** Auditores verifican 100% de los controles listados

### Relación con RTP y Análisis de Riesgos

El SOA es el resultado de:

```
Análisis de Riesgos → RTP (Risk Treatment Plan) → SOA (Statement of Applicability)
```

1. **Análisis de riesgos:** Identifica amenazas y vulnerabilidades
2. **RTP:** Define cómo tratar cada riesgo (mitigar, transferir, evitar, aceptar)
3. **SOA:** Selecciona controles específicos para mitigar riesgos

### Contenido del SOA

El SOA debe incluir para cada uno de los **93 controles del Anexo A**:

| Campo | Descripción |
|-------|-------------|
| **Control** | ID y nombre del control (ej. 5.1 - Políticas de seguridad) |
| **Aplicable** | Sí / No |
| **Justificación** | Por qué aplica o se excluye |
| **Estado** | No implementado / Parcial / Implementado |
| **Riesgos relacionados** | Qué riesgos del RTP mitiga |
| **Responsable** | Quién implementa/mantiene el control |
| **Fecha objetivo** | Cuándo se implementará (si no está implementado) |
| **Evidencia** | Dónde se documenta la implementación |

### SOA vs AP (Applicability Statement)

**Son el mismo documento**, solo cambia el nombre:

- **SOA** = Término oficial en ISO 27001
- **AP** = Abreviación informal usada en la industria

En este curso usamos ambos términos indistintamente.

---

## ⏱️ Duración Estimada

**60 minutos** (10 min familiarización + 35 min evaluación de controles + 15 min trazabilidad)

---

## 💡 Contexto

Ya tienes un **Risk Treatment Plan (RTP)** con decisiones estratégicas y un **Action Plan (AP)** con proyectos ejecutables. Ahora necesitas el documento oficial de ISO 27001 que justifica formalmente **qué controles se implementan y por qué**.

**Pregunta clave:** ¿CÓMO demostramos a un auditor que nuestro SGSI es completo y está justificado?

Este laboratorio te enseña a crear un **Statement of Applicability** defendible ante auditorías ISO 27001.

---

## 📋 Requisitos Previos

**IMPORTANTE:** Este laboratorio requiere **acceso oficial a ISO 27001:2022** para consultar el Anexo A completo (93 controles).

### Opciones para obtener el estándar ISO 27001:2022:

1. **Suscripción institucional** (recomendado)
   - Muchas universidades y empresas tienen acceso a través de bibliotecas digitales
   - Consulta con tu institución educativa o empresa

2. **Compra individual**
   - Sitio oficial de ISO: https://www.iso.org/standard/27001
   - Tiendas autorizadas de estándares (ISO Store, ANSI, BSI, etc.)
   - Costo aproximado: $100-200 USD

3. **Versiones de prueba/educativas**
   - Algunas organizaciones ofrecen versiones educativas con descuento
   - Consulta programas académicos de ISO

4. **Recursos gratuitos complementarios** (NO reemplazan el estándar oficial)
   - [ISO 27002:2022 Control Titles (publicado por ISO)](https://www.iso.org/standard/75652.html) - Solo títulos, sin contenido
   - Guías públicas de implementación (no oficiales)

**Nota legal:** Este laboratorio enseña la **metodología** de evaluación usando ejemplos bajo fair use educativo. Para implementación real, **debes consultar el estándar oficial**.

---

## 📝 Parte 1: Familiarización con Anexo A (10 min)

### Paso 1: Estructura del Anexo A ISO 27001:2022

El Anexo A de ISO 27001:2022 contiene **93 controles** organizados en **4 categorías temáticas**:

| Categoría | Rango | Total | Temas Principales |
|-----------|-------|-------|-------------------|
| **5. Organizational controls** | 5.1 - 5.37 | 37 controles | Políticas, RRHH, gestión de activos, control de acceso, continuidad |
| **6. People controls** | 6.1 - 6.8 | 8 controles | Screening, acuerdos de confidencialidad, concienciación, capacitación |
| **7. Physical controls** | 7.1 - 7.14 | 14 controles | Perímetros físicos, seguridad de equipos, disposición segura, monitoreo |
| **8. Technological controls** | 8.1 - 8.34 | 34 controles | Dispositivos, cifrado, desarrollo seguro, logging, backup, redes |

**IMPORTANTE:** Tu SOA debe evaluar **los 93 controles** uno por uno. No puedes ignorar ninguno sin justificación.

**Para consultar el detalle completo de cada control, debes acceder al estándar ISO 27001:2022 oficial** (ver sección "Requisitos Previos" arriba).

---

### Paso 2: Descargar plantilla SOA

Usa esta estructura base para tu SOA:

| Control | Nombre | Aplicable | Estado | Justificación | Riesgos Mitigados | Responsable | Fecha Objetivo | Evidencia |
|---------|--------|-----------|--------|---------------|-------------------|-------------|----------------|-----------|
| 5.1 | Políticas de seguridad | Sí | Implementado | Toda org necesita políticas | N/A | CISO | Actual | DOC-001 |
| 8.3 | Gestión de acceso privilegiado | Sí | Parcial | Sistema tiene admins | V2 (credenciales hardcodeadas) | Dev Lead | Sprint 2 | AP-P2 |
| 7.4 | Monitoreo de seguridad física | No | N/A | Aplicación SaaS sin oficinas físicas | N/A | N/A | N/A | N/A |

---

## 📝 Parte 2: Evaluar los 93 Controles (35 min)

### Paso 3: Metodología de evaluación

Para CADA uno de los 93 controles, responde estas preguntas:

#### Pregunta 1: ¿Es aplicable a mi organización?

**Criterios para "No Aplicable":**
- ❌ **No hay el activo/proceso:** "7.4 Monitoreo físico" si no tienes oficinas
- ❌ **Tecnología no usada:** "8.24 Uso de criptografía" si tu app no maneja datos sensibles
- ❌ **Fuera de alcance del SGSI:** Si el SGSI solo cubre "plataforma web", controles de RRHH corporativos pueden excluirse

**Importante:** Máximo 10-15% de controles deberían ser "No Aplicable". Si tienes >20%, tu justificación será cuestionada en auditoría.

#### Pregunta 2: Si es aplicable, ¿qué estado tiene?

| Estado | Definición | Ejemplo |
|--------|------------|---------|
| **Implementado** | Control completamente funcional con evidencia | Logging activado + revisión mensual + alertas automáticas |
| **Parcial** | Control existe pero incompleto | Logging activado, pero sin alertas ni revisión periódica |
| **No implementado** | Control aplicable pero no existe | No hay logging de eventos de seguridad |

#### Pregunta 3: ¿A qué riesgos del RTP responde?

Vincula cada control con vulnerabilidades específicas de tu RTP:

**Ejemplo:**

**Control 8.3 - Gestión de acceso privilegiado**
- Mitiga: V2 (Credenciales hardcodeadas), V15 (Shared admin passwords)
- RTP: Opción "Compartir" → Migrar a Azure Key Vault
- AP: Proyecto P2 (Sprint 1)

---

### Paso 4: Completar evaluación por categoría

**Usa este enfoque para acelerar:**

#### Categoría 5: Organizational controls (15 min)

**Metodología de evaluación para controles organizacionales:**

Esta categoría (37 controles) cubre aspectos como políticas, gestión de activos, control de acceso, RRHH, y continuidad de negocio.

**Ejemplos ilustrativos de evaluación** (consulta el Anexo A completo para todos los controles):

| ID | Tema del Control | Pregunta clave | Típicamente Aplicable |
|----|------------------|----------------|----------------------|
| 5.1 | Políticas de seguridad de la información | ¿Tenemos políticas documentadas del SGSI? | ✅ Siempre aplicable |
| 5.7 | Inteligencia sobre amenazas | ¿Usamos feeds de vulnerabilidades (CVE, OWASP)? | ⚠️ Aplica si hay proceso formal |
| 5.15 | Control de acceso | ¿Controlamos quién accede a qué? | ✅ CRÍTICO para apps web |
| 5.23 | Seguridad en la nube | ¿Usamos servicios cloud (Azure, AWS)? | ✅ Aplica si usas cloud |

**Estrategia general:**
- Controles de políticas/documentación (ej: 5.1): Casi siempre aplicables
- Controles de RRHH corporativo: Pueden ser "No Aplicable" para proyectos individuales/startups muy pequeñas
- Controles de gestión de activos: Aplicables si tienes inventario (Lab Día 4)

**Debes evaluar los 37 controles consultando el Anexo A oficial**.

#### Categoría 6: People controls (5 min)

**Metodología de evaluación para controles de personas:**

Esta categoría (8 controles) cubre aspectos de recursos humanos, capacitación, y responsabilidades del personal.

**Ejemplos ilustrativos de evaluación** (consulta el Anexo A completo para todos los controles):

| ID | Tema del Control | Pregunta clave | Típicamente Aplicable |
|----|------------------|----------------|----------------------|
| 6.1-6.3 | Screening y términos de empleo | ¿Tenemos proceso formal de contratación? | ⚠️ Solo si hay RRHH formal |
| 6.4 | Obligaciones de confidencialidad | ¿Firmamos NDAs con colaboradores? | ✅ Aplica casi siempre |
| 6.7 | Trabajo remoto | ¿Trabajamos fuera de oficina? | ✅ Muy común hoy en día |
| 6.8 | Reporte de eventos de seguridad | ¿Hay proceso para reportar incidentes? | ✅ CRÍTICO - siempre aplica |

**Estrategia general:**
- Controles de procesos RRHH formales: Pueden ser "No Aplicable" para startups/proyectos individuales si el alcance del SGSI es solo la aplicación web
- Controles de confidencialidad y capacitación: Casi siempre aplicables
- Controles de reporte: Siempre aplicables (puede ser proceso informal)

**Debes evaluar los 8 controles consultando el Anexo A oficial**.

#### Categoría 7: Physical controls (5 min)

**Metodología de evaluación para controles físicos:**

Esta categoría (14 controles) cubre seguridad física de instalaciones, equipos, y dispositivos.

**Ejemplos ilustrativos para aplicaciones cloud-native:**

| ID | Tema del Control | Pregunta clave | Para Apps SaaS/Cloud |
|----|------------------|----------------|---------------------|
| 7.1-7.4 | Perímetros y monitoreo físico | ¿Tenemos datacenter/oficinas propias? | ❌ No Aplicable si es 100% cloud |
| 7.7 | Clear desk y screen policy | ¿Trabajamos con datos sensibles en pantalla? | ⚠️ Aplicable para trabajo remoto |
| 7.10 | Protección de medios de almacenamiento | ¿Usamos laptops/dispositivos para desarrollo? | ✅ Aplicable - cifrado de discos |
| 7.13 | Disposición de equipos | ¿Desechamos equipos con datos? | ✅ Aplicable - borrado seguro |
| 7.14 | Disposición segura de información | ¿Eliminamos datos de clientes? | ✅ CRÍTICO - siempre aplica |

**Estrategia general:**
- **Apps cloud-native:** 60-70% puede ser "No Aplicable" (infraestructura física es responsabilidad del proveedor cloud)
- **Justificación aceptable:** "Aplicación SaaS hospedada en Azure. Seguridad física es responsabilidad del proveedor (Azure compliance: ISO 27001 certificado)"
- **Equipos de desarrollo:** Controles de dispositivos (laptops, móviles) SÍ aplican

**Debes evaluar los 14 controles consultando el Anexo A oficial**.

#### Categoría 8: Technological controls (10 min)

**ESTA ES LA CATEGORÍA MÁS IMPORTANTE** para aplicaciones web. Aquí es donde mapeas la mayoría de tu RTP y AP.

**Metodología de evaluación para controles tecnológicos:**

Esta categoría (34 controles) cubre seguridad técnica: cifrado, desarrollo seguro, redes, logging, backup, gestión de vulnerabilidades.

**Ejemplos ilustrativos de mapeo a tus labs** (consulta el Anexo A completo para todos los controles):

| ID | Tema del Control | Cómo mapear a tu trabajo del curso | Típicamente |
|----|------------------|-------------------------------------|-------------|
| 8.2 | Gestión de acceso privilegiado | → V2 (Hardcoded creds) - AP Proyecto P2 (Key Vault) | ✅ CRÍTICO |
| 8.3 | Restricción de acceso a información | → V3 (IDOR) - RTP Retener + Compensatorios | ✅ CRÍTICO |
| 8.5 | Autenticación segura | → V6 (Missing Auth) del Lab 1.1 | ✅ CRÍTICO |
| 8.8 | Gestión de vulnerabilidades | → Labs Inspección + Code Reviews = proceso | ✅ Siempre aplica |
| 8.9 | Gestión de configuración | → Checklist configuraciones (Lab Día 3) | ✅ Siempre aplica |
| 8.15 | Logging | → V3 IDOR compensatorio - Logging implementado | ✅ CRÍTICO |
| 8.16 | Monitoreo de actividades | → V3 IDOR - Alertas + revisión semanal | ✅ CRÍTICO |
| 8.24 | Uso de criptografía | → V2 Hardcoded creds - Key Vault + TLS | ✅ Si usas datos sensibles |
| 8.25 | **Secure SDLC** | → **TODO tu curso**: Labs Inspección, Checklists, Code Reviews | ✅ **MUY IMPORTANTE** |
| 8.26 | Requisitos de seguridad en apps | → Lab 1.1 Mapeo OWASP a ISO 27002 | ✅ Siempre aplica |
| 8.28 | Secure coding | → Lab Checklists + Lab Code Reviews | ✅ CRÍTICO |
| 8.29 | Testing de seguridad en desarrollo | → Labs Inspección + Code Reviews = proceso formal | ✅ CRÍTICO |
| 8.34 | Protección contra vulnerabilidades web | → V1 (SQL Inj), V3 (IDOR), V7 (XSS) - Todos los labs | ✅ **MUY CRÍTICO** |

**Estrategia general:**
- **Casi todos los 34 controles aplican** para desarrollo de software
- Mapea cada control a vulnerabilidades del RTP y proyectos del AP
- Usa los labs del curso como evidencia (8.25 Secure SDLC, 8.28 Secure coding, 8.29 Security testing)
- Controles de infraestructura (redes, firewalls): Si es cloud, referencia a configuraciones del proveedor

**Debes evaluar los 34 controles consultando el Anexo A oficial**.

**Tabla de mapeo ejemplo:**

| Control | Estado | Riesgos RTP | Proyecto AP | Evidencia |
|---------|--------|-------------|-------------|-----------|
| 8.25 Secure SDLC | Parcial | V1-V15 (todos) | Proceso de Code Reviews | Lab Code Reviews + Checklists |
| 8.28 Secure Coding | Parcial | V1, V7, V11 | Checklists implementados | Checklist equipo + individual |
| 8.34 Protección web | Parcial | V1 (SQL Inj), V3 (IDOR) | P1 (Fix SQL), P3 (Rate limit) | AP Sprint 1-2 |
| 8.2 Acceso privilegiado | No implementado | V2 (Hardcoded creds) | P2 (Azure Key Vault) | AP Sprint 1 |
| 8.15 Logging | Implementado | V3 (IDOR compensatorio) | Ya implementado | RTP Carta Aceptación #003 |

---

## 📝 Parte 3: Crear Matriz de Trazabilidad (15 min)

### Paso 5: Vincular todo el trabajo del curso

Crea una tabla que demuestre la **cadena completa de evidencia**:

```
Vulnerabilidad (Lab) → Riesgo (RTP) → Control ISO (SOA) → Proyecto (AP) → Evidencia
```

**Ejemplo completo:**

| # | Vulnerabilidad | Lab Fuente | RTP Decisión | Control ISO | Estado Control | Proyecto AP | Evidencia Documental |
|---|----------------|------------|--------------|-------------|----------------|-------------|---------------------|
| 1 | SQL Injection en ProductController | Lab 1.1 | Modificar (P0) | 8.34 Protección contra vulnerabilidades web | No implementado | P1: Eliminar SQL Injections (Sprint 1) | Código antes/después, Unit tests CWE-89, SonarQube scan limpio, Code review aprobado |
| 2 | Credenciales hardcodeadas | Lab 1.1 + Code Reviews | Compartir (P0) | 8.2 Derechos de acceso privilegiado, 8.24 Uso de criptografía | No implementado | P2: Migrar a Azure Key Vault (Sprint 1) | Configuración Key Vault, Código refactorizado, Docs de migración |
| 3 | IDOR en OrderController | Lab 1.1 | Retener (P1) | 8.3 Restricción de acceso a información, 8.15 Logging, 8.16 Monitoreo | Parcial (compensatorios implementados) | N/A - Riesgo aceptado | Carta Aceptación #003, Logs de acceso, Dashboard de alertas, Revisión semanal |
| 4 | Falta validación de input | Lab Code Reviews | Modificar (P1) | 8.28 Secure coding, 8.34 Protección web | Parcial (checklist creado, no aplicado a todo) | P1: Input validation layer | Checklist secure coding, Código validación, Tests parametrizados |
| 5 | Missing security headers | Lab Inspección | Modificar (P2) | 8.34 Protección web | No implementado | P4: Agregar security headers (Sprint 2) | Configuración web.config, Verificación con SecurityHeaders.com |

**Columnas clave:**
1. **Vulnerabilidad:** De labs anteriores (1.1, Inspección, Code Reviews)
2. **RTP Decisión:** Modificar/Retener/Compartir/Evitar + Prioridad
3. **Control ISO:** Qué control(es) del Anexo A aplican
4. **Estado Control:** Implementado/Parcial/No implementado
5. **Proyecto AP:** Referencia al proyecto del Action Plan
6. **Evidencia:** QUÉ documentos probarían a un auditor que implementaste el control

---

### Paso 6: Justificar exclusiones (para controles "No Aplicable")

Para CADA control marcado como "No Aplicable", documenta:

| Control | Justificación de Exclusión | Aprobado por |
|---------|---------------------------|--------------|
| 5.2 Roles de seguridad de información | Organización de 1 persona (solo desarrollador), no hay estructura formal de roles | CISO / Owner |
| 7.1 Perímetros de seguridad física | Aplicación SaaS hospedada 100% en Azure. Seguridad física es responsabilidad del proveedor cloud (Azure Compliance: ISO 27001 certificado). No hay infraestructura física propia. | CISO / Owner |
| 7.4 Monitoreo de seguridad física | Mismo que 7.1 - Sin infraestructura física propia | CISO / Owner |
| 6.1 Screening | No hay proceso de contratación formal (proyecto individual o equipo muy pequeño sin RRHH) | CISO / Owner |

**Estrategia de auditoría:**
- ✅ **Buena justificación:** "Control no aplica porque el activo/proceso no existe en nuestro alcance del SGSI"
- ❌ **Mala justificación:** "Control muy caro", "No tenemos tiempo", "No es prioritario"

---

## 📦 Entregable

**Statement of Applicability (SOA)** completo que incluya:

### 1. Evaluación de los 93 Controles del Anexo A

Tabla completa con:
- ID y nombre del control
- Decisión: Aplicable (Sí/No)
- Estado: Implementado / Parcial / No implementado (si aplica)
- Justificación detallada (especialmente para "No Aplicable")

### 2. Matriz de Trazabilidad Completa

Vincula:
- Vulnerabilidades encontradas en labs → Decisiones del RTP → Controles ISO del SOA → Proyectos del AP → Evidencia documental

Esto demuestra que tu SGSI es coherente de principio a fin.

### 3. Justificaciones Formales de Exclusión

Para cada control "No Aplicable":
- Justificación técnica/de negocio
- Aprobación de dirección/CISO
- Revisión periódica (por si cambia el alcance)

### 4. Plan de Implementación para Controles Pendientes

Para controles "Aplicable - No Implementado":
- Responsable asignado
- Fecha objetivo de implementación
- Referencia al proyecto del AP que lo implementará
- Riesgo si NO se implementa

### 5. Resumen Ejecutivo

Estadísticas del SOA:
- Total de controles: 93
- Aplicables: XX (XX%)
- No aplicables: XX (XX%)
- Estado de aplicables:
  - Implementados: XX (XX%)
  - Parciales: XX (XX%)
  - No implementados: XX (XX%)
- Timeline de implementación completa: [Fecha]

### 6. Referencias Cruzadas a Evidencia

Para cada control implementado, lista dónde está la evidencia:
- Documentos (políticas, procedimientos)
- Código fuente (commits, PRs)
- Configuraciones (Azure, servidores)
- Registros (logs, reportes de auditoría)
- Artefactos de labs (Checklists, reportes de Code Reviews, RTP, AP)

### 7. Aprobaciones Formales

El SOA debe estar aprobado por:
- [ ] CISO / Responsable de Seguridad: _________________
- [ ] Dirección / Management: _________________
- [ ] Líder del Proyecto / Product Owner: _________________

**Fecha de aprobación:** __________

**Fecha de próxima revisión:** __________ (recomendado: trimestral o semestral)

---

## 🎯 Criterios de Éxito

Tu SOA está completo cuando:

- ✅ Los 93 controles del Anexo A tienen una decisión (Aplicable/No Aplicable)
- ✅ Cada decisión tiene justificación defendible ante un auditor
- ✅ Los controles aplicables tienen estado actual (Implementado/Parcial/No implementado)
- ✅ Existe trazabilidad completa: Vulnerabilidad → RTP → Control → AP → Evidencia
- ✅ Las exclusiones ("No Aplicable") tienen justificación técnica sólida (no excusas de costo/tiempo)
- ✅ Los controles "No implementados" tienen plan de implementación con fechas
- ✅ Hay evidencia documental para controles "Implementado" y "Parcial"
- ✅ El documento está aprobado formalmente por dirección
- ✅ Un auditor externo podría verificar cada afirmación del SOA con evidencia tangible
- ✅ El SOA refleja FIELMENTE el estado real (no "teatro de seguridad")

**El test final:** ¿Si un auditor ISO 27001 llegara mañana sin previo aviso, podrías mostrarle evidencia de cada control marcado como "Implementado"? Si la respuesta es no, el control debe marcarse como "Parcial" o "No implementado".

---

## 💡 Consejos para el SOA

### Errores comunes a evitar:

❌ **Marcar todo como "Implementado"** sin evidencia real
- Un auditor pedirá pruebas. Si no existen, es hallazgo de no conformidad.

❌ **Justificar "No Aplicable" por costo o tiempo**
- "No Aplicable" significa que el control no es relevante para tu organización, no que es caro.

❌ **No vincular controles a riesgos específicos**
- El SOA debe derivarse del análisis de riesgos. Cada control debe mitigar al menos un riesgo identificado (o ser requisito legal/contractual).

❌ **Marcar controles como "Parcial" sin plan de completitud**
- Si está parcial, debe haber fecha y responsable para completarlo.

❌ **Copiar SOAs de otras organizaciones**
- Cada SOA es único según el contexto, alcance y riesgos de la organización.

### Mejores prácticas:

✅ **Usa tu trabajo previo como evidencia**
- Los labs del curso SON evidencia real: checklists, code reviews, RTP, AP.

✅ **Sé honesto sobre el estado**
- Es mejor marcar "No implementado" con plan claro que mentir con "Implementado".

✅ **Agrupa controles relacionados**
- 8.25 (Secure SDLC) + 8.28 (Secure coding) + 8.29 (Security testing) pueden usar la misma evidencia (tus labs).

✅ **Documenta el "quién, qué, cuándo, dónde"**
- No digas "Tenemos logging". Di "Logging implementado en OrderController.cs líneas 45-67, logs almacenados en Azure Log Analytics, revisión semanal por Dev Lead".

✅ **Mantén el SOA actualizado**
- Revisa y actualiza el SOA cada vez que:
  - Se implementa un nuevo control
  - Cambia el alcance del SGSI
  - Se descubren nuevos riesgos
  - Hay cambios tecnológicos/organizacionales importantes

---

## 📚 Referencias

### Estándares ISO (Oficiales - Requieren compra/suscripción)

- **ISO 27001:2022:** Information security management systems - Requirements
  - **Cláusula 6.1.3.d:** Statement of Applicability requirement
  - **Anexo A:** Lista completa de 93 controles (NO reproducido en este lab por copyright)
  - Disponible en: https://www.iso.org/standard/27001

- **ISO 27002:2022:** Information security controls
  - Guía detallada de implementación de cada control del Anexo A
  - Disponible en: https://www.iso.org/standard/75652.html

- **ISO 27005:2022:** Gestión de riesgos de seguridad de la información
  - Vincula riesgos a controles
  - Disponible en: https://www.iso.org/standard/80585.html

### Recursos Complementarios Gratuitos (NO oficiales)

- **NIST Cybersecurity Framework:** Mapeo a controles ISO 27001 (gratuito)
- **CIS Controls:** Controles de seguridad con mapeo a ISO 27002 (gratuito)
- **Guías de implementación ISO 27001** (varias consultoras publican guías gratuitas, pero NO reemplazan el estándar oficial)

---

## ⚖️ Nota Legal y Aviso de Copyright

Este laboratorio es un **recurso educativo** que enseña la metodología de creación de un Statement of Applicability según ISO 27001:2022.

**Limitaciones de este contenido:**
- ✅ Enseña el **proceso y metodología** (uso educativo legítimo)
- ✅ Proporciona **ejemplos ilustrativos** de evaluación de controles (fair use)
- ❌ **NO reproduce** el contenido completo de los 93 controles del Anexo A (por protección de copyright de ISO)
- ❌ **NO reemplaza** el acceso al estándar ISO 27001:2022 oficial

**Para implementación real de un SGSI certificable:**
- Debes adquirir legalmente ISO 27001:2022 e ISO 27002:2022
- Este lab te enseña CÓMO usar el estándar, pero no reproduce su contenido protegido
- Las organizaciones que buscan certificación ISO 27001 deben comprar los estándares oficiales

**Copyright:**
- ISO 27001:2022 © ISO (International Organization for Standardization)
- Este material educativo © 2025 - Uso académico bajo principios de fair use educativo

---

**Nota importante:** El SOA es un **documento vivo** que evoluciona con tu organización. No es un documento que se crea una vez y se olvida. Debe:
- Actualizarse cuando se implementan nuevos controles
- Revisarse periódicamente (recomendado: trimestral o semestral)
- Modificarse cuando cambia el contexto organizacional o tecnológico
- Servir como base para auditorías internas y externas

Un SOA bien mantenido es la columna vertebral de un SGSI maduro y certificable.

---

**Versión:** 1.0
**Última actualización:** Enero 2025

---

## 📦 Entregable

**Statement of Applicability (SOA)** completo que incluya:

1. ✅ Evaluación de los 93 controles del Anexo A de ISO 27001:2022
2. ✅ Justificación detallada para cada control (aplicable o no)
3. ✅ Estado de implementación actual (No implementado/Parcial/Implementado)
4. ✅ Mapeo a riesgos del Risk Treatment Plan (RTP)
5. ✅ Responsables y fechas de implementación
6. ✅ Referencias a evidencias documentales

---

## 📚 Referencias

- **ISO 27001:2022 Cláusula 6.1.3.d:** Statement of Applicability requirement
- **ISO 27001:2022 Anexo A:** Lista de 93 controles
- **ISO 27002:2022:** Guía detallada de implementación de cada control
- **ISO 27005:2022:** Gestión de riesgos de seguridad de la información

---

**Nota:** El SOA es un documento que se mantiene actualizado durante toda la vida del SGSI (Sistema de Gestión de Seguridad de la Información). Debe revisarse periódicamente y actualizarse cuando:
- Se identifican nuevos riesgos
- Cambian procesos de negocio
- Se implementan nuevos controles
- Se realizan auditorías internas o externas

---

**Versión:** 1.0
**Última actualización:** Enero 2025
