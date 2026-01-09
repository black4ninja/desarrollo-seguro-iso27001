---
sidebar_position: 1
---

# Lab: 3.1 Logging y Monitoring de Seguridad

## 🎯 Objetivos del Laboratorio

Al finalizar este laboratorio, podrás:

1. ✅ Comprender los conceptos fundamentales de logging y monitoring
2. ✅ Implementar logging estructurado con Serilog
3. ✅ Configurar alertas de seguridad automáticas
4. ✅ Analizar logs para investigación de incidentes
5. ✅ Aplicar controles ISO 27001 8.15 y 8.16

---

## ⏱️ Duración Estimada

**90 minutos** (30 min teoría + 30 min implementación + 30 min análisis)

---

## 📝 Parte 1: Fundamentos de Logging y Monitoring (30 min)

### ¿Qué es Logging?

**Logging** es el proceso de registrar eventos que ocurren en una aplicación de forma persistente. Los logs son el "diario" de tu aplicación que te permite:

- 🔍 **Debugging:** Encontrar la causa raíz de problemas
- 🛡️ **Seguridad:** Detectar ataques e intentos de intrusión
- 📊 **Auditoría:** Demostrar compliance con regulaciones
- 📈 **Análisis:** Entender comportamiento de usuarios y sistema
- ⚠️ **Alertas:** Notificar sobre eventos críticos en tiempo real

### ¿Qué es Monitoring?

**Monitoring** es la observación continua y activa de logs, métricas y eventos para detectar anomalías y problemas. Mientras que logging es **pasivo** (registra eventos), monitoring es **activo** (busca patrones y alerta).

**Diferencias clave:**

| Aspecto | Logging | Monitoring |
|---------|---------|------------|
| **Naturaleza** | Pasivo - registra eventos | Activo - analiza y alerta |
| **Objetivo** | Registro histórico | Detección en tiempo real |
| **Uso** | Investigación post-incidente | Prevención y respuesta rápida |
| **Ejemplo** | "Login failed for user@example.com" | "Alert: 10 failed logins in 2 minutes" |

---

### ISO 27001:2022 - Controles 8.15 y 8.16

#### Control 8.15: Logging

**Descripción:** Los registros de eventos que registran actividades de usuario, excepciones, fallas y eventos de seguridad de la información deben ser producidos, almacenados, protegidos y analizados.

**Requisitos ISO 27001:**
- ✅ Los logs deben **capturar** actividades críticas de seguridad
- ✅ Los logs deben estar **protegidos** contra alteración o eliminación
- ✅ Los logs deben **almacenarse** por un período definido (retención)
- ✅ Los logs deben ser **analizados** regularmente

#### Control 8.16: Monitoring activities

**Descripción:** Las redes, sistemas y aplicaciones deben ser monitoreadas para detectar comportamiento anómalo y se deben tomar acciones apropiadas para evaluar posibles incidentes de seguridad.

**Requisitos ISO 27001:**
- ✅ **Monitoreo continuo** de actividades sospechosas
- ✅ **Alertas automáticas** para eventos críticos
- ✅ **Revisión regular** de logs por personal de seguridad
- ✅ **Respuesta a incidentes** basada en hallazgos del monitoreo

---

### ¿Qué eventos de seguridad debes loguear?

#### ✅ **SÍ loguear (eventos críticos):**

**Autenticación y Autorización:**
- ✅ Login exitoso/fallido (con username, IP, timestamp)
- ✅ Logout
- ✅ Cambios de contraseña
- ✅ Escalación de privilegios
- ✅ Acceso denegado (HTTP 401, 403)
- ✅ Sesiones expiradas o invalidadas

**Cambios de configuración:**
- ✅ Cambios en configuración de seguridad
- ✅ Creación/modificación/eliminación de usuarios
- ✅ Cambios en roles y permisos
- ✅ Activación/desactivación de features

**Acceso a datos sensibles:**
- ✅ Lectura/modificación de datos PII
- ✅ Exportación masiva de datos
- ✅ Consultas a recursos críticos
- ✅ Operaciones administrativas

**Errores y excepciones:**
- ✅ Excepciones no manejadas
- ✅ Errores de validación (posibles ataques de inyección)
- ✅ Timeouts de servicios externos
- ✅ Intentos de acceso a rutas no autorizadas

**Actividad sospechosa:**
- ✅ Patrones de SQL injection, XSS, CSRF
- ✅ Escaneo de puertos o paths (404 excesivos)
- ✅ Cambios rápidos de IP por mismo usuario
- ✅ Intentos de bypass de rate limiting

#### ❌ **NO loguear (riesgos de seguridad y compliance):**

- ❌ **Contraseñas** (ni en plain text ni hasheadas)
- ❌ **Tokens de autenticación** (JWT, API keys, session IDs completos)
- ❌ **Números de tarjeta de crédito** (PCI-DSS prohibición)
- ❌ **PII completo sin necesidad** (SSN, números de pasaporte)
- ❌ **Secretos o claves de cifrado**
- ❌ **Información médica** (HIPAA)
- ❌ **Payloads completos** de requests con datos sensibles

**Ejemplo de log INCORRECTO ❌:**
```
[ERROR] Login failed: username=john@example.com, password=MyP@ssw0rd123
```

**Ejemplo de log CORRECTO ✅:**
```
[WARNING] Login failed: username=john@example.com, ip=192.168.1.100, reason=InvalidPassword
```

---

### Niveles de Severidad (Logging Levels)

Los logs deben clasificarse por severidad para filtrar y priorizar:

| Nivel | Uso | Ejemplo | Producción |
|-------|-----|---------|-----------|
| **Trace** | Debugging muy detallado | "Entering method X with parameter Y" | ❌ Desactivado |
| **Debug** | Información de desarrollo | "User session started with ID abc123" | ❌ Desactivado |
| **Information** | Eventos normales del sistema | "User logged in successfully" | ✅ Activado |
| **Warning** | Eventos anómalos no críticos | "Login failed for user@example.com (2nd attempt)" | ✅ Activado |
| **Error** | Errores que afectan funcionalidad | "Payment gateway timeout" | ✅ Activado |
| **Critical** | Fallas catastróficas | "Database connection lost" | ✅ Activado + Alerta inmediata |

**Recomendación:** En producción, usar nivel **Information** o superior. Activar **Debug** solo temporalmente para troubleshooting.

---

### Herramientas de Logging y SIEM

#### **SIEM (Security Information and Event Management)**

Un SIEM centraliza logs de múltiples fuentes, los analiza en tiempo real y genera alertas.

**Herramientas populares:**

| Herramienta | Tipo | Uso ideal |
|-------------|------|-----------|
| **ELK Stack** (Elasticsearch, Logstash, Kibana) | Open Source | Organizaciones con expertise técnico, altamente personalizable |
| **Splunk** | Comercial | Empresas grandes, análisis avanzado, compliance |
| **Azure Monitor + Application Insights** | Cloud (Azure) | Aplicaciones en Azure, integración nativa con .NET |
| **Datadog** | SaaS | Monitoreo unificado (APM + Logs + Métricas) |
| **Graylog** | Open Source | Alternativa a ELK, más simple de configurar |
| **Sumo Logic** | SaaS | Análisis de seguridad en cloud |

**Para este laboratorio usaremos:** **Serilog** (biblioteca de logging para .NET) + **Azure Application Insights** (SIEM en la nube).

---

### Retención de Logs y Compliance

¿Cuánto tiempo debes guardar los logs?

| Tipo de log | Retención mínima recomendada | Regulación |
|-------------|------------------------------|------------|
| **Logs de seguridad** (autenticación, accesos) | 1-2 años | ISO 27001, GDPR |
| **Logs de auditoría** (cambios de config) | 3-7 años | SOX, HIPAA |
| **Logs de transacciones financieras** | 7 años | PCI-DSS |
| **Logs de debugging** (development) | 7-30 días | N/A - solo troubleshooting |

**Importante:** Los logs deben ser **inmutables** (no modificables) y estar protegidos contra eliminación accidental o maliciosa.

**Técnicas de protección:**
- ✅ Enviar logs a sistema centralizado (SIEM) inmediatamente
- ✅ Usar append-only storage (ej: Azure Blob Storage immutable)
- ✅ Firmar logs criptográficamente (hash chains)
- ✅ Backup periódico en almacenamiento offline

---

## 📝 Parte 2: Implementación Práctica con Serilog (30 min)

### Paso 0: Preparar el proyecto (prerequisito)

**IMPORTANTE:** Este laboratorio requiere un proyecto ASP.NET Core existente. Tienes dos opciones:

#### Opción A: Usar un proyecto existente del curso
Si ya tienes un proyecto de laboratorios anteriores (ej: del Día 1, 2 o 3), úsalo:

```bash
# Navegar al proyecto existente
cd /ruta/a/tu/proyecto
```

#### Opción B: Crear un proyecto nuevo de demostración

Si no tienes un proyecto, crea uno rápido para este lab:

```bash
# Crear directorio para el lab
mkdir -p ~/laboratorios/lab-logging-monitoring
cd ~/laboratorios/lab-logging-monitoring

# Crear proyecto Web API
dotnet new webapi -n SecureShop.Logging

# Navegar al proyecto
cd SecureShop.Logging
```

**Verificar que estás en un directorio con proyecto:**

```bash
# Este comando debe mostrar archivos .csproj
ls *.csproj
```

Si ves un archivo `.csproj`, estás listo para continuar. Si no, revisa que estés en el directorio correcto.

---

### Paso 1: Instalar Serilog (5 min)

Serilog es una biblioteca de logging estructurado para .NET que permite:
- Logging con **propiedades estructuradas** (no solo texto plano)
- Múltiples **sinks** (destinos: archivo, consola, Application Insights)
- **Filtrado** por nivel de severidad
- **Enriquecimiento** automático con contexto (IP, user, correlation ID)

**Instalar paquetes NuGet:**

```bash
dotnet add package Serilog.AspNetCore
dotnet add package Serilog.Sinks.Console
dotnet add package Serilog.Sinks.File
dotnet add package Serilog.Sinks.ApplicationInsights
dotnet add package Serilog.Enrichers.Environment
dotnet add package Serilog.Enrichers.Thread
```

**Verificar instalación:**

```bash
# Ver paquetes instalados
dotnet list package | grep Serilog
```

Deberías ver los 6 paquetes listados.

---

### Paso 2: Configurar Serilog en Program.cs (10 min)

**IMPORTANTE:** Vamos a configurar Serilog con 2 sinks básicos (Consola y Archivo). El sink de Application Insights es opcional y requiere configuración de Azure.

**Abrir el archivo `Program.cs` y reemplazar TODO el contenido con el siguiente código:**

```csharp
using Serilog;
using Serilog.Events;

// Crear logger ANTES de construir la aplicación
Log.Logger = new LoggerConfiguration()
    // Nivel mínimo global: Information
    .MinimumLevel.Information()

    // Override: Microsoft logs solo Warning o superior (reducir ruido)
    .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
    .MinimumLevel.Override("System", LogEventLevel.Warning)

    // Enriquecer logs con información de entorno
    .Enrich.FromLogContext()
    .Enrich.WithMachineName()
    .Enrich.WithThreadId()
    .Enrich.WithProperty("Application", "SecureShop")
    .Enrich.WithProperty("Environment", "Production")

    // Sink 1: Consola (para desarrollo local)
    .WriteTo.Console(
        outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj} {Properties:j}{NewLine}{Exception}")

    // Sink 2: Archivo rotativo diario (para auditoría local)
    .WriteTo.File(
        path: "logs/security-.log",
        rollingInterval: RollingInterval.Day,
        retainedFileCountLimit: 90, // Retener 90 días
        restrictedToMinimumLevel: LogEventLevel.Information,
        outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj} {Properties:j}{NewLine}{Exception}")

    .CreateLogger();

try
{
    Log.Information("Starting SecureShop application");

    var builder = WebApplication.CreateBuilder(args);

    // Reemplazar logging de ASP.NET Core con Serilog
    builder.Host.UseSerilog();

    // Add services to the container
    builder.Services.AddControllers();
    builder.Services.AddOpenApi();

    // HttpContextAccessor (necesario para SecurityLogger en Paso 3)
    builder.Services.AddHttpContextAccessor();

    // ⚠️ NOTA: La siguiente línea se descomentará en el Paso 3.4
    // builder.Services.AddScoped<ISecurityLogger, SecurityLogger>();

    var app = builder.Build();

    // Configure the HTTP request pipeline
    if (app.Environment.IsDevelopment())
    {
        app.MapOpenApi();
    }

    app.UseHttpsRedirection();
    app.MapControllers(); // Necesario para los controladores del Paso 3

    Log.Information("SecureShop application started successfully");

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush(); // Asegurar que todos los logs se escriban antes de cerrar
}
```

**✅ Verificar que compile sin errores:**

```bash
dotnet build
```

Deberías ver: `Build succeeded.`

---

**📝 Nota sobre Application Insights (Sink 3 - Opcional):**

El código anterior solo usa 2 sinks (Consola y Archivo). Si quieres agregar Application Insights como tercer sink, sigue estos pasos opcionales:

<details>
<summary>🔧 Clic aquí para ver cómo agregar Application Insights (opcional)</summary>

**Prerequisitos:**
- Tener un recurso de Application Insights en Azure
- Obtener la "Instrumentation Key" desde Azure Portal

**Paso 1: Agregar using statement**

Al inicio de `Program.cs`, agregar:

```csharp
using Serilog;
using Serilog.Events;
using Microsoft.ApplicationInsights.Extensibility;  // ← AGREGAR
```

**Paso 2: Agregar configuración en appsettings.json**

```json
{
  "ApplicationInsights": {
    "InstrumentationKey": "TU-INSTRUMENTATION-KEY-AQUI"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  }
}
```

**Paso 3: Modificar la configuración de Serilog**

Antes de `.CreateLogger()`, agregar:

```csharp
    // Sink 3: Application Insights (SIEM en Azure) - OPCIONAL
    .WriteTo.ApplicationInsights(
        telemetryConfiguration: new TelemetryConfiguration
        {
            InstrumentationKey = builder.Configuration["ApplicationInsights:InstrumentationKey"]
        },
        telemetryConverter: TelemetryConverter.Traces,
        restrictedToMinimumLevel: LogEventLevel.Warning) // Solo warnings+ a Application Insights

    .CreateLogger();
```

</details>

**Recomendación:** Para este laboratorio, NO es necesario configurar Application Insights. Los sinks de Consola y Archivo son suficientes para aprender los conceptos de logging de seguridad.

---

**Explicación de la configuración:**

- **`MinimumLevel.Information()`**: Solo loguea eventos de nivel Information o superior (ignora Debug y Trace en producción)
- **`Override("Microsoft", LogEventLevel.Warning)`**: Reduce ruido de logs del framework ASP.NET Core
- **`Enrich.FromLogContext()`**: Permite agregar propiedades dinámicas en cada request (ej: CorrelationId, UserId)
- **`WriteTo.Console`**: Útil para desarrollo local (ver logs en terminal)
- **`WriteTo.File`**: Logs persistentes locales, rotación diaria, retención 90 días
- **`WriteTo.ApplicationInsights`**: Envía logs a Azure para análisis centralizado

---

### Paso 3: Logging de Eventos de Seguridad (15 min)

#### 3.1 Crear estructura de archivos para Security Logging

**Primero, vamos a crear la estructura de directorios y archivos necesarios:**

```bash
# Crear directorio Services (si no existe)
mkdir -p Services

# Crear archivos para el Security Logger
touch Services/ISecurityLogger.cs
touch Services/SecurityLogger.cs
```

**Verificar la estructura del proyecto:**

```bash
# La estructura debería verse así:
ls -la Services/

# Deberías ver:
# ISecurityLogger.cs
# SecurityLogger.cs
```

**Estructura esperada del proyecto:**

```
tu-proyecto/
├── Controllers/
├── Services/               ← Nuevo directorio
│   ├── ISecurityLogger.cs  ← Interfaz del Security Logger
│   └── SecurityLogger.cs   ← Implementación del Security Logger
├── Program.cs
├── appsettings.json
└── logs/                   ← Se creará automáticamente por Serilog
    └── security-*.log
```

---

#### 3.2 Implementar la interfaz ISecurityLogger

**Abrir el archivo `Services/ISecurityLogger.cs` y agregar el siguiente código:**

```csharp
using System.Collections.Generic;

namespace SecureShop.Services;

public interface ISecurityLogger
{
    void LogLoginSuccess(string userId, string ipAddress);
    void LogLoginFailure(string username, string ipAddress, string reason);
    void LogAccessDenied(string userId, string resource, string action);
    void LogPrivilegeEscalation(string userId, string fromRole, string toRole);
    void LogSuspiciousActivity(string userId, string activityType, Dictionary<string, object> details);
    void LogDataAccess(string userId, string dataType, string recordId);
}
```

---

#### 3.3 Implementar la clase SecurityLogger

**Abrir el archivo `Services/SecurityLogger.cs` y agregar el siguiente código:**

```csharp
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace SecureShop.Services;

public class SecurityLogger : ISecurityLogger
{
    private readonly ILogger<SecurityLogger> _logger;
    private readonly IHttpContextAccessor _httpContext;

    public SecurityLogger(ILogger<SecurityLogger> logger, IHttpContextAccessor httpContext)
    {
        _logger = logger;
        _httpContext = httpContext;
    }

    // Helper para obtener IP del cliente
    private string GetClientIp()
    {
        return _httpContext.HttpContext?.Connection.RemoteIpAddress?.ToString() ?? "Unknown";
    }

    // Helper para obtener User-Agent
    private string GetUserAgent()
    {
        return _httpContext.HttpContext?.Request.Headers["User-Agent"].ToString() ?? "Unknown";
    }

    public void LogLoginSuccess(string userId, string ipAddress)
    {
        _logger.LogInformation(
            "Login successful for UserId={UserId} from IP={IpAddress} UserAgent={UserAgent}",
            userId, ipAddress, GetUserAgent());
    }

    public void LogLoginFailure(string username, string ipAddress, string reason)
    {
        _logger.LogWarning(
            "Login FAILED for Username={Username} from IP={IpAddress} Reason={Reason} UserAgent={UserAgent}",
            username, ipAddress, reason, GetUserAgent());
    }

    public void LogAccessDenied(string userId, string resource, string action)
    {
        _logger.LogWarning(
            "Access DENIED for UserId={UserId} to Resource={Resource} Action={Action} IP={IpAddress}",
            userId, resource, action, GetClientIp());
    }

    public void LogPrivilegeEscalation(string userId, string fromRole, string toRole)
    {
        _logger.LogWarning(
            "Privilege escalation: UserId={UserId} from Role={FromRole} to Role={ToRole} IP={IpAddress}",
            userId, fromRole, toRole, GetClientIp());
    }

    public void LogSuspiciousActivity(string userId, string activityType, Dictionary<string, object> details)
    {
        _logger.LogWarning(
            "SUSPICIOUS activity detected: UserId={UserId} Type={ActivityType} Details={@Details} IP={IpAddress}",
            userId, activityType, details, GetClientIp());
    }

    public void LogDataAccess(string userId, string dataType, string recordId)
    {
        _logger.LogInformation(
            "Data access: UserId={UserId} DataType={DataType} RecordId={RecordId} IP={IpAddress}",
            userId, dataType, recordId, GetClientIp());
    }
}
```

---

#### 3.4 Registrar el servicio en Program.cs

Ahora que ya creamos las clases `ISecurityLogger` y `SecurityLogger`, vamos a registrarlas en el contenedor de inyección de dependencias.

**Paso 1: Agregar el using statement para SecureShop.Services**

**Abrir `Program.cs`** y agregar al inicio (después de los otros `using`):

```csharp
using Serilog;
using Serilog.Events;
using SecureShop.Services;  // ← AGREGAR ESTA LÍNEA
```

**Paso 2: Descomentar el registro del servicio**

Buscar en `Program.cs` la línea que dejamos comentada en el Paso 2:

```csharp
// ⚠️ NOTA: La siguiente línea se descomentará en el Paso 3.4
// builder.Services.AddScoped<ISecurityLogger, SecurityLogger>();
```

**Quitar el comentario** para que quede así:

```csharp
builder.Services.AddScoped<ISecurityLogger, SecurityLogger>();
```

**Resultado final - Program.cs debería verse así:**

```csharp
using Serilog;
using Serilog.Events;
using SecureShop.Services;  // ← Agregado en Paso 3.4

// Crear logger ANTES de construir la aplicación
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
    .MinimumLevel.Override("System", LogEventLevel.Warning)
    .Enrich.FromLogContext()
    .Enrich.WithMachineName()
    .Enrich.WithThreadId()
    .Enrich.WithProperty("Application", "SecureShop")
    .Enrich.WithProperty("Environment", "Production")
    .WriteTo.Console(
        outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj} {Properties:j}{NewLine}{Exception}")
    .WriteTo.File(
        path: "logs/security-.log",
        rollingInterval: RollingInterval.Day,
        retainedFileCountLimit: 90,
        restrictedToMinimumLevel: LogEventLevel.Information,
        outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj} {Properties:j}{NewLine}{Exception}")
    .CreateLogger();

try
{
    Log.Information("Starting SecureShop application");

    var builder = WebApplication.CreateBuilder(args);

    builder.Host.UseSerilog();

    builder.Services.AddControllers();
    builder.Services.AddOpenApi();

    // HttpContextAccessor (ya estaba desde Paso 2)
    builder.Services.AddHttpContextAccessor();

    // Registrar SecurityLogger (descomentado en Paso 3.4)
    builder.Services.AddScoped<ISecurityLogger, SecurityLogger>();  // ← Descomentado

    var app = builder.Build();

    if (app.Environment.IsDevelopment())
    {
        app.MapOpenApi();
    }

    app.UseHttpsRedirection();
    app.MapControllers();

    Log.Information("SecureShop application started successfully");

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
```

**✅ Verificar que compile sin errores:**

```bash
dotnet build
```

Deberías ver: `Build succeeded. 0 Warning(s). 0 Error(s).`

Si hay errores, verifica:
- ✅ Que hayas creado los archivos `Services/ISecurityLogger.cs` y `Services/SecurityLogger.cs`
- ✅ Que el `using SecureShop.Services;` esté al inicio de `Program.cs`
- ✅ Que los namespaces en los archivos sean `namespace SecureShop.Services;`

---

#### 3.5 Usar Security Logger en controladores (práctica)

Ahora vamos a **crear ejemplos reales** de uso del SecurityLogger en controladores para probar que funciona.

##### Opción A: Si ya tienes controladores en tu proyecto

Si ya tienes controladores de laboratorios anteriores (ej: `ProductController.cs`, `OrderController.cs`), agrega logging a los métodos existentes.

**Ejemplo - agregar a un controlador existente:**

```csharp
// En tu controlador existente, agregar el ISecurityLogger en el constructor:

private readonly ISecurityLogger _securityLogger;

// Modificar el constructor para inyectarlo:
public ProductController(ISecurityLogger securityLogger, /* otros servicios */)
{
    _securityLogger = securityLogger;
    // ... otros servicios
}

// En tus métodos, agregar logs de eventos de seguridad:

[HttpGet("{id}")]
public async Task<IActionResult> GetProduct(int id)
{
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "Anonymous";

    var product = await _productService.GetProductAsync(id);

    if (product == null)
    {
        return NotFound();
    }

    // Loguear acceso a datos
    _securityLogger.LogDataAccess(userId, "Product", id.ToString());

    return Ok(product);
}
```

##### Opción B: Crear un controlador de demostración

Si no tienes controladores o quieres crear uno específico para demostrar el logging, sigue estos pasos:

**Paso 1: Crear directorio Controllers (si no existe)**

```bash
mkdir -p Controllers
```

**Paso 2: Crear archivo de controlador de prueba**

```bash
touch Controllers/SecurityTestController.cs
```

**Paso 3: Implementar el controlador de prueba**

**Abrir `Controllers/SecurityTestController.cs` y agregar:**

```csharp
using Microsoft.AspNetCore.Mvc;
using SecureShop.Services;

namespace SecureShop.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SecurityTestController : ControllerBase
{
    private readonly ISecurityLogger _securityLogger;

    public SecurityTestController(ISecurityLogger securityLogger)
    {
        _securityLogger = securityLogger;
    }

    /// <summary>
    /// Endpoint para probar login exitoso
    /// </summary>
    [HttpPost("test-login-success")]
    public IActionResult TestLoginSuccess([FromBody] string username)
    {
        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "Unknown";
        _securityLogger.LogLoginSuccess(username, ipAddress);

        return Ok(new { message = "Login success logged", username, ipAddress });
    }

    /// <summary>
    /// Endpoint para probar login fallido
    /// </summary>
    [HttpPost("test-login-failure")]
    public IActionResult TestLoginFailure([FromBody] LoginTestRequest request)
    {
        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "Unknown";
        _securityLogger.LogLoginFailure(request.Username, ipAddress, request.Reason);

        return Ok(new { message = "Login failure logged", username = request.Username, reason = request.Reason });
    }

    /// <summary>
    /// Endpoint para probar acceso denegado
    /// </summary>
    [HttpPost("test-access-denied")]
    public IActionResult TestAccessDenied([FromBody] AccessTestRequest request)
    {
        _securityLogger.LogAccessDenied(request.UserId, request.Resource, request.Action);

        return Ok(new { message = "Access denied logged", request });
    }

    /// <summary>
    /// Endpoint para probar escalación de privilegios
    /// </summary>
    [HttpPost("test-privilege-escalation")]
    public IActionResult TestPrivilegeEscalation([FromBody] PrivilegeTestRequest request)
    {
        _securityLogger.LogPrivilegeEscalation(request.UserId, request.FromRole, request.ToRole);

        return Ok(new { message = "Privilege escalation logged", request });
    }

    /// <summary>
    /// Endpoint para probar actividad sospechosa
    /// </summary>
    [HttpPost("test-suspicious-activity")]
    public IActionResult TestSuspiciousActivity([FromBody] SuspiciousTestRequest request)
    {
        var details = new Dictionary<string, object>
        {
            { "Pattern", request.Pattern },
            { "Severity", request.Severity },
            { "Timestamp", DateTime.UtcNow }
        };

        _securityLogger.LogSuspiciousActivity(request.UserId, request.ActivityType, details);

        return Ok(new { message = "Suspicious activity logged", request });
    }

    /// <summary>
    /// Endpoint para probar acceso a datos
    /// </summary>
    [HttpPost("test-data-access")]
    public IActionResult TestDataAccess([FromBody] DataAccessTestRequest request)
    {
        _securityLogger.LogDataAccess(request.UserId, request.DataType, request.RecordId);

        return Ok(new { message = "Data access logged", request });
    }
}

// DTOs para los requests de prueba
public record LoginTestRequest(string Username, string Reason);
public record AccessTestRequest(string UserId, string Resource, string Action);
public record PrivilegeTestRequest(string UserId, string FromRole, string ToRole);
public record SuspiciousTestRequest(string UserId, string ActivityType, string Pattern, string Severity);
public record DataAccessTestRequest(string UserId, string DataType, string RecordId);
```

**Paso 4: Compilar y ejecutar**

```bash
# Compilar el proyecto
dotnet build

# Ejecutar el proyecto
dotnet run
```

**Paso 5: Probar los endpoints**

Abre otra terminal y usa `curl` o Postman para probar:

```bash
# Test 1: Login exitoso
curl -X POST http://localhost:5000/api/SecurityTest/test-login-success \
  -H "Content-Type: application/json" \
  -d '"user123"'

# Test 2: Login fallido
curl -X POST http://localhost:5000/api/SecurityTest/test-login-failure \
  -H "Content-Type: application/json" \
  -d '{"username":"hacker","reason":"Invalid password"}'

# Test 3: Acceso denegado
curl -X POST http://localhost:5000/api/SecurityTest/test-access-denied \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","resource":"AdminPanel","action":"Access"}'

# Test 4: Escalación de privilegios
curl -X POST http://localhost:5000/api/SecurityTest/test-privilege-escalation \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","fromRole":"User","toRole":"Admin"}'

# Test 5: Actividad sospechosa
curl -X POST http://localhost:5000/api/SecurityTest/test-suspicious-activity \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","activityType":"BruteForce","pattern":"Multiple failed logins","severity":"High"}'

# Test 6: Acceso a datos
curl -X POST http://localhost:5000/api/SecurityTest/test-data-access \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","dataType":"CreditCard","recordId":"CC-789"}'
```

**Paso 6: Verificar los logs**

Después de ejecutar los tests, verifica que los logs se generaron correctamente:

```bash
# Ver logs en consola (ya deberían aparecer en la terminal donde hiciste dotnet run)

# Ver logs en archivo
cat logs/security-*.log

# O usar tail para ver en tiempo real
tail -f logs/security-*.log
```

**Ejemplo de salida esperada en los logs:**

```
2025-01-07 14:23:15.123 -06:00 [INF] Login successful for UserId=user123 from IP=::1 UserAgent=curl/7.64.1
2025-01-07 14:23:20.456 -06:00 [WRN] Login FAILED for Username=hacker from IP=::1 Reason=Invalid password UserAgent=curl/7.64.1
2025-01-07 14:23:25.789 -06:00 [WRN] Access DENIED for UserId=user123 to Resource=AdminPanel Action=Access IP=::1
2025-01-07 14:23:30.012 -06:00 [WRN] Privilege escalation: UserId=user123 from Role=User to Role=Admin IP=::1
2025-01-07 14:23:35.345 -06:00 [WRN] SUSPICIOUS activity detected: UserId=user123 Type=BruteForce Details={"Pattern":"Multiple failed logins","Severity":"High","Timestamp":"2025-01-07T20:23:35.3451234Z"} IP=::1
2025-01-07 14:23:40.678 -06:00 [INF] Data access: UserId=user123 DataType=CreditCard RecordId=CC-789 IP=::1
```

---

#### 3.3 Correlation IDs para tracing distribuido

Los **Correlation IDs** permiten rastrear una request a través de múltiples servicios y logs.

**Middleware para agregar Correlation ID:**

```csharp
public class CorrelationIdMiddleware
{
    private readonly RequestDelegate _next;
    private const string CorrelationIdHeader = "X-Correlation-ID";

    public CorrelationIdMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Obtener Correlation ID del header o generar nuevo
        var correlationId = context.Request.Headers[CorrelationIdHeader].FirstOrDefault()
                            ?? Guid.NewGuid().ToString();

        // Agregar a response headers
        context.Response.Headers[CorrelationIdHeader] = correlationId;

        // Agregar a contexto de Serilog (aparecerá en todos los logs de esta request)
        using (Serilog.Context.LogContext.PushProperty("CorrelationId", correlationId))
        {
            await _next(context);
        }
    }
}

// Registrar middleware en Program.cs
app.UseMiddleware<CorrelationIdMiddleware>();
```

**Ejemplo de log con Correlation ID:**

```
[2025-01-07 14:32:15.123 -06:00] [WRN] Login FAILED for Username=john@example.com from IP=192.168.1.100 Reason=InvalidPassword UserAgent=Mozilla/5.0 {"CorrelationId":"a1b2c3d4-e5f6-7890-abcd-ef1234567890"}
```

Ahora puedes buscar **todos** los logs relacionados con una request específica usando el CorrelationId.

---

## 📝 Parte 3: Análisis y Alertas (30 min)

### Paso 4: Analizar logs con KQL (Kusto Query Language) (15 min)

**KQL** es el lenguaje de consulta de Azure Application Insights, Azure Monitor, Azure Sentinel y Azure Data Explorer.

#### 4.1 Queries básicas de seguridad

**Query 1: Detectar brute force (múltiples intentos de login fallido)**

```kql
traces
| where timestamp > ago(1h)
| where message contains "Login FAILED"
| extend Username = tostring(customDimensions.Username)
| extend IpAddress = tostring(customDimensions.IpAddress)
| summarize FailedAttempts = count() by Username, IpAddress, bin(timestamp, 5m)
| where FailedAttempts >= 5
| order by FailedAttempts desc
```

**Explicación:**
- Busca logs de los últimos 60 minutos
- Filtra mensajes de "Login FAILED"
- Extrae Username e IP de las propiedades estructuradas
- Agrupa por Username + IP en ventanas de 5 minutos
- Alerta si hay 5+ intentos fallidos

---

**Query 2: Detectar escalación de privilegios**

```kql
traces
| where timestamp > ago(24h)
| where message contains "Privilege escalation"
| extend UserId = tostring(customDimensions.UserId)
| extend FromRole = tostring(customDimensions.FromRole)
| extend ToRole = tostring(customDimensions.ToRole)
| where ToRole == "Admin"
| project timestamp, UserId, FromRole, ToRole, IpAddress = tostring(customDimensions.IpAddress)
| order by timestamp desc
```

---

**Query 3: Detectar acceso anómalo a datos (volumen inusual)**

```kql
traces
| where timestamp > ago(1h)
| where message contains "Data access"
| extend UserId = tostring(customDimensions.UserId)
| extend DataType = tostring(customDimensions.DataType)
| summarize AccessCount = count() by UserId, DataType, bin(timestamp, 10m)
| where AccessCount > 50  // Threshold: 50 accesos en 10 minutos
| order by AccessCount desc
```

---

**Query 4: Detectar patrones de SQL injection en logs de error**

```kql
traces
| where timestamp > ago(1h)
| where severityLevel >= 3  // Warning o superior
| where message contains "SQL" or message contains "query"
| extend RawMessage = tostring(message)
| where RawMessage matches regex @"(UNION|SELECT|INSERT|DELETE|DROP|';|--)"
| project timestamp, message, IpAddress = tostring(customDimensions.IpAddress), UserId = tostring(customDimensions.UserId)
| order by timestamp desc
```

---

#### 4.2 Dashboards de seguridad

Crea un **dashboard en Application Insights** con las siguientes visualizaciones:

1. **Failed Login Attempts (últimas 24h)** - Gráfica de líneas
2. **Top 10 IPs con intentos fallidos** - Gráfica de barras
3. **Access Denied events por recurso** - Gráfica de pie
4. **Privilege escalations** - Tabla
5. **Suspicious activity timeline** - Timeline

**Ejemplo de creación de dashboard:**

1. Ir a Azure Portal → Application Insights → Logs
2. Ejecutar query (ej: brute force detection)
3. Click en "Pin to dashboard"
4. Crear nuevo dashboard "Security Monitoring"
5. Repetir para cada query

---

### Paso 5: Configurar Alertas Automáticas (15 min)

#### 5.1 Alerta de Brute Force Attack

**En Application Insights:**

1. **Ir a:** Application Insights → Alerts → New alert rule
2. **Condition:** Custom log search
3. **Query KQL:**

```kql
traces
| where timestamp > ago(5m)
| where message contains "Login FAILED"
| extend Username = tostring(customDimensions.Username)
| extend IpAddress = tostring(customDimensions.IpAddress)
| summarize FailedAttempts = count() by Username, IpAddress
| where FailedAttempts >= 5
```

4. **Threshold:** Cuando `FailedAttempts >= 5` en ventana de 5 minutos
5. **Evaluation frequency:** Cada 5 minutos
6. **Action Group:** Email a security@empresa.com + SMS a guardia
7. **Severity:** Sev 2 (High)
8. **Alert name:** "Brute Force Attack Detected"

---

#### 5.2 Alerta de Escalación de Privilegios

```kql
traces
| where timestamp > ago(5m)
| where message contains "Privilege escalation"
| extend ToRole = tostring(customDimensions.ToRole)
| where ToRole == "Admin"
| summarize Count = count()
| where Count > 0
```

- **Threshold:** Count > 0 (cualquier escalación a Admin)
- **Severity:** Sev 1 (Critical)
- **Action:** Email + SMS + Crear ticket en ServiceNow

---

#### 5.3 Alerta de Acceso Anómalo (Machine Learning)

Azure Application Insights tiene **Smart Detection** integrado que detecta:

- Anomalías en volumen de requests
- Degradación de performance
- Memory leaks
- Dependency failures

**Habilitar Smart Detection:**

1. Application Insights → Smart Detection → Configure
2. Activar: "Abnormal rise in failed request rate"
3. Activar: "Abnormal rise in exception volume"
4. Configurar Action Group para notificaciones

---

### Paso 6: Investigación de Incidentes con Logs (Caso práctico)

**Escenario:** Recibes una alerta de "Brute Force Attack Detected" para el usuario `admin@empresa.com` desde la IP `203.0.113.50`.

**Pasos de investigación:**

#### 1. Verificar la alerta

```kql
traces
| where timestamp > ago(1h)
| where message contains "Login FAILED"
| extend Username = tostring(customDimensions.Username)
| extend IpAddress = tostring(customDimensions.IpAddress)
| where Username == "admin@empresa.com" and IpAddress == "203.0.113.50"
| order by timestamp asc
```

**Resultado:**
```
timestamp                   | Username             | IpAddress    | FailedAttempts
2025-01-07 14:30:15.123     | admin@empresa.com    | 203.0.113.50 | 1
2025-01-07 14:30:16.456     | admin@empresa.com    | 203.0.113.50 | 1
2025-01-07 14:30:17.789     | admin@empresa.com    | 203.0.113.50 | 1
...
2025-01-07 14:30:30.123     | admin@empresa.com    | 203.0.113.50 | 1
```

**Hallazgo:** 12 intentos de login fallidos en 15 segundos → Probable ataque automatizado.

---

#### 2. Investigar otras actividades de la misma IP

```kql
traces
| where timestamp > ago(24h)
| extend IpAddress = tostring(customDimensions.IpAddress)
| where IpAddress == "203.0.113.50"
| project timestamp, message, UserId = tostring(customDimensions.UserId), Username = tostring(customDimensions.Username)
| order by timestamp asc
```

**Hallazgo:** La misma IP intentó logins fallidos en 5 cuentas diferentes (credential stuffing attack).

---

#### 3. Verificar si algún login fue exitoso

```kql
traces
| where timestamp > ago(24h)
| where message contains "Login successful"
| extend IpAddress = tostring(customDimensions.IpAddress)
| where IpAddress == "203.0.113.50"
```

**Resultado:** 0 resultados → El ataque NO tuvo éxito (passwords robustos funcionaron).

---

#### 4. Geolocalización de la IP

```kql
traces
| where timestamp > ago(1h)
| extend IpAddress = tostring(customDimensions.IpAddress)
| where IpAddress == "203.0.113.50"
| extend GeoInfo = geo_info_from_ip_address(IpAddress)
| project timestamp, IpAddress, Country = GeoInfo.country, City = GeoInfo.city
| take 1
```

**Resultado:** IP de Rusia → Acceso desde país inesperado (empresa opera solo en México).

---

#### 5. Acciones de respuesta

Con esta información, el equipo de seguridad puede:

✅ **Bloquear IP** `203.0.113.50` en el firewall
✅ **Bloquear IPs de Rusia** en Azure Front Door (geo-blocking)
✅ **Notificar al usuario** `admin@empresa.com` del intento de acceso
✅ **Forzar cambio de contraseña** si hay sospecha de compromiso
✅ **Revisar logs de otras cuentas** atacadas (5 usuarios)
✅ **Crear regla de rate limiting** más estricta (max 3 intentos/minuto)
✅ **Documentar incidente** en sistema de tickets (ISO 27001 requirement)

---

## 📦 Entregable del Laboratorio

Al finalizar este laboratorio, debes entregar:

### 1. Configuración de Serilog Implementada

- ✅ `Program.cs` con Serilog configurado (3 sinks mínimo)
- ✅ Logs estructurados con propiedades (no solo texto plano)
- ✅ Nivel de logging apropiado para producción (Information+)
- ✅ Retención de logs configurada (90 días en archivo)

### 2. Security Logger Service

- ✅ Interfaz `ISecurityLogger` implementada
- ✅ Al menos 5 métodos de logging (login, access denied, privilege escalation, etc.)
- ✅ Logs incluyen: UserId, IP, timestamp, UserAgent, CorrelationId
- ✅ Integrado en al menos 2 controladores (Auth + otro)

### 3. Correlation ID Middleware

- ✅ Middleware implementado y registrado
- ✅ Correlation ID en headers de response
- ✅ Correlation ID aparece en todos los logs

### 4. Queries KQL de Seguridad

- ✅ Al menos 3 queries KQL funcionales:
  1. Detección de brute force
  2. Detección de escalación de privilegios
  3. Detección de acceso anómalo o SQL injection

### 5. Alertas Configuradas

- ✅ Al menos 2 alertas automáticas en Application Insights:
  1. Alerta de brute force (5+ intentos fallidos en 5 min)
  2. Alerta de escalación de privilegios a Admin
- ✅ Action Group configurado (email/SMS)
- ✅ Severidad apropiada (Sev 1 para críticos, Sev 2 para altos)

### 6. Dashboard de Seguridad

- ✅ Dashboard en Application Insights con al menos 3 visualizaciones:
  1. Failed login attempts (timeline)
  2. Top IPs con intentos fallidos (bar chart)
  3. Access denied events por recurso (pie chart)

### 7. Documentación de Investigación de Incidentes

- ✅ Documento con pasos de investigación de un incidente simulado
- ✅ Queries KQL utilizadas
- ✅ Hallazgos y conclusiones
- ✅ Acciones de remediación recomendadas

### 8. Mapeo a ISO 27001

- ✅ Documento que mapee la implementación a controles:
  - Control 8.15 (Logging) - Evidencia de logs protegidos y almacenados
  - Control 8.16 (Monitoring) - Evidencia de alertas automáticas
- ✅ Referencias a evidencia (código, screenshots de Application Insights, logs generados)

---

## 🎯 Criterios de Éxito

Tu implementación de logging y monitoring está completa cuando:

- ✅ Logs estructurados se generan para todos los eventos de seguridad
- ✅ Logs incluyen contexto suficiente (quién, qué, cuándo, dónde, cómo)
- ✅ NO se loguea información sensible (passwords, tokens, PII)
- ✅ Logs se envían a sistema centralizado (Application Insights)
- ✅ Alertas automáticas funcionan correctamente (probadas con eventos simulados)
- ✅ Puedes investigar un incidente de seguridad usando solo los logs
- ✅ Dashboard de seguridad muestra métricas en tiempo real
- ✅ Cumples con requisitos de ISO 27001 controles 8.15 y 8.16

**Test final:** Si ocurre un incidente de seguridad **ahora mismo**, ¿podrías:
1. ¿Detectarlo en menos de 5 minutos? (Alertas automáticas)
2. ¿Identificar el atacante (IP, usuario, método)? (Logs estructurados)
3. ¿Rastrear todas las acciones del atacante? (Correlation IDs)
4. ¿Demostrar a un auditor qué pasó? (Logs inmutables, retención)

Si la respuesta es **SÍ** a las 4 preguntas, tu implementación es exitosa.

---

## 💡 Mejores Prácticas - Resumen

### ✅ DO (Hacer)

1. **Loguea eventos de seguridad críticos** (autenticación, autorización, acceso a datos sensibles)
2. **Usa logging estructurado** (propiedades, no solo texto)
3. **Incluye contexto** (UserId, IP, CorrelationId, timestamp)
4. **Centraliza logs** en SIEM (Application Insights, ELK, Splunk)
5. **Protege logs** contra modificación/eliminación (append-only storage)
6. **Configura alertas** automáticas para eventos críticos
7. **Revisa logs** regularmente (auditorías de seguridad)
8. **Usa niveles apropiados** (Information+ en producción)
9. **Retén logs** según compliance (1-7 años)
10. **Prueba tus alertas** con escenarios simulados

### ❌ DON'T (No hacer)

1. **NO loguees passwords** o secretos (ni hasheados)
2. **NO loguees tokens completos** (JWT, API keys)
3. **NO loguees PII sin necesidad** (números de tarjeta, SSN)
4. **NO uses logging síncrono** en producción (async para performance)
5. **NO loguees en nivel Debug/Trace** en producción (ruido + performance)
6. **NO ignores logs** (si nadie los revisa, no sirven)
7. **NO almacenes logs solo localmente** (usa sistema centralizado)
8. **NO configures alertas sin tuning** (evita fatiga de alertas)
9. **NO olvides rotar logs** (evita llenar disco)
10. **NO confíes en logs del cliente** (pueden ser manipulados)

---

## 📚 Referencias

### Estándares y Frameworks

- **ISO 27001:2022 Control 8.15** - Logging
- **ISO 27001:2022 Control 8.16** - Monitoring activities
- **OWASP Top 10:2021 A09** - Security Logging and Monitoring Failures
- **NIST SP 800-92** - Guide to Computer Security Log Management
- **PCI-DSS Requirement 10** - Track and monitor all access to network resources

### Documentación Técnica

- **Serilog Documentation:** https://serilog.net/
- **Azure Application Insights:** https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview
- **KQL (Kusto Query Language):** https://docs.microsoft.com/en-us/azure/data-explorer/kusto/query/
- **Structured Logging Best Practices:** https://github.com/serilog/serilog/wiki/Structured-Data

### Herramientas SIEM

- **ELK Stack:** https://www.elastic.co/elastic-stack
- **Splunk:** https://www.splunk.com/
- **Graylog:** https://www.graylog.org/
- **Datadog:** https://www.datadoghq.com/

---

**Versión:** 1.0
**Última actualización:** Enero 2025
**Mapeo ISO 27001:** Controles 8.15 (Logging) y 8.16 (Monitoring activities)
