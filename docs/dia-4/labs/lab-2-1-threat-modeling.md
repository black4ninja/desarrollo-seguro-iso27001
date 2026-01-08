---
sidebar_position: 3
---

# Lab 2.1 - Workshop de Threat Modeling con STRIDE

**Duración:** 60 minutos
**Tipo:** Práctica en equipo
**Prerequisito:** Haber revisado el contenido teórico de Threat Modeling con STRIDE

---

## 🎯 Objetivos de Aprendizaje

Al finalizar este laboratorio, podrás:

1. ✅ Crear Data Flow Diagrams (DFD) para aplicaciones reales
2. ✅ Identificar Trust Boundaries en arquitecturas de software
3. ✅ Aplicar el framework STRIDE para identificar amenazas
4. ✅ Priorizar amenazas usando matriz de riesgo
5. ✅ Documentar mitigaciones específicas para cada amenaza

---

## 📋 Contexto del Escenario

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

## 📝 Parte 1: Crear el Data Flow Diagram (DFD) (20 min)

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

**Herramientas sugeridas:**

- Papel y lápiz (lo más rápido para workshops)
- [draw.io](https://app.diagrams.net/)
- Pizarra o whiteboard
- PowerPoint/Google Slides

**Diagrama de referencia:**

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
│  │  │ DS1: SQL Server  │                  │    │
│  │  │ (Users, Accounts)│                  │    │
│  │  └──────────────────┘                  │    │
│  │           │                             │    │
│  │           │ 4. JWT Token                │    │
│  │           ▼                             │    │
│  │  ┌─────────────────────────────────┐   │    │
│  │  │  P3: Realizar Transferencia     │   │    │
│  │  └─────────────────────────────────┘   │    │
│  │                                         │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Actividad (15 min)

**En tu equipo:**

1. Dibuja el DFD completo de BankingApp incluyendo TODOS los procesos (P1-P6)
2. Identifica y marca al menos 2 Trust Boundaries
3. Etiqueta cada flujo de datos con el tipo de información que transmite

**Tip:** No busques perfección, enfócate en capturar los flujos principales.

---

## 🔷 Parte 2: Aplicar STRIDE (25 min)

### Paso 2.1: Recordatorio de STRIDE

```
S - Spoofing (Suplantación)
T - Tampering (Manipulación)
R - Repudiation (Repudio)
I - Information Disclosure (Divulgación de información)
D - Denial of Service (Denegación de servicio)
E - Elevation of Privilege (Elevación de privilegios)
```

---

**📝 Nota importante sobre profundidad del análisis:**

No necesitas encontrar exactamente 1 amenaza por categoría STRIDE. Algunas categorías pueden tener múltiples amenazas, otras pueden no aplicar.

**Ejemplo:** Para P3 (Transferencias):

- **T (Tampering):** Puede tener 2-3 amenazas (modificar monto, modificar cuenta destino, modificar metadata)
- **R (Repudiation):** Puede tener 1 amenaza (usuario niega transferencia)
- **D (Denial of Service):** Puede tener 1-2 amenazas (flooding, queries pesadas)

**Objetivo:** Mínimo 10 amenazas RELEVANTES en total (no importa cómo se distribuyan entre categorías).

💡 **Tip sobre amenazas combinadas:** Algunas amenazas caen en múltiples categorías STRIDE (ej: IDOR es E+I).
En estos casos:

- Elige la categoría **más crítica** (generalmente E o T)
- Menciona la categoría secundaria en la columna "Amenaza"
- Ejemplo: "IDOR - Transferir desde cuenta ajena (E+I)"

---

### Paso 2.2: Identificar Amenazas por Proceso

Vamos a analizar **P3: Realizar Transferencia** como ejemplo.

#### Plantilla de Análisis STRIDE

| STRIDE | Pregunta | Amenaza Identificada | ¿Aplica? |
|--------|----------|---------------------|----------|
| **S** - Spoofing | ¿Alguien puede suplantar la identidad del usuario? | Atacante roba JWT token y realiza transferencias | ✅ Sí |
| **T** - Tampering | ¿Se pueden modificar los datos de la transferencia? | Usuario modifica monto en el request HTTP | ✅ Sí |
| **R** - Repudiation | ¿El usuario puede negar haber hecho la transferencia? | Usuario dice "yo no hice esa transferencia" | ✅ Sí |
| **I** - Info Disclosure | ¿Se puede exponer información sensible? | Saldo de cuenta expuesto en logs o error messages | ✅ Sí |
| **D** - Denial of Service | ¿Se puede saturar el servicio? | Atacante envía millones de requests de transferencia | ✅ Sí |
| **E** - Elevation of Privilege | ¿Se pueden obtener permisos superiores? | Usuario transfiere desde cuenta que no le pertenece | ✅ Sí |

---

### Actividad (20 min)

**En tu equipo, analizar estos procesos con STRIDE:**

1. **P1: Autenticación**
2. **P6: Panel de Administración**

**Usar esta plantilla para cada proceso:**

```markdown
## Proceso: [Nombre]

| STRIDE | Pregunta | Amenaza Identificada | ¿Aplica? |
|--------|----------|---------------------|----------|
| S | ¿Alguien puede suplantar identidad? | | |
| T | ¿Se pueden modificar datos? | | |
| R | ¿Se puede negar la acción? | | |
| I | ¿Se puede divulgar información? | | |
| D | ¿Se puede denegar el servicio? | | |
| E | ¿Se pueden elevar privilegios? | | |
```

---

## 📊 Parte 3: Priorizar y Documentar Amenazas (15 min)

### Paso 3.1: Matriz de Riesgo

Usar la siguiente matriz para priorizar:

```
Probabilidad (1-5)
    ▲
  5 │  🟡  🟠  🟠  🔴  🔴
  4 │  🟡  🟡  🟠  🟠  🔴
  3 │  🟢  🟡  🟡  🟠  🟠
  2 │  🟢  🟢  🟡  🟡  🟠
  1 │  🟢  🟢  🟢  🟡  🟡
    └──────────────────────>
      1   2   3   4   5    Impacto

Leyenda:
🔴 Crítico - Remediar INMEDIATAMENTE
🟠 Alto - Remediar este sprint
🟡 Medio - Remediar próximo sprint
🟢 Bajo - Backlog
```

---

### Paso 3.2: Documentar Amenazas

Para cada amenaza identificada, completar:

| ID | Elemento | STRIDE | Amenaza | Probabilidad | Impacto | Riesgo | Mitigación Propuesta |
|----|----------|--------|---------|--------------|---------|--------|----------------------|
| T-001 | P3: Transferencia | T | Usuario modifica monto | 4 | 5 | 🔴 | Validación server-side del monto |
| T-002 | P3: Transferencia | E | Transferir desde cuenta ajena | 3 | 5 | 🟠 | Validar ownership de cuenta origen |
| T-003 | P1: Autenticación | D | Brute force de contraseñas | 5 | 3 | 🟠 | Rate limiting + CAPTCHA |

---

### Actividad (10 min)

**En tu equipo:**

1. Selecciona las 5 amenazas más críticas de tu análisis
2. Asigna Probabilidad (1-5) e Impacto (1-5) a cada una
3. Calcula el nivel de riesgo usando la matriz
4. Propone una mitigación específica para cada amenaza

---

## 📄 Entregable: Documento de Threat Model

Al finalizar el lab, cada equipo debe tener:

### 1. Diagrama DFD

- Dibujado a mano o en herramienta digital
- Incluyendo todos los procesos (P1-P6)
- Trust boundaries claramente marcados

### 2. Tabla de Amenazas

Mínimo 10 amenazas identificadas con:

- Elemento afectado
- Categoría STRIDE
- Descripción de la amenaza
- Score de riesgo (Probabilidad x Impacto)
- Mitigación propuesta

### 3. Top 5 Amenazas Priorizadas

Lista de las 5 amenazas más críticas con plan de mitigación detallado.

---

## 💡 Tips para el Éxito

### ✅ DO (Hacer)

- Trabajar en equipo, discutir diferentes perspectivas
- Ser específico en las amenazas (no genérico)
- Pensar como atacante: "¿Cómo rompería esto?"
- Priorizar correctamente (no todo es crítico)

### ❌ DON'T (No hacer)

- No quedarse solo en amenazas obvias
- No olvidar los trust boundaries
- No proponer mitigaciones genéricas ("usar HTTPS")
- No perder tiempo buscando el DFD perfecto

---

## 🔗 Recursos Adicionales

- [Microsoft Threat Modeling Tool](https://www.microsoft.com/en-us/securityengineering/sdl/threatmodeling) - Herramienta gratuita
- [OWASP Threat Dragon](https://owasp.org/www-project-threat-dragon/) - Alternativa web-based
- [STRIDE per Element](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats) - Referencia de Microsoft

---

## 📝 Plantilla de Documentación

Usa esta plantilla para tu entregable:

```markdown
# Threat Model: BankingApp

## Equipo
- [Nombre 1]
- [Nombre 2]
- [Nombre 3]

## 1. Diagrama DFD
[Insertar imagen o dibujo del DFD]

## 2. Trust Boundaries Identificados
1. Internet ↔ Frontend Web
2. Frontend Web ↔ Backend API
3. Backend API ↔ Base de Datos

## 3. Amenazas Identificadas

| ID | Elemento | STRIDE | Amenaza | P | I | Riesgo | Mitigación |
|----|----------|--------|---------|---|---|--------|------------|
| T-001 | P3 | T | Usuario modifica monto | 4 | 5 | 🔴 | Validación server-side |
| ... | ... | ... | ... | ... | ... | ... | ... |

## 4. Top 5 Amenazas Críticas

### T-001: Usuario modifica monto de transferencia
- **Riesgo:** 🔴 Crítico (P:4, I:5)
- **Descripción:** ...
- **Mitigación:** ...

[Continuar con las otras 4]

## 5. Conclusiones
[Reflexión del equipo sobre el ejercicio]
```

---

## 📚 Soluciones de Referencia

**IMPORTANTE:** Intenta completar el ejercicio antes de ver las soluciones. Estas son referencias para validar tu análisis.

<details>
<summary>👁️ Solución: P1 - Autenticación (click para expandir)</summary>

### Análisis STRIDE de P1: Autenticación

| STRIDE | Pregunta | Amenaza Identificada | ¿Aplica? | Mitigación Propuesta |
|--------|----------|---------------------|----------|----------------------|
| **S** - Spoofing | ¿Alguien puede suplantar identidad? | Atacante usa credenciales robadas | ✅ Sí | MFA, detección de IPs/dispositivos inusuales |
| **T** - Tampering | ¿Se pueden modificar datos? | Modificación de claims en JWT después de emisión | ✅ Sí | Firmar JWT con RS256, validar signature en cada request |
| **T** - Tampering | ¿Se pueden modificar datos? | Modificación de parámetros en request de login | ✅ Sí | HTTPS obligatorio, validación server-side |
| **R** - Repudiation | ¿Se puede negar la acción? | Usuario niega haber iniciado sesión | ✅ Sí | Logging robusto (IP, timestamp, user-agent, geolocalización) |
| **I** - Info Disclosure | ¿Se puede divulgar información? | Mensajes de error enumeran usuarios existentes | ✅ Sí | Mensaje genérico: "Usuario o contraseña incorrectos" |
| **I** - Info Disclosure | ¿Se puede divulgar información? | JWT contiene información sensible en payload | ✅ Sí | No incluir PII en JWT, solo user ID y roles |
| **D** - Denial of Service | ¿Se puede denegar el servicio? | Brute force sin límites de intentos | ✅ Sí | Rate limiting (5 intentos/min), account lockout temporal, CAPTCHA |
| **D** - Denial of Service | ¿Se puede denegar el servicio? | Account lockout permanente por ataques | ✅ Sí | Lockout temporal (15 min), notificación al usuario |
| **E** - Elevation of Privilege | ¿Se pueden elevar privilegios? | Bypass de autenticación via endpoint sin [Authorize] | ✅ Sí | Aplicar [Authorize] en TODOS los controllers, default deny |

**Total:** 9 amenazas identificadas

**Top 3 más críticas:**

1. **T-101:** Modificación de claims en JWT (P:3, I:5) → 🔴 Crítico
2. **S-101:** Credenciales robadas (P:5, I:4) → 🔴 Crítico
3. **D-101:** Brute force sin límites (P:5, I:3) → 🟠 Alto

</details>

<details>
<summary>👁️ Solución: P6 - Panel de Administración (click para expandir)</summary>

### Análisis STRIDE de P6: Panel de Administración

| STRIDE | Pregunta | Amenaza Identificada | ¿Aplica? | Mitigación Propuesta |
|--------|----------|---------------------|----------|----------------------|
| **S** - Spoofing | ¿Alguien puede suplantar identidad? | Atacante roba JWT de admin | ✅ Sí | JWT de corta duración para admins (15 min), re-autenticación para operaciones críticas |
| **T** - Tampering | ¿Se pueden modificar datos? | Modificar role de "User" a "Admin" en JWT | ✅ Sí | Validar rol en CADA request, no confiar en cliente |
| **R** - Repudiation | ¿Se puede negar la acción? | Admin niega haber deshabilitado cuenta de usuario | ✅ Sí | Audit logs inmutables de todas las acciones admin (quién, qué, cuándo, desde dónde) |
| **I** - Info Disclosure | ¿Se puede divulgar información? | Panel muestra PII de todos los usuarios sin restricción | ✅ Sí | Data masking, mostrar solo últimos 4 dígitos, logs de quién accedió a qué |
| **I** - Info Disclosure | ¿Se puede divulgar información? | API de admin accesible sin autenticación | ✅ Sí | [Authorize(Roles = "Admin")] en TODOS los endpoints admin |
| **D** - Denial of Service | ¿Se puede denegar el servicio? | Admin ejecuta query pesada que bloquea DB | ✅ Sí | Query timeout, paginación obligatoria, rate limiting incluso para admins |
| **E** - Elevation of Privilege | ¿Se pueden elevar privilegios? | Usuario normal accede a /admin/* via URL directa | ✅ Sí | Validación de rol en server-side, no solo ocultar UI |
| **E** - Elevation of Privilege | ¿Se pueden elevar privilegios? | IDOR - Admin A modifica datos de Admin B | ✅ Sí | Validar ownership incluso entre admins, principio de mínimo privilegio |

**Total:** 8 amenazas identificadas

**Top 3 más críticas:**

1. **E-601:** Usuario normal accede a panel admin (P:4, I:5) → 🔴 Crítico
2. **T-601:** Modificar rol en JWT (P:3, I:5) → 🔴 Crítico
3. **I-601:** API admin sin autenticación (P:4, I:4) → 🔴 Crítico

</details>

---

## ❓ Preguntas Frecuentes

**P: ¿Qué tan detallado debe ser el DFD?**
R: Nivel 0-1 es suficiente. Enfócate en los flujos principales, no en cada función individual.

**P: ¿Todas las amenazas STRIDE aplican a todos los elementos?**
R: No. Usa la matriz de aplicabilidad (ver contenido teórico).

**P: ¿Cómo sé si mi mitigación es buena?**
R: Debe ser específica, implementable y reducir el riesgo significativamente.

**P: ¿Debo incluir todas las amenazas que encuentro o solo las más críticas?**
R: Documenta TODAS las amenazas identificadas (mínimo 10), luego prioriza las top 5 para el plan de mitigación detallado.

**P: ¿Qué hago si una amenaza cae en múltiples categorías STRIDE?**
R: Elige la categoría más crítica y menciona las secundarias en la descripción (ej: "IDOR - E+I").

---

**Próximo paso:** En el siguiente laboratorio aplicaremos estas amenazas a código real y veremos cómo implementar las mitigaciones.

**Versión:** 1.1
**Última actualización:** Enero 2025
