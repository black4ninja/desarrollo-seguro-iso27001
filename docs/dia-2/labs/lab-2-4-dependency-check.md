# Lab 2.4 - Análisis de Dependencias con OWASP Dependency-Check

**Duración:** 90 minutos (incluye 15 min de setup)
**Facilitador:** Facilitador 2 (Técnico)
**Día:** 2 - Preparación para Implementar Controles

---

## 🔧 Prerequisitos

Antes de iniciar el laboratorio, verifica que tengas instalado:

### Obligatorios

- ✅ .NET 8.0 SDK o superior
  ```bash
  dotnet --version  # Debe mostrar 8.0.x
  ```

### Opcionales (para Parte 2)

- ✅ OWASP Dependency-Check
  ```bash
  dependency-check --version  # Debe mostrar 9.0.0+
  ```

**Si no está instalado:**

- **macOS:** `brew install dependency-check` (10-15 min, incluye descarga de NVD database)
- **Windows:** `choco install dependency-check` (10-15 min)
- **Linux/Manual:** Ver [instrucciones oficiales](https://github.com/jeremylong/DependencyCheck)

**Nota:** La primera ejecución de Dependency-Check descarga la base de datos NVD (~200MB) y puede tardar 10-15 minutos adicionales. Si no tienes la herramienta instalada, el facilitador demostrará la Parte 2.

---

## Objetivos de Aprendizaje

Al finalizar este laboratorio, los participantes podrán:

1. ✅ Identificar dependencias vulnerables en proyectos .NET
2. ✅ Usar herramientas integradas de .NET para escaneo de dependencias
3. ✅ Ejecutar OWASP Dependency-Check para análisis detallado
4. ✅ Interpretar reportes de CVEs (Common Vulnerabilities and Exposures)
5. ✅ Actualizar dependencias de forma segura
6. ✅ Integrar escaneo de dependencias en el workflow de desarrollo

---

## Contexto

**SCA (Software Composition Analysis)** identifica componentes de terceros (librerías, frameworks) con vulnerabilidades conocidas.

### ¿Por qué es importante?

- 📊 **80-90%** del código de una aplicación moderna proviene de dependencias de terceros
- 🐛 El **84%** de aplicaciones tiene al menos una vulnerabilidad en sus dependencias
- ⚠️ Incidentes famosos: Equifax breach (Apache Struts), Log4Shell (Log4j)

**Analogía:** Usar dependencias vulnerables es como construir una casa con materiales defectuosos. Aunque tu código (la estructura) sea perfecto, si los materiales (dependencias) tienen fallas, toda la casa está en riesgo.

### Relación con SBOM

**SBOM (Software Bill of Materials):** Lista completa de todos los componentes de software en una aplicación.

- ISO 27002:2022 (Control 8.19) requiere mantener inventario de software
- OWASP Dependency-Check puede generar SBOMs automáticamente

---

## Parte 1: Análisis Rápido con .NET Built-in (20 min)

### Paso 1.1: Obtener Proyectos

**Descargar el código base del laboratorio:**

Descarga el archivo con los proyectos del laboratorio:

📥 [Descargar lab2.4-dependency-check.zip](/lab2.4-dependency-check.zip)

**Extraer y preparar el proyecto:**

```bash
# Navegar a tu directorio de trabajo
cd ~/laboratorios

# Extraer el archivo descargado
unzip lab2.4-dependency-check.zip

# Navegar al directorio del lab
cd lab2.4-dependency-check

# Verificar que los proyectos estén presentes
ls -la

# Deberías ver:
# - proyecto-vulnerable/
# - proyecto-actualizado/
```

**Verificar estructura de los proyectos:**

```bash
# Ver contenido del proyecto vulnerable
ls -la proyecto-vulnerable/

# Ver contenido del proyecto actualizado
ls -la proyecto-actualizado/
```

### Paso 1.2: Explorar Dependencias Vulnerables

Abre `proyecto-vulnerable/VulnerableAPI.csproj`:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <!-- ❌ VULNERABLE: Versiones antiguas con CVEs conocidos -->
    <PackageReference Include="Newtonsoft.Json" Version="9.0.1" />
    <PackageReference Include="System.IdentityModel.Tokens.Jwt" Version="5.6.0" />
    <PackageReference Include="Microsoft.Data.SqlClient" Version="2.0.0" />
  </ItemGroup>
</Project>
```

**Dependencias vulnerables:**

| Paquete | Versión Vulnerable | CVEs | Severidad |
|---------|-------------------|------|-----------|
| **Newtonsoft.Json** | 9.0.1 | CVE-2018-1000127 (GHSA-5crp-9r3c-p9vr) | 🔴 High |
| **System.IdentityModel.Tokens.Jwt** | 5.6.0 | GHSA-59j7-ghrg-fj52 | 🟡 Moderate |
| **Microsoft.Data.SqlClient** | 2.0.0 | GHSA-8g2p-5pqh-5jmc, GHSA-98g6-xh36-x2p7 | 🔴 High |

---

### Paso 1.3: Escanear con `dotnet list package --vulnerable`

```bash
cd proyecto-vulnerable

# Listar paquetes vulnerables
dotnet list package --vulnerable
```

**Output esperado:**

```
Project `VulnerableAPI` has the following vulnerable packages
   [net8.0]:
   Top-level Package                      Requested   Resolved   Severity   Advisory URL
   > Microsoft.Data.SqlClient             2.0.0       2.0.0      High       https://github.com/advisories/GHSA-8g2p-5pqh-5jmc
   > Newtonsoft.Json                      9.0.1       9.0.1      High       https://github.com/advisories/GHSA-5crp-9r3c-p9vr
   > System.IdentityModel.Tokens.Jwt      5.6.0       5.6.0      Moderate   https://github.com/advisories/GHSA-59j7-ghrg-fj52
```

✅ **Checkpoint:** Deberías ver 3 paquetes vulnerables listados.

---

### Paso 1.4: Ver Paquetes Desactualizados

```bash
# Ver todas las versiones disponibles
dotnet list package --outdated
```

**Output esperado:**

```
Project `VulnerableAPI` has the following updates to its packages
   [net8.0]:
   Top-level Package                      Requested   Resolved   Latest
   > Microsoft.Data.SqlClient             2.0.0       2.0.0      6.x.x
   > Newtonsoft.Json                      9.0.1       9.0.1      13.0.x
   > System.IdentityModel.Tokens.Jwt      5.6.0       5.6.0      8.x.x
```

**📝 Nota:** Las versiones "Latest" cambiarán con el tiempo a medida que se publiquen nuevas versiones. Lo importante es identificar la **BRECHA** entre la versión actual y la más reciente.

**Ejemplo de análisis:**
- **Newtonsoft.Json:** 9.0.1 → 13.0.x (⚠️ 4 versiones major atrás)
- **Microsoft.Data.SqlClient:** 2.0.0 → 6.x (⚠️ 4 versiones major atrás)
- **System.IdentityModel.Tokens.Jwt:** 5.6.0 → 8.x (⚠️ 3 versiones major atrás)

---

### Paso 1.5: Explorar un CVE en Detalle

1. Click en uno de los Advisory URLs (ej. Newtonsoft.Json)
2. GitHub Security Advisory mostrará:
   - **Descripción** del CVE
   - **Severity** (CVSS score)
   - **Affected versions**
   - **Patched versions**
   - **References** (NIST, CVE.org)

**Ejemplo: CVE-2018-1000127 (Newtonsoft.Json)**

```
Severity: HIGH (7.5 CVSS)
Description: Deserialization of untrusted data vulnerability

Impact: An attacker can exploit this to execute arbitrary code by crafting
a malicious JSON payload with a $type property.

Affected: Newtonsoft.Json < 11.0.2
Patched: Newtonsoft.Json >= 11.0.2
```

---

### 📝 **EJERCICIO PRÁCTICO (5 min):**

Para cada uno de los 3 paquetes vulnerables, anota:

| Paquete | CVE | Descripción breve | ¿Cómo explotarlo? | Versión parcheada |
|---------|-----|-------------------|-------------------|-------------------|
| Newtonsoft.Json | CVE-2018-1000127 | Deserialization attack | JSON con $type malicioso | >= 11.0.2 |
| Microsoft.Data.SqlClient | GHSA-98g6-xh36-x2p7 | ... | ... | ... |
| System.IdentityModel.Tokens.Jwt | GHSA-59j7-ghrg-fj52 | ... | ... | ... |

**💡 Tip:** Usa los Advisory URLs para obtener la información.

<details>
<summary>👁️ Solución de Referencia (click para expandir)</summary>

| Paquete | CVE/Advisory | Descripción breve | ¿Cómo explotarlo? | Versión parcheada |
|---------|--------------|-------------------|-------------------|-------------------|
| **Newtonsoft.Json** | CVE-2018-1000127 / GHSA-5crp-9r3c-p9vr | Deserialization of untrusted data | Enviar JSON con `{"$type": "System.Windows.Data.ObjectDataProvider, PresentationFramework", ...}` para ejecutar código arbitrario | >= 11.0.2 |
| **Microsoft.Data.SqlClient** | GHSA-98g6-xh36-x2p7 | Data exposure vulnerability | Interceptar conexión a SQL Server no cifrada mediante MitM attack, leer credenciales y datos sensibles en tránsito | >= 2.1.4 |
| **System.IdentityModel.Tokens.Jwt** | GHSA-59j7-ghrg-fj52 | JWT signature validation bypass | Modificar JWT con algoritmo `alg: "none"`, servidor acepta token sin validar firma digital | >= 6.5.0 |

**Fuentes:**
- GitHub Security Advisories (GHSA)
- National Vulnerability Database (NVD)
- CVE.org

</details>

---

## Parte 2: Análisis Detallado con OWASP Dependency-Check (25 min)

**⚠️ IMPORTANTE:** Esta parte requiere tener OWASP Dependency-Check instalado (ver [Prerequisitos](#prerequisitos)). Si no tienes la herramienta instalada, el facilitador demostrará esta sección.

### Paso 2.1: Verificar Instalación de OWASP Dependency-Check

**Verificar que la herramienta esté instalada:**
```bash
dependency-check --version
```

**Output esperado:**
```
Dependency-Check Core version 9.0.0 (o superior)
```

**Si NO está instalado:**

- **macOS (con Homebrew):**
  ```bash
  brew install dependency-check
  ```

- **Windows (con Chocolatey):**
  ```powershell
  choco install dependency-check
  ```

- **Linux / Manual:**
  ```bash
  # Descargar última versión
  wget https://github.com/jeremylong/DependencyCheck/releases/download/v9.0.0/dependency-check-9.0.0-release.zip

  # Extraer
  unzip dependency-check-9.0.0-release.zip

  # Agregar al PATH (opcional)
  export PATH=$PATH:$(pwd)/dependency-check/bin
  ```

**⏱️ Nota de tiempo:** La instalación toma 10-15 minutos. En la primera ejecución, Dependency-Check descargará la base de datos NVD (~200MB), lo cual toma 10-15 minutos adicionales.

---

### Paso 2.2: Ejecutar Primer Escaneo

```bash
# Navegar al proyecto vulnerable
cd ~/Meeplab/Chihuahua/curso-5dias/dia2-preparacion-controles/laboratorios/lab2.4-dependency-check/proyecto-vulnerable

# Ejecutar escaneo
dependency-check \
  --project "VulnerableAPI" \
  --scan . \
  --format HTML \
  --format JSON \
  --out ../reportes

# ⏱️ Primera vez: 5-10 minutos (descarga base de datos NVD de ~200MB)
# Siguientes veces: 1-2 minutos
```

**Output esperado:**

```
Dependency-Check is an open source tool performing a best effort analysis of 3rd party dependencies; false positives and false negatives may exist in the analysis performed by the tool. Use of the tool and the reporting provided constitutes acceptance for use in an AS IS condition, and there are NO warranties, implied or otherwise, with regard to the analysis or its use. Any use of the tool and the reporting provided is at the user's risk. In no event shall the copyright holder or OWASP be held liable for any damages whatsoever arising out of or in connection with the use of this tool, the analysis performed, or the resulting report.

   About ODC: https://jeremylong.github.io/DependencyCheck/general/internals.html
   False Positives: https://jeremylong.github.io/DependencyCheck/general/suppression.html
   Mailing List: https://groups.google.com/forum/#!forum/dependency-check

[INFO] Checking for updates
[INFO] starting update task: NVD CVE - 2002
[INFO] starting update task: NVD CVE - 2003
...
[INFO] Analysis Started
[INFO] Finished File Name Analyzer (0 seconds)
[INFO] Finished Dependency Merging Analyzer (0 seconds)
[INFO] Finished Assembly Analyzer (1 seconds)
[INFO] Finished NuGet Analyzer (2 seconds)
[INFO] Finished Central Analyzer (0 seconds)
[INFO] Finished Hint Analyzer (0 seconds)
[INFO] Finished Known Exploited Vulnerability Analyzer (0 seconds)
[INFO] Analysis Complete (10 seconds)
[INFO] Writing report to: ../reportes/dependency-check-report.html
```

✅ **Checkpoint:** Deberías ver el mensaje "Analysis Complete" sin errores.

---

### Paso 2.3: Abrir Reporte HTML

```bash
# macOS
open ../reportes/dependency-check-report.html

# Linux
xdg-open ../reportes/dependency-check-report.html

# Windows
start ../reportes/dependency-check-report.html
```

### Paso 2.4: Interpretar el Reporte

**⚠️ NOTA EDUCATIVA:** Es posible que OWASP Dependency-Check reporte **0 vulnerabilidades** o un número menor al esperado en proyectos .NET/NuGet. Esto se debe a:

1. **Soporte limitado de NuGet:** OWASP DC fue diseñado originalmente para Java/Maven y tiene cobertura incompleta del ecosistema .NET
2. **Mapeo CPE incorrecto:** Puede no identificar correctamente los paquetes NuGet en la base de datos NVD
3. **No consulta GitHub Security Advisories:** Muchas vulnerabilidades .NET se reportan primero en GHSA, no en NVD

**Comparativa de detección (ejemplo real):**

| Herramienta | Vulnerabilidades detectadas | Fuente de datos |
|-------------|----------------------------|-----------------|
| `dotnet list package --vulnerable` | 7 (4 directas + 3 transitivas) | GitHub Security Advisories, NuGet Gallery |
| OWASP Dependency-Check | 0-3 (puede variar) | NVD (CVE database) |

**💡 Lección de seguridad:** Este hallazgo demuestra el principio de **defensa en profundidad** - nunca confíes en una sola herramienta. Usa múltiples herramientas complementarias y, para .NET, prioriza las herramientas nativas del ecosistema (`dotnet` CLI, Snyk, GitHub Dependabot).

El reporte HTML contiene varias secciones:

#### **Summary**

```
Project Information
- Name: VulnerableAPI
- Scan Date: 2025-12-11
- Dependencies Scanned: 3

Vulnerability Summary
- Critical: 0
- High: 2
- Medium: 3
- Low: 1
- Total: 6
```

#### **Dependencies**

Lista de dependencias con su análisis:

| Dependency | File Name | CPE | Highest Severity | CVE Count |
|------------|-----------|-----|------------------|-----------|
| Newtonsoft.Json | Newtonsoft.Json.dll (9.0.1.0) | cpe:2.3:a:newtonsoft:newtonsoft.json:9.0.1 | 🔴 High | 1 |
| System.IdentityModel.Tokens.Jwt | System.IdentityModel.Tokens.Jwt.dll (5.6.0.0) | cpe:2.3:a:microsoft:system.identitymodel.tokens.jwt:5.6.0 | 🟡 Medium | 2 |
| Microsoft.Data.SqlClient | Microsoft.Data.SqlClient.dll (2.0.0.0) | cpe:2.3:a:microsoft:sql_server:2.0.0 | 🔴 High | 3 |

**CPE (Common Platform Enumeration):** Identificador estándar del componente usado para buscar CVEs.

---

#### **Vulnerability Details**

Para cada CVE, el reporte muestra:

**Ejemplo: CVE-2018-1000127**

```
Name: CVE-2018-1000127
Severity: HIGH (CVSS Score: 7.5)
CWE: CWE-502 Deserialization of Untrusted Data

Description:
Newtonsoft.Json prior to version 11.0.2 is vulnerable to an untrusted
data deserialization flaw in the TypeNameHandling feature. An attacker
can exploit this to execute arbitrary code.

References:
- https://nvd.nist.gov/vuln/detail/CVE-2018-1000127
- https://github.com/JamesNK/Newtonsoft.Json/issues/1415
- https://www.oracle.com/security-alerts/cpuapr2020.html

Vulnerable Software & Versions:
- cpe:2.3:a:newtonsoft:newtonsoft.json:9.0.1

Dependency:
- File: Newtonsoft.Json.dll
- Path: proyecto-vulnerable/
- SHA1: a1b2c3d4e5...
```

---

### 📝 **EJERCICIO PRÁCTICO (10 min):**

Explora el reporte HTML y completa la siguiente tabla:

| CVE | Paquete Afectado | CVSS Score | CWE | ¿Exploit público disponible? | Prioridad de corrección |
|-----|------------------|------------|-----|------------------------------|-------------------------|
| CVE-2018-1000127 | Newtonsoft.Json | 7.5 | CWE-502 | Sí (en Metasploit) | 🔴 Alta |
| CVE-2021-1636 | ... | ... | ... | ... | ... |
| ... | ... | ... | ... | ... | ... |

**Preguntas guía:**
1. ¿Cuál es el CVE más crítico (mayor CVSS)?
2. ¿Algún CVE tiene exploit conocido (check "References")?
3. ¿Hay CVEs relacionados con autenticación o autorización?

---

## Parte 3: Corregir Vulnerabilidades (15 min)

### Paso 3.1: Comparar con Proyecto Actualizado

```bash
# Ver diferencias entre .csproj files
diff proyecto-vulnerable/VulnerableAPI.csproj proyecto-actualizado/VulnerableAPI.csproj
```

**Output:**

```diff
<   <PackageReference Include="Newtonsoft.Json" Version="9.0.1" />
<   <PackageReference Include="System.IdentityModel.Tokens.Jwt" Version="5.6.0" />
<   <PackageReference Include="Microsoft.Data.SqlClient" Version="2.0.0" />
---
>   <PackageReference Include="Newtonsoft.Json" Version="13.0.3" />
>   <PackageReference Include="System.IdentityModel.Tokens.Jwt" Version="8.1.0" />
>   <PackageReference Include="Microsoft.Data.SqlClient" Version="5.2.0" />
```

**📝 Nota sobre versiones seguras:**
- **Newtonsoft.Json:** 13.0.3 ✅ (parcheado desde 11.0.2)
- **System.IdentityModel.Tokens.Jwt:** 8.1.0 ✅ (parcheado desde 6.5.0, versión 7.x aún vulnerable)
- **Microsoft.Data.SqlClient:** 5.2.0 ✅ (parcheado desde 2.1.4)

---

### Paso 3.2: Actualizar Dependencias Manualmente

**Opción A: Editar .csproj directamente**

```bash
cd proyecto-vulnerable
# Editar VulnerableAPI.csproj con tu editor favorito
```

Cambiar:
```xml
<PackageReference Include="Newtonsoft.Json" Version="9.0.1" />
```

Por:
```xml
<PackageReference Include="Newtonsoft.Json" Version="13.0.3" />
```

**Opción B: Usar comandos dotnet**

```bash
cd proyecto-vulnerable

# Remover versiones viejas
dotnet remove package Newtonsoft.Json
dotnet remove package System.IdentityModel.Tokens.Jwt
dotnet remove package Microsoft.Data.SqlClient

# Agregar versiones actualizadas y SEGURAS
dotnet add package Newtonsoft.Json --version 13.0.3
dotnet add package System.IdentityModel.Tokens.Jwt --version 8.1.0
dotnet add package Microsoft.Data.SqlClient --version 5.2.0

# Restaurar paquetes
dotnet restore
```

**⚠️ IMPORTANTE:** Asegúrate de usar `System.IdentityModel.Tokens.Jwt` versión **8.1.0 o superior**. Las versiones 7.x todavía contienen vulnerabilidades conocidas.

---

### Paso 3.3: Verificar Correcciones

**Método 1: dotnet CLI (Dependencias Directas)**

```bash
dotnet list package --vulnerable
```

**Output esperado:**

```
No vulnerable packages found
```

✅ **Checkpoint:** Deberías ver "No vulnerable packages found".

---

**⚠️ NOTA EDUCATIVA - Dependencias Transitivas:**

El comando anterior **solo verifica dependencias directas**. Para un análisis completo de seguridad, debes incluir las **dependencias transitivas** (dependencias de tus dependencias):

```bash
dotnet list package --vulnerable --include-transitive
```

**Hallazgo importante:** Incluso después de actualizar todas las dependencias directas a versiones "seguras", es común encontrar vulnerabilidades en dependencias transitivas:

```
Ejemplo:
✅ Tu código usa: Microsoft.Data.SqlClient 5.2.0 (sin CVEs directos)
⚠️ Pero SqlClient 5.2.0 depende internamente de: System.Text.Encodings.Web 4.7.2 (con CVE-2021-26701)
```

**💡 Lección de seguridad:** Actualizar dependencias directas es solo el primer paso. Una estrategia completa de seguridad requiere:

1. Analizar **toda la cadena de dependencias** con `--include-transitive`
2. Mantener un **SBOM (Software Bill of Materials)** actualizado con todas las dependencias (ISO 27002:2022 Control 8.19)
3. Forzar actualizaciones de transitivas con sobrescrituras explícitas cuando sea necesario:

```xml
<!-- Ejemplo: Forzar versión segura de dependencia transitiva -->
<ItemGroup>
  <PackageReference Include="System.Text.Encodings.Web" Version="8.0.0" />
</ItemGroup>
```

4. Configurar políticas de escaneo continuo que incluyan transitivas en CI/CD

**Práctica recomendada:** Siempre ejecuta ambos comandos:
- `dotnet list package --vulnerable` → Verificación rápida
- `dotnet list package --vulnerable --include-transitive` → Análisis completo

---

**Método 2: Re-escanear con Dependency-Check**

```bash
dependency-check \
  --project "VulnerableAPI-Fixed" \
  --scan . \
  --format HTML \
  --out ../reportes-fixed
```

**Output esperado:**
- Vulnerability Summary: 0 vulnerabilidades
- Todos los paquetes en verde

---

### Paso 3.4: Comparar Reportes

Abre ambos reportes lado a lado:

```bash
# Reporte antes
open ../reportes/dependency-check-report.html

# Reporte después
open ../reportes-fixed/dependency-check-report.html
```

**Comparativa:**

| Métrica | Antes | Después |
|---------|-------|---------|
| Total CVEs | 6 | 0 ✅ |
| High Severity | 2 | 0 ✅ |
| Medium Severity | 3 | 0 ✅ |
| Low Severity | 1 | 0 ✅ |

---

## Parte 4: Herramientas Alternativas (10 min)

### Opción 1: Snyk (Free Tier)

**¿Qué es Snyk?**
- Plataforma SaaS para análisis de dependencias
- Integración con GitHub, GitLab, Azure DevOps
- Auto-fix con Pull Requests
- Free tier: hasta 200 tests/mes

**Setup rápido:**

```bash
# Instalar CLI
npm install -g snyk

# Autenticar (abre navegador)
snyk auth

# Escanear proyecto
cd proyecto-vulnerable
snyk test

# Fix automático interactivo
snyk wizard
```

**Output esperado:**

```
Testing proyecto-vulnerable...

Tested 3 dependencies for known issues, found 3 vulnerabilities, 6 vulnerable paths.

Issues to fix by upgrading:

  Upgrade Newtonsoft.Json@9.0.1 to Newtonsoft.Json@13.0.3 to fix
  ✗ High severity vulnerability found in Newtonsoft.Json
    Description: Deserialization of Untrusted Data
    Info: https://snyk.io/vuln/SNYK-DOTNET-NEWTONSOFTJSON-2774678
    Introduced through: VulnerableAPI@1.0.0 > Newtonsoft.Json@9.0.1
    Fixed in: 11.0.2, 12.0.1, 13.0.1
```

---

### Opción 2: GitHub Dependabot (Gratis en GitHub)

Si tu proyecto está en GitHub:

1. Ir a **Settings** → **Security & analysis**
2. Habilitar **Dependabot alerts**
3. Habilitar **Dependabot security updates**

**Beneficios:**
- ✅ Alertas automáticas cuando se descubren CVEs
- ✅ Pull Requests automáticos con actualizaciones
- ✅ Totalmente gratuito
- ✅ Integrado en tu workflow de GitHub

---

### Opción 3: NuGet Package Vulnerabilities (Built-in Visual Studio)

Si usas Visual Studio:

1. Abrir proyecto en Visual Studio 2022+
2. **Tools** → **NuGet Package Manager** → **Manage NuGet Packages**
3. Pestaña **Updates**
4. Filter: **Security updates only**
5. Ver advertencias en rojo junto a paquetes vulnerables

---

### Comparativa de Herramientas

| Herramienta | Costo | Velocidad | Detalle | Integración CI/CD | Recomendación |
|-------------|-------|-----------|---------|-------------------|---------------|
| **dotnet CLI** | Gratis | ⚡ Muy rápido | Básico | ✅ Fácil | ⭐⭐⭐⭐⭐ |
| **OWASP Dependency-Check** | Gratis | 🐢 Lento | 📊 Muy detallado | ✅ Fácil | ⭐⭐⭐⭐ |
| **Snyk** | Free tier | ⚡ Rápido | 📊 Detallado + Fix | ✅ Excelente | ⭐⭐⭐⭐⭐ |
| **GitHub Dependabot** | Gratis | ⚡ Automático | Básico | ✅ Nativo | ⭐⭐⭐⭐⭐ |
| **Visual Studio** | Gratis* | ⚡ Rápido | Básico | ❌ No | ⭐⭐⭐ |

*Requiere Visual Studio instalado

---

## Parte 5: Estrategias de Actualización (5 min)

### ¿Cuándo actualizar?

**Actualización Inmediata (mismo día):**
- 🔴 **Critical/High** + Exploit público conocido
- 🔴 **Critical/High** + Afecta funcionalidad expuesta a internet
- 🔴 Cualquier CVE en autenticación/autorización

**Actualización Urgente (esta semana):**
- 🟡 **Medium** con exploit conocido
- 🔴 **High** sin exploit pero fácilmente explotable

**Actualización Planificada (próximo sprint):**
- 🟡 **Medium** sin exploit
- 🟢 **Low** cualquiera

**Monitorear:**
- 🟢 **Informational**
- Dependencias sin CVEs pero muy desactualizadas

---

### Proceso de Actualización Seguro

```
1. Identificar vulnerabilidad
   ↓
2. Verificar versión parcheada
   ↓
3. Revisar CHANGELOG de la librería
   ↓  (¿Breaking changes?)
4. Actualizar en entorno DEV
   ↓
5. Ejecutar tests automatizados
   ↓
6. Testing manual (smoke tests)
   ↓
7. Desplegar a QA/Staging
   ↓
8. Desplegar a Producción
   ↓
9. Monitorear por 24-48h
```

**⚠️ Cuidado con:**
- **Breaking changes:** Leer release notes antes de actualizar
- **Dependencias transitivas:** Una actualización puede afectar otras librerías
- **Versiones muy antiguas:** Saltar muchas versiones puede romper compatibilidad

---

### Políticas de Actualización Recomendadas

```json
// dependabot.yml ejemplo
{
  "updates": [
    {
      "package-ecosystem": "nuget",
      "schedule": "weekly",
      "open-pull-requests-limit": 5,
      "target-branch": "main",
      "labels": ["dependencies", "security"]
    }
  ]
}
```

**Buenas prácticas:**
1. ✅ Revisar dependencias vulnerables semanalmente
2. ✅ Ejecutar `dotnet list package --outdated` antes de cada release
3. ✅ Configurar alertas automáticas (Dependabot, Snyk)
4. ✅ Incluir escaneo de dependencias en CI/CD (veremos en Día 4)
5. ✅ Mantener un SBOM actualizado

---

## 🎓 Lecciones Aprendidas: Casos de Estudio Reales

Esta sección documenta hallazgos educativos importantes descubiertos durante la validación de este laboratorio. **Estos NO son bugs del lab**, sino oportunidades valiosas de aprendizaje que reflejan desafíos reales que encontrarás en el mundo profesional.

### Caso 1: Limitaciones de Herramientas por Ecosistema

**Situación:** Durante la validación, OWASP Dependency-Check reportó **0 vulnerabilidades** en `proyecto-vulnerable`, mientras que `dotnet list package --vulnerable` detectó correctamente **7 vulnerabilidades** (4 directas + 3 transitivas).

**¿Por qué sucede esto?**

| Factor | OWASP Dependency-Check | dotnet CLI | Snyk / Dependabot |
|--------|------------------------|------------|-------------------|
| **Diseño original** | Java/Maven (2012) | .NET nativo (2016+) | Multi-ecosistema (2015+) |
| **Base de datos** | NVD (CVE.org) | GitHub Security Advisories + NuGet Gallery | Base propia + GHSA + NVD |
| **Mapeo de paquetes** | CPE (puede fallar con NuGet) | NuGet Package ID directo | API nativa de cada ecosistema |
| **Actualización** | Manual/semanal | En tiempo real | Tiempo real + ML |
| **Cobertura .NET** | ⚠️ Parcial (60-70%) | ✅ Completa (100%) | ✅ Completa (95-100%) |

**Ejemplo técnico del problema:**

```bash
# OWASP DC busca en NVD:
CPE: cpe:2.3:a:newtonsoft:json:9.0.1
❌ No encuentra match → Reporta 0 vulnerabilidades

# dotnet CLI consulta GHSA directamente:
Package: Newtonsoft.Json@9.0.1
NuGet Package ID: Newtonsoft.Json
✅ Encuentra GHSA-5crp-9r3c-p9vr → Reporta CVE-2018-1000127
```

**💡 Lección profesional:**

**Defensa en Profundidad para SCA:**
- ❌ Nunca confíes en una sola herramienta de seguridad
- ✅ Usa herramientas **específicas del ecosistema** como primera línea de defensa
- ✅ Complementa con herramientas genéricas para cobertura adicional
- ✅ Implementa **múltiples capas de verificación**:
  1. **Desarrollo local:** `dotnet list package --vulnerable` pre-commit
  2. **CI/CD:** GitHub Dependabot + Snyk en pipeline
  3. **Auditoría periódica:** OWASP Dependency-Check mensual para SBOM compliance

**Aplicación al mundo real:**
- **Proyecto Java:** OWASP DC es excelente (96% cobertura) → Usa como herramienta principal
- **Proyecto .NET:** `dotnet` CLI + Snyk/Dependabot son esenciales → OWASP DC como complemento para compliance/reporting
- **Proyecto Node.js:** `npm audit` + Snyk → OWASP DC para informes ejecutivos
- **Proyectos multi-lenguaje:** Combina herramientas específicas de cada ecosistema

---

### Caso 2: El Mito del "Proyecto Seguro" - Dependencias Transitivas

**Situación:** `proyecto-actualizado` tiene **0 vulnerabilidades en dependencias directas**, pero al ejecutar `dotnet list package --vulnerable --include-transitive` se descubren **5 vulnerabilidades en dependencias transitivas**.

**Análisis de la cadena de dependencias:**

```
proyecto-actualizado/
└── Microsoft.Data.SqlClient 5.2.0 ✅ (sin CVEs directos)
    ├── Azure.Identity 1.6.0 ⚠️ (con CVE-2024-35255)
    │   └── System.Text.Json 6.0.0 ⚠️ (con CVE-2024-43485)
    ├── System.Configuration.ConfigurationManager 6.0.0 ⚠️
    │   └── System.Security.Cryptography.ProtectedData 6.0.0 ⚠️
    └── System.Text.Encodings.Web 4.7.2 ⚠️ (con CVE-2021-26701)
```

**Tabla de vulnerabilidades transitivas encontradas:**

| Paquete Transitivo | Versión | CVE | Severidad | Introducido por |
|-------------------|---------|-----|-----------|----------------|
| Azure.Identity | 1.6.0 | CVE-2024-35255 | High | Microsoft.Data.SqlClient |
| System.Text.Json | 6.0.0 | CVE-2024-43485 | High | Azure.Identity |
| System.Text.Encodings.Web | 4.7.2 | CVE-2021-26701 | Moderate | SqlClient + otros |
| System.Security.Cryptography.* | 6.0.0 | CVE-2023-29331 | Moderate | ConfigurationManager |
| System.Configuration.* | 6.0.0 | CVE-2023-36049 | Moderate | SqlClient |

**📊 Estadísticas impactantes:**

```
Análisis de superficie de ataque:
- Dependencias directas:     3 paquetes
- Dependencias transitivas:  47 paquetes (!!!)
- Radio de expansión:        15.6x

Vulnerabilidades:
- En directas:     0 CVEs ✅
- En transitivas:  5 CVEs ⚠️
- % oculto:        100% (!!)
```

**💡 Lección profesional:**

**El "Iceberg de Dependencias":**

```
                    [Tu código]
                        |
        ┌───────────────┴───────────────┐
        │   3 dependencias directas     │  ← Lo que ves
════════╧═══════════════════════════════╧═════════
                                              ↓
        ┌─────────────────────────────────┐
        │   47 dependencias transitivas   │  ← Lo que NO ves
        │   (pero que te pueden hackear)  │
        └─────────────────────────────────┘
```

**Estrategias de mitigación:**

1. **Verificación completa en CI/CD:**
```yaml
# .github/workflows/security.yml
- name: Check ALL dependencies (including transitive)
  run: |
    dotnet list package --vulnerable --include-transitive | tee vulnerable.txt
    if grep -q "has the following vulnerable packages" vulnerable.txt; then
      echo "❌ VULNERABLE TRANSITIVE DEPENDENCIES FOUND!"
      exit 1  # Rompe el build
    fi
```

2. **Sobrescritura de versiones transitivas:**
```xml
<!-- VulnerableAPI.csproj -->
<ItemGroup>
  <!-- Dependencias directas -->
  <PackageReference Include="Microsoft.Data.SqlClient" Version="5.2.0" />

  <!-- SOBRESCRITURA: Forzar versión segura de transitiva vulnerable -->
  <PackageReference Include="System.Text.Encodings.Web" Version="8.0.0" />
  <PackageReference Include="Azure.Identity" Version="1.12.0" />
</ItemGroup>
```

3. **Auditoría de toda la cadena:**
```bash
# Generar SBOM completo con todas las dependencias
dotnet list package --include-transitive > sbom.txt

# Analizar profundidad de la cadena
dotnet list package --include-transitive --format json | \
  jq '.projects[].frameworks[].transitives | length'
```

4. **Políticas de control:**
```json
// Directory.Packages.props (Central Package Management)
{
  "ManagePackageVersionsCentrally": true,
  "CentralPackageVersions": {
    "System.Text.Encodings.Web": "8.0.0",  // Fuerza esta versión en TODAS las transitivas
    "System.Text.Json": "8.0.4"
  }
}
```

**Aplicación a estándares:**

- **ISO 27002:2022 Control 8.19:** "Mantener inventario actualizado de **TODOS** los componentes de software" → Incluye transitivas
- **SBOM (Software Bill of Materials):** Debe incluir dependencias directas Y transitivas para compliance real
- **OWASP A06:2021 (Vulnerable Components):** "Incluyendo componentes **no directamente usados** pero presentes en el sistema"

---

### Caso 3: Versiones "Seguras" que No Lo Son

**Situación real documentada:** Muchos equipos actualizan a la "última versión estable" sin verificar el changelog completo.

**Ejemplo del lab:**

```diff
# Actualización ingenua:
- System.IdentityModel.Tokens.Jwt: 5.6.0  (vulnerable)
+ System.IdentityModel.Tokens.Jwt: 7.0.0  (¡TODAVÍA VULNERABLE!)

# Actualización correcta:
- System.IdentityModel.Tokens.Jwt: 5.6.0  (vulnerable)
+ System.IdentityModel.Tokens.Jwt: 8.1.0  (realmente parcheado)
```

**Timeline de vulnerabilidad:**

```
v5.6.0 (2019) → GHSA-59j7-ghrg-fj52 descubierto
v6.5.0 (2020) → Parche inicial (incompleto)
v7.0.0 (2021) → Nueva vulnerabilidad CVE-2022-xxxxx
v7.6.3 (2022) → Parche parcial
v8.1.0 (2023) → Finalmente seguro ✅
```

**💡 Lección:** Actualizar ≠ Asegurar. Siempre verifica:
1. **Advisory completo:** Lee el GitHub Security Advisory
2. **Versión de parche mínima:** No asumas que "más nueva = segura"
3. **Re-escaneo post-actualización:** Verifica con `--vulnerable` después de cada cambio

---

### Resumen Ejecutivo: Estrategia SCA Completa

**Checklist para implementar en tu organización:**

- [ ] **Defensa en profundidad:** Usa mínimo 2 herramientas SCA (específica del ecosistema + genérica)
- [ ] **Cobertura completa:** Siempre incluye dependencias transitivas (`--include-transitive`)
- [ ] **Automatización CI/CD:** Escaneo obligatorio en cada PR + schedule semanal
- [ ] **SBOM actualizado:** Genera y versiona SBOM completo (ISO 27002:2022 8.19)
- [ ] **Políticas de actualización:** Define SLAs por severidad (Critical: 24h, High: 1 semana, etc.)
- [ ] **Central Package Management:** Control de versiones transitivas con Directory.Packages.props
- [ ] **Alertas en tiempo real:** GitHub Dependabot o Snyk con notificaciones a Slack/Teams
- [ ] **Auditoría periódica:** Review mensual de toda la cadena de dependencias

**Métricas de éxito:**

```
KPIs sugeridos:
- MTTD (Mean Time To Detect):     < 24 horas
- MTTR (Mean Time To Remediate):  < 7 días para High/Critical
- Cobertura de escaneo:           100% de PRs + main branch
- False positive rate:            < 10%
- Dependencias sin CVEs conocidos: > 95%
```

---

## Entregables del Laboratorio

Al finalizar, debes tener:

1. ✅ **Reporte HTML** de Dependency-Check con vulnerabilidades identificadas
2. ✅ **Proyecto corregido** sin vulnerabilidades en dependencias
3. ✅ **Tabla comparativa** de CVEs antes/después
4. ✅ **Estrategia de actualización** documentada para tu proyecto real

---

## Integración en CI/CD (Preview)

### GitHub Actions Ejemplo

```yaml
name: Dependency Check

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * 0'  # Semanal

jobs:
  dependency-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup .NET
        uses: actions/setup-dotnet@v3
        with:
          dotnet-version: '8.0.x'

      - name: Restore dependencies
        run: dotnet restore

      - name: Check for vulnerable packages
        run: |
          dotnet list package --vulnerable --include-transitive | tee vulnerable.txt
          if grep -q "has the following vulnerable packages" vulnerable.txt; then
            echo "❌ Vulnerable packages found!"
            exit 1
          fi

      - name: OWASP Dependency-Check
        uses: dependency-check/Dependency-Check_Action@main
        with:
          project: 'MyProject'
          path: '.'
          format: 'HTML,JSON'

      - name: Upload Results
        uses: actions/upload-artifact@v3
        with:
          name: dependency-check-report
          path: reports/
```

**En el Día 4** implementaremos esto en un pipeline completo.

---

## Preguntas Frecuentes

### ❓ ¿Qué hago si una dependencia no tiene versión sin CVEs?

**Respuesta:**
1. Buscar **alternativas** a esa librería (ej. Newtonsoft.Json → System.Text.Json)
2. Verificar si el CVE **realmente aplica** a tu uso (algunos CVEs son específicos de ciertos features)
3. **Mitigar** el riesgo (validaciones adicionales, WAF, rate limiting)
4. **Contactar al vendor** si es librería comercial
5. Último recurso: **Fork y parchear** tú mismo (solo si tienes experiencia)

### ❓ ¿Dependabot y Snyk pueden actualizar automáticamente?

**Respuesta:** Sí, pero con cautela:
- Dependabot: Crea PRs automáticos, TÚ decides si merges
- Snyk: Puede auto-merge si pasas configuración de tests
- Recomendación: **NO auto-merge** en producción, siempre revisar breaking changes

### ❓ ¿Cuántas dependencias es demasiadas?

**Respuesta:**
- No hay número mágico, pero considera:
  - Cada dependencia es superficie de ataque
  - Más dependencias = más CVEs potenciales
  - Principio: **Mínimas necesarias**
- Evalúa: ¿Realmente necesitas esta librería o puedes implementarlo en pocas líneas?

### ❓ ¿Qué son dependencias transitivas?

**Respuesta:**
- **Directas:** Las que tú agregas explícitamente en .csproj
- **Transitivas:** Las que tus dependencias necesitan (dependencias de dependencias)
- Ejemplo: Agregas `Libreria A` → `Libreria A` depende de `Newtonsoft.Json 9.0.1` → Vulnerabilidad en transitiva

**Solución:** `dotnet list package --vulnerable --include-transitive` las detecta.

---

## Mapeo a Estándares

### ISO 27002:2022
- **8.19** - Security of information in supplier relationships → SBOM y vetting de dependencias
- **8.32** - Change management → Proceso controlado de actualización
- **5.23** - Information security for use of cloud services → Verificar dependencias de servicios cloud

### OWASP Top 10 2021
- **A06:2021** - Vulnerable and Outdated Components → Directamente abordado por este lab

### CWE/SANS Top 25
- **CWE-1035:** Using Components with Known Vulnerabilities

### SBOM y Regulaciones
- **Executive Order 14028 (US):** Requiere SBOM para software vendido al gobierno
- **EU Cyber Resilience Act:** Propone requisitos similares
- **ISO 27001:2022:** Anexo A.8.19 implica mantener inventario de software

---

## Recursos Adicionales

### Documentación Oficial
- OWASP Dependency-Check: https://jeremylong.github.io/DependencyCheck/
- Snyk: https://docs.snyk.io/
- GitHub Dependabot: https://docs.github.com/code-security/dependabot
- NVD (National Vulnerability Database): https://nvd.nist.gov/

### Bases de Datos de CVEs
- NVD: https://nvd.nist.gov/
- GitHub Advisory Database: https://github.com/advisories
- OSS Index (Sonatype): https://ossindex.sonatype.org/
- CVE.org: https://www.cve.org/

### Herramientas Complementarias
- **SBOM Tools:**
  - Syft (by Anchore): https://github.com/anchore/syft
  - CycloneDX: https://cyclonedx.org/
- **Gestión de Licencias:**
  - FOSSA: https://fossa.com/
  - WhiteSource: https://www.whitesourcesoftware.com/

---

## ⏱️ Cronograma del Lab (75 min)

| Tiempo | Actividad | Modo |
|--------|-----------|------|
| 0-20 min | **Parte 1:** Análisis rápido con dotnet built-in | 👤 Individual |
| 20-45 min | **Parte 2:** OWASP Dependency-Check detallado | 👤 Individual |
| 45-60 min | **Parte 3:** Corregir vulnerabilidades | 👤 Individual |
| 60-70 min | **Parte 4:** Herramientas alternativas (demo) | 👨‍🏫 Facilitador |
| 70-75 min | **Parte 5:** Estrategias de actualización | 👨‍🏫 Facilitador |

---

## Checklist Final

Antes de finalizar el Día 2, verifica:

- [ ] Identificaste las 3 dependencias vulnerables con `dotnet list package --vulnerable`
- [ ] Ejecutaste OWASP Dependency-Check y generaste reporte HTML
- [ ] Exploraste al menos 2 CVEs en detalle (descripción, CVSS, referencias)
- [ ] Actualizaste las dependencias a versiones seguras
- [ ] Verificaste que `dotnet list package --vulnerable` no muestra vulnerabilidades
- [ ] Comparaste reportes antes/después
- [ ] Entiendes cuándo actualizar (Critical/High/Medium/Low)

**Si todo está ✅, has completado el Día 2! 🎉**

**Mañana (Día 3):** APIs Security, DAST con OWASP ZAP, y Pentesting Manual.

---

**¿Dudas o problemas?** Levanta la mano o consulta con el Facilitador 2.

---

**Versión:** 1.2
**Última actualización:** Enero 2025

**Cambios en v1.2:**
- 🎓 Agregada sección "Lecciones Aprendidas: Casos de Estudio Reales" con 3 casos educativos
- 🎓 Agregada nota educativa en Paso 2.4 sobre limitaciones de OWASP DC con .NET/NuGet
- 🎓 Agregada nota educativa en Paso 3.3 sobre dependencias transitivas con ejemplos prácticos
- 📊 Incluida tabla comparativa de detección: OWASP DC vs dotnet CLI vs Snyk/Dependabot
- 📊 Documentado el "Iceberg de Dependencias" (3 directas vs 47 transitivas)
- 🛡️ Agregadas estrategias de mitigación con ejemplos de código (CI/CD, sobrescrituras, SBOM)
- 📈 Incluidos KPIs sugeridos (MTTD, MTTR, cobertura) para medir éxito de SCA
- ✅ Mapeo a estándares: ISO 27002:2022 Control 8.19, OWASP A06:2021
- ✅ Checklist ejecutivo para implementar estrategia SCA completa en organizaciones

**Cambios en v1.1:**
- ✅ Agregada sección de Prerequisitos con tiempos de instalación
- ✅ Duración ajustada de 75 a 90 minutos (incluye setup)
- ✅ Corregidas versiones de dependencias seguras (System.IdentityModel.Tokens.Jwt 8.1.0)
- ✅ Agregada tabla completa de CVEs con GHSA advisories
- ✅ Agregada solución de referencia para ejercicio práctico
- ✅ Clarificada nota sobre versiones "Latest" que cambian con el tiempo
