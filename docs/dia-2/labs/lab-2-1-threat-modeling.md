# Lab 2.1 - Workshop de Threat Modeling con STRIDE

**Duración:** 90 minutos
**Facilitador:** Facilitador 2 (Técnico)
**Día:** 2 - Preparación para Implementar Controles

---

## Objetivos de Aprendizaje

Al finalizar este laboratorio, los participantes podrán:

1. ✅ Crear Data Flow Diagrams (DFD) para aplicaciones reales
2. ✅ Identificar Trust Boundaries en arquitecturas de software
3. ✅ Aplicar el framework STRIDE para identificar amenazas
4. ✅ Priorizar amenazas usando un sistema de scoring
5. ✅ Documentar mitigaciones específicas para cada amenaza
6. ✅ Generar un documento de threat model reutilizable

---

## Contexto del Escenario

Trabajaremos con **BankingApp**, una aplicación bancaria simplificada con las siguientes características:

### Descripción del Sistema
- **Frontend Web:** SPA con JavaScript que consume API REST
- **Backend API:** ASP.NET Core Web API con autenticación JWT
- **Base de Datos:** SQL Server con datos financieros sensibles
- **Usuarios:** Clientes bancarios y administradores

### Funcionalidades Principales
1. Login con usuario/contraseña
2. Consulta de saldo
3. Transferencias entre cuentas
4. Historial de transacciones
5. Cambio de contraseña
6. Panel de administración (solo admins)

---

## Parte 1: Crear el Data Flow Diagram (DFD) (20 min)

### Paso 1.1: Identificar Componentes

Vamos a identificar los **elementos del DFD** de BankingApp:

#### 🔵 Entidades Externas (External Entities)
- **Cliente:** Usuario que accede desde navegador web
- **Administrador:** Usuario con privilegios elevados
- **Servicio de Email:** Sistema externo para notificaciones

#### 🟢 Procesos (Processes)
- **P1:** Autenticación de usuario
- **P2:** Consulta de saldo
- **P3:** Realizar transferencia
- **P4:** Obtener historial
- **P5:** Cambiar contraseña
- **P6:** Panel de administración

#### 📦 Almacenes de Datos (Data Stores)
- **DS1:** Base de datos SQL Server (cuentas, transacciones, usuarios)
- **DS2:** Session Store (tokens JWT en memoria)
- **DS3:** Logs de auditoría

#### ➡️ Flujos de Datos (Data Flows)
- Credenciales, tokens JWT, datos de cuenta, transacciones, logs

---

### Paso 1.2: Dibujar el DFD

Abre la plantilla proporcionada en `plantillas/dfd-template.drawio` o dibuja en papel/pizarra:

```
┌─────────────┐
│   Cliente   │ (External Entity)
└──────┬──────┘
       │ 1. Credenciales
       ▼
┌─────────────────────────────────────────────────┐
│           TRUST BOUNDARY (Internet)             │
│                                                 │
│  ┌──────────────────────────────────┐           │
│  │  Frontend Web (JavaScript SPA)   │           │
│  └───────────────┬──────────────────┘           │
│                  │ 2. API Request + JWT Token   │
│                  ▼                               │
│  ┌─────────────────────────────────────────┐    │
│  │  TRUST BOUNDARY (Internal Network)      │    │
│  │                                          │    │
│  │  ┌─────────────────────────────────┐    │    │
│  │  │  P1: Autenticación              │    │    │
│  │  │  (ASP.NET Core API)             │    │    │
│  │  └────────┬────────────────────────┘    │    │
│  │           │ 3. Query User              │    │
│  │           ▼                             │    │
│  │  ┌──────────────────┐                  │    │
│  │  │ DS1: SQL Server  │◄─────────────┐   │    │
│  │  └──────────────────┘              │   │    │
│  │           │                         │   │    │
│  │           │ 4. JWT Token generado   │   │    │
│  │           ▼                         │   │    │
│  │  ┌─────────────────────────────┐   │   │    │
│  │  │  P2: Consulta Saldo         │───┘   │    │
│  │  │  P3: Transferencia          │       │    │
│  │  │  P4: Historial              │       │    │
│  │  └─────────────────────────────┘       │    │
│  │           │                             │    │
│  │           │ 5. Log de transacción       │    │
│  │           ▼                             │    │
│  │  ┌──────────────────┐                  │    │
│  │  │ DS3: Audit Logs  │                  │    │
│  │  └──────────────────┘                  │    │
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
       │ 6. Notificación de transacción
       ▼
┌─────────────────┐
│ Servicio Email  │ (External Entity)
└─────────────────┘
```

**📝 Instrucción para participantes:**
1. Dibuja este DFD en la herramienta de tu preferencia (draw.io, Lucidchart, papel)
2. Identifica al menos **2 Trust Boundaries** (Internet ↔ Frontend, Frontend ↔ Backend)
3. Numera cada flujo de datos (1-6 en el ejemplo)

---

## Parte 2: Aplicar STRIDE por Componente (40 min)

Ahora aplicaremos STRIDE a cada elemento del DFD. Usaremos la plantilla `plantillas/stride-worksheet.xlsx` o el formato Markdown a continuación.

### Paso 2.1: Proceso P1 - Autenticación

#### Aplicar STRIDE

| **Threat Type** | **Amenaza Específica** | **Descripción** | **Severidad** |
|-----------------|------------------------|-----------------|---------------|
| **S**poofing | Suplantación de identidad | Atacante intenta autenticarse con credenciales robadas | 🔴 Alta |
| **T**ampering | Modificación de token JWT | Atacante modifica claims en JWT para elevar privilegios | 🔴 Alta |
| **R**epudiation | Usuario niega haber iniciado sesión | No hay logs suficientes para probar que usuario se autenticó | 🟡 Media |
| **I**nformation Disclosure | Exposición de credenciales en tránsito | Credenciales enviadas sin HTTPS | 🔴 Alta |
| **D**enial of Service | Brute force de login | Atacante intenta múltiples combinaciones de contraseñas | 🟡 Media |
| **E**levation of Privilege | Bypassear autenticación | Atacante accede a endpoints sin token válido | 🔴 Alta |

#### Mitigaciones Propuestas

| **Amenaza** | **Mitigación** | **Control ISO 27002** | **OWASP Top 10** |
|-------------|----------------|----------------------|------------------|
| Suplantación de identidad | - Implementar MFA (2FA)<br/>- Rate limiting en login<br/>- Detección de login desde IPs inusuales | 5.17, 5.18 | A07:2021 |
| Modificación de token JWT | - Firmar JWT con algoritmo fuerte (RS256)<br/>- Validar firma en cada request<br/>- Usar tokens de corta duración (15 min) | 8.24 | A02:2021, A07:2021 |
| Repudiación | - Logging robusto con timestamps, IP, user-agent<br/>- Logs inmutables (write-once) | 8.15, 8.16 | A09:2021 |
| Exposición de credenciales | - Forzar HTTPS con HSTS<br/>- No permitir HTTP | 8.24 | A02:2021 |
| Brute force | - Rate limiting (máx 5 intentos/min)<br/>- CAPTCHA después de 3 fallos<br/>- Account lockout temporal | 5.17 | A07:2021 |
| Bypassear autenticación | - `[Authorize]` en todos los controllers<br/>- Validar JWT en middleware<br/>- Whitelist de endpoints públicos | 5.15 | A01:2021 |

---

### Paso 2.2: Data Store DS1 - SQL Server

#### Aplicar STRIDE

| **Threat Type** | **Amenaza Específica** | **Descripción** | **Severidad** |
|-----------------|------------------------|-----------------|---------------|
| **S**poofing | Conexión DB con credenciales falsas | Atacante usa credenciales robadas para conectarse a DB | 🔴 Alta |
| **T**ampering | SQL Injection | Atacante modifica queries para alterar datos | 🔴 Alta |
| **R**epudiation | Modificación de datos sin auditoría | Cambios en DB sin log de quién los hizo | 🟡 Media |
| **I**nformation Disclosure | Acceso no autorizado a tablas | Atacante lee datos de otros usuarios | 🔴 Alta |
| **D**enial of Service | Query bombing | Queries maliciosas que consumen recursos | 🟡 Media |
| **E**levation of Privilege | Escalación de privilegios en DB | Usuario de aplicación con permisos de DBA | 🔴 Alta |

#### Mitigaciones Propuestas

| **Amenaza** | **Mitigación** | **Control ISO 27002** | **OWASP Top 10** |
|-------------|----------------|----------------------|------------------|
| Conexión con credenciales falsas | - Rotar credenciales regularmente<br/>- Usar Azure Key Vault / secrets manager<br/>- Conexiones solo desde IPs whitelisted | 8.3, 8.5 | A07:2021 |
| SQL Injection | - Queries parametrizadas (LINQ, `FromSqlInterpolated`)<br/>- Stored procedures<br/>- Nunca concatenar strings | 8.28 | A03:2021 |
| Modificación sin auditoría | - Triggers de auditoría en tablas críticas<br/>- Tabla de changelog con user/timestamp | 8.15, 8.16 | A09:2021 |
| Acceso no autorizado | - Row-Level Security en SQL Server<br/>- Verificar ownership en queries (`WHERE UserId = @CurrentUser`) | 5.15 | A01:2021 |
| Query bombing | - Query timeout configurado<br/>- Resource Governor en SQL Server<br/>- Índices apropiados | 8.6 | A05:2021 |
| Escalación de privilegios | - Usuario de app con permisos mínimos (solo SELECT, INSERT, UPDATE en tablas necesarias)<br/>- Separar usuarios para lectura y escritura | 5.15, 8.2 | A01:2021 |

---

### Paso 2.3: Data Flow - API Request + JWT Token

#### Aplicar STRIDE

| **Threat Type** | **Amenaza Específica** | **Descripción** | **Severidad** |
|-----------------|------------------------|-----------------|---------------|
| **S**poofing | Replay attack | Atacante captura y reenvía token válido | 🟡 Media |
| **T**ampering | Man-in-the-Middle | Atacante intercepta y modifica requests | 🔴 Alta |
| **I**nformation Disclosure | Sniffing de tráfico | Atacante captura JWT en tránsito | 🔴 Alta |
| **D**enial of Service | Flooding de requests | Atacante envía miles de requests para saturar API | 🟡 Media |

#### Mitigaciones Propuestas

| **Amenaza** | **Mitigación** | **Control ISO 27002** | **OWASP Top 10** |
|-------------|----------------|----------------------|------------------|
| Replay attack | - Tokens de corta duración (15 min)<br/>- Jti (JWT ID) único por token<br/>- Refresh token rotation | 8.24 | A07:2021 |
| Man-in-the-Middle | - HTTPS con TLS 1.3<br/>- Certificate pinning en mobile apps | 8.24 | A02:2021 |
| Sniffing de tráfico | - HTTPS obligatorio<br/>- HSTS header<br/>- Secure cookies | 8.24 | A02:2021 |
| Flooding de requests | - Rate limiting por IP (100 req/min)<br/>- Rate limiting por usuario (50 req/min)<br/>- API Gateway con throttling | 8.6 | A05:2021 |

---

### 📝 **EJERCICIO PRÁCTICO (20 min):**

Ahora te toca a ti. Completa el análisis STRIDE para:

#### **Proceso P3: Realizar Transferencia**

Usa la plantilla en `plantillas/stride-worksheet.xlsx` o crea una tabla Markdown con las siguientes columnas:

```markdown
| Threat Type | Amenaza Específica | Descripción | Severidad | Mitigación | Control ISO | OWASP |
|-------------|-------------------|-------------|-----------|------------|-------------|-------|
| S           |                   |             |           |            |             |       |
| T           |                   |             |           |            |             |       |
| R           |                   |             |           |            |             |       |
| I           |                   |             |           |            |             |       |
| D           |                   |             |           |            |             |       |
| E           |                   |             |           |            |             |       |
```

**Pistas para ayudarte:**
- **Spoofing:** ¿Puede alguien suplantar al usuario que hace la transferencia?
- **Tampering:** ¿Puede modificar el monto o la cuenta destino?
- **Repudiation:** ¿El usuario puede negar que hizo la transferencia?
- **Information Disclosure:** ¿Se expone información de la cuenta destino?
- **Denial of Service:** ¿Puede hacer miles de transferencias para saturar el sistema?
- **Elevation of Privilege:** ¿Puede transferir dinero de cuentas de otros usuarios?

---

## Parte 3: Priorización de Amenazas (15 min)

### Paso 3.1: Sistema de Scoring

Usaremos el sistema **DREAD** para priorizar amenazas:

| **Factor** | **Descripción** | **Escala** |
|------------|----------------|------------|
| **D**amage | ¿Qué tan grave es el daño? | 1-10 |
| **R**eproducibility | ¿Qué tan fácil es reproducir el ataque? | 1-10 |
| **E**xploitability | ¿Qué tan fácil es explotar la vulnerabilidad? | 1-10 |
| **A**ffected Users | ¿Cuántos usuarios afecta? | 1-10 |
| **D**iscoverability | ¿Qué tan fácil es descubrir la vulnerabilidad? | 1-10 |

**Fórmula:**
```
Risk Score = (D + R + E + A + D) / 5
```

**Interpretación:**
- **8-10:** 🔴 Crítico - Arreglar inmediatamente
- **5-7:** 🟡 Alto - Arreglar en el siguiente sprint
- **3-4:** 🟠 Medio - Planificar para siguientes sprints
- **1-2:** 🟢 Bajo - Documentar y monitorear

---

### Paso 3.2: Ejemplo de Scoring

**Amenaza:** SQL Injection en endpoint de transferencias

| Factor | Score | Justificación |
|--------|-------|---------------|
| Damage | 10 | Puede robar todo el dinero de todas las cuentas |
| Reproducibility | 9 | Fácil con herramientas como Burp Suite |
| Exploitability | 7 | Requiere conocimiento de SQL pero hay payloads públicos |
| Affected Users | 10 | Afecta a todos los usuarios del sistema |
| Discoverability | 8 | SAST y pentesters lo encuentran fácilmente |

**Risk Score:** (10 + 9 + 7 + 10 + 8) / 5 = **8.8** → 🔴 **CRÍTICO**

---

### 📝 **EJERCICIO PRÁCTICO (10 min):**

Calcula el DREAD score para las siguientes amenazas:

1. **Brute force de login** (sin rate limiting)
2. **Exposición de stack traces en producción**
3. **IDOR en endpoint de historial de transacciones**

Usa la plantilla `plantillas/dread-scoring.xlsx`.

---

## Parte 4: Documentar el Threat Model (15 min)

### Paso 4.1: Estructura del Documento

Un threat model completo debe incluir:

```markdown
# Threat Model: BankingApp

## 1. Información del Sistema
- **Nombre:** BankingApp
- **Versión:** 1.0
- **Fecha del análisis:** [fecha]
- **Analistas:** [nombres]

## 2. Descripción del Sistema
[Resumen de funcionalidades, arquitectura, usuarios]

## 3. Data Flow Diagram
[Incluir imagen o link al DFD]

## 4. Trust Boundaries Identificados
1. Internet ↔ Frontend Web
2. Frontend Web ↔ Backend API
3. Backend API ↔ SQL Server

## 5. Amenazas Identificadas

### 5.1 Proceso: Autenticación (P1)

#### Amenaza 1: Suplantación de identidad
- **STRIDE:** Spoofing
- **Descripción:** Atacante intenta autenticarse con credenciales robadas
- **DREAD Score:** 7.2 (Alto)
- **Mitigación:** Implementar MFA, rate limiting
- **Estado:** Pendiente
- **Responsable:** Equipo de seguridad
- **Fecha estimada:** Sprint 23

[Repetir para cada amenaza...]

## 6. Resumen de Prioridades

| Prioridad | # Amenazas | Mitigaciones Requeridas |
|-----------|------------|-------------------------|
| Crítico   | 5          | Inmediato               |
| Alto      | 12         | Próximo sprint          |
| Medio     | 8          | Próximos 3 meses        |
| Bajo      | 3          | Backlog                 |

## 7. Próximos Pasos
1. Implementar mitigaciones críticas
2. Re-evaluar threat model después de cambios arquitectónicos
3. Revisar threat model cada 6 meses

## 8. Referencias
- OWASP Top 10 2021
- ISO 27002:2022
- Microsoft Threat Modeling Tool
```

---

### Paso 4.2: Generar tu Threat Model

Usa la plantilla `plantillas/threat-model-template.md` y completa:

1. Información de tu proyecto (real o el ejemplo BankingApp)
2. Incluye el DFD que creaste
3. Documenta al menos **10 amenazas** con sus mitigaciones
4. Calcula DREAD score para las 5 amenazas más críticas
5. Crea un plan de acción con responsables y fechas

**💾 Guarda tu threat model como:** `mi-threat-model.md`

---

## Entregables del Laboratorio

Al finalizar, debes tener:

1. ✅ **Data Flow Diagram (DFD)** del sistema BankingApp
   - Formato: draw.io, Lucidchart, o imagen escaneada
   - Archivo: `mi-dfd.png` o `mi-dfd.drawio`

2. ✅ **Análisis STRIDE completo** con al menos 15 amenazas identificadas
   - Formato: Excel (`stride-worksheet.xlsx`) o Markdown
   - Archivo: `stride-analysis.xlsx` o `stride-analysis.md`

3. ✅ **DREAD Scoring** de las 5 amenazas más críticas
   - Formato: Excel (`dread-scoring.xlsx`)
   - Archivo: `dread-scores.xlsx`

4. ✅ **Documento de Threat Model** completo
   - Formato: Markdown
   - Archivo: `mi-threat-model.md`

---

## Verificación de Resultados

### ✅ Checklist de Calidad

Tu threat model es de calidad si cumple:

- [ ] DFD incluye al menos 3 procesos, 2 data stores, 1 entidad externa
- [ ] Identificaste al menos 2 trust boundaries claramente marcados
- [ ] Cada amenaza tiene descripción, severidad y mitigación
- [ ] Al menos 3 amenazas mapean a controles específicos de ISO 27002
- [ ] Al menos 5 amenazas mapean a OWASP Top 10
- [ ] Las 5 amenazas críticas tienen DREAD score calculado
- [ ] El documento incluye plan de acción con responsables
- [ ] Las mitigaciones son específicas y accionables (no genéricas)

---

## Preguntas Frecuentes

### ❓ ¿Qué tan detallado debe ser el DFD?

**Respuesta:** Para este ejercicio, un DFD de nivel 1 es suficiente (componentes principales sin entrar en detalles de cada función interna). Si tienes tiempo, puedes crear DFDs de nivel 2 para procesos críticos (como autenticación).

### ❓ ¿Qué hago si encuentro más de 50 amenazas?

**Respuesta:** ¡Excelente! Eso significa que estás siendo exhaustivo. Prioriza usando DREAD y enfócate en documentar detalladamente las críticas (score > 7). Las de menor prioridad pueden documentarse de forma resumida.

### ❓ ¿Debo hacer threat modeling de TODO mi código?

**Respuesta:** No necesariamente. Enfócate en:
- Componentes que manejan autenticación/autorización
- Procesos que manejan datos sensibles (financieros, PII)
- Puntos de entrada externos (APIs públicas)
- Nuevas funcionalidades antes de desarrollarlas

### ❓ ¿Con qué frecuencia debo actualizar el threat model?

**Respuesta:**
- **Mínimo:** Cada 6 meses
- **Recomendado:** Cada vez que haya cambios arquitectónicos significativos
- **Ideal:** Al inicio de cada feature nueva (shift-left security)

---

## Mapeo a Estándares

### ISO 27002:2022
- **8.25** - Ciclo de vida de desarrollo seguro
- **8.28** - Secure coding
- **5.15** - Access control

### OWASP Top 10 2021
- **A04:2021** - Insecure Design → Threat modeling previene diseño inseguro

### CWE
- **CWE-1008:** Architectural Concepts

---

## Recursos Adicionales

### Herramientas de Threat Modeling
- **Microsoft Threat Modeling Tool:** https://aka.ms/threatmodelingtool (Windows)
- **OWASP Threat Dragon:** https://owasp.org/www-project-threat-dragon/ (Cross-platform)
- **Threatspec:** https://threatspec.org/ (As-code, integrado en comentarios)

### Lecturas Complementarias
- 📖 **Threat Modeling: Designing for Security** - Adam Shostack
- 📄 **OWASP Threat Modeling Cheat Sheet:** https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html
- 📄 **Microsoft SDL Threat Modeling:** https://www.microsoft.com/en-us/securityengineering/sdl/threatmodeling

### Videos
- 🎥 **OWASP Threat Modeling** - YouTube: búsqueda "OWASP threat modeling tutorial"

---

## ⏱️ Cronograma del Lab (90 min)

| Tiempo | Actividad | Modo |
|--------|-----------|------|
| 0-10 min | Introducción y explicación del escenario | 👨‍🏫 Facilitador |
| 10-30 min | **Parte 1:** Crear DFD de BankingApp | 👥 Grupal (4-5 personas) |
| 30-70 min | **Parte 2:** Aplicar STRIDE por componente | 👥 Grupal |
| 70-85 min | **Parte 3:** Priorización con DREAD | 👥 Grupal |
| 85-90 min | Presentación de resultados (1 grupo) | 👨‍🏫 Plenaria |

---

## Sección Opcional: Aplica a Tu Código

Si terminaste antes de tiempo o quieres practicar más:

1. **Identifica un componente crítico** de tu aplicación en producción
2. **Crea un DFD simplificado** de ese componente
3. **Aplica STRIDE** para identificar al menos 5 amenazas
4. **Documenta** en el mismo formato del threat model de BankingApp
5. **Comparte** con tu equipo en la próxima reunión

**💡 Consejo:** Empieza con componentes pequeños (un microservicio, un módulo) en lugar de toda la aplicación. Es mejor un threat model detallado de algo pequeño que uno superficial de todo.

---

**¿Dudas o problemas?** Levanta la mano o consulta con el Facilitador 2.

**Próximo laboratorio:** Setup de entorno Docker con herramientas de seguridad (SonarQube, OWASP Dependency-Check).
