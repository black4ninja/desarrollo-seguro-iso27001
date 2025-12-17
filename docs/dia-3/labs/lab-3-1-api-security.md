# Lab 3.1 - OWASP API Security: Explotar y Corregir Vulnerabilidades

**Duración:** 90 minutos
**Facilitador:** Facilitador 2 (Técnico)
**Día:** 3 - Implementación de Controles

---

## Objetivos de Aprendizaje

Al finalizar este laboratorio, los participantes podrán:

1. ✅ Identificar y explotar 5 vulnerabilidades críticas de APIs
2. ✅ Aplicar correcciones siguiendo OWASP API Security Top 10
3. ✅ Validar correcciones mediante testing manual
4. ✅ Documentar vulnerabilidades y remediaciones

---

## Parte 1: Setup del Proyecto Vulnerable (10 min)

### Paso 1.1: Crear Proyecto API

```bash
# Navegar al lab
cd ~/Meeplab/Chihuahua/curso-5dias/dia3-implementacion-controles/laboratorios/lab3.1-api-security

# Crear proyecto
dotnet new webapi -n VulnerableShopAPI
cd VulnerableShopAPI

# Instalar paquetes
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package System.IdentityModel.Tokens.Jwt
```

### Paso 1.2: Crear Modelos

Crea `Models/User.cs`:

```csharp
namespace VulnerableShopAPI.Models;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = "User";
    public decimal Balance { get; set; } = 0;
}

public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class LoginRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
```

### Paso 1.3: Crear DbContext

Crea `Data/AppDbContext.cs`:

```csharp
using Microsoft.EntityFrameworkCore;
using VulnerableShopAPI.Models;

namespace VulnerableShopAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Order> Orders { get; set; }
}
```

### Paso 1.4: Configurar Program.cs

```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using VulnerableShopAPI.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=shop.db"));

// Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("super-secret-key-12345"))
        };
    });

// CORS vulnerable
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

// Seed database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    if (!db.Users.Any())
    {
        db.Users.AddRange(
            new User { Email = "user1@test.com", PasswordHash = "pass123", Balance = 1000 },
            new User { Email = "user2@test.com", PasswordHash = "pass456", Balance = 500 },
            new User { Email = "admin@test.com", PasswordHash = "admin123", Role = "Admin", Balance = 10000 }
        );
        db.SaveChanges();
    }
}

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
```

---

## Parte 2: Vulnerabilidad 1 - BOLA/IDOR (API1) (15 min)

### Crear Controller Vulnerable

Crea `Controllers/OrdersController.cs`:

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using VulnerableShopAPI.Data;
using VulnerableShopAPI.Models;

namespace VulnerableShopAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
        _context = context;
    }

    // ❌ VULNERABILIDAD 1: IDOR - No verifica ownership
    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetOrder(int id)
    {
        var order = _context.Orders.Find(id);
        if (order == null)
            return NotFound();

        return Ok(order); // ❌ Devuelve orden de cualquier usuario
    }
}
```

### 📝 EJERCICIO: Explotar IDOR

1. Ejecutar API: `dotnet run`
2. Login como user1 (obtener token)
3. Ver orden propia (ID 1)
4. **Cambiar ID** a 2 o 3 → Ver órdenes de otros usuarios

**Comando curl:**
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user1@test.com","password":"pass123"}'

# Ver orden de otro usuario (IDOR)
curl -X GET http://localhost:5000/api/orders/2 \
  -H "Authorization: Bearer <token>"
```

### ✅ CORRECCIÓN

```csharp
[HttpGet("{id}")]
[Authorize]
public IActionResult GetOrder(int id)
{
    var userId = int.Parse(User.FindFirst("userId")?.Value ?? "0");

    var order = _context.Orders
        .FirstOrDefault(o => o.Id == id && o.UserId == userId);

    if (order == null)
        return NotFound(); // No revela si existe

    return Ok(order);
}
```

---

## Parte 3: Vulnerabilidad 2 - Broken Authentication (API2) (15 min)

### Controller Vulnerable

Crea `Controllers/AuthController.cs`:

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using VulnerableShopAPI.Data;
using VulnerableShopAPI.Models;

namespace VulnerableShopAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    // ❌ VULNERABILIDAD 2: Token sin expiración + password en texto plano
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var user = _context.Users
            .FirstOrDefault(u => u.Email == request.Email &&
                                 u.PasswordHash == request.Password);

        if (user == null)
            return Unauthorized("Invalid credentials");

        // ❌ Token SIN expiración
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes("super-secret-key-12345");

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("userId", user.Id.ToString()),
                new Claim("email", user.Email),
                new Claim("role", user.Role)
            }),
            // ❌ NO HAY Expires
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return Ok(new { token = tokenHandler.WriteToken(token) });
    }
}
```

### 📝 EJERCICIO: Identificar Problemas

1. Password en texto plano (no hash)
2. Token sin expiración
3. Sin rate limiting (brute force posible)

### ✅ CORRECCIÓN

```csharp
[HttpPost("login")]
public IActionResult Login([FromBody] LoginRequest request)
{
    var user = _context.Users.FirstOrDefault(u => u.Email == request.Email);

    if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        return Unauthorized("Invalid credentials");

    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.UTF8.GetBytes("super-secret-key-12345");

    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(new[]
        {
            new Claim("userId", user.Id.ToString()),
            new Claim("email", user.Email),
            new Claim("role", user.Role)
        }),
        Expires = DateTime.UtcNow.AddMinutes(15), // ✅ Expira en 15 min
        SigningCredentials = new SigningCredentials(
            new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256Signature)
    };

    var token = tokenHandler.CreateToken(tokenDescriptor);
    return Ok(new { token = tokenHandler.WriteToken(token) });
}
```

---

## Parte 4: Vulnerabilidad 3 - Excessive Data Exposure (API3) (15 min)

### Controller Vulnerable

```csharp
[HttpGet("profile")]
[Authorize]
public IActionResult GetProfile()
{
    var userId = int.Parse(User.FindFirst("userId")?.Value ?? "0");
    var user = _context.Users.Find(userId);

    // ❌ Devuelve TODO el objeto User (incluye PasswordHash)
    return Ok(user);
}
```

### 📝 EJERCICIO: Ver Datos Expuestos

```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer <token>"

# Output incluye:
# {
#   "id": 1,
#   "email": "user1@test.com",
#   "passwordHash": "pass123",  ← ❌ EXPUESTO
#   "role": "User",
#   "balance": 1000
# }
```

### ✅ CORRECCIÓN con DTO

```csharp
public class UserProfileDto
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string Role { get; set; }
    public decimal Balance { get; set; }
    // NO incluye PasswordHash
}

[HttpGet("profile")]
[Authorize]
public IActionResult GetProfile()
{
    var userId = int.Parse(User.FindFirst("userId")?.Value ?? "0");
    var user = _context.Users.Find(userId);

    if (user == null)
        return NotFound();

    // ✅ Devolver solo campos públicos
    var dto = new UserProfileDto
    {
        Id = user.Id,
        Email = user.Email,
        Role = user.Role,
        Balance = user.Balance
    };

    return Ok(dto);
}
```

---

## Parte 5: Vulnerabilidad 4 - Lack of Resources & Rate Limiting (API4) (15 min)

### Controller Vulnerable

```csharp
[HttpGet("search")]
public IActionResult SearchProducts(string keyword)
{
    // ❌ Sin paginación - devuelve TODOS los resultados
    var products = _context.Products
        .Where(p => p.Name.Contains(keyword))
        .ToList();

    return Ok(products);
}
```

### 📝 EJERCICIO: DoS con Query Grande

```bash
# Llamar endpoint sin límites
for i in {1..1000}; do
  curl http://localhost:5000/api/products/search?keyword=a &
done

# Servidor se satura
```

### ✅ CORRECCIÓN con Paginación

```csharp
[HttpGet("search")]
public IActionResult SearchProducts(
    [FromQuery] string keyword,
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 20)
{
    // Validar límites
    if (pageSize > 100) pageSize = 100;
    if (page < 1) page = 1;

    var query = _context.Products
        .Where(p => p.Name.Contains(keyword));

    var totalCount = query.Count();
    var products = query
        .OrderBy(p => p.Id)
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToList();

    return Ok(new
    {
        Data = products,
        Page = page,
        PageSize = pageSize,
        TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
    });
}
```

**Rate Limiting (Program.cs):**

```csharp
using Microsoft.AspNetCore.RateLimiting;
using System.Threading.RateLimiting;

builder.Services.AddRateLimiter(options =>
{
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            factory: partition => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 100,
                Window = TimeSpan.FromMinutes(1)
            }));
});

// ...
app.UseRateLimiter();
```

---

## Parte 6: Vulnerabilidad 5 - SSRF (API7) (15 min)

### Controller Vulnerable

```csharp
[HttpPost("fetch-image")]
public async Task<IActionResult> FetchImage([FromBody] string url)
{
    // ❌ Fetch URL sin validación
    using var client = new HttpClient();
    var response = await client.GetAsync(url);
    var content = await response.Content.ReadAsByteArrayAsync();

    return File(content, "image/jpeg");
}
```

### 📝 EJERCICIO: Explotar SSRF

```bash
# Atacante accede a metadata de AWS
curl -X POST http://localhost:5000/api/images/fetch-image \
  -H "Content-Type: application/json" \
  -d '"http://169.254.169.254/latest/meta-data"'

# Acceso a recursos internos
curl -X POST http://localhost:5000/api/images/fetch-image \
  -H "Content-Type: application/json" \
  -d '"http://localhost:8080/admin/users"'
```

### ✅ CORRECCIÓN con Whitelist

```csharp
[HttpPost("fetch-image")]
public async Task<IActionResult> FetchImage([FromBody] string url)
{
    // Validar URL
    if (!Uri.TryCreate(url, UriKind.Absolute, out var uri))
        return BadRequest("Invalid URL");

    // Whitelist de dominios
    var allowedDomains = new[] { "cdn.myapp.com", "images.myapp.com" };
    if (!allowedDomains.Contains(uri.Host))
        return BadRequest("Domain not allowed");

    // Solo HTTPS
    if (uri.Scheme != "https")
        return BadRequest("Only HTTPS allowed");

    // Blacklist IPs privadas
    var ip = System.Net.Dns.GetHostAddresses(uri.Host).FirstOrDefault();
    if (IsPrivateIP(ip))
        return BadRequest("Private IPs not allowed");

    using var client = new HttpClient();
    client.Timeout = TimeSpan.FromSeconds(5);

    var response = await client.GetAsync(url);
    var content = await response.Content.ReadAsByteArrayAsync();

    return File(content, "image/jpeg");
}

private bool IsPrivateIP(System.Net.IPAddress? ip)
{
    if (ip == null) return false;
    byte[] bytes = ip.GetAddressBytes();
    return bytes[0] == 10 ||
           (bytes[0] == 172 && bytes[1] >= 16 && bytes[1] <= 31) ||
           (bytes[0] == 192 && bytes[1] == 168) ||
           bytes[0] == 127;
}
```

---

## Parte 7: Testing de Correcciones (5 min)

### Checklist de Validación

- [ ] **IDOR:** Solo puedo ver mis propias órdenes
- [ ] **Auth:** Token expira en 15 min
- [ ] **Data Exposure:** Profile no muestra passwordHash
- [ ] **Rate Limiting:** Bloqueado después de 100 requests/min
- [ ] **SSRF:** Solo acepta dominios whitelisted

```bash
# Script de testing
#!/bin/bash

echo "Testing vulnerabilities..."

# Test IDOR (debe fallar)
curl -X GET http://localhost:5000/api/orders/999 \
  -H "Authorization: Bearer <token_user1>" \
  | grep "NotFound"

# Test Data Exposure (no debe tener passwordHash)
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer <token>" \
  | grep -v "passwordHash"

echo "Tests completed!"
```

---

## Entregables del Laboratorio

1. ✅ **Proyecto vulnerable** ejecutable
2. ✅ **Proyecto corregido** con las 5 vulnerabilidades resueltas
3. ✅ **Tabla comparativa:**

| Vulnerabilidad | Línea Vulnerable | Corrección Aplicada | Validado |
|----------------|------------------|---------------------|----------|
| IDOR (API1) | OrdersController:15 | Validar userId | ✅ |
| Broken Auth (API2) | AuthController:25 | Expires + BCrypt | ✅ |
| Data Exposure (API3) | UsersController:10 | DTO sin password | ✅ |
| Rate Limiting (API4) | ProductsController:8 | Paginación + limiter | ✅ |
| SSRF (API7) | ImagesController:5 | Whitelist + validación | ✅ |

4. ✅ **Capturas de pantalla** de exploits antes/después

---

## Mapeo a Estándares

### ISO 27002:2022
- **5.15** - Access control → IDOR, Auth
- **8.28** - Secure coding → Todas las correcciones
- **8.6** - Capacity management → Rate limiting

### OWASP API Security Top 10 2023
- ✅ API1 - Broken Object Level Authorization
- ✅ API2 - Broken Authentication
- ✅ API3 - Broken Object Property Level Authorization
- ✅ API4 - Unrestricted Resource Consumption
- ✅ API7 - Server Side Request Forgery

---

## Recursos Adicionales

- 📄 OWASP API Security: https://owasp.org/www-project-api-security/
- 🔧 Postman Collections para testing
- 📖 JWT.io para decodificar tokens

---

**Duración:** 90 minutos
**Próximo lab:** DAST con OWASP ZAP (60 min)
