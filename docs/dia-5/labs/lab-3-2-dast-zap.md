# Lab 3.2: DAST con OWASP ZAP (60 min)

## 🎯 Objetivo

Aprender a usar **OWASP ZAP** (Zed Attack Proxy) para realizar **Dynamic Application Security Testing (DAST)** en aplicaciones web y APIs, detectando vulnerabilidades en tiempo de ejecución mediante scanning automatizado, manual y activo.

## 📚 Conceptos Clave

### ¿Qué es DAST?

**Dynamic Application Security Testing (DAST)** es una técnica de "caja negra" que analiza aplicaciones en ejecución, enviando requests HTTP y analizando las respuestas para identificar vulnerabilidades.

**Diferencias con SAST:**

| Aspecto | SAST (Lab 2.3) | DAST (Este Lab) |
|---------|----------------|-----------------|
| **Análisis** | Código fuente estático | Aplicación en ejecución |
| **Perspectiva** | Caja blanca (interno) | Caja negra (externo) |
| **Momento** | Desarrollo | Testing/Pre-producción |
| **Detecta** | Código vulnerable | Comportamiento vulnerable |
| **False Positives** | Más altos | Más bajos (verifica en runtime) |

### ¿Por qué OWASP ZAP?

- ✅ **Gratuito y open source**
- ✅ **Alternativa a Rapid7 InsightAppSec** (que usa el cliente)
- ✅ **Interfaz gráfica + CLI** (automatización CI/CD)
- ✅ **Proxy interceptor** (análisis manual)
- ✅ **Active + Passive scanning**
- ✅ **API support** (OpenAPI/Swagger import)

### Modos de Scanning

1. **Passive Scan**: Analiza respuestas HTTP sin enviar payloads (seguro)
2. **Active Scan**: Envía payloads de ataque (⚠️ solo en entornos de prueba)
3. **Manual Explore**: Proxy interceptor para análisis manual

---

## 🔗 Relación con Otros Labs

| Lab Anterior | Conexión | Este Lab |
|--------------|----------|----------|
| **Lab 2.3 (SAST)** | Detectó vulnerabilidades en código → | Verifica si son explotables en runtime |
| **Lab 3.1 (API Security)** | Creamos VulnerableShopAPI → | Escaneamos con ZAP para confirmar vulnerabilidades |

---

## 📋 Prerequisitos

- ✅ Docker instalado y corriendo (Lab 2.2)
- ✅ Navegador Firefox o Chrome
- ✅ VulnerableShopAPI del Lab 3.1 funcionando
- ✅ Opcional: DVWA (si está disponible)

---

## 🛠️ Parte 1: Instalación de OWASP ZAP (5 min)

### Opción A: Instalar ZAP Desktop (Recomendado)

**macOS:**
```bash
brew install --cask owasp-zap
```

**Windows:**
```powershell
# Con Chocolatey
choco install zap

# O descargar instalador:
# https://www.zaproxy.org/download/
```

**Linux:**
```bash
wget https://github.com/zaproxy/zaproxy/releases/download/v2.14.0/ZAP_2_14_0_unix.sh
chmod +x ZAP_2_14_0_unix.sh
./ZAP_2_14_0_unix.sh
```

### Opción B: Docker (Headless para CI/CD)

```bash
docker pull zaproxy/zap-stable

# Verificar
docker run --rm zaproxy/zap-stable zap.sh -version
```

### Verificar Instalación

```bash
# macOS/Linux
/Applications/ZAP.app/Contents/Java/zap.sh -version

# Windows
"C:\Program Files\OWASP\Zed Attack Proxy\zap.bat" -version

# Esperado: OWASP ZAP 2.14.0 o superior
```

---

## 🚀 Parte 2: Automated Scan de VulnerableShopAPI (15 min)

### Paso 1: Iniciar VulnerableShopAPI

```bash
cd /Users/black4ninja/Meeplab/Chihuahua/curso-5dias/dia3-implementacion-controles/laboratorios/lab3.1-api-security/VulnerableShopAPI

dotnet restore
dotnet run
```

**Verificar:**
```bash
curl http://localhost:5000/health
# Esperado: {"status":"healthy"}
```

### Paso 2: Automated Scan desde ZAP GUI

1. **Abrir ZAP**
   - Primera vez: Aceptar actualizar add-ons
   - Seleccionar "No, I do not want to persist this session"

2. **Configurar Automated Scan**
   - Click en "Automated Scan" (icono de rayo)
   - URL: `http://localhost:5000`
   - ✅ Use traditional spider
   - ✅ Use ajax spider
   - Click "Attack"

3. **Observar el Progreso** (5-7 min)
   ```
   [Spider] Discovering URLs...
   [Ajax Spider] JavaScript analysis...
   [Passive Scan] Analyzing responses...
   [Active Scan] Testing vulnerabilities...
   ```

### Paso 3: Analizar Resultados

En la pestaña **"Alerts"** verás:

| Severidad | Vulnerabilidad Esperada | Endpoint Afectado |
|-----------|------------------------|-------------------|
| 🔴 **HIGH** | SQL Injection | `/api/users/search` |
| 🔴 **HIGH** | Cross-Site Scripting (Reflected) | `/api/products/search` |
| 🔴 **HIGH** | Path Traversal | `/api/download` |
| 🟠 **MEDIUM** | Missing Security Headers | Todos los endpoints |
| 🟠 **MEDIUM** | CORS Misconfiguration | Todos los endpoints |
| 🟡 **LOW** | Information Disclosure | `/api/users` (devuelve passwordHash) |

**Ejemplo de alerta:**

```
Alert: SQL Injection
Risk: High
Confidence: Medium
URL: http://localhost:5000/api/users/search?username=test%27+OR+%271%27%3D%271
Parameter: username
Attack: test' OR '1'='1
Evidence: {"id":1,"email":"admin@shop.com",...}
CWE: 89
OWASP: A03:2021 - Injection
```

---

## 🔍 Parte 3: Manual Explore con Proxy (20 min)

### Paso 4: Configurar Proxy en el Navegador

ZAP actúa como **proxy interceptor** entre tu navegador y la aplicación.

**Firefox (Recomendado):**
1. Settings → Network Settings → "Settings..."
2. ⚙️ Manual proxy configuration:
   - HTTP Proxy: `localhost`
   - Port: `8080` (puerto por defecto de ZAP)
   - ✅ Also use this proxy for HTTPS
3. Click "OK"

**Chrome/Edge:**
```bash
# Iniciar con proxy (macOS/Linux)
open -na "Google Chrome" --args --proxy-server="localhost:8080"

# Windows
chrome.exe --proxy-server="localhost:8080"
```

### Paso 5: Manual Explore

1. **Abrir Swagger UI** con Firefox configurado:
   ```
   http://localhost:5000/swagger
   ```

2. **En ZAP, observar**:
   - Pestaña **"Sites"**: Se va poblando con URLs descubiertas
   - Pestaña **"History"**: Cada request HTTP interceptado
   - Pestaña **"Alerts"**: Vulnerabilidades detectadas pasivamente

3. **Probar Endpoints Vulnerables**:

   **SQL Injection:**
   ```bash
   # En Swagger UI, ejecutar:
   GET /api/users/search?username=admin' OR '1'='1--
   ```

   **XSS:**
   ```bash
   GET /api/products/search?keyword=<script>alert('XSS')</script>
   ```

   **IDOR:**
   ```bash
   GET /api/orders/1
   GET /api/orders/999
   ```

4. **Observar en ZAP**:
   - Click derecho en request → "Open/Resend with Request Editor"
   - Modificar parámetros y reenviar
   - ZAP detectará nuevas vulnerabilidades

---

## ⚔️ Parte 4: Active Scan (10 min)

⚠️ **WARNING**: Active Scan envía payloads de ataque reales. **SOLO usar en entornos de prueba.**

### Paso 6: Ejecutar Active Scan

1. En ZAP, pestaña **"Sites"**
2. Click derecho en `http://localhost:5000`
3. **Attack → Active Scan**
4. Configuración:
   - Policy: **"Default Policy"**
   - ✅ Show advanced options:
     - Threads per host: `2` (más rápido)
     - ✅ Recurse: `true`
5. Click **"Start Scan"**

**Tiempo estimado**: 4-6 minutos

### Paso 7: Monitorear Active Scan

En la pestaña **"Active Scan"**:

```
Status: 65% complete
Requests: 1,247 / 1,920
Time: 00:03:42
Current: Testing SQL Injection on /api/users/search
```

**Vulnerabilidades adicionales esperadas:**

| Vulnerabilidad | Payload Usado | Endpoint |
|----------------|---------------|----------|
| SQL Injection (Blind) | `admin' AND SLEEP(5)--` | `/api/users/search` |
| Command Injection | `; cat /etc/passwd` | `/api/admin/execute` |
| XML External Entity (XXE) | `<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>` | `/api/upload` |
| Server-Side Request Forgery | `http://169.254.169.254/latest/meta-data/` | `/api/fetch` |

---

## 📊 Parte 5: Análisis de Resultados (10 min)

### Paso 8: Clasificar Vulnerabilidades

En la pestaña **"Alerts"**, filtrar por severidad:

**🔴 HIGH - Acción Inmediata:**
- SQL Injection → Usar consultas parametrizadas (Lab 3.1 Parte 2)
- XSS → Sanitizar inputs y outputs
- SSRF → Validar URLs permitidas

**🟠 MEDIUM - Corto Plazo:**
- Missing Security Headers → Agregar middleware (Lab 3.4)
- CORS Misconfiguration → Configurar orígenes permitidos

**🟡 LOW - Mejoras:**
- Information Disclosure → No devolver datos sensibles (passwordHash)
- Cookie flags → Agregar `HttpOnly`, `Secure`, `SameSite`

### Paso 9: Identificar False Positives

No todas las alertas son vulnerabilidades reales.

**Ejemplo: X-Frame-Options**
```
Alert: Missing Anti-clickjacking Header
URL: http://localhost:5000/api/users
```

**Análisis:**
- ✅ TRUE POSITIVE si es una página web con contenido visual
- ❌ FALSE POSITIVE si es una API REST sin interfaz HTML

**Marcar como False Positive:**
1. Click derecho en alerta → "Mark as False Positive"
2. Agregar comentario: "REST API, no requiere X-Frame-Options"

---

## 📄 Parte 6: Generar Reportes (5 min)

### Paso 10: Generar Reporte HTML

1. En ZAP, menú **"Report"** → **"Generate HTML Report..."**
2. Configuración:
   - Template: **"Traditional HTML Report"**
   - ✅ Include: High, Medium, Low
   - ❌ Exclude: Informational
   - ✅ Include descriptions
   - ✅ Include request/response
3. Save as: `zap_vulnerableshop_report.html`

**Estructura del reporte:**
```html
OWASP ZAP Scanning Report
=========================

Executive Summary
- Total Alerts: 18
- High: 5
- Medium: 8
- Low: 5

Alerts by Risk Level
====================

[HIGH] SQL Injection
- URL: http://localhost:5000/api/users/search
- Parameter: username
- Attack: test' OR '1'='1
- Solution: Use prepared statements...

[HIGH] Cross-Site Scripting
...
```

### Paso 11: Generar Reporte XML (Para CI/CD)

```bash
# Guardar sesión ZAP
# File → Save Session As → "vulnerableshop_scan.session"

# Exportar XML para integración CI/CD
# Report → Export Report → XML
```

**Uso en CI/CD:**
```yaml
# Ejemplo: GitHub Actions
- name: ZAP Scan
  run: |
    zap-cli quick-scan --self-contained \
      --start-options '-config api.disablekey=true' \
      http://localhost:5000

    zap-cli report -o zap_report.xml -f xml

    # Fallar build si hay vulnerabilidades HIGH
    python scripts/check_zap_results.py zap_report.xml
```

---

## 🧪 Ejercicio Práctico: Escanear Versión Corregida (5 min)

### Paso 12: Comparar Vulnerable vs Segura

1. **Detener VulnerableShopAPI**
   ```bash
   # Ctrl+C en terminal
   ```

2. **Iniciar versión corregida** (del Lab 3.1 Parte 7)
   ```bash
   cd ../SecureShopAPI
   dotnet restore
   dotnet run
   ```

3. **Nuevo Automated Scan** en ZAP:
   - URL: `http://localhost:5000`
   - Esperar 5-7 min

4. **Comparar resultados**:

   | Métrica | VulnerableShopAPI | SecureShopAPI |
   |---------|-------------------|---------------|
   | **HIGH Alerts** | 5 | 0 |
   | **MEDIUM Alerts** | 8 | 2 |
   | **LOW Alerts** | 5 | 3 |
   | **SQL Injection** | ✅ Detectado | ❌ Corregido |
   | **XSS** | ✅ Detectado | ❌ Corregido |
   | **IDOR** | ✅ Detectado | ❌ Corregido |

**Evidencia:**
- Captura de pantalla: Comparación de Alerts entre ambas versiones
- Conclusión: Las correcciones del Lab 3.1 eliminaron las vulnerabilidades críticas

---

## 📦 Entregables del Laboratorio

### Archivos a Entregar:

1. ✅ **Reporte HTML de ZAP** (`zap_vulnerableshop_report.html`)
   - Scan de VulnerableShopAPI
   - Mínimo 15 alertas detectadas

2. ✅ **Reporte de Comparación** (documento PDF/Markdown)
   - Tabla comparativa: Vulnerable vs Segura
   - Screenshots de:
     - Alert Panel (VulnerableShopAPI)
     - Alert Panel (SecureShopAPI)
     - Ejemplo de 1 vulnerabilidad HIGH detectada

3. ✅ **Evidencia de False Positive** (screenshot)
   - Mostrar cómo marcaste una alerta como FP
   - Justificación por escrito

4. ✅ **Sesión ZAP guardada** (`vulnerableshop_scan.session`)
   - Para revisión del instructor

---

## ✅ Checklist de Validación

Antes de entregar, verifica:

- [ ] ZAP instalado y funcionando
- [ ] Automated Scan completado (5+ min)
- [ ] Proxy configurado y manual explore realizado
- [ ] Active Scan ejecutado (⚠️ solo en localhost)
- [ ] Mínimo 15 alertas detectadas en VulnerableShopAPI
- [ ] Reporte HTML generado con:
  - [ ] Sección de resumen ejecutivo
  - [ ] Detalles de vulnerabilidades HIGH
  - [ ] Request/Response ejemplos
- [ ] Scan de SecureShopAPI completado
- [ ] Comparación documentada entre ambas versiones
- [ ] False Positive identificado y justificado
- [ ] Capturas de pantalla incluidas

---

## 🔗 Mapeo a Estándares de Seguridad

### ISO/IEC 27002:2022

| Control | Nombre | Aplicación en este Lab |
|---------|--------|----------------------|
| **8.8** | Management of technical vulnerabilities | DAST detecta vulnerabilidades en runtime |
| **8.24** | Use of cryptography | ZAP detecta configuraciones HTTPS débiles |
| **8.25** | Secure development lifecycle | Integración de DAST en testing |
| **8.29** | Security testing in development and acceptance | Active/Passive scanning antes de producción |

### OWASP Top 10 2021

| Categoría | Detección en ZAP |
|-----------|-----------------|
| **A01: Broken Access Control** | Active scan detecta IDOR, path traversal |
| **A03: Injection** | SQL Injection, Command Injection payloads |
| **A05: Security Misconfiguration** | Missing headers, CORS, cookies inseguros |
| **A07: XSS** | Passive/Active scan con payloads XSS |

### OWASP API Security Top 10 2023

| Categoría | Detección en ZAP |
|-----------|-----------------|
| **API1: BOLA** | Active scan prueba acceso a recursos de otros usuarios |
| **API2: Broken Authentication** | Detecta tokens JWT mal configurados |
| **API3: Excessive Data Exposure** | Passive scan identifica datos sensibles en respuestas |
| **API7: SSRF** | Active scan prueba payloads SSRF |

### CWE (Common Weakness Enumeration)

| CWE | Nombre | Detectado por ZAP |
|-----|--------|-------------------|
| **CWE-89** | SQL Injection | ✅ Active Scan |
| **CWE-79** | Cross-Site Scripting | ✅ Passive + Active |
| **CWE-918** | SSRF | ✅ Active Scan |
| **CWE-352** | CSRF | ✅ Passive Scan |

---

## 🚀 Extensión: Aplicar a tu Código (OPCIONAL)

Si tienes tiempo, puedes escanear tu propia aplicación:

### Paso 1: Verificar Prerequisitos

- ✅ Aplicación corriendo en **localhost** o entorno de prueba
- ❌ **NUNCA escanear producción sin autorización**
- ✅ Backup de base de datos (Active Scan puede modificar datos)

### Paso 2: Configurar ZAP Context

1. En ZAP, pestaña **"Sites"**
2. Click derecho en tu URL → **"Include in Context → New Context"**
3. Nombre: "MiAplicacion"
4. Agregar autenticación si es necesaria:
   - **Context → Authentication**
   - Method: "Form-based Authentication" o "Script-based"
   - Agregar usuario/password

### Paso 3: Automated Scan con Autenticación

```bash
# Ejemplo: API con JWT
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123!"}' \
  | jq -r '.token' > token.txt

# En ZAP, agregar header de autorización:
# Tools → Options → Replacer
# Add: Authorization: Bearer $(cat token.txt)
```

### Paso 4: Analizar Resultados Específicos

Busca vulnerabilidades específicas de tu stack:

**ASP.NET Core:**
- ViewState encryption
- Anti-forgery tokens
- Debug mode enabled

**APIs REST:**
- Rate limiting
- CORS configuration
- API versioning issues

### Paso 5: Priorizar Remediación

| Prioridad | Criterio | Acción |
|-----------|----------|--------|
| **P0 - Crítico** | HIGH + Externa + Datos sensibles | Hotfix inmediato |
| **P1 - Alta** | HIGH + Requiere autenticación | Sprint actual |
| **P2 - Media** | MEDIUM + Alta exposición | Próximo sprint |
| **P3 - Baja** | LOW o Informational | Backlog |

---

## 🛠️ Troubleshooting

### Problema 1: ZAP no detecta vulnerabilidades

**Causa**: Application está correctamente configurada ✅

**Solución alternativa**:
```bash
# Escanear DVWA (aplicación intencionalmente vulnerable)
docker run -d --name dvwa -p 8080:80 vulnerables/web-dvwa

# Esperar 10 segundos
sleep 10

# Configurar DVWA:
# http://localhost:8080
# Login: admin / password
# Security: Low

# Escanear con ZAP: http://localhost:8080
# Deberías ver 20+ alertas HIGH
```

### Problema 2: Proxy no intercepta tráfico

**Verificar**:
```bash
# 1. ZAP está escuchando
lsof -i :8080 | grep LISTEN

# 2. Firefox configurado correctamente
# Settings → Network Settings → Manual proxy
# HTTP Proxy: localhost, Port: 8080

# 3. Desactivar temporalmente HTTPS-only mode
# Settings → Privacy & Security → HTTPS-Only Mode → Disable
```

### Problema 3: Active Scan muy lento

**Optimizar**:
```bash
# En ZAP:
# Tools → Options → Active Scan
# - Threads per host: 2 → 5
# - Max results to list: 100 → 50
# - Delay when scanning (ms): 0

# Reducir scope:
# Click derecho en endpoint específico → Attack → Active Scan
# Lugar de escanear todo el dominio
```

---

## 💡 Conceptos Avanzados

### 1. Automation Framework (YAML)

ZAP permite automatización completa vía YAML:

```yaml
# zap-automation.yaml
env:
  contexts:
    - name: "VulnerableShop"
      urls:
        - "http://localhost:5000"

jobs:
  - type: spider
    parameters:
      maxDuration: 2

  - type: passiveScan-wait

  - type: activeScan
    parameters:
      policy: "Default Policy"

  - type: report
    parameters:
      template: "traditional-html"
      reportFile: "zap_report.html"
```

**Ejecutar:**
```bash
zap.sh -cmd -autorun zap-automation.yaml
```

### 2. Custom Scripts

ZAP permite scripts Python/JavaScript:

```python
# custom_scan.py - Detectar API keys en respuestas
def scan(ps, msg, src):
    body = msg.getResponseBody().toString()

    # Regex para API keys comunes
    patterns = [
        r'api[_-]?key["\s:=]+([A-Za-z0-9_-]{32,})',
        r'AKIA[0-9A-Z]{16}',  # AWS
        r'sk_live_[0-9a-zA-Z]{24}',  # Stripe
    ]

    for pattern in patterns:
        match = re.search(pattern, body)
        if match:
            ps.raiseAlert(
                1,  # risk: HIGH
                1,  # confidence: HIGH
                "API Key Exposure",
                f"Found exposed API key: {match.group(1)[:8]}...",
                msg.getRequestHeader().getURI().toString(),
                "",
                "",
                "Rotate API key and use environment variables",
                msg
            )
```

### 3. Integración CI/CD

```yaml
# .github/workflows/security.yml
name: DAST Scan

on: [push]

jobs:
  zap_scan:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Start Application
        run: |
          docker-compose up -d
          sleep 30

      - name: ZAP Baseline Scan
        uses: zaproxy/action-baseline@v0.7.0
        with:
          target: 'http://localhost:5000'
          rules_file_name: '.zap/rules.tsv'
          fail_action: true

      - name: Upload ZAP Report
        uses: actions/upload-artifact@v3
        with:
          name: zap-report
          path: report_html.html
```

---

## 📚 Recursos Adicionales

### Documentación Oficial

- 📘 **OWASP ZAP User Guide**: https://www.zaproxy.org/docs/
- 📘 **Automation Framework**: https://www.zaproxy.org/docs/automate/automation-framework/
- 📘 **ZAP API**: https://www.zaproxy.org/docs/api/

### Videos Recomendados

- 🎥 **ZAP in Ten** (serie corta): https://www.zaproxy.org/zap-in-ten/
- 🎥 **Deep Dive Videos**: https://www.zaproxy.org/docs/videos/

### Comparación con Rapid7 InsightAppSec

| Característica | OWASP ZAP | Rapid7 InsightAppSec |
|----------------|-----------|---------------------|
| **Costo** | Gratuito | Licencia comercial |
| **UI** | Desktop app | Web-based |
| **Automation** | YAML + CLI | API + Integrations |
| **Reporting** | HTML/XML/JSON | Dashboards interactivos |
| **Learning curve** | Media | Baja |
| **Community** | Grande (open source) | Soporte comercial |

**Concepto clave**: Ambos realizan DAST de la misma forma (spider, active scan, passive scan). Lo que aprendes en ZAP aplica directamente a Rapid7.

---

## 🏁 Conclusión

En este laboratorio aprendiste a:

✅ Instalar y configurar OWASP ZAP
✅ Realizar Automated, Passive y Active scanning
✅ Configurar proxy interceptor para análisis manual
✅ Identificar vulnerabilidades reales en APIs
✅ Generar reportes profesionales
✅ Comparar versiones vulnerable vs segura
✅ Integrar DAST en el ciclo de vida de desarrollo

**Próximo Lab**: [Lab 3.3 - Pentesting Manual de APIs](./lab-3-3-pentesting-apis) donde profundizaremos en técnicas manuales con Postman, Burp Suite y curl.

---

**Tiempo total**: 60 minutos
**Dificultad**: ⭐⭐⭐ Intermedia
**Prerequisitos**: Lab 2.2 (Docker), Lab 3.1 (VulnerableShopAPI)
