# Lab 2.3 - SAST con SonarQube

**Duración:** 75 minutos
**Facilitador:** Facilitador 2 (Técnico)
**Día:** 2 - Preparación para Implementar Controles

---

## Objetivos de Aprendizaje

Al finalizar este laboratorio, los participantes podrán:

1. ✅ Configurar SonarQube para analizar proyectos .NET
2. ✅ Ejecutar análisis estático de código (SAST) con SonarQube
3. ✅ Interpretar resultados: vulnerabilidades, code smells, y hotspots
4. ✅ Corregir vulnerabilidades detectadas siguiendo recomendaciones
5. ✅ Integrar SonarQube en el flujo de desarrollo (CI/CD preview)
6. ✅ Diferenciar entre SAST y code review manual

---

## Contexto

**SAST (Static Application Security Testing)** analiza el código fuente sin ejecutarlo, buscando patrones de vulnerabilidades conocidas.

**Analogía:** SAST es como un corrector ortográfico pero para seguridad. Detecta errores comunes automáticamente, pero no entiende el contexto del negocio (para eso necesitas code review manual).

### ¿Por qué SonarQube?

- ✅ **Gratuito:** Community Edition es open source
- ✅ **Completo:** Detecta vulnerabilidades, bugs, code smells
- ✅ **Multi-lenguaje:** C#, Java, JavaScript, Python, etc.
- ✅ **Integrable:** Se conecta con CI/CD (Azure DevOps, GitLab, GitHub Actions)
- ✅ **Estándar de industria:** Usado por miles de empresas

---

## Parte 1: Verificar SonarQube (10 min)

### Paso 1.1: Verificar que SonarQube está corriendo

```bash
# Verificar contenedores
docker-compose ps

# Deberías ver:
# curso-sonarqube      Up (healthy)    0.0.0.0:9000->9000/tcp
```

Si no está corriendo, iniciarlo:

```bash
cd ~/Meeplab/Chihuahua/curso-5dias/recursos/docker
docker-compose up -d sonarqube sonarqube-db
```

**⏱️ Tiempo de inicio:** 2-3 minutos (primera vez puede tardar más).

### Paso 1.2: Acceder a SonarQube

1. Abre http://localhost:9000 en tu navegador
2. Login con:
   - **Username:** `admin`
   - **Password:** `admin` (o la que cambiaste en Lab 2.2)
3. Si es tu primera vez, SonarQube te pedirá cambiar la contraseña → Usa: `Admin123!`

✅ **Checkpoint:** Deberías ver el dashboard principal de SonarQube.

---

### Paso 1.3: Instalar SonarScanner para .NET

```bash
# Instalar herramienta global de .NET
dotnet tool install --global dotnet-sonarscanner

# Verificar instalación
dotnet sonarscanner --version

# Output esperado:
# SonarScanner for .NET x.x.x
```

**💡 Nota:** Si ya lo tienes instalado y ves error, actualiza con:
```bash
dotnet tool update --global dotnet-sonarscanner
```

---

## Parte 2: Crear Proyecto en SonarQube (10 min)

### Paso 2.1: Crear Proyecto Manualmente

1. En SonarQube dashboard, click **"Create Project"** (botón azul superior derecha)
2. Seleccionar: **"Manually"**
3. Configurar:
   - **Project display name:** `SecureShop API`
   - **Project key:** `secureshop-api`
   - **Main branch name:** `main`
4. Click **"Set Up"**

### Paso 2.2: Generar Token de Autenticación

1. SonarQube te preguntará: "How do you want to analyze your repository?"
2. Seleccionar: **"Locally"**
3. En "Provide a token", click **"Generate"**:
   - **Token name:** `lab-token`
   - Click **"Generate"**
   - **⚠️ IMPORTANTE:** Copia el token y guárdalo (no se mostrará de nuevo)

**Ejemplo de token:**
```
squ_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
```

4. Click **"Continue"**

### Paso 2.3: Seleccionar Tipo de Proyecto

1. Seleccionar: **".NET"**
2. Seleccionar: **".NET Framework or .NET Core"**
3. SonarQube mostrará los comandos que usaremos en el siguiente paso

✅ **Checkpoint:** Debes tener tu token copiado y los comandos visibles en pantalla.

---

## Parte 3: Obtener Proyecto Vulnerable (5 min)

### Paso 3.1: Copiar Proyecto del Legacy

```bash
# Navegar al directorio de laboratorios
cd ~/Meeplab/Chihuahua/curso-5dias/dia2-preparacion-controles/laboratorios/lab2.3-sast-sonarqube

# Copiar proyecto vulnerable
cp -r ~/Meeplab/Chihuahua/legacy-3dias/implementacion/dia2/lab01-sonarqube/proyecto-vulnerable .

# Verificar que se copió
ls -la proyecto-vulnerable/

# Deberías ver:
# SecureShopAPI.csproj
# Controllers/
# Program.cs
# appsettings.json
```

### Paso 3.2: Explorar el Código (Opcional - 3 min)

Abre `proyecto-vulnerable/Controllers/ProductsController.cs` y observa los comentarios que indican vulnerabilidades:

```csharp
// VULNERABILIDAD 1: SQL Injection
// VULNERABILIDAD 2: Hardcoded Credentials
// VULNERABILIDAD 3: Weak Cryptography (MD5)
// VULNERABILIDAD 4: Path Traversal
// VULNERABILIDAD 5: Insecure Randomness
// VULNERABILIDAD 6: Commented Out Code (Code Smell)
// VULNERABILIDAD 7: Generic Exception Handling
```

**💡 No corrijas nada aún!** Primero ejecutaremos SonarQube para ver qué detecta.

---

## Parte 4: Ejecutar Análisis con SonarQube (15 min)

### Paso 4.1: Configurar Variables (Para Facilitar)

```bash
# Reemplaza con TU token
export SONAR_TOKEN="squ_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

# Project key
export SONAR_PROJECT_KEY="secureshop-api"

# Navegar al proyecto
cd proyecto-vulnerable
```

### Paso 4.2: Proceso de 3 Pasos

**Paso 1: Iniciar Scanner** (le dice a SonarQube que vamos a analizar)

```bash
dotnet sonarscanner begin \
  /k:"$SONAR_PROJECT_KEY" \
  /d:sonar.host.url="http://localhost:9000" \
  /d:sonar.login="$SONAR_TOKEN"

# Output esperado:
# SonarScanner for .NET x.x.x
# Using the .NET Framework version of the Scanner for .NET
# Pre-processing started.
# ...
# Pre-processing succeeded.
```

**Paso 2: Build del Proyecto** (compilar para que SonarQube analice)

```bash
dotnet build

# Output esperado:
# ...
# Build succeeded.
#     0 Warning(s)
#     0 Error(s)
```

**Paso 3: Finalizar Scanner** (envía resultados a SonarQube)

```bash
dotnet sonarscanner end /d:sonar.login="$SONAR_TOKEN"

# Output esperado:
# ...
# ANALYSIS SUCCESSFUL, you can browse http://localhost:9000/dashboard?id=secureshop-api
# Note that you will be able to access the updated dashboard once the server has processed the submitted analysis report
# More about the report processing at http://localhost:9000/api/ce/task?id=XXXXXXXXXX
```

**⏱️ Procesamiento:** SonarQube tarda ~30 segundos en procesar el reporte.

✅ **Checkpoint:** Deberías ver "ANALYSIS SUCCESSFUL" en la terminal.

---

### Paso 4.3: Troubleshooting Común

**Error: "Could not connect to SonarQube server"**

```bash
# Verificar que SonarQube está corriendo
docker-compose ps

# Verificar que puedes acceder
curl http://localhost:9000

# Reiniciar SonarQube si es necesario
docker-compose restart sonarqube
```

**Error: "Invalid authentication token"**

```bash
# Regenera el token en SonarQube:
# My Account → Security → Generate Tokens
```

**Error: "Project not found"**

```bash
# Verifica que el project key es correcto
# Debe coincidir con el creado en Parte 2
```

---

## Parte 5: Analizar Resultados (15 min)

### Paso 5.1: Abrir Dashboard del Proyecto

1. Ir a: http://localhost:9000/dashboard?id=secureshop-api
2. Esperar ~30 segundos si ves "Analysis in progress..."

### Paso 5.2: Interpretar el Overview

Deberías ver algo como:

```
┌─────────────────────────────────────────┐
│  SecureShop API                         │
│  Last analysis: X minutes ago           │
├─────────────────────────────────────────┤
│  Quality Gate: Failed ❌                │
├─────────────────────────────────────────┤
│  Bugs:                 0                │
│  Vulnerabilities:      5 🔴             │
│  Security Hotspots:    2 🟡             │
│  Code Smells:          10               │
│  Coverage:             0.0%             │
│  Duplications:         0.0%             │
└─────────────────────────────────────────┘
```

**📊 Interpretación:**

| Métrica | Significado |
|---------|-------------|
| **Bugs** | Errores de código que causarán fallas en tiempo de ejecución |
| **Vulnerabilities** | Problemas de seguridad que pueden ser explotados |
| **Security Hotspots** | Código sensible que requiere revisión manual |
| **Code Smells** | Código que funciona pero es difícil de mantener |
| **Coverage** | % de código cubierto por tests (0% porque no tenemos tests) |

---

### Paso 5.3: Explorar Vulnerabilidades

1. Click en la pestaña **"Issues"** (menú izquierdo)
2. En **"Type"**, seleccionar: **"Vulnerability"**
3. Deberías ver 5-7 vulnerabilidades listadas

**Vulnerabilidades Esperadas:**

| # | Vulnerabilidad | Severidad | Regla SonarQube | Línea Aprox. |
|---|----------------|-----------|-----------------|--------------|
| 1 | SQL Injection | 🔴 Critical | S3649 | ~36 |
| 2 | Hardcoded Password | 🟡 High | S2068 | ~78-82 |
| 3 | Weak Cryptography (MD5) | 🟠 Medium | S4790 | ~110 |
| 4 | Path Traversal | 🟡 High | S5145 | ~132 |
| 5 | Insecure Random | 🟠 Medium | S2245 | ~151 |

---

### Paso 5.4: Analizar una Vulnerabilidad en Detalle

**Ejemplo: SQL Injection (Línea ~36)**

1. Click en la vulnerabilidad **"SQL queries should not be vulnerable to injection attacks"**
2. SonarQube muestra:
   - **Descripción:** Por qué es peligroso
   - **Código vulnerable:** Resaltado en rojo
   - **Ubicación:** Archivo y línea exacta
   - **Recomendaciones:** Cómo corregirlo

3. Observa el código vulnerable:

```csharp
// ❌ VULNERABLE
var query = $"SELECT * FROM Products WHERE Name LIKE '%{keyword}%'";
```

**Explicación de SonarQube:**
> "User-provided data, such as URL parameters, should always be considered untrusted and tainted. Concatenating such data directly into SQL queries enables attackers to inject specially crafted values that can result in unauthorized data access or manipulation."

**Solución recomendada:**
```csharp
// ✅ SEGURO - Usar parámetros
var query = "SELECT * FROM Products WHERE Name LIKE @keyword";
command.Parameters.AddWithValue("@keyword", $"%{keyword}%");
```

---

### 📝 **EJERCICIO PRÁCTICO (10 min):**

Para cada vulnerabilidad, anota en una tabla:

| Vulnerabilidad | Línea | Severidad | ¿Cómo la explotaría un atacante? | Solución |
|----------------|-------|-----------|----------------------------------|----------|
| SQL Injection | ~36 | Critical | Inyectar `'; DROP TABLE Products--` | Usar parámetros |
| Hardcoded Password | ~78 | High | Leer código fuente (leak en GitHub) | Usar variables de entorno |
| ... | ... | ... | ... | ... |

**💡 Pista:** Click en cada vulnerabilidad para ver la explicación detallada de SonarQube.

---

### Paso 5.5: Explorar Security Hotspots

1. Click en la pestaña **"Security Hotspots"** (menú izquierdo)
2. Deberías ver 2-3 hotspots

**¿Qué son Security Hotspots?**

> Son áreas de código sensibles a seguridad que **requieren revisión manual**. No son necesariamente vulnerabilidades, pero necesitan validación humana.

**Ejemplo:** El uso de `File.ReadAllBytes()` en línea ~137 es un hotspot porque podría usarse de forma insegura (path traversal), pero SonarQube necesita que tú confirmes si está validado correctamente.

**Acciones posibles:**
- **Safe:** Revisé el código y está seguro
- **Fixed:** Lo corregí
- **Acknowledged:** Es un riesgo aceptado

---

## Parte 6: Corregir Vulnerabilidades (20 min)

Ahora vamos a corregir las vulnerabilidades detectadas.

### Paso 6.1: Corregir SQL Injection (Línea ~36)

**Abrir:** `Controllers/ProductsController.cs`

**Código vulnerable:**
```csharp
var query = $"SELECT * FROM Products WHERE Name LIKE '%{keyword}%'";
var command = new SqlCommand(query, connection);
```

**Código corregido:**
```csharp
var query = "SELECT * FROM Products WHERE Name LIKE @keyword";
var command = new SqlCommand(query, connection);
command.Parameters.AddWithValue("@keyword", $"%{keyword}%");
```

**💾 Guardar el archivo.**

---

### Paso 6.2: Corregir Hardcoded Credentials (Líneas ~78-82)

**Código vulnerable:**
```csharp
var adminPassword = "Admin123!";
var adminUser = "admin";
var connectionString = $"Server=localhost;Database=ShopDB;User={adminUser};Password={adminPassword}";
```

**Código corregido:**
```csharp
// Obtener credenciales desde configuración
var adminPassword = _configuration["AdminPassword"] ?? throw new InvalidOperationException("AdminPassword not configured");
var adminUser = _configuration["AdminUser"] ?? "admin";

// Mejor aún: usar la connection string configurada
var connectionString = _configuration.GetConnectionString("Default")
    ?? throw new InvalidOperationException("Connection string not configured");
```

**💾 Guardar el archivo.**

---

### Paso 6.3: Corregir Weak Cryptography (Línea ~110)

**Código vulnerable:**
```csharp
using var md5 = System.Security.Cryptography.MD5.Create();
var hashBytes = md5.ComputeHash(inputBytes);
```

**Código corregido:**
```csharp
// ✅ SEGURO: Usar SHA256 o mejor aún, algoritmos específicos para passwords (BCrypt, Argon2)
using var sha256 = System.Security.Cryptography.SHA256.Create();
var hashBytes = sha256.ComputeHash(inputBytes);

// Para passwords, usar BCrypt:
// using BCrypt.Net;
// var hash = BCrypt.HashPassword(data);
```

**💾 Guardar el archivo.**

---

### Paso 6.4: Corregir Path Traversal (Línea ~132)

**Código vulnerable:**
```csharp
var basePath = "/var/data/files";
var fullPath = Path.Combine(basePath, filename);

if (!System.IO.File.Exists(fullPath))
    return NotFound();
```

**Código corregido:**
```csharp
var basePath = "/var/data/files";
var fullPath = Path.Combine(basePath, filename);

// ✅ SEGURO: Validar que el path resultante está dentro del basePath
var normalizedPath = Path.GetFullPath(fullPath);
if (!normalizedPath.StartsWith(Path.GetFullPath(basePath)))
{
    return BadRequest("Invalid file path");
}

if (!System.IO.File.Exists(normalizedPath))
    return NotFound();
```

**💾 Guardar el archivo.**

---

### Paso 6.5: Corregir Insecure Random (Línea ~151)

**Código vulnerable:**
```csharp
var random = new Random();
var token = new byte[32];
random.NextBytes(token);
```

**Código corregido:**
```csharp
// ✅ SEGURO: Usar RandomNumberGenerator para tokens de seguridad
using var rng = System.Security.Cryptography.RandomNumberGenerator.Create();
var token = new byte[32];
rng.GetBytes(token);
```

**💾 Guardar el archivo.**

---

### Paso 6.6: Eliminar Código Comentado (Línea ~171-175)

**Código vulnerable:**
```csharp
// ❌ CODE SMELL: Código comentado que debería eliminarse
// var oldCode = "This should be removed";
// var moreOldCode = "Another old implementation";
// if (oldCode == "something") {
//     // Do nothing
// }
```

**Código corregido:**
```csharp
// Simplemente eliminar las líneas comentadas
```

**💾 Guardar el archivo.**

---

### Paso 6.7: Mejorar Exception Handling (Línea ~197)

**Código vulnerable:**
```csharp
catch (Exception ex) // ❌ Catching generic Exception
{
    _logger.LogError("Error: {Error}", ex.Message);
    return StatusCode(500, "An error occurred");
}
```

**Código corregido:**
```csharp
catch (ArgumentException ex) // ✅ Catch específico
{
    _logger.LogWarning("Invalid argument: {Error}", ex.Message);
    return BadRequest(ex.Message);
}
catch (Exception ex) // Solo como último recurso
{
    _logger.LogError(ex, "Unexpected error in GetProduct");
    return StatusCode(500, "An error occurred");
}
```

**💾 Guardar el archivo.**

---

## Parte 7: Re-analizar con SonarQube (10 min)

### Paso 7.1: Ejecutar Nuevo Análisis

```bash
# Asegúrate de estar en proyecto-vulnerable/
cd ~/Meeplab/Chihuahua/curso-5dias/dia2-preparacion-controles/laboratorios/lab2.3-sast-sonarqube/proyecto-vulnerable

# Re-ejecutar los 3 pasos
dotnet sonarscanner begin \
  /k:"$SONAR_PROJECT_KEY" \
  /d:sonar.host.url="http://localhost:9000" \
  /d:sonar.login="$SONAR_TOKEN"

dotnet build

dotnet sonarscanner end /d:sonar.login="$SONAR_TOKEN"
```

### Paso 7.2: Verificar Mejoras

1. Refrescar el dashboard: http://localhost:9000/dashboard?id=secureshop-api
2. Comparar resultados:

**Antes:**
```
Vulnerabilities: 5 🔴
Security Hotspots: 2 🟡
Code Smells: 10
```

**Después (esperado):**
```
Vulnerabilities: 0 ✅
Security Hotspots: 0-1 🟡 (algunos pueden quedar)
Code Smells: 3-5 (mejora significativa)
```

3. Click en **"Activity"** (menú izquierdo) para ver el gráfico histórico

✅ **Checkpoint:** Quality Gate debería cambiar a **"Passed"** 🎉

---

## Entregables del Laboratorio

Al finalizar, debes tener:

1. ✅ **Proyecto analizado** en SonarQube con 0 vulnerabilidades
2. ✅ **Código corregido** con las 7 vulnerabilidades resueltas
3. ✅ **Comparativa antes/después** visible en SonarQube Activity
4. ✅ **Captura de pantalla** del dashboard mostrando Quality Gate "Passed"

---

## Comparativa: SAST vs. Code Review Manual

### Lo que SonarQube detectó ✅

- ✅ SQL Injection (patrón conocido)
- ✅ Hardcoded credentials (busca strings que parecen passwords)
- ✅ MD5 usage (lista negra de algoritmos)
- ✅ Path Traversal (Path.Combine sin validación)
- ✅ Insecure Random (Random() en lugar de RNG)
- ✅ Código comentado (patrón de comentarios)
- ✅ Generic exceptions (catch de Exception)

### Lo que SonarQube NO detectó ❌

- ❌ **IDOR (Insecure Direct Object Reference):** Requiere entender lógica de negocio
- ❌ **Broken Access Control:** Necesita conocer qué usuarios pueden hacer qué
- ❌ **Business Logic Flaws:** Requiere contexto de la aplicación
- ❌ **Race Conditions:** Difíciles de detectar estáticamente

**💡 Conclusión:** SAST es excelente para vulnerabilidades técnicas conocidas, pero necesitas **code review manual** para lógica de negocio y contexto.

---

## Integración en CI/CD (Preview)

### Concepto: Quality Gates

SonarQube puede **bloquear** despliegues si el código no cumple estándares:

```yaml
# Ejemplo en Azure Pipelines
- task: SonarQubeAnalyze@5
- task: SonarQubePublish@5
  inputs:
    pollingTimeoutSec: '300'
- task: sonar-buildbreaker@8  # ❌ Falla el build si Quality Gate no pasa
```

### Configurar Quality Gate

1. En SonarQube, ir a: **Quality Gates** (menú superior)
2. Ver el Quality Gate por defecto: **"Sonar way"**
3. Condiciones típicas:
   - Coverage < 80% → ❌ Falla
   - Nuevas vulnerabilidades > 0 → ❌ Falla
   - Code Smells Rating peor que A → ❌ Falla

**En el Día 4** veremos cómo integrar esto en un pipeline completo de CI/CD.

---

## Preguntas Frecuentes

### ❓ ¿SonarQube reemplaza a los tests de seguridad?

**Respuesta:** No. SAST es **una capa más** de defensa. Necesitas:
- ✅ SAST (SonarQube) - Detecta vulnerabilidades en código
- ✅ DAST (OWASP ZAP) - Detecta vulnerabilidades en runtime
- ✅ SCA (Dependency-Check) - Detecta dependencias vulnerables
- ✅ Pentesting Manual - Lógica de negocio y contexto

### ❓ ¿Puedo usar SonarQube con otros lenguajes?

**Respuesta:** ¡Sí! SonarQube Community Edition soporta:
- C# / .NET
- Java
- JavaScript / TypeScript
- Python
- PHP
- Go
- Kotlin
- Ruby
- Y más...

### ❓ ¿Qué hago si SonarQube detecta falsos positivos?

**Respuesta:**
1. **Revisar manualmente** - Asegurarte de que realmente es falso positivo
2. **Mark as:** "Won't Fix" con justificación
3. **Configurar exclusiones** en SonarQube para ese tipo de issue

### ❓ ¿Puedo analizar código del cliente?

**Respuesta:** ¡Sí! Crea un nuevo proyecto en SonarQube con el nombre de tu aplicación y sigue los mismos pasos. **IMPORTANTE:** Revisa con tu manager antes de subir código propietario a SonarQube (aunque es local, las políticas de seguridad pueden variar).

---

## Mapeo a Estándares

### ISO 27002:2022
- **8.28** - Secure coding → SAST es una implementación directa
- **8.29** - Security testing in development and acceptance → Análisis automatizado
- **8.25** - Secure development life cycle → Integración en SDLC

### OWASP Top 10 2021
SonarQube puede detectar:
- **A03:2021** - Injection (SQL Injection, Command Injection)
- **A02:2021** - Cryptographic Failures (Weak algorithms)
- **A05:2021** - Security Misconfiguration (Hardcoded secrets)
- **A07:2021** - Identification and Authentication Failures (Insecure random)

### CWE/SANS Top 25
- **CWE-89:** SQL Injection
- **CWE-798:** Hardcoded Credentials
- **CWE-327:** Use of a Broken or Risky Cryptographic Algorithm
- **CWE-22:** Path Traversal
- **CWE-330:** Use of Insufficiently Random Values

---

## Recursos Adicionales

### Documentación Oficial
- SonarQube Docs: https://docs.sonarqube.org/latest/
- SonarQube Rules (C#): https://rules.sonarsource.com/csharp/
- .NET Scanner: https://docs.sonarqube.org/latest/analysis/scan/sonarscanner-for-msbuild/

### Tutoriales
- SonarQube in 5 Minutes: https://www.youtube.com/watch?v=vE39Fg8pvZg
- Integrating with Azure DevOps: https://docs.sonarqube.org/latest/analysis/azuredevops-integration/

### Alternativas
- **SonarCloud:** Versión cloud de SonarQube (gratuito para proyectos open source)
- **ESLint + plugins de seguridad:** Para JavaScript
- **Semgrep:** SAST open source multi-lenguaje
- **GitHub Code Scanning:** Powered by CodeQL (gratuito para repos públicos)

---

## ⏱️ Cronograma del Lab (75 min)

| Tiempo | Actividad | Modo |
|--------|-----------|------|
| 0-10 min | **Parte 1:** Verificar SonarQube e instalar scanner | 👤 Individual |
| 10-20 min | **Parte 2:** Crear proyecto y generar token | 👤 Individual |
| 20-25 min | **Parte 3:** Obtener proyecto vulnerable | 👤 Individual |
| 25-40 min | **Parte 4:** Ejecutar análisis inicial | 👤 Individual |
| 40-55 min | **Parte 5:** Analizar resultados y ejercicio práctico | 👤 Individual |
| 55-75 min | **Parte 6-7:** Corregir vulnerabilidades y re-analizar | 👤 Individual |

---

## Checklist Final

Antes de continuar al siguiente laboratorio, verifica:

- [ ] SonarQube muestra tu proyecto con análisis completo
- [ ] Identificaste y documentaste las 7 vulnerabilidades
- [ ] Corregiste todas las vulnerabilidades críticas (SQL Injection, Hardcoded Credentials)
- [ ] Re-ejecutaste el análisis y Quality Gate pasó a "Passed"
- [ ] Entiendes la diferencia entre Vulnerabilities, Security Hotspots, y Code Smells
- [ ] Sabes cómo acceder al dashboard de tu proyecto

**Si todo está ✅, estás listo para el Lab 2.4 - Dependency-Check!**

---

**¿Dudas o problemas?** Levanta la mano o consulta con el Facilitador 2.

**Próximo laboratorio:** OWASP Dependency-Check - análisis de dependencias vulnerables.
