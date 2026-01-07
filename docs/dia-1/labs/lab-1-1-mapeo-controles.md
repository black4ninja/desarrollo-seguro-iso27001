# Lab 1.1: Mapeo de Controles ISO 27002 a Vulnerabilidades

**Duración:** 45 minutos
**Dificultad:** Básica
**Facilitador:** Facilitador 2 (técnico) + Facilitador 1 (proceso)

---

## 🎯 Objetivos

Al finalizar este laboratorio, serás capaz de:

1. Identificar vulnerabilidades en código C# real
2. Mapear vulnerabilidades específicas a controles ISO 27002:2022
3. Relacionar vulnerabilidades con OWASP Top 10 2021
4. Documentar hallazgos en formato profesional
5. Priorizar remediación basada en severidad

---

## 📋 Pre-requisitos

- ✅ Visual Studio Code o Visual Studio instalado
- ✅ .NET SDK 8.0 instalado
- ✅ Conocimientos básicos de C# y ASP.NET Core

**Verificación rápida:**

```bash
dotnet --version
# Debe mostrar: 8.0.x o superior
```

---

## 🎓 Contexto del Laboratorio

Has sido contratado como auditor de seguridad para revisar una aplicación web llamada **"MiniShop"** - un e-commerce básico desarrollado en C# ASP.NET Core.

La empresa necesita certificación ISO 27001 y requiere:
1. Identificar vulnerabilidades en el código
2. Mapearlas a controles ISO 27002:2022
3. Crear un reporte para la auditoría

---

## 📁 Estructura del Proyecto

```
lab1.1-mapeo-controles/
├── README.md                    # Este archivo
├── proyecto-ejemplo/
│   ├── MiniShop.csproj
│   ├── Program.cs
│   ├── Controllers/
│   │   ├── ProductController.cs
│   │   ├── UserController.cs
│   │   └── OrderController.cs
│   ├── Models/
│   │   ├── Product.cs
│   │   ├── User.cs
│   │   └── Order.cs
│   └── appsettings.json
└── plantillas/
    └── matriz-mapeo.xlsx
```

---

## 🛠️ Preparación

### Paso 1: Descargar el código base del proyecto

Descarga el archivo con el código base del laboratorio:

📥 [Descargar lab1.1.zip](/lab1.1.zip)

Extrae el archivo en tu directorio de trabajo:

```bash
unzip lab1.1.zip
```

### Paso 2: Navegar al directorio del proyecto

```bash
cd lab1-1
```

### Paso 3: Restaurar dependencias

```bash
dotnet restore
```

### Paso 4: Compilar el proyecto (verificar que funciona)

```bash
dotnet build
```

**Resultado esperado:**
```
Build succeeded.
    0 Warning(s)
    0 Error(s)
```

### Paso 5: (Opcional) Ejecutar la aplicación

```bash
dotnet run
```

Abrir en navegador: `http://localhost:5000`

---

## 🔍 Actividad 1: Identificar Vulnerabilidades (15 min)

### Instrucciones:

Lee cada archivo de código y busca **vulnerabilidades de seguridad**.

**Ayuda:** Busca estos patrones comunes:
- ❌ Concatenación de strings en SQL
- ❌ Credenciales hardcodeadas
- ❌ Falta de validación de input
- ❌ Errores que revelan información sensible
- ❌ Falta de autorización en endpoints
- ❌ Datos sensibles en logs
- ❌ Cifrado débil o ausente

---

### 🔴 Vulnerabilidad 1: SQL Injection

**Archivo:** `Controllers/ProductController.cs`
**Líneas:** 23-27

```csharp
// VULNERABLE: SQL Injection
public IActionResult Search(string keyword)
{
    var query = $"SELECT * FROM Products WHERE Name LIKE '%{keyword}%'";
    var products = _db.ExecuteQuery(query);
    return Ok(products);
}
```

**¿Por qué es vulnerable?**
- El parámetro `keyword` se concatena directamente en la query SQL
- Un atacante puede inyectar código SQL malicioso

**Prueba de explotación:**
```
Entrada maliciosa: ' OR '1'='1
Query resultante: SELECT * FROM Products WHERE Name LIKE '%' OR '1'='1%'
Resultado: Devuelve TODOS los productos
```

**Severidad:** 🔴 CRÍTICA

---

### 🔴 Vulnerabilidad 2: Credenciales Hardcodeadas

**Archivo:** `appsettings.json`
**Líneas:** 8-10

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MiniShop;User=sa;Password=Admin123!"
  }
}
```

**¿Por qué es vulnerable?**
- Contraseña de base de datos en texto plano
- Código fuente suele estar en Git → contraseña expuesta
- Si alguien accede al repositorio, tiene acceso a la BD

**Severidad:** 🔴 CRÍTICA

---

### 🟠 Vulnerabilidad 3: Broken Access Control (IDOR)

**Archivo:** `Controllers/OrderController.cs`
**Líneas:** 15-20

```csharp
// VULNERABLE: Insecure Direct Object Reference (IDOR)
[HttpGet("{orderId}")]
public IActionResult GetOrder(int orderId)
{
    var order = _db.Orders.Find(orderId);
    return Ok(order);
}
```

**¿Por qué es vulnerable?**
- No valida que el usuario autenticado sea el dueño de la orden
- Cualquier usuario puede ver órdenes de otros cambiando el `orderId`

**Prueba de explotación:**
```
Usuario A (ID=123) hace: GET /api/orders/1
Usuario B (ID=456) hace: GET /api/orders/1
Resultado: Ambos pueden ver la misma orden, aunque no sea suya
```

**Severidad:** 🟠 ALTA

---

### 🟠 Vulnerabilidad 4: Verbose Error Messages

**Archivo:** `Controllers/UserController.cs`
**Líneas:** 30-38

```csharp
// VULNERABLE: Information Disclosure via Error Messages
[HttpPost("login")]
public IActionResult Login(string username, string password)
{
    try
    {
        var user = _db.Users.SingleOrDefault(u => u.Username == username);
        if (user == null)
            return BadRequest("Usuario no encontrado en la base de datos");

        if (user.Password != password) // Además: contraseña en texto plano!
            return BadRequest("Contraseña incorrecta");

        return Ok("Login exitoso");
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Error: {ex.Message}\n{ex.StackTrace}");
    }
}
```

**¿Por qué es vulnerable?**
- Mensaje diferente si el usuario existe vs. si no existe → permite enumerar usuarios
- Stack trace expuesto → revela estructura interna
- **BONUS:** ¡Contraseña sin hash! (otra vulnerabilidad)

**Severidad:** 🟠 ALTA

---

### 🟡 Vulnerabilidad 5: Missing Input Validation

**Archivo:** `Controllers/ProductController.cs`
**Líneas:** 35-40

```csharp
// VULNERABLE: No input validation
[HttpPost]
public IActionResult CreateProduct([FromBody] Product product)
{
    _db.Products.Add(product);
    _db.SaveChanges();
    return Ok("Producto creado");
}
```

**¿Por qué es vulnerable?**
- No valida que el precio sea positivo
- No valida longitud del nombre
- No valida caracteres especiales (posible XSS)

**Prueba de explotación:**
```json
{
  "name": "<script>alert('XSS')</script>",
  "price": -100,
  "description": "A".repeat(10000)
}
```

**Severidad:** 🟡 MEDIA

---

### 🟡 Vulnerabilidad 6: Sensitive Data in Logs

**Archivo:** `Controllers/UserController.cs`
**Líneas:** 50-55

```csharp
// VULNERABLE: Logging sensitive data
[HttpPost("register")]
public IActionResult Register(string username, string password, string email)
{
    _logger.LogInformation($"Nuevo registro - Usuario: {username}, Password: {password}, Email: {email}");
    // ... resto del código
}
```

**¿Por qué es vulnerable?**
- Contraseña en logs de texto plano
- Los logs suelen ser accesibles por múltiples personas
- Violación de privacidad (email en logs)

**Severidad:** 🟡 MEDIA

---

### 🟢 Vulnerabilidad 7: Missing Security Headers

**Archivo:** `Program.cs`
**Líneas:** 1-20 (no están configurados)

```csharp
// VULNERABLE: Missing security headers
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();
app.UseHttpsRedirection();
app.MapControllers();
app.Run();

// Faltan headers de seguridad:
// - X-Content-Type-Options
// - X-Frame-Options
// - Content-Security-Policy
// - Strict-Transport-Security
```

**¿Por qué es vulnerable?**
- Sin `X-Frame-Options` → vulnerable a clickjacking
- Sin `CSP` → vulnerable a XSS
- Sin `HSTS` → vulnerable a downgrade attacks

**Severidad:** 🟢 BAJA

---

## 📊 Actividad 2: Mapeo a Controles ISO 27002:2022 (15 min)

Ahora que identificaste las vulnerabilidades, mapéalas a los controles ISO 27002:2022.

### Tabla de Referencia: Controles ISO 27002 Relevantes

| Control | Nombre | Descripción |
|---------|--------|-------------|
| **5.15** | Access control | Control de acceso a información y activos |
| **8.3** | Information access restriction | Restricción de acceso a información |
| **8.16** | Monitoring activities | Actividades de monitoreo |
| **8.19** | Security of information in use | Seguridad de información en uso |
| **8.24** | Use of cryptography | Uso de criptografía |
| **8.28** | Secure coding | Codificación segura |
| **8.29** | Security testing | Pruebas de seguridad |

---

### Plantilla de Mapeo

**Vulnerabilidad:** SQL Injection (ProductController.cs:23-27)

| Campo | Valor |
|-------|-------|
| **Severidad** | 🔴 CRÍTICA |
| **OWASP Top 10** | A03:2021 - Injection |
| **CWE** | CWE-89: SQL Injection |
| **Control ISO 27002** | **8.28** - Secure coding |
| **Descripción del control** | "Las aplicaciones deben desarrollarse siguiendo principios de codificación segura" |
| **¿Cómo se violó?** | No se usaron prepared statements ni validación de input |
| **Impacto potencial** | Acceso no autorizado a toda la base de datos, robo de datos, modificación de datos |
| **Remediación** | Usar consultas parametrizadas (prepared statements) |

---

### 📝 Ejercicio: Completa la Matriz de Mapeo

Descarga la plantilla: 📥 [matriz-mapeo.csv](/lab11_matriz-mapeo.csv)

Completa la matriz con las 7 vulnerabilidades identificadas:

| # | Vulnerabilidad | Archivo | Severidad | OWASP | CWE | ISO 27002 | Remediación |
|---|----------------|---------|-----------|-------|-----|-----------|-------------|
| 1 | SQL Injection | ProductController.cs | 🔴 CRÍTICA | A03 | CWE-89 | 8.28 | Prepared statements |
| 2 | Credenciales Hardcodeadas | appsettings.json | 🔴 CRÍTICA | A05 | CWE-798 | 8.24 | Azure Key Vault |
| 3 | IDOR | OrderController.cs | 🟠 ALTA | A01 | CWE-639 | 5.15, 8.3 | Validar ownership |
| 4 | Verbose Errors | UserController.cs | 🟠 ALTA | A05 | CWE-209 | 8.28 | Error handling genérico |
| 5 | No Validation | ProductController.cs | 🟡 MEDIA | A03 | CWE-20 | 8.28 | FluentValidation |
| 6 | Sensitive Logs | UserController.cs | 🟡 MEDIA | A09 | CWE-532 | 8.16, 8.19 | No loggear secretos |
| 7 | Missing Headers | Program.cs | 🟢 BAJA | A05 | CWE-693 | 8.28 | Configurar headers |

---

## 🎯 Actividad 3: Priorización de Remediación (10 min)

Basándote en la severidad y el impacto, crea un plan de remediación priorizado:

### Prioridad 1: CRÍTICAS (Remediar INMEDIATAMENTE)
- [ ] **Vulnerabilidad 1:** SQL Injection
  - **Esfuerzo:** 2 horas
  - **Acción:** Refactorizar a Entity Framework LINQ queries

- [ ] **Vulnerabilidad 2:** Credenciales Hardcodeadas
  - **Esfuerzo:** 4 horas
  - **Acción:** Migrar a Azure Key Vault o User Secrets

### Prioridad 2: ALTAS (Remediar en Sprint actual)
- [ ] **Vulnerabilidad 3:** IDOR
  - **Esfuerzo:** 3 horas
  - **Acción:** Agregar validación de ownership en OrderController

- [ ] **Vulnerabilidad 4:** Verbose Error Messages
  - **Esfuerzo:** 2 horas
  - **Acción:** Implementar middleware de error handling global

### Prioridad 3: MEDIAS (Remediar próximo Sprint)
- [ ] **Vulnerabilidad 5:** Missing Input Validation
  - **Esfuerzo:** 4 horas
  - **Acción:** Implementar FluentValidation

- [ ] **Vulnerabilidad 6:** Sensitive Data in Logs
  - **Esfuerzo:** 2 horas
  - **Acción:** Sanitizar logs, no loggear contraseñas

### Prioridad 4: BAJAS (Remediar en backlog)
- [ ] **Vulnerabilidad 7:** Missing Security Headers
  - **Esfuerzo:** 1 hora
  - **Acción:** Agregar middleware de security headers

---

## ✅ Entregables

Al final de este lab, debes tener:

1. **Matriz de Mapeo Completa** (Excel o CSV)
   - 7 vulnerabilidades documentadas
   - Mapeo a OWASP Top 10
   - Mapeo a ISO 27002:2022
   - Mapeo a CWE

2. **Plan de Remediación Priorizado**
   - Ordenado por severidad
   - Con estimación de esfuerzo
   - Con acciones concretas

3. **Screenshot de la Matriz**
   - Para evidencia de auditoría ISO 27001

---

## 🔗 Mapeo Completo a Estándares

### ISO 27002:2022 - Controles Violados

| Control | Nombre | Vulnerabilidades Relacionadas |
|---------|--------|------------------------------|
| **5.15** | Access control | #3 (IDOR) |
| **8.3** | Information access restriction | #3 (IDOR) |
| **8.16** | Monitoring activities | #6 (Sensitive logs) |
| **8.19** | Security of information in use | #6 (Sensitive logs) |
| **8.24** | Use of cryptography | #2 (Hardcoded creds), #4 (Plaintext password) |
| **8.28** | Secure coding | #1, #4, #5, #7 (Todas las de código) |

### OWASP Top 10 2021

| OWASP | Nombre | Vulnerabilidades |
|-------|--------|-----------------|
| **A01** | Broken Access Control | #3 |
| **A03** | Injection | #1, #5 |
| **A05** | Security Misconfiguration | #2, #4, #7 |
| **A09** | Security Logging Failures | #6 |

---

## 💡 Preguntas de Reflexión

1. **¿Cuál de las 7 vulnerabilidades tiene el mayor impacto de negocio? ¿Por qué?**

2. **Si solo pudieras remediar 2 vulnerabilidades hoy, ¿cuáles elegirías?**

3. **¿Cómo documentarías estos hallazgos para un auditor ISO 27001?**

4. **¿Qué proceso implementarías para prevenir estas vulnerabilidades en el futuro?**

---

## ⭐ [OPCIONAL] Aplica a tu Código

Si tienes tiempo y acceso a tu código:

1. **Selecciona un componente** de tu aplicación actual
2. **Revisa el código** buscando estos 7 patrones
3. **Documenta hallazgos** en la misma plantilla
4. **Comparte** con el grupo (sin datos sensibles)

**Tiempo estimado:** 20-30 minutos adicionales

---

## 🎓 Resumen

### Lo que Aprendiste:
✅ Identificar 7 tipos comunes de vulnerabilidades en C#
✅ Mapear vulnerabilidades a controles ISO 27002:2022
✅ Relacionar vulnerabilidades con OWASP Top 10
✅ Priorizar remediación basada en severidad e impacto
✅ Crear documentación para auditoría ISO 27001

### Próximo Lab:
**Lab 1.2:** Explotación de vulnerabilidades en DVWA (Damn Vulnerable Web App)

---

## 📚 Referencias

- **ISO 27002:2022:** https://www.iso.org/standard/75652.html
- **OWASP Top 10 2021:** https://owasp.org/Top10/
- **CWE Top 25:** https://cwe.mitre.org/top25/
- **Microsoft Secure Coding Guidelines:** https://docs.microsoft.com/security/

---

**Versión:** 1.0
**Última actualización:** Diciembre 2025
