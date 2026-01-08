---
sidebar_position: 1
---

# Threat Modeling con STRIDE

## 📋 ¿Qué es Threat Modeling?

### Definición Simple

**Threat Modeling** = Proceso estructurado para identificar, cuantificar y priorizar amenazas a un sistema.

### Analogía: El Arquitecto de Seguridad

Imagina que diseñas una casa:

- 🏠 Primero haces los planos (arquitectura)
- 🔍 Luego identificas puntos vulnerables (puertas, ventanas, sótano)
- 🚨 Decides dónde poner alarmas, cerraduras reforzadas, cámaras
- 📋 Priorizas según el riesgo (puerta principal > ventana del baño)

**Threat Modeling = Lo mismo, pero para software**

---

## 🤔 ¿Por Qué Hacer Threat Modeling?

### Beneficios

1. **Identificar problemas ANTES de escribir código**
   - Más barato arreglar en diseño que en producción
   - Ratio de costo: 1x (diseño) vs 10x (desarrollo) vs 100x (producción)

2. **Comunicación entre equipos**
   - Desarrolladores, arquitectos, seguridad, negocio hablan el mismo idioma

3. **Cumplimiento normativo**
   - ISO 27001/27002 - Control 8.25: Secure development lifecycle
   - PCI-DSS Requirement 6.5
   - GDPR - Privacy by Design

4. **Decisiones de seguridad informadas**
   - No "adivinar" qué proteger
   - Priorizar esfuerzo donde hay más riesgo

---

## 🎨 Metodologías de Threat Modeling

Existen varias metodologías:

| Metodología | Creador | Enfoque | Mejor para |
|-------------|---------|---------|------------|
| **STRIDE** | Microsoft | Tipos de amenazas | General, arquitectura |
| **PASTA** | Risk Centric | Proceso de 7 pasos | Empresas grandes |
| **LINDDUN** | KU Leuven | Privacidad | Apps con GDPR |
| **Attack Trees** | Bruce Schneier | Árbol de ataques | Análisis de ataques específicos |
| **OCTAVE** | CMU/SEI | Riesgo organizacional | Organizaciones completas |

**En este curso usaremos STRIDE** por ser:

- ✅ Simple de aprender
- ✅ Enfocada en software
- ✅ Ampliamente adoptada en la industria

---

## 🔷 STRIDE: Introducción

**STRIDE** es un acrónimo de 6 tipos de amenazas:

```
S  - Spoofing (Suplantación de identidad)
T  - Tampering (Manipulación de datos)
R  - Repudiation (Repudio/Negación)
I  - Information Disclosure (Divulgación de información)
D  - Denial of Service (Denegación de servicio)
E  - Elevation of Privilege (Elevación de privilegios)
```

**Desarrollado por:** Microsoft en 1999 por Loren Kohnfelder y Praerit Garg

---

## 🔷 STRIDE: Detalle de Cada Amenaza

### **S - Spoofing (Suplantación)**

**Definición:** Pretender ser alguien o algo que no eres.

**Ejemplos:**

- 👤 Usar las credenciales de otro usuario
- 🌐 Falsificar dirección IP o email
- 🔐 Robar token de sesión (session hijacking)
- 📧 Email phishing que parece legítimo

**Propiedad de seguridad violada:** **Autenticación**

**Mitigaciones:**

- ✅ Autenticación multifactor (MFA)
- ✅ Certificados digitales
- ✅ Tokens JWT firmados
- ✅ Mutual TLS (mTLS)

**Pregunta clave:** *"¿Cómo sé que eres quien dices ser?"*

---

### **T - Tampering (Manipulación)**

**Definición:** Modificar datos sin autorización.

**Ejemplos:**

- 🗃️ Modificar datos en la base de datos
- 🌐 Modificar parámetros en URL o cookies
- 📦 Alterar paquetes de red (Man-in-the-Middle)
- 💾 Modificar archivos de configuración

**Propiedad de seguridad violada:** **Integridad**

**Mitigaciones:**

- ✅ Firmas digitales
- ✅ HMAC (Hash-based Message Authentication Code)
- ✅ Control de acceso estricto a BD
- ✅ Validación de integridad (checksums)
- ✅ HTTPS/TLS para datos en tránsito

**Pregunta clave:** *"¿Cómo sé que los datos no han sido modificados?"*

---

### **R - Repudiation (Repudio)**

**Definición:** Negar haber realizado una acción cuando sí la realizaste.

**Ejemplos:**

- 📝 "Yo no hice esa transferencia bancaria"
- 🛒 "Yo no realicé esa compra"
- 📧 "Yo no envié ese email"
- 🗑️ "Yo no borré esos datos"

**Propiedad de seguridad violada:** **No repudio**

**Mitigaciones:**

- ✅ Logs de auditoría inmutables
- ✅ Firmas digitales
- ✅ Timestamps certificados
- ✅ Video/screenshots de acciones
- ✅ SIEM (Security Information and Event Management)

**Pregunta clave:** *"¿Cómo puedo probar que alguien realizó esta acción?"*

---

### **I - Information Disclosure (Divulgación de Información)**

**Definición:** Exponer información a usuarios no autorizados.

**Ejemplos:**

- 🔍 Mensajes de error verbose (stack traces)
- 📄 Archivos de configuración expuestos (.env, appsettings.json)
- 🔓 Datos sensibles en logs
- 🌐 APIs sin autenticación
- 💾 Backups accesibles públicamente

**Propiedad de seguridad violada:** **Confidencialidad**

**Mitigaciones:**

- ✅ Cifrado (en tránsito y en reposo)
- ✅ Control de acceso granular
- ✅ Sanitización de logs
- ✅ Error handling genérico
- ✅ Clasificación de datos (público, confidencial, secreto)

**Pregunta clave:** *"¿Quién puede ver esta información?"*

---

### **D - Denial of Service (Denegación de Servicio)**

**Definición:** Hacer que un sistema no esté disponible para usuarios legítimos.

**Ejemplos:**

- 🌊 Flood attacks (enviar millones de requests)
- 💣 Crash vulnerabilities (hacer que la app se caiga)
- 💾 Llenar disco/memoria
- 🔒 Bloquear cuentas legítimas (brute force protection mal implementado)

**Propiedad de seguridad violada:** **Disponibilidad**

**Mitigaciones:**

- ✅ Rate limiting
- ✅ Throttling
- ✅ Load balancing
- ✅ CDN y WAF (Web Application Firewall)
- ✅ Validación de input (prevenir crashes)
- ✅ Quotas y límites de recursos

**Pregunta clave:** *"¿Qué pasa si alguien intenta saturar el sistema?"*

---

### **E - Elevation of Privilege (Elevación de Privilegios)**

**Definición:** Obtener permisos superiores a los que deberías tener.

**Ejemplos:**

- 👑 Usuario normal accede a funciones de admin
- 🔓 Explotar vulnerabilidad para obtener shell de root
- 🎭 Bypass de control de acceso (IDOR)
- 📜 SQL Injection para obtener acceso a toda la BD

**Propiedad de seguridad violada:** **Autorización**

**Mitigaciones:**

- ✅ Principio de mínimo privilegio
- ✅ Role-Based Access Control (RBAC)
- ✅ Validación de permisos en cada acción
- ✅ Input validation
- ✅ Separación de privilegios

**Pregunta clave:** *"¿Qué puede hacer un usuario con estos permisos?"*

---

## 📊 STRIDE: Matriz de Elementos vs Amenazas

Diferentes tipos de elementos en un diagrama tienen diferentes amenazas aplicables:

| Elemento | S | T | R | I | D | E |
|----------|---|---|---|---|---|---|
| **Proceso** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Data Store (BD, archivos)** | - | ✅ | ❓ | ✅ | ✅ | - |
| **Data Flow (red, APIs)** | - | ✅ | - | ✅ | ✅ | - |
| **Entidad Externa (usuario, sistema)** | ✅ | - | ✅ | - | - | - |

**Leyenda:**

- ✅ = Amenaza aplicable
- ❓ = Depende del contexto
- \- = No aplicable

---

## 🎨 Diagramas de Flujo de Datos (DFD)

Para aplicar STRIDE, primero necesitamos un **Data Flow Diagram (DFD)**.

### Elementos de un DFD

```
┌─────────┐
│ Usuario │  = Entidad Externa (actor externo al sistema)
└─────────┘

┌─────────┐
│ Proceso │  = Proceso (código que procesa datos)
└─────────┘

║ BD      ║  = Data Store (base de datos, archivos)
╚═════════╝

  ─────>     = Data Flow (flujo de datos)

┌─────────┐
│┼┼┼┼┼┼┼┼┼│  = Trust Boundary (límite de confianza)
└─────────┘
```

---

### Ejemplo: Aplicación Web Simple

```
                Trust Boundary (Internet)
       ┌────────────────────────────────────┐
       │                                    │
   ┌───────┐      HTTPS      ┌──────────┐  │
   │Usuario│ ─────────────> │   Web     │  │
   │ Web   │                │  Server   │  │
   └───────┘ <───────────── └──────────┘  │
       │         HTML              │       │
       │                           │       │
       │                           ▼       │
       │                    ┌──────────┐  │
       │                    │   App    │  │
       │                    │  Logic   │  │
       │                    └──────────┘  │
       │                           │       │
       │                           ▼       │
       │                    ║            ║ │
       │                    ║  Database  ║ │
       │                    ║            ║ │
       │                    ╚════════════╝ │
       └────────────────────────────────────┘
```

---

### Trust Boundaries (Límites de Confianza)

**Definición:** Líneas que separan zonas de diferente nivel de confianza.

**Ejemplos de límites:**

- 🌐 Internet ↔ DMZ
- 🔒 DMZ ↔ Red interna
- 👤 Usuario anónimo ↔ Usuario autenticado
- 🖥️ Cliente ↔ Servidor
- 🏢 Proceso con privilegios bajos ↔ Proceso con privilegios altos

**Regla de oro:** Cada vez que los datos cruzan un trust boundary, aplicar STRIDE.

---

## 🛠️ Proceso de Threat Modeling (4 Pasos)

### **Paso 1: Modelar el Sistema**

- Crear diagrama de flujo de datos (DFD)
- Identificar:
  - Entidades externas (usuarios, sistemas)
  - Procesos (servicios, APIs, componentes)
  - Data stores (bases de datos, archivos)
  - Data flows (conexiones, APIs)
  - Trust boundaries

---

### **Paso 2: Identificar Amenazas**

- Para cada elemento del DFD, aplicar STRIDE
- Preguntar: "¿Qué podría salir mal aquí?"
- Usar checklist de amenazas

**Ejemplo:**

```
Elemento: Login API (Proceso)
├─ [S] ¿Alguien puede suplantar identidad? → Sí (credenciales robadas)
├─ [T] ¿Alguien puede manipular datos? → Sí (modificar request)
├─ [R] ¿Alguien puede negar haber accedido? → Sí (sin logs)
├─ [I] ¿Se puede divulgar información? → Sí (error messages verbose)
├─ [D] ¿Se puede denegar el servicio? → Sí (brute force sin rate limit)
└─ [E] ¿Se puede elevar privilegios? → Sí (IDOR para cambiar roles)
```

---

### **Paso 3: Priorizar Amenazas**

Usar **Risk Matrix** para priorizar:

```
         ┌─────────────────────────────┐
         │  Probabilidad vs Impacto    │
         └─────────────────────────────┘

Probabilidad
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

### **Paso 4: Mitigar Amenazas**

Para cada amenaza priorizada, elegir una estrategia:

1. **Evitar (Avoid)** - Eliminar la funcionalidad
2. **Transferir (Transfer)** - Usar servicio de terceros (OAuth, etc.)
3. **Mitigar (Mitigate)** - Implementar controles
4. **Aceptar (Accept)** - Documentar y aceptar el riesgo

**Documentar:**

- Amenaza identificada
- Riesgo (Probabilidad x Impacto)
- Estrategia elegida
- Control implementado
- Responsable
- Fecha de implementación

---

## 📝 Ejemplo Práctico: E-Commerce

### Escenario: Checkout de Compra

```
┌─────────┐        HTTPS         ┌──────────┐
│ Cliente │ ───────────────────> │   Web    │
│   Web   │                      │  Server  │
└─────────┘ <─────────────────── └──────────┘
     │          HTML/JSON              │
     │                                 ▼
     │                          ┌──────────┐
     │                          │ Payment  │
     │                          │  API     │
     │                          └──────────┘
     │                                 │
     │                                 ▼
     │                          ║          ║
     │                          ║ Orders  ║
     │                          ║   DB    ║
     │                          ╚══════════╝
```

---

### Aplicar STRIDE al "Payment API"

| Amenaza | Descripción | Riesgo | Mitigación |
|---------|-------------|--------|------------|
| **S** - Spoofing | Atacante usa token robado para hacer pedidos | 🔴 Alto | MFA, JWT con expiration corto |
| **T** - Tampering | Modificar el precio en el request | 🔴 Crítico | Firmar requests, validar en servidor |
| **R** - Repudiation | Usuario niega haber hecho la compra | 🟡 Medio | Logs de auditoría, email de confirmación |
| **I** - Info Disclosure | Datos de tarjeta expuestos en logs | 🔴 Crítico | Tokenización, PCI-DSS compliance |
| **D** - DoS | Saturar el API con pedidos falsos | 🟠 Alto | Rate limiting por usuario/IP |
| **E** - Elevation | Usuario modifica total a $0 | 🔴 Crítico | Validación server-side, no confiar en cliente |

---

## 🔗 Mapeo a Estándares

### ISO 27002:2022

| STRIDE | Control ISO 27002 |
|--------|-------------------|
| Spoofing | 5.15 - Access control, 8.5 - Secure authentication |
| Tampering | 8.24 - Use of cryptography |
| Repudiation | 8.15 - Logging, 8.16 - Monitoring activities |
| Info Disclosure | 8.11 - Data masking, 8.24 - Cryptography |
| DoS | 8.6 - Capacity management |
| Elevation | 5.15 - Access control, 8.3 - Least privilege |

### OWASP Top 10 2021

| STRIDE | OWASP Top 10 |
|--------|--------------|
| Spoofing | A07 - Identification and Authentication Failures |
| Tampering | A08 - Software and Data Integrity Failures |
| Repudiation | A09 - Security Logging and Monitoring Failures |
| Info Disclosure | A02 - Cryptographic Failures |
| DoS | A04 - Insecure Design |
| Elevation | A01 - Broken Access Control |

---

## 🎯 Cuándo Hacer Threat Modeling

### Momentos Ideales

1. **Diseño de nueva funcionalidad** ✅ MEJOR MOMENTO
   - Costo bajo de cambios
   - Previene problemas desde el inicio

2. **Cambios arquitectónicos significativos**
   - Migración a microservicios
   - Agregar nuevos integradores
   - Cambio de tecnología

3. **Antes de auditorías de seguridad**
   - Identifica problemas antes que el auditor

4. **Después de un incidente de seguridad**
   - Asegurar que no vuelva a pasar

5. **Mantenimiento (anualmente)**
   - El sistema evoluciona, las amenazas también

---

## 🧰 Herramientas de Threat Modeling

### Gratuitas

- **Microsoft Threat Modeling Tool** - Windows, basada en STRIDE
- **OWASP Threat Dragon** - Multiplataforma, web-based
- **draw.io** - Para diagramas DFD
- **Lucidchart** - Colaborativo, freemium

### De Pago

- **IriusRisk** - Enterprise
- **ThreatModeler** - Enterprise
- **SD Elements** - Integrado con SDLC

### Low-Tech (Pero efectivo)

- **Whiteboard + Post-its** - Para workshops presenciales
- **Google Docs/Sheets** - Para documentar amenazas

---

## 💡 Tips y Best Practices

### ✅ DO (Hacer)

- Involucrar a todo el equipo (dev, arquitectos, seguridad, negocio)
- Mantener sesiones cortas (1-2 horas max)
- Enfocarse en alto nivel primero, luego detalles
- Documentar TODO (incluso riesgos aceptados)
- Revisar y actualizar periódicamente

### ❌ DON'T (No hacer)

- No hacer threat modeling solo (es colaborativo)
- No intentar cubrir todo en una sesión
- No buscar perfección (better done than perfect)
- No olvidarse de actualizar cuando el sistema cambie
- No hacer threat modeling y no implementar las mitigaciones

---

## 📖 Referencias

- [Microsoft Threat Modeling](https://www.microsoft.com/en-us/securityengineering/sdl/threatmodeling)
- [OWASP Threat Modeling](https://owasp.org/www-community/Threat_Modeling)
- [STRIDE Paper Original](https://www.microsoft.com/en-us/research/publication/stride-threat-modeling/)
- [Threat Modeling Manifesto](https://www.threatmodelingmanifesto.org/)

---

**Próximo paso:** Laboratorio práctico de Threat Modeling

**Versión:** 1.0
**Última actualización:** Enero 2025
