# Lab 1.3: Reconocimiento Básico con Nmap, Nikto y Whatweb

**Duración:** 90 minutos
**Dificultad:** Básica
**Facilitador:** Facilitador 2 (técnico)

---

## 🎯 Objetivos

Al finalizar este laboratorio, serás capaz de:

1. Realizar escaneo de puertos con **nmap**
2. Identificar tecnologías web con **whatweb**
3. Escanear vulnerabilidades web con **Nikto**
4. Interpretar resultados de herramientas de reconocimiento
5. Documentar hallazgos en formato profesional

---

## 📋 Pre-requisitos

### Herramientas a Instalar:

#### **En macOS:**
```bash
# Instalar Homebrew (si no lo tienes)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar nmap
brew install nmap

# Instalar nikto
brew install nikto

# Instalar whatweb (puede requerir Ruby)
brew install whatweb
```

#### **En Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install -y nmap nikto
sudo gem install whatweb  # Si whatweb no está en apt
```

#### **En Windows:**
- **Nmap:** Descargar desde https://nmap.org/download.html
- **Nikto:** Usar con WSL o Docker
- **Whatweb:** Usar con WSL o Docker

**Alternativa: Usar Docker con Kali Linux**
```bash
docker run -it --rm kalilinux/kali-rolling bash
apt update && apt install -y nmap nikto whatweb
```

### Verificación de Instalación:

```bash
# Verificar nmap
nmap --version

# Verificar nikto
nikto -Version

# Verificar whatweb
whatweb --version
```

---

## 🎓 Contexto del Laboratorio

Eres un pentester contratado para evaluar la seguridad de una aplicación web. Tu tarea inicial es realizar reconocimiento pasivo y activo para:

1. Identificar servicios expuestos
2. Detectar tecnologías utilizadas
3. Buscar vulnerabilidades conocidas

**Objetivo:** Aplicación web corriendo en Docker (DVWA o la app MiniShop del Lab 1.1)

---

## 🛠️ Preparación: Levantar Aplicación Vulnerable

### Opción 1: Usar DVWA (Damn Vulnerable Web App)

```bash
# Levantar DVWA con Docker
docker run --rm -it -p 80:80 vulnerables/web-dvwa

# Abrir en navegador: http://localhost
# Credenciales: admin / password
```

### Opción 2: Usar MiniShop del Lab 1.1

```bash
cd curso-5dias/dia1-controles-iso-owasp/laboratorios/lab1.1-mapeo-controles/proyecto-ejemplo
dotnet run

# Abrir en navegador: http://localhost:5000
```

---

## 🔍 Fase 1: Escaneo de Puertos con Nmap (30 min)

### ¿Qué es Nmap?

**Nmap (Network Mapper)** = Herramienta de escaneo de red que descubre hosts y servicios.

**Analogía:** Es como tocar todas las puertas de un edificio para ver cuáles están abiertas.

---

### Ejercicio 1.1: Escaneo Básico de Puertos

```bash
# Escanear puertos comunes en localhost
nmap localhost

# O escanear la IP de tu máquina
nmap 127.0.0.1
```

**Resultado esperado:**
```
Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for localhost (127.0.0.1)
Host is up (0.00010s latency).
Not shown: 997 closed tcp ports (conn-refused)
PORT     STATE SERVICE
80/tcp   open  http
5000/tcp open  upnp
```

**Interpretación:**
- ✅ Puerto 80 abierto → Servidor web corriendo (DVWA)
- ✅ Puerto 5000 abierto → API MiniShop

---

### Ejercicio 1.2: Detección de Versiones

```bash
# -sV = Detectar versiones de servicios
nmap -sV localhost
```

**Resultado esperado:**
```
PORT     STATE SERVICE VERSION
80/tcp   open  http    Apache httpd 2.4.41 ((Ubuntu))
5000/tcp open  http    Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
```

**¿Qué información obtuvimos?**
- ✅ Servidor web: **Apache 2.4.41**
- ✅ Sistema operativo: **Ubuntu** (en el caso de DVWA)
- ✅ Framework: **Microsoft HTTPAPI** (en el caso de MiniShop)

**¿Por qué es útil?**
- Podemos buscar CVEs específicos para Apache 2.4.41
- Sabemos que el servidor corre en Ubuntu
- Podemos investigar vulnerabilidades conocidas de esas versiones

---

### Ejercicio 1.3: Escaneo de Todos los Puertos

```bash
# -p- = Escanear TODOS los puertos (1-65535)
# Advertencia: Esto puede tomar varios minutos
nmap -p- localhost

# Alternativa más rápida (solo puertos comunes)
nmap -F localhost
```

**¿Por qué escanear todos los puertos?**
- A veces hay servicios en puertos no estándar
- Ejemplo: Admin panel en puerto 8888, base de datos en puerto 33060

---

### Ejercicio 1.4: Detección de Sistema Operativo

```bash
# -O = Detectar sistema operativo (requiere sudo/admin)
sudo nmap -O localhost
```

**Resultado esperado:**
```
Device type: general purpose
Running: Linux 5.X
OS CPE: cpe:/o:linux:linux_kernel:5
OS details: Linux 5.0 - 5.4
```

---

### Ejercicio 1.5: Escaneo Agresivo (Completo)

```bash
# -A = Modo agresivo (detección de OS, versión, scripts, traceroute)
# Advertencia: Puede ser detectado fácilmente por IDS
sudo nmap -A localhost
```

**Este comando ejecuta:**
- ✅ Detección de versiones (-sV)
- ✅ Detección de OS (-O)
- ✅ Scripts de Nmap (--script=default)
- ✅ Traceroute (--traceroute)

---

### 📝 Documentación de Hallazgos - Nmap

Completa la siguiente tabla con tus resultados:

| Puerto | Estado | Servicio | Versión | Riesgo Potencial |
|--------|--------|----------|---------|------------------|
| 80 | Abierto | http | Apache 2.4.41 | Buscar CVEs de Apache 2.4.41 |
| 5000 | Abierto | http | ASP.NET Core | Posible API expuesta |
| | | | | |

---

## 🌐 Fase 2: Identificación de Tecnologías con Whatweb (20 min)

### ¿Qué es Whatweb?

**Whatweb** = Herramienta que identifica tecnologías web (frameworks, CMS, librerías JavaScript, servidores).

**Analogía:** Es como leer las etiquetas de todos los ingredientes de un producto.

---

### Ejercicio 2.1: Escaneo Básico

```bash
# Escanear localhost
whatweb http://localhost
```

**Resultado esperado (DVWA):**
```
http://localhost [200 OK] Apache[2.4.41], Country[RESERVED][ZZ], HTTPServer[Ubuntu Linux][Apache/2.4.41 (Ubuntu)], IP[127.0.0.1], PHP[7.4.3], Title[Welcome to Damn Vulnerable Web Application (DVWA)]
```

**¿Qué información obtuvimos?**
- ✅ Servidor: Apache 2.4.41 en Ubuntu
- ✅ Lenguaje: PHP 7.4.3
- ✅ Aplicación: DVWA

---

### Ejercicio 2.2: Escaneo con Nivel de Agresividad

```bash
# -v = Verbose (más detalles)
# -a 3 = Agresividad nivel 3 (1=pasivo, 4=muy agresivo)
whatweb -v -a 3 http://localhost
```

**Resultado detallado:**
```
http://localhost [200 OK]
  IP: 127.0.0.1
  Apache: 2.4.41 (Ubuntu)
  HTTPServer: Ubuntu Linux
  PHP: 7.4.3
  Cookies: PHPSESSID, security
  HTML5: Detected
  Title: Welcome to DVWA
  Meta-Refresh-Redirect: login.php
```

---

### Ejercicio 2.3: Escanear API MiniShop

```bash
whatweb -v http://localhost:5000
```

**Resultado esperado:**
```
http://localhost:5000 [200 OK]
  HTTPServer: Kestrel
  ASP.NET: Detected
  UncommonHeaders: x-powered-by[ASP.NET]
  Swagger: Detected (API documentation exposed)
```

**⚠️ Hallazgo importante:**
- Swagger UI expuesto → Documentación de API pública
- Esto revela todos los endpoints disponibles
- Facilita el trabajo del atacante

---

### 📝 Documentación de Hallazgos - Whatweb

| URL | Tecnología | Versión | Riesgo Potencial |
|-----|------------|---------|------------------|
| http://localhost | Apache + PHP | 2.4.41 + 7.4.3 | Buscar CVEs específicos |
| http://localhost:5000 | ASP.NET Core + Kestrel | 8.0 | Swagger expuesto |

---

## 🔎 Fase 3: Escaneo de Vulnerabilidades con Nikto (40 min)

### ¿Qué es Nikto?

**Nikto** = Escáner de vulnerabilidades web que busca configuraciones inseguras, archivos peligrosos, y vulnerabilidades conocidas.

**Analogía:** Es como un inspector de seguridad que revisa todas las esquinas buscando problemas.

---

### Ejercicio 3.1: Escaneo Básico de DVWA

```bash
# Escanear localhost puerto 80
nikto -h http://localhost
```

**Resultado esperado (extracto):**
```
- Nikto v2.5.0
---------------------------------------------------------------------------
+ Target IP:          127.0.0.1
+ Target Hostname:    localhost
+ Target Port:        80
+ Start Time:         2025-12-11 10:00:00
---------------------------------------------------------------------------
+ Server: Apache/2.4.41 (Ubuntu)
+ The anti-clickjacking X-Frame-Options header is not present.
+ The X-XSS-Protection header is not defined.
+ The X-Content-Type-Options header is not set.
+ Root page / redirects to: login.php
+ No CGI Directories found (use '-C all' to force check all possible dirs)
+ Apache/2.4.41 appears to be outdated (current is at least 2.4.54)
+ Allowed HTTP Methods: GET, HEAD, POST, OPTIONS
+ OSVDB-3268: /config/: Directory indexing found.
+ OSVDB-3092: /setup/: This might be interesting...
+ 8018 requests: 0 error(s) and 8 item(s) reported on remote host
+ End Time:           2025-12-11 10:15:00 (900 seconds)
```

---

### Interpretación de Resultados

#### 🔴 CRÍTICO:
- **Directory indexing** en `/config/` → Archivos sensibles podrían estar expuestos

#### 🟠 ALTO:
- **Apache 2.4.41 outdated** → Existen versiones más recientes con patches de seguridad

#### 🟡 MEDIO:
- **Missing security headers:**
  - `X-Frame-Options` → Vulnerable a clickjacking
  - `X-XSS-Protection` → Sin protección básica contra XSS
  - `X-Content-Type-Options` → MIME sniffing permitido

---

### Ejercicio 3.2: Escaneo con Tuning (Optimización)

```bash
# -Tuning x = Solo buscar archivos/directorios interesantes
nikto -h http://localhost -Tuning x
```

**Tipos de Tuning:**
- `1` = File upload
- `2` = Misconfigurations/Default files
- `3` = Information disclosure
- `4` = Injection (XSS/Script/HTML)
- `x` = Reverse tuning (exclude)

---

### Ejercicio 3.3: Guardar Resultados

```bash
# -o = Output file
# -Format html = Formato HTML
nikto -h http://localhost -o nikto-report.html -Format html
```

Esto genera un reporte HTML que puedes abrir en el navegador.

---

### Ejercicio 3.4: Escanear MiniShop API

```bash
nikto -h http://localhost:5000
```

**Hallazgos esperados:**
```
+ Server: Kestrel
+ The anti-clickjacking X-Frame-Options header is not present.
+ No CSP (Content Security Policy) header found.
+ Uncommon header 'x-powered-by' found, with contents: ASP.NET
+ /swagger/index.html: Swagger UI found (API documentation exposed)
+ Allowed HTTP Methods: GET, POST, PUT, DELETE, OPTIONS
```

**⚠️ Hallazgos críticos:**
- Swagger UI público → Enumerar todos los endpoints
- Métodos HTTP no restringidos
- Headers de seguridad faltantes

---

### 📝 Documentación de Hallazgos - Nikto

| Hallazgo | Severidad | OWASP | Remediación |
|----------|-----------|-------|-------------|
| X-Frame-Options missing | MEDIA | A05 | Agregar: `X-Frame-Options: DENY` |
| X-Content-Type-Options missing | BAJA | A05 | Agregar: `X-Content-Type-Options: nosniff` |
| Directory indexing en /config/ | ALTA | A05 | Deshabilitar directory listing en Apache |
| Apache 2.4.41 outdated | MEDIA | A06 | Actualizar a Apache 2.4.54+ |
| Swagger UI expuesto | ALTA | A05 | Deshabilitar en producción |

---

## 🎯 Actividad Integradora: Reporte de Reconocimiento (Últimos 10 min)

Combina los hallazgos de las 3 herramientas en un reporte ejecutivo:

### Plantilla de Reporte:

```markdown
# Reporte de Reconocimiento de Seguridad
**Objetivo:** http://localhost
**Fecha:** [fecha actual]
**Herramientas:** Nmap, Whatweb, Nikto

## Resumen Ejecutivo
Se identificaron X vulnerabilidades:
- Críticas: X
- Altas: X
- Medias: X
- Bajas: X

## 1. Servicios Expuestos (Nmap)
| Puerto | Servicio | Versión |
|--------|----------|---------|
| 80 | Apache | 2.4.41 |
| 5000 | ASP.NET | 8.0 |

## 2. Tecnologías Identificadas (Whatweb)
- Servidor: Apache 2.4.41 (Ubuntu)
- Lenguaje: PHP 7.4.3
- Framework: ASP.NET Core 8.0

## 3. Vulnerabilidades Encontradas (Nikto)
| Vulnerabilidad | Severidad | OWASP |
|----------------|-----------|-------|
| X-Frame-Options missing | MEDIA | A05 |
| Directory indexing | ALTA | A05 |

## 4. Recomendaciones Prioritarias
1. Deshabilitar directory indexing
2. Actualizar Apache a versión 2.4.54+
3. Agregar security headers
4. Deshabilitar Swagger UI en producción
```

---

## ✅ Entregables

1. **Resultados de Nmap** (captura de pantalla o archivo de texto)
2. **Resultados de Whatweb** (captura de pantalla)
3. **Reporte HTML de Nikto** (`nikto-report.html`)
4. **Reporte Ejecutivo de Reconocimiento** (documento consolidado)

---

## 📊 Mapeo a Estándares

### ISO 27002:2022
- **Control 8.29:** Security testing in development and acceptance
  - Este laboratorio demuestra pruebas de seguridad en fase de desarrollo

### OWASP Testing Guide
- **WSTG-INFO-01:** Conduct Search Engine Discovery Reconnaissance
- **WSTG-INFO-02:** Fingerprint Web Server
- **WSTG-INFO-08:** Fingerprint Web Application Framework
- **WSTG-CONFIG-01:** Test Network Infrastructure Configuration

---

## 🔧 Comandos de Referencia Rápida

### Nmap:
```bash
nmap localhost                    # Escaneo básico
nmap -sV localhost                # Detectar versiones
nmap -p- localhost                # Todos los puertos
nmap -A localhost                 # Escaneo agresivo
nmap -sC localhost                # Scripts por defecto
```

### Whatweb:
```bash
whatweb http://localhost          # Básico
whatweb -v http://localhost       # Verbose
whatweb -a 3 http://localhost     # Agresivo
```

### Nikto:
```bash
nikto -h http://localhost         # Básico
nikto -h http://localhost -Tuning x   # Tuning
nikto -h http://localhost -o report.html -Format html  # Con reporte
```

---

## ⭐ [OPCIONAL] Aplica a tu Aplicación

Si tienes acceso a un ambiente de desarrollo/staging de tu aplicación:

1. **Obtén autorización explícita** de tu gerente
2. **Ejecuta las 3 herramientas** contra tu app
3. **Documenta hallazgos** (sin exponerlos públicamente)
4. **Comparte resultados** con el equipo (sanitizados)

**⚠️ ADVERTENCIA:** NUNCA escanees ambientes de producción sin autorización formal

---

## 💡 Preguntas de Reflexión

1. **¿Qué información te sorprendió encontrar en el reconocimiento?**

2. **¿Cuál de las 3 herramientas te pareció más útil? ¿Por qué?**

3. **Si fueras un atacante, ¿qué información usarías primero?**

4. **¿Cómo integrarías estas herramientas en tu proceso de desarrollo?**

---

## 🎓 Resumen

### Lo que Aprendiste:
✅ Escanear puertos y servicios con Nmap
✅ Identificar tecnologías web con Whatweb
✅ Buscar vulnerabilidades con Nikto
✅ Interpretar y documentar hallazgos
✅ Crear reportes de reconocimiento profesionales

### Próximo Paso:
**Lab 1.2:** Explotación de vulnerabilidades en DVWA

---

## 📚 Referencias

- **Nmap Official Guide:** https://nmap.org/book/
- **Nikto Documentation:** https://github.com/sullo/nikto
- **Whatweb GitHub:** https://github.com/urbanadventurer/WhatWeb
- **OWASP Testing Guide:** https://owasp.org/www-project-web-security-testing-guide/

---

**Versión:** 1.0
**Última actualización:** Diciembre 2025
