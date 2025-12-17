# Lab 2.4 - Análisis de Dependencias con OWASP Dependency-Check

**Duración:** 75 minutos
**Facilitador:** Facilitador 2 (Técnico)
**Día:** 2 - Preparación para Implementar Controles

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

```bash
# Navegar al lab
cd ~/Meeplab/Chihuahua/curso-5dias/dia2-preparacion-controles/laboratorios/lab2.4-dependency-check

# Copiar proyectos del legacy
cp -r ~/Meeplab/Chihuahua/legacy-3dias/implementacion/dia2/lab02-dependency-check/proyecto-vulnerable .
cp -r ~/Meeplab/Chihuahua/legacy-3dias/implementacion/dia2/lab02-dependency-check/proyecto-actualizado .

# Verificar
ls -la proyecto-vulnerable/
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
| **Newtonsoft.Json** | 9.0.1 | CVE-2018-1000127 | 🔴 High |
| **System.IdentityModel.Tokens.Jwt** | 5.6.0 | Múltiples CVEs | 🟡 Medium |
| **Microsoft.Data.SqlClient** | 2.0.0 | CVE-2021-1636 | 🔴 High |

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
   > Microsoft.Data.SqlClient             2.0.0       2.0.0      5.2.0
   > Newtonsoft.Json                      9.0.1       9.0.1      13.0.3
   > System.IdentityModel.Tokens.Jwt      5.6.0       5.6.0      7.3.1
```

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
| Microsoft.Data.SqlClient | CVE-2021-1636 | ... | ... | ... |
| System.IdentityModel.Tokens.Jwt | ... | ... | ... | ... |

**💡 Tip:** Usa los Advisory URLs para obtener la información.

---

## Parte 2: Análisis Detallado con OWASP Dependency-Check (25 min)

### Paso 2.1: Instalar OWASP Dependency-Check

**macOS (con Homebrew):**
```bash
brew install dependency-check
```

**Windows (con Chocolatey):**
```powershell
choco install dependency-check
```

**Linux / Manual:**
```bash
# Descargar última versión
wget https://github.com/jeremylong/DependencyCheck/releases/download/v9.0.0/dependency-check-9.0.0-release.zip

# Extraer
unzip dependency-check-9.0.0-release.zip

# Agregar al PATH (opcional)
export PATH=$PATH:$(pwd)/dependency-check/bin
```

**Verificar instalación:**
```bash
dependency-check --version

# Output esperado:
# Dependency-Check Core version 9.0.0
```

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
>   <PackageReference Include="System.IdentityModel.Tokens.Jwt" Version="7.3.1" />
>   <PackageReference Include="Microsoft.Data.SqlClient" Version="5.2.0" />
```

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

# Agregar versiones actualizadas
dotnet add package Newtonsoft.Json --version 13.0.3
dotnet add package System.IdentityModel.Tokens.Jwt --version 7.3.1
dotnet add package Microsoft.Data.SqlClient --version 5.2.0

# Restaurar paquetes
dotnet restore
```

---

### Paso 3.3: Verificar Correcciones

**Método 1: dotnet CLI**

```bash
dotnet list package --vulnerable
```

**Output esperado:**

```
No vulnerable packages found
```

✅ **Checkpoint:** Deberías ver "No vulnerable packages found".

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
