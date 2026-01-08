# Lab 2.2 - Setup de Entorno Docker con Herramientas de Seguridad

**Duración:** 45 minutos
**Facilitador:** Facilitador 2 (Técnico)
**Día:** 2 - Preparación para Implementar Controles

---

## Objetivos de Aprendizaje

Al finalizar este laboratorio, los participantes podrán:

1. ✅ Configurar un entorno Docker completo con herramientas de seguridad
2. ✅ Ejecutar SonarQube, OWASP Dependency-Check, SQL Server y DVWA
3. ✅ Verificar que todos los servicios funcionan correctamente
4. ✅ Entender la arquitectura de contenedores para desarrollo seguro
5. ✅ Resolver problemas comunes de configuración

---

## Contexto

En este laboratorio configuraremos el entorno que usaremos durante el resto del curso. Todos los servicios correrán en **Docker containers**, lo que garantiza:

- ✅ **Consistencia:** Todos los participantes tienen el mismo entorno
- ✅ **Aislamiento:** Las herramientas no interfieren con tu sistema
- ✅ **Portabilidad:** Funciona en Windows, macOS y Linux
- ✅ **Limpieza:** Fácil de eliminar después del curso

**Analogía:** Docker es como tener mini-máquinas virtuales ultra-ligeras, cada una corriendo una herramienta específica sin instalación permanente en tu sistema.

---

## Servicios que Configuraremos

| Servicio | Puerto | Descripción | Uso en el Curso |
|----------|--------|-------------|-----------------|
| **SQL Server** | 1433 | Base de datos relacional | Labs de Día 1-5 |
| **DVWA** | 8080 | Aplicación web vulnerable | Pentesting (Día 1, 3) |
| **SonarQube** | 9000 | SAST (análisis estático) | Lab 2.3 (hoy) |
| **PostgreSQL** | (interno) | Base de datos para SonarQube | Soporte de SonarQube |
| **MySQL** | (interno) | Base de datos para DVWA | Soporte de DVWA |
| **Redis** | 6379 | Cache/Rate limiting | Labs de Día 4 |

**Recursos requeridos:**
- **RAM:** Mínimo 8GB (recomendado 16GB)
- **Disco:** ~10GB para imágenes y datos
- **CPU:** 2+ cores

---

## Parte 1: Pre-requisitos (5 min)

### Paso 1.1: Verificar Instalación de Docker

```bash
# Verificar que Docker está instalado
docker --version

# Debería mostrar algo como:
# Docker version 24.0.6, build ed223bc
```

Si no lo tienes instalado, descárgalo de:
- **Windows/macOS:** Docker Desktop - https://www.docker.com/products/docker-desktop/
- **Linux:** Docker Engine - https://docs.docker.com/engine/install/

### Paso 1.2: Verificar que Docker está corriendo

```bash
# Verificar que Docker daemon está activo
docker ps

# Si ves una tabla (aunque esté vacía), Docker está corriendo
# Si ves error "Cannot connect to the Docker daemon", inicia Docker Desktop
```

**macOS/Windows:** Abre Docker Desktop y espera a que muestre "Docker is running"

### Paso 1.3: Verificar Docker Compose

```bash
# Docker Compose viene incluido en Docker Desktop
docker-compose --version

# Debería mostrar algo como:
# Docker Compose version v2.23.0
```

---

## Parte 2: Obtener Archivos de Configuración (5 min)

### Paso 2.1: Crear Estructura de Directorios

```bash
# Navegar al directorio del curso
cd ~/Meeplab/Chihuahua/curso-5dias

# Crear carpeta para Docker
mkdir -p recursos/docker
cd recursos/docker
```

### Paso 2.2: Crear docker-compose.yml

Crea el archivo `docker-compose.yml` con el siguiente contenido:

```yaml
version: '3.8'

services:
  # SQL Server - Base de datos para laboratorios
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: curso-sqlserver
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=SecurePass123!
      - MSSQL_PID=Developer
    ports:
      - "1433:1433"
    volumes:
      - sqldata:/var/opt/mssql
    networks:
      - curso-network
    healthcheck:
      test: /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P SecurePass123! -Q "SELECT 1" || exit 1
      interval: 10s
      timeout: 3s
      retries: 10
      start_period: 10s

  # DVWA - Damn Vulnerable Web Application
  dvwa:
    image: vulnerables/web-dvwa
    container_name: curso-dvwa
    ports:
      - "8080:80"
    networks:
      - curso-network
    environment:
      - MYSQL_HOSTNAME=dvwa-db
      - MYSQL_DATABASE=dvwa
      - MYSQL_USERNAME=dvwa
      - MYSQL_PASSWORD=dvwa
    depends_on:
      dvwa-db:
        condition: service_healthy

  # MySQL para DVWA
  dvwa-db:
    image: mysql:5.7
    container_name: curso-dvwa-db
    environment:
      - MYSQL_ROOT_PASSWORD=rootpass
      - MYSQL_DATABASE=dvwa
      - MYSQL_USER=dvwa
      - MYSQL_PASSWORD=dvwa
    networks:
      - curso-network
    volumes:
      - dvwa-db-data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      timeout: 20s
      retries: 10

  # SonarQube - Análisis estático de código
  sonarqube:
    image: sonarqube:community
    container_name: curso-sonarqube
    ports:
      - "9000:9000"
    environment:
      - SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true
      - SONAR_JDBC_URL=jdbc:postgresql://sonarqube-db:5432/sonar
      - SONAR_JDBC_USERNAME=sonar
      - SONAR_JDBC_PASSWORD=sonarpass
    volumes:
      - sonarqube_data:/opt/sonarqube/data
      - sonarqube_logs:/opt/sonarqube/logs
      - sonarqube_extensions:/opt/sonarqube/extensions
    networks:
      - curso-network
    depends_on:
      sonarqube-db:
        condition: service_healthy

  # PostgreSQL para SonarQube
  sonarqube-db:
    image: postgres:15-alpine
    container_name: curso-sonarqube-db
    environment:
      - POSTGRES_USER=sonar
      - POSTGRES_PASSWORD=sonarpass
      - POSTGRES_DB=sonar
    volumes:
      - sonarqube_db:/var/lib/postgresql/data
    networks:
      - curso-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U sonar"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis - Para rate limiting en laboratorios
  redis:
    image: redis:7-alpine
    container_name: curso-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - curso-network
    command: redis-server --appendonly yes
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  sqldata:
    name: curso_sqldata
  dvwa-db-data:
    name: curso_dvwa_db
  sonarqube_data:
    name: curso_sonarqube_data
  sonarqube_logs:
    name: curso_sonarqube_logs
  sonarqube_extensions:
    name: curso_sonarqube_extensions
  sonarqube_db:
    name: curso_sonarqube_db
  redis_data:
    name: curso_redis_data

networks:
  curso-network:
    name: curso-network
    driver: bridge
```

**💾 Alternativamente**, puedes copiar el archivo del legacy:

```bash
cp ~/Meeplab/Chihuahua/legacy-3dias/recursos/docker/docker-compose.yml .
```

---

## Parte 3: Iniciar los Servicios (15 min)

### Paso 3.1: Descargar e Iniciar Contenedores

```bash
# Asegúrate de estar en el directorio correcto
cd ~/Meeplab/Chihuahua/curso-5dias/recursos/docker

# Iniciar todos los servicios (primera vez tarda ~5-10 min descargando imágenes)
docker-compose up -d

# Output esperado:
# [+] Running 8/8
#  ✔ Network curso-network          Created
#  ✔ Volume curso_sqldata           Created
#  ✔ Volume curso_sonarqube_data    Created
#  ✔ Container curso-sonarqube-db   Started
#  ✔ Container curso-dvwa-db        Started
#  ✔ Container curso-redis          Started
#  ✔ Container curso-sqlserver      Started
#  ✔ Container curso-dvwa           Started
#  ✔ Container curso-sonarqube      Started
```

**⏱️ Tiempo esperado:**
- Primera vez: 5-10 minutos (descarga imágenes)
- Siguientes veces: 30-60 segundos

### Paso 3.2: Verificar Estado de Contenedores

```bash
# Ver contenedores corriendo
docker-compose ps

# Output esperado (después de ~2 min):
# NAME                    STATUS              PORTS
# curso-sqlserver         Up (healthy)        0.0.0.0:1433->1433/tcp
# curso-sonarqube         Up (healthy)        0.0.0.0:9000->9000/tcp
# curso-dvwa              Up (healthy)        0.0.0.0:8080->80/tcp
# curso-dvwa-db           Up (healthy)        3306/tcp
# curso-sonarqube-db      Up (healthy)        5432/tcp
# curso-redis             Up (healthy)        0.0.0.0:6379->6379/tcp
```

**🔍 Nota:** Puede tomar 1-2 minutos para que todos muestren "(healthy)". Si ves "(health: starting)", espera un poco más.

### Paso 3.3: Monitorear Logs (Opcional)

```bash
# Ver logs de todos los servicios
docker-compose logs -f --tail=50

# Ver logs de un servicio específico
docker-compose logs -f sonarqube

# Presiona Ctrl+C para salir
```

---

## Parte 4: Verificar Servicios Individualmente (15 min)

### Paso 4.1: Verificar SQL Server

**Método 1: Desde línea de comandos**

```bash
# Ejecutar query de prueba
docker exec curso-sqlserver /opt/mssql-tools/bin/sqlcmd \
  -S localhost -U sa -P "SecurePass123!" \
  -Q "SELECT @@VERSION"

# Debería mostrar la versión de SQL Server 2022
```

**Método 2: Azure Data Studio (Recomendado)**

1. Abre **Azure Data Studio** (descarga de: https://aka.ms/azuredatastudio)
2. Click en "New Connection"
3. Configuración:
   - **Server:** `localhost,1433`
   - **Authentication Type:** SQL Login
   - **User name:** `sa`
   - **Password:** `SecurePass123!`
   - **Trust server certificate:** ✅ (marcar)
4. Click "Connect"
5. Debería conectarse sin errores

**Cadena de conexión** (para usar en código .NET):
```
Server=localhost,1433;Database=master;User Id=sa;Password=SecurePass123!;TrustServerCertificate=True;
```

---

### Paso 4.2: Verificar DVWA

**Navegador web:**

1. Abre http://localhost:8080
2. Deberías ver la página de login de DVWA
3. Click en "Create / Reset Database" (primera vez)
4. Espera ~10 segundos
5. Login con:
   - **Username:** `admin`
   - **Password:** `password`
6. ✅ Si ves el dashboard, DVWA funciona correctamente

**Configurar nivel de seguridad (importante para prácticas):**

1. En DVWA, ir a: **DVWA Security**
2. Seleccionar: **Low**
3. Click "Submit"

**💡 Explicación:** Los niveles de seguridad simulan diferentes implementaciones:
- **Low:** Código vulnerable (para aprender ataques)
- **Medium:** Defensas básicas (bypasseables)
- **High:** Defensas avanzadas (difícil de vulnerar)
- **Impossible:** Código seguro (objetivo a lograr)

---

### Paso 4.3: Verificar SonarQube

**Navegador web:**

1. Abre http://localhost:9000
2. **Primera vez:** Espera 2-3 minutos a que SonarQube inicie completamente
3. Login con:
   - **Username:** `admin`
   - **Password:** `admin`
4. Te pedirá cambiar la contraseña → Usa: `Admin123!`
5. ✅ Si ves el dashboard, SonarQube funciona correctamente

**⚠️ Troubleshooting (Linux solamente):**

Si SonarQube no inicia en Linux, ejecuta:

```bash
# Configurar parámetros del kernel
sudo sysctl -w vm.max_map_count=262144
sudo sysctl -w fs.file-max=65536

# Hacer permanente
echo "vm.max_map_count=262144" | sudo tee -a /etc/sysctl.conf
```

---

### Paso 4.4: Verificar Redis

```bash
# Conectar a Redis CLI
docker exec -it curso-redis redis-cli

# Ejecutar comandos de prueba
127.0.0.1:6379> ping
PONG

127.0.0.1:6379> set test "Hello from Redis"
OK

127.0.0.1:6379> get test
"Hello from Redis"

127.0.0.1:6379> exit
```

✅ Si ves "PONG", Redis funciona correctamente.

---

## Parte 5: Script de Verificación Automatizada (5 min)

### Paso 5.1: Crear Script de Verificación

Crea el archivo `verify-services.sh`:

```bash
#!/bin/bash

echo "========================================="
echo "  Verificación de Servicios del Curso"
echo "========================================="
echo ""

# SQL Server
echo -n "SQL Server... "
if docker exec curso-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "SecurePass123!" -Q "SELECT 1" &> /dev/null; then
    echo "✅ OK"
else
    echo "❌ FAIL"
fi

# DVWA
echo -n "DVWA......... "
if curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo "✅ OK"
else
    echo "❌ FAIL"
fi

# SonarQube
echo -n "SonarQube.... "
if curl -s http://localhost:9000 > /dev/null 2>&1; then
    echo "✅ OK"
else
    echo "❌ FAIL (puede estar iniciando, espera 2 min)"
fi

# Redis
echo -n "Redis........ "
if docker exec curso-redis redis-cli ping &> /dev/null; then
    echo "✅ OK"
else
    echo "❌ FAIL"
fi

echo ""
echo "========================================="
echo "  Verificación completada"
echo "========================================="
```

### Paso 5.2: Ejecutar Script

```bash
# Dar permisos de ejecución
chmod +x verify-services.sh

# Ejecutar
./verify-services.sh
```

**Output esperado:**

```
=========================================
  Verificación de Servicios del Curso
=========================================

SQL Server... ✅ OK
DVWA......... ✅ OK
SonarQube.... ✅ OK
Redis........ ✅ OK

=========================================
  Verificación completada
=========================================
```

---

## Entregables del Laboratorio

Al finalizar, debes tener:

1. ✅ **Todos los contenedores corriendo** y con status "(healthy)"
2. ✅ **SQL Server accesible** desde Azure Data Studio
3. ✅ **DVWA cargando** en http://localhost:8080 (nivel Low configurado)
4. ✅ **SonarQube cargando** en http://localhost:9000 (contraseña cambiada)
5. ✅ **Redis respondiendo** a comandos
6. ✅ **Script de verificación** ejecutándose sin errores

---

## Comandos Útiles para el Resto del Curso

### Operaciones Básicas

```bash
# Detener todos los servicios (conserva datos)
docker-compose stop

# Iniciar servicios detenidos
docker-compose start

# Reiniciar un servicio específico
docker-compose restart sonarqube

# Ver logs de un servicio
docker-compose logs -f sqlserver

# Ver uso de recursos
docker-compose stats
```

### Limpieza

```bash
# Detener y eliminar contenedores (datos persisten)
docker-compose down

# Eliminar TODO incluyendo datos (⚠️ CUIDADO)
docker-compose down -v

# Eliminar imágenes descargadas (liberar espacio)
docker image prune -a
```

### Troubleshooting

```bash
# Recrear un contenedor específico
docker-compose up -d --force-recreate sonarqube

# Ver estado detallado
docker inspect curso-sqlserver

# Entrar a un contenedor para debugging
docker exec -it curso-sqlserver /bin/bash
```

---

## Troubleshooting Común

### Problema 1: Puerto ya en uso

**Error:** `Bind for 0.0.0.0:1433 failed: port is already allocated`

**Causa:** Ya tienes SQL Server u otro servicio usando ese puerto.

**Solución:**

```bash
# Ver qué está usando el puerto
lsof -i :1433  # macOS/Linux
netstat -ano | findstr :1433  # Windows

# Opción A: Detener el servicio existente
# (si es SQL Server local, detenerlo temporalmente)

# Opción B: Cambiar puerto en docker-compose.yml
ports:
  - "1434:1433"  # Usar 1434 en lugar de 1433
```

---

### Problema 2: SonarQube no inicia (Linux)

**Error:** SonarQube queda en estado "restarting" constantemente.

**Causa:** Linux requiere configuración adicional del kernel.

**Solución:**

```bash
sudo sysctl -w vm.max_map_count=262144
sudo sysctl -w fs.file-max=65536

# Hacer permanente
echo "vm.max_map_count=262144" | sudo tee -a /etc/sysctl.conf
echo "fs.file-max=65536" | sudo tee -a /etc/sysctl.conf
```

---

### Problema 3: DVWA muestra error de base de datos

**Error:** "Could not connect to database"

**Causa:** MySQL no terminó de inicializar.

**Solución:**

```bash
# Esperar a que MySQL esté healthy
docker-compose ps

# Si dvwa-db no está "healthy", reiniciar DVWA
docker-compose restart dvwa

# Esperar 30 segundos y refrescar navegador
```

---

### Problema 4: Docker Desktop no inicia (Mac M1/M2)

**Error:** Docker Desktop se queda en "Starting..."

**Causa:** Problemas de compatibilidad con arquitectura ARM.

**Solución:**

1. Cerrar Docker Desktop completamente
2. Abrir Terminal y ejecutar:
```bash
rm -rf ~/Library/Group\ Containers/group.com.docker
rm -rf ~/Library/Containers/com.docker.docker
rm -rf ~/.docker
```
3. Reinstalar Docker Desktop
4. En primera instalación, asegurarse de habilitar "Use Rosetta for x86/amd64 emulation" (Settings → General)

---

### Problema 5: Falta de espacio en disco

**Error:** `no space left on device`

**Causa:** Docker acumula imágenes y volúmenes no utilizados.

**Solución:**

```bash
# Ver uso de espacio
docker system df

# Limpiar recursos no utilizados
docker system prune -a

# Liberar volúmenes huérfanos
docker volume prune
```

---

## Preguntas Frecuentes

### ❓ ¿Puedo usar mis propias instalaciones de SQL Server/SonarQube?

**Respuesta:** Sí, pero NO es recomendado porque:
- Diferencias de versión causan resultados inconsistentes
- Configuraciones personales pueden interferir con laboratorios
- Docker garantiza que todos tenemos exactamente el mismo entorno

### ❓ ¿Los contenedores se inician automáticamente con mi computadora?

**Respuesta:** No, Docker Compose no configura auto-start por defecto. Debes ejecutar `docker-compose start` manualmente cada día del curso.

### ❓ ¿Qué pasa con los datos cuando detengo los contenedores?

**Respuesta:** Los datos se conservan en **Docker volumes**. Solo se pierden si ejecutas `docker-compose down -v`.

### ❓ ¿Puedo acceder a SQL Server desde Visual Studio u otro IDE?

**Respuesta:** ¡Sí! Usa la cadena de conexión:
```
Server=localhost,1433;Database=master;User Id=sa;Password=SecurePass123!;TrustServerCertificate=True;
```

### ❓ ¿Cuánta RAM necesito realmente?

**Respuesta:**
- **Mínimo:** 8GB (pero todo estará lento)
- **Recomendado:** 16GB
- **Óptimo:** 32GB

Si tienes 8GB, puedes iniciar solo los servicios necesarios para cada lab:
```bash
# Solo para Lab 2.3 (SonarQube)
docker-compose up -d sonarqube sonarqube-db

# Solo para Lab 2.4 (Dependency-Check)
docker-compose up -d sqlserver
```

---

## Arquitectura del Entorno

```
┌─────────────────────────────────────────────────────────┐
│                     Docker Host                         │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │           Network: curso-network                │   │
│  │                                                 │   │
│  │  ┌──────────────┐      ┌──────────────┐        │   │
│  │  │ SQL Server   │      │  SonarQube   │        │   │
│  │  │ :1433        │      │  :9000       │        │   │
│  │  └──────────────┘      └───────┬──────┘        │   │
│  │                                │               │   │
│  │  ┌──────────────┐      ┌───────▼──────┐        │   │
│  │  │    DVWA      │      │ PostgreSQL   │        │   │
│  │  │    :8080     │      │ (interno)    │        │   │
│  │  └───────┬──────┘      └──────────────┘        │   │
│  │          │                                     │   │
│  │  ┌───────▼──────┐      ┌──────────────┐        │   │
│  │  │   MySQL      │      │    Redis     │        │   │
│  │  │  (interno)   │      │    :6379     │        │   │
│  │  └──────────────┘      └──────────────┘        │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Volumes (persistencia):                                │
│  - curso_sqldata                                        │
│  - curso_sonarqube_data                                 │
│  - curso_dvwa_db                                        │
│  - curso_redis_data                                     │
└─────────────────────────────────────────────────────────┘
```

---

## Mapeo a Estándares

### ISO 27002:2022
- **8.25** - Ciclo de vida de desarrollo seguro → Entorno para SAST/DAST
- **8.28** - Secure coding → Herramientas de análisis
- **8.32** - Change management → Entorno controlado y reproducible

### OWASP
- **OWASP DevSecOps Guideline:** Integración de herramientas de seguridad en desarrollo

---

## Recursos Adicionales

### Documentación Oficial
- Docker Compose: https://docs.docker.com/compose/
- SQL Server en Docker: https://learn.microsoft.com/sql/linux/quickstart-install-connect-docker
- SonarQube Docker: https://docs.sonarqube.org/latest/setup/install-server/
- DVWA: https://github.com/digininja/DVWA

### Tutoriales
- Docker para Desarrolladores: https://docker-curriculum.com/
- Docker Cheat Sheet: https://dockerlabs.collabnix.com/docker/cheatsheet/

---

## ⏱️ Cronograma del Lab (45 min)

| Tiempo | Actividad | Modo |
|--------|-----------|------|
| 0-5 min | **Parte 1:** Verificar pre-requisitos | 👤 Individual |
| 5-10 min | **Parte 2:** Crear archivos de configuración | 👤 Individual |
| 10-25 min | **Parte 3:** Iniciar servicios y monitorear | 👤 Individual |
| 25-40 min | **Parte 4:** Verificar cada servicio | 👤 Individual |
| 40-45 min | **Parte 5:** Script de verificación | 👤 Individual |

---

## Checklist Final

Antes de continuar al siguiente laboratorio, verifica:

- [ ] `docker-compose ps` muestra todos los servicios con "(healthy)"
- [ ] Azure Data Studio conecta a SQL Server
- [ ] DVWA carga en http://localhost:8080 y puedes hacer login
- [ ] SonarQube carga en http://localhost:9000 y cambiaste la contraseña
- [ ] Redis responde a `ping` con "PONG"
- [ ] Script de verificación muestra todos ✅

**Si todo está ✅, estás listo para el Lab 2.3 - SonarQube!**

---

**¿Dudas o problemas?** Levanta la mano o consulta con el Facilitador 2.

**Próximo laboratorio:** SAST con SonarQube - análisis de código .NET.
