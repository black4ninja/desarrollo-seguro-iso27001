---
sidebar_position: 3
---

# Lab: Code Reviews Orientados a Seguridad

## 🎯 Objetivos

Al finalizar este laboratorio, podrás:

1. ✅ Diferenciar entre code review y la inspección formal
2. ✅ Identificar características de un buen vs mal code review
3. ✅ Detectar vulnerabilidades de seguridad específicas en código
4. ✅ Escribir comentarios constructivos y específicos de seguridad
5. ✅ Mapear hallazgos a OWASP Top 10 e ISO 27002:2022
6. ✅ Generar reportes de code review enfocados en seguridad

---

## ⏱️ Duración Estimada

**50 minutos** (10 min teoría + 35 min práctica + 5 min discusión)

---

## 📚 Parte 1: Code Review vs Inspección Formal (10 min)

### ¿Cuál es la diferencia?

| Aspecto | Inspección Formal (Día 2) | Code Review (Día 3) |
|---------|---------------------------|---------------------|
| **Momento** | Componente completo terminado | Pull Request / cambio específico |
| **Formato** | Reunión sincrónica con roles | Asíncrono, comentarios en PR |
| **Alcance** | Todo el componente | Solo cambios del PR |
| **Formalidad** | Proceso estructurado, métricas | Más ágil y conversacional |
| **Objetivo** | Encontrar máximo de defectos | Validar calidad antes de merge |
| **Participantes** | Equipo completo (4-6 personas) | 1-2 revisores + autor |

### ✅ Características de un BUEN Code Review de Seguridad

```markdown
✅ EJEMPLO DE BUEN COMENTARIO:

🔴 **CRÍTICO - SQL Injection (OWASP A03)**
**Ubicación:** ProductController.cs, línea 42

**Problema:**
La consulta SQL concatena directamente el input del usuario sin sanitización:
`var query = $"SELECT * FROM Products WHERE Name = '{productName}'";`

**Riesgo:**
Un atacante puede inyectar SQL malicioso y extraer toda la base de datos.
Ejemplo: `productName = "'; DROP TABLE Products; --"`

**Remediación:**
Usa consultas parametrizadas:
```csharp
var query = "SELECT * FROM Products WHERE Name = @name";
command.Parameters.AddWithValue("@name", productName);
```

**Controles ISO 27002:**
- 8.28: Secure coding
- 8.16: Monitoring activities

**Referencias:**
- https://owasp.org/Top10/A03_2021-Injection/
- CWE-89: SQL Injection
```

**Por qué es bueno:**
- 🎯 **Específico:** Indica línea exacta y código problemático
- 🔍 **Educativo:** Explica el riesgo con ejemplo de exploit
- 🛠️ **Accionable:** Proporciona solución concreta con código
- 📊 **Trazable:** Mapea a OWASP y controles ISO
- 🚨 **Severidad clara:** Marca como CRÍTICO

---

### ❌ Características de un MAL Code Review

```markdown
❌ EJEMPLO DE MAL COMENTARIO:

"Este código tiene problemas de seguridad. Por favor arreglar."
```

**Por qué es malo:**
- ❌ Vago: No especifica qué ni dónde
- ❌ No educativo: No explica el riesgo
- ❌ No accionable: No dice cómo arreglar
- ❌ No profesional: Tono negativo sin contexto

---

### 📋 Checklist Rápida para PR Security Reviews

Antes de aprobar un PR, verifica:

- [ ] **Inyección:** ¿Hay inputs sin validar o sanitizar?
- [ ] **Autenticación:** ¿Se verifican permisos correctamente?
- [ ] **Datos sensibles:** ¿Hay credenciales, tokens o secrets hardcodeados?
- [ ] **Control de acceso:** ¿Se valida ownership de recursos?
- [ ] **Criptografía:** ¿Se usan algoritmos seguros y actualizados?
- [ ] **Configuración:** ¿Están deshabilitados debug mode y stack traces en producción?
- [ ] **Logging:** ¿Se registran datos sensibles en logs?
- [ ] **Dependencias:** ¿Se introdujeron librerías nuevas sin verificar vulnerabilidades?

---

## 🔬 Parte 2: Ejercicio Práctico (35 min)

### Contexto

Eres revisor de un Pull Request que modifica el sistema de autenticación y manejo de órdenes. El autor es un desarrollador junior que necesita feedback constructivo.

**Tu tarea:**
1. Revisar los 4 archivos siguientes
2. Identificar vulnerabilidades de seguridad
3. Escribir comentarios de code review (usando el formato de "buen comentario")
4. Completar el reporte de code review al final

---

### 📄 Archivo 1: `Controllers/AuthController.cs`

```csharp
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace SecureShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly string connectionString =
            "Server=prod-db.company.com;Database=SecureShop;User Id=admin;Password=Admin123!;";

        [HttpPost("login")]
        public IActionResult Login(string username, string password)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var query = $"SELECT * FROM Users WHERE Username = '{username}' AND Password = '{password}'";

                using (var command = new SqlCommand(query, connection))
                {
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            // Crear token de sesión
                            var sessionToken = username + "_" + DateTime.Now.ToString("yyyyMMdd");

                            Console.WriteLine($"Login exitoso: {username} con password {password}");

                            return Ok(new {
                                message = "Login exitoso",
                                token = sessionToken,
                                isAdmin = username.ToLower() == "admin"
                            });
                        }
                        else
                        {
                            return Unauthorized(new {
                                message = "Usuario o contraseña incorrectos",
                                attemptedUsername = username
                            });
                        }
                    }
                }
            }
        }
    }
}
```

**🔍 Instrucciones:**
Identifica AL MENOS 5 vulnerabilidades en este código y escribe comentarios de code review para cada una.

---

### 📄 Archivo 2: `Controllers/OrderController.cs`

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace SecureShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        [HttpGet("{orderId}")]
        public IActionResult GetOrder(int orderId)
        {
            // Obtener la orden de la base de datos
            var order = OrderService.GetOrderById(orderId);

            if (order == null)
            {
                return NotFound();
            }

            // Retornar la orden sin validar ownership
            return Ok(order);
        }

        [HttpPost]
        public IActionResult CreateOrder([FromBody] OrderRequest request)
        {
            try
            {
                // Validación básica
                if (request.TotalAmount < 0)
                {
                    return BadRequest("El monto debe ser positivo");
                }

                // Crear orden
                var order = new Order
                {
                    UserId = request.UserId,
                    TotalAmount = request.TotalAmount,
                    Items = request.Items
                };

                OrderService.CreateOrder(order);

                return Ok(order);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new {
                    error = ex.Message,
                    stackTrace = ex.StackTrace,
                    innerException = ex.InnerException?.Message
                });
            }
        }
    }
}
```

**🔍 Instrucciones:**
Identifica AL MENOS 3 vulnerabilidades en este código.

---

### 📄 Archivo 3: `Services/PaymentService.cs`

```csharp
using System;
using System.Security.Cryptography;
using System.Text;

namespace SecureShop.Services
{
    public class PaymentService
    {
        // API Key de Stripe hardcodeada (EJEMPLO EDUCATIVO - NO ES UNA KEY REAL)
        private const string StripeApiKey = "sk_test_FAKE_KEY_for_educational_demo_purposes_ONLY_12345";

        public string ProcessPayment(decimal amount, string cardNumber)
        {
            // Encriptar número de tarjeta con MD5
            var encryptedCard = EncryptCardNumber(cardNumber);

            // Log de transacción
            Console.WriteLine($"Procesando pago de ${amount} con tarjeta {cardNumber}");

            // Llamar API de Stripe
            var result = CallStripeAPI(amount, encryptedCard);

            return result;
        }

        private string EncryptCardNumber(string cardNumber)
        {
            using (MD5 md5 = MD5.Create())
            {
                byte[] inputBytes = Encoding.ASCII.GetBytes(cardNumber);
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < hashBytes.Length; i++)
                {
                    sb.Append(hashBytes[i].ToString("X2"));
                }
                return sb.ToString();
            }
        }

        private string CallStripeAPI(decimal amount, string encryptedCard)
        {
            // Simulación de llamada API
            return "payment_" + Guid.NewGuid().ToString();
        }
    }
}
```

**🔍 Instrucciones:**
Identifica AL MENOS 3 vulnerabilidades en este código.

---

### 📄 Archivo 4: `appsettings.json`

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Server=prod-db.company.com;Database=SecureShop;User Id=sa;Password=P@ssw0rd123;MultipleActiveResultSets=true"
  },
  "JwtSettings": {
    "SecretKey": "my-super-secret-key-12345",
    "Issuer": "SecureShop",
    "Audience": "SecureShopUsers",
    "ExpirationMinutes": 43200
  },
  "ApiKeys": {
    "Stripe": "sk_test_FAKE_KEY_for_educational_demo_purposes_ONLY_12345",
    "SendGrid": "SG.FAKE_sendgrid_key_for_demo_purposes_ONLY_a1b2c3d4e5f6g7h8"
  },
  "AdminCredentials": {
    "Username": "admin",
    "Password": "Admin2024!"
  },
  "Environment": "Production",
  "DebugMode": true
}
```

**🔍 Instrucciones:**
Identifica AL MENOS 4 vulnerabilidades en este archivo de configuración.

---

## 📝 Plantilla de Reporte de Code Review

Usa esta plantilla para documentar tus hallazgos:

```markdown
# Code Review Report - PR #XXX

**Revisor:** [Tu Nombre]
**Fecha:** [Fecha]
**Rama:** feature/auth-improvements
**Autor:** Junior Developer

---

## 📊 Resumen Ejecutivo

- **Total de hallazgos:** [número]
- **Críticos:** [número] 🔴
- **Altos:** [número] 🟠
- **Medios:** [número] 🟡
- **Bajos:** [número] 🔵

**Recomendación:** [ ] Aprobar | [ ] Aprobar con cambios | [X] Requiere cambios

---

## 🔴 Hallazgos Críticos

### 1. [Nombre de la Vulnerabilidad]

**Archivo:** `[nombre del archivo]`
**Línea:** [número]
**Severidad:** 🔴 CRÍTICA
**OWASP:** [Categoría, ej. A03 - Injection]
**ISO 27002:** [Controles aplicables, ej. 8.28]
**CWE:** [ID, ej. CWE-89]

**Descripción del problema:**
[Explicación clara del problema]

**Riesgo:**
[Impacto potencial si se explota]

**Código problemático:**
[Extracto del código vulnerable]

**Remediación:**
[Solución específica con código corregido]

**Referencias:**
- [Enlaces relevantes]

---

[Repetir para cada hallazgo...]

---

## 🟠 Hallazgos Altos

[Mismo formato...]

---

## 🟡 Hallazgos Medios

[Mismo formato...]

---

## 🔵 Hallazgos Bajos

[Mismo formato...]

---

## 📋 Mapeo a Estándares

| # | Vulnerabilidad | Archivo | OWASP | ISO 27002 | CWE | Severidad |
|---|----------------|---------|-------|-----------|-----|-----------|
| 1 | SQL Injection | AuthController.cs | A03 | 8.28 | CWE-89 | 🔴 |
| 2 | ... | ... | ... | ... | ... | ... |

---

## ✅ Aspectos Positivos

[Menciona qué está bien hecho en el código]

---

## 🎯 Recomendaciones Generales

1. [Recomendación general 1]
2. [Recomendación general 2]
3. [...]

---

## 📚 Recursos de Aprendizaje

- [Enlaces a documentación, mejores prácticas, etc.]
```

---

## 💡 Parte 3: Discusión y Cierre (5 min)

### Vulnerabilidades Esperadas en el Ejercicio

<details>
<summary>🔍 Click para ver las vulnerabilidades que deberías haber encontrado</summary>

#### **AuthController.cs** (7+ vulnerabilidades):

1. **🔴 CRÍTICA - Credenciales Hardcodeadas**
   - OWASP: A05 - Security Misconfiguration
   - ISO 27002: 8.24 (Use of cryptography)
   - CWE: CWE-798
   - Línea 10: Connection string con credenciales en código

2. **🔴 CRÍTICA - SQL Injection**
   - OWASP: A03 - Injection
   - ISO 27002: 8.28 (Secure coding)
   - CWE: CWE-89
   - Línea 16: Concatenación directa de input del usuario

3. **🔴 CRÍTICA - Contraseñas en Texto Plano**
   - OWASP: A02 - Cryptographic Failures
   - ISO 27002: 8.24 (Use of cryptography)
   - CWE: CWE-916
   - Línea 16: Comparación de passwords sin hash

4. **🟠 ALTA - Tokens de Sesión Débiles**
   - OWASP: A07 - Identification and Authentication Failures
   - ISO 27002: 8.5 (Secure authentication)
   - CWE: CWE-330
   - Línea 24: Token predecible basado en username + fecha

5. **🟠 ALTA - Logging de Datos Sensibles**
   - OWASP: A09 - Security Logging Failures
   - ISO 27002: 8.11 (Data masking)
   - CWE: CWE-532
   - Línea 26: Password en logs

6. **🟡 MEDIA - Enumeración de Usuarios**
   - OWASP: A07 - Identification and Authentication Failures
   - ISO 27002: 8.5 (Secure authentication)
   - CWE: CWE-203
   - Línea 33: Mensaje revela si username existe

7. **🟡 MEDIA - Exposición de Información**
   - OWASP: A01 - Broken Access Control
   - ISO 27002: 8.11 (Data masking)
   - CWE: CWE-200
   - Línea 31: Revela si usuario es admin en respuesta

---

#### **OrderController.cs** (4 vulnerabilidades):

1. **🔴 CRÍTICA - IDOR (Insecure Direct Object Reference)**
   - OWASP: A01 - Broken Access Control
   - ISO 27002: 5.15 (Access control), 8.3 (Information access restriction)
   - CWE: CWE-639
   - Línea 11-20: No valida ownership de la orden

2. **🟠 ALTA - Falta de Autenticación**
   - OWASP: A07 - Identification and Authentication Failures
   - ISO 27002: 8.5 (Secure authentication)
   - CWE: CWE-306
   - No hay `[Authorize]` attribute en endpoints

3. **🟠 ALTA - Exposición de Stack Trace**
   - OWASP: A05 - Security Misconfiguration
   - ISO 27002: 8.23 (Web filtering)
   - CWE: CWE-209
   - Línea 42-45: Stack trace expuesto en respuesta de error

4. **🟡 MEDIA - Validación Insuficiente**
   - OWASP: A03 - Injection
   - ISO 27002: 8.28 (Secure coding)
   - CWE: CWE-20
   - Línea 28: Solo valida que amount > 0, no valida otros campos

---

#### **PaymentService.cs** (5 vulnerabilidades):

1. **🔴 CRÍTICA - API Key Hardcodeada**
   - OWASP: A05 - Security Misconfiguration
   - ISO 27002: 8.24 (Use of cryptography)
   - CWE: CWE-798
   - Línea 9: Stripe API key en código fuente

2. **🔴 CRÍTICA - Uso de MD5 (Algoritmo Débil)**
   - OWASP: A02 - Cryptographic Failures
   - ISO 27002: 8.24 (Use of cryptography)
   - CWE: CWE-327
   - Línea 24: MD5 está roto y no debe usarse

3. **🔴 CRÍTICA - Logging de PII/PCI**
   - OWASP: A09 - Security Logging Failures
   - ISO 27002: 8.11 (Data masking)
   - CWE: CWE-532
   - Línea 17: Número de tarjeta completo en logs

4. **🟠 ALTA - Almacenamiento Inseguro de Datos de Pago**
   - OWASP: A02 - Cryptographic Failures
   - ISO 27002: 8.24 (Use of cryptography)
   - CWE: CWE-311
   - Manejo incorrecto de datos PCI-DSS

5. **🟡 MEDIA - Falta de Validación de Tarjeta**
   - OWASP: A03 - Injection
   - ISO 27002: 8.28 (Secure coding)
   - CWE: CWE-20
   - No valida formato de tarjeta antes de procesar

---

#### **appsettings.json** (6+ vulnerabilidades):

1. **🔴 CRÍTICA - Connection String con Credenciales**
   - OWASP: A05 - Security Misconfiguration
   - ISO 27002: 8.24 (Use of cryptography)
   - CWE: CWE-798
   - Línea 9: Password de DB en archivo versionado

2. **🔴 CRÍTICA - JWT Secret Key Débil**
   - OWASP: A02 - Cryptographic Failures
   - ISO 27002: 8.24 (Use of cryptography)
   - CWE: CWE-321
   - Línea 12: Secret key predecible

3. **🔴 CRÍTICA - API Keys en Configuración**
   - OWASP: A05 - Security Misconfiguration
   - ISO 27002: 8.24 (Use of cryptography)
   - CWE: CWE-798
   - Línea 17-19: API keys de terceros expuestas

4. **🔴 CRÍTICA - Credenciales de Admin Hardcodeadas**
   - OWASP: A07 - Identification and Authentication Failures
   - ISO 27002: 8.5 (Secure authentication)
   - CWE: CWE-798
   - Línea 21-23: Credenciales de admin en archivo

5. **🟠 ALTA - Debug Mode en Producción**
   - OWASP: A05 - Security Misconfiguration
   - ISO 27002: 8.23 (Web filtering)
   - CWE: CWE-489
   - Línea 26: DebugMode=true expone información

6. **🟠 ALTA - Log Level Debug en Producción**
   - OWASP: A09 - Security Logging Failures
   - ISO 27002: 8.15 (Logging)
   - CWE: CWE-532
   - Línea 3: Debug logging puede exponer datos sensibles

7. **🟡 MEDIA - Token Expiration Excesivo**
   - OWASP: A07 - Identification and Authentication Failures
   - ISO 27002: 8.5 (Secure authentication)
   - CWE: CWE-613
   - Línea 15: 43200 minutos = 30 días (demasiado)

</details>

---

### Mejores Prácticas de Code Review de Seguridad

1. **🎯 Sé específico:** Siempre indica archivo, línea, y código exacto
2. **📚 Educa:** Explica el "por qué" es un problema
3. **🛠️ Proporciona soluciones:** No solo señales problemas, da alternativas
4. **🏷️ Clasifica severidad:** Usa criterios consistentes (CVSS, impacto de negocio)
5. **📊 Mapea a estándares:** Relaciona con OWASP, ISO, CWE para trazabilidad
6. **🤝 Sé constructivo:** Tono profesional y respetuoso
7. **✅ Reconoce lo bueno:** Menciona también qué está bien hecho
8. **🔗 Proporciona referencias:** Links a documentación y mejores prácticas

---

### Integración con Checklists

Este lab complementa las checklists del día 3:
- **Checklists de equipo:** Agrega items basados en vulnerabilidades comunes encontradas en code reviews
- **Checklists individuales:** Personaliza según tus debilidades técnicas (ej. "Validar que no hay SQL injection en consultas")
- **Inspección formal:** Usa code reviews para PRs pequeños, inspección para componentes grandes

---

## 📦 Entregable

**Reporte de Code Review** que incluya:

1. ✅ Mínimo 15 hallazgos de seguridad identificados
2. ✅ Comentarios de code review en formato profesional
3. ✅ Mapeo a OWASP Top 10 e ISO 27002:2022
4. ✅ Clasificación de severidad
5. ✅ Remediaciones específicas con código corregido
6. ✅ Tabla de mapeo a estándares

---

## 📚 Referencias

- **OWASP Code Review Guide:** https://owasp.org/www-project-code-review-guide/
- **OWASP Top 10 2021:** https://owasp.org/Top10/
- **ISO 27002:2022 Control 8.28:** Secure coding
- **Google Code Review Best Practices:** https://google.github.io/eng-practices/review/
- **CWE Top 25:** https://cwe.mitre.org/top25/

---

**Versión:** 1.0
**Última actualización:** Enero 2025
