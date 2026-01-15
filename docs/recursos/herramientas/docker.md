---
sidebar_position: 1
---

# Guía de Docker: Instalación, Configuración y Solución de Problemas

Esta guía te ayudará a entender Docker, las diferencias entre Docker Engine y Docker Desktop, y cómo resolver problemas comunes relacionados con sesiones y contenedores.

---

## 📦 ¿Qué es Docker?

**Docker** es una plataforma de contenedorización que permite empaquetar aplicaciones junto con todas sus dependencias en unidades estandarizadas llamadas **contenedores**.

### Conceptos Clave

- **Contenedor**: Instancia ejecutable de una imagen. Es un proceso aislado que contiene la aplicación y todo lo necesario para ejecutarla.
- **Imagen**: Plantilla de solo lectura que contiene el código, bibliotecas, dependencias y configuración necesaria para crear un contenedor.
- **Docker Daemon**: Servicio en segundo plano que gestiona contenedores, imágenes, redes y volúmenes.
- **Docker CLI**: Interfaz de línea de comandos para interactuar con el daemon.

### ¿Cómo Funciona?

```
┌─────────────────────────────────────────┐
│         Aplicación/Código               │
├─────────────────────────────────────────┤
│      Dependencias + Bibliotecas         │
├─────────────────────────────────────────┤
│        Docker Engine/Runtime            │
├─────────────────────────────────────────┤
│     Sistema Operativo (Kernel)          │
└─────────────────────────────────────────┘
```

Los contenedores comparten el kernel del sistema operativo host, pero están aislados entre sí, lo que los hace ligeros y rápidos.

### Uso en Desarrollo Seguro

En el contexto de este curso, Docker se utiliza para:
- **MobSF**: Análisis de seguridad de aplicaciones móviles
- **OWASP ZAP**: Pentesting de aplicaciones web
- **SonarQube**: Análisis estático de código
- **ELK Stack**: Logging y monitoreo
- **Ambientes de prueba aislados**: Sin afectar el sistema host

---

## 🔄 Docker Engine vs Docker Desktop

### Docker Engine (CLI)

**¿Qué es?**
Docker Engine es el motor core de Docker, compuesto por:
- Docker Daemon (`dockerd`)
- Docker CLI (`docker`)
- API REST

**Características:**
- ✅ Ligero (solo ~100 MB)
- ✅ Sin interfaz gráfica
- ✅ Ideal para servidores y automatización
- ✅ No requiere cuenta Docker Hub para uso básico
- ✅ Mejor rendimiento (menos overhead)
- ❌ Solo línea de comandos
- ❌ Requiere conocimientos técnicos
- ❌ En Windows/Mac requiere WSL2/VM

**Cuándo usar Docker Engine:**
- ✅ **Servidores Linux** (desarrollo, staging, producción)
- ✅ **Pipelines CI/CD** (GitHub Actions, GitLab CI, Jenkins)
- ✅ **Automatización** y scripts
- ✅ **Ambientes headless** (sin interfaz gráfica)
- ✅ Cuando necesitas **máximo rendimiento**
- ✅ Cuando NO quieres depender de cuenta Docker

**Instalación:**

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Verificar
docker --version
```

---

### Docker Desktop

**¿Qué es?**
Aplicación de escritorio que incluye:
- Docker Engine
- Docker CLI
- Docker Compose
- Kubernetes (opcional)
- Interfaz gráfica (GUI)
- Administrador de contenedores visual

**Características:**
- ✅ Interfaz gráfica fácil de usar
- ✅ Integración con sistema operativo
- ✅ Incluye herramientas adicionales (Kubernetes)
- ✅ Ideal para principiantes
- ✅ Funciona en Windows, Mac y Linux
- ❌ Consume más recursos (RAM, CPU, disco)
- ❌ **Requiere cuenta Docker Hub** (login periódico)
- ❌ Puede tener problemas de licenciamiento empresarial

**Cuándo usar Docker Desktop:**
- ✅ **Desarrollo local** en Windows o Mac
- ✅ **Principiantes** que prefieren GUI
- ✅ Cuando necesitas **Kubernetes local**
- ✅ Equipos pequeños o uso personal
- ❌ **NO recomendado para servidores**
- ❌ **NO recomendado si quieres evitar login**

**Instalación:**
- Descargar desde [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
- Instalar y seguir el asistente
- Requiere crear cuenta Docker Hub

---

## ⚠️ Problema Común: Sesión Expira y Detiene Contenedores

### Descripción del Problema

**Síntoma:**
- Tenías Docker funcionando en un servidor
- Instalaste Docker Desktop
- Docker Desktop requiere login periódico
- Al cerrar sesión o si no usas la cuenta, Docker Desktop se desconecta
- Los contenedores se detienen automáticamente

**Causa Raíz:**
Docker Desktop tiene una política de sesión que:
1. Requiere login cada cierto tiempo (inactividad)
2. Si no mantienes sesión activa, puede detener el daemon
3. Al detener el daemon, todos los contenedores se detienen

---

## 🔧 Soluciones al Problema

### Solución 1: Deshabilitar Requisito de Login en Docker Desktop (Más Fácil)

**Nivel de dificultad:** ⭐ Principiante
**Tiempo:** 5 minutos
**Ventajas:** Rápido, no requiere cambios mayores
**Desventajas:** Puede no funcionar en todas las versiones

**Pasos:**

1. Abre Docker Desktop
2. Ve a **Settings** (Configuración) → **General**
3. Busca la opción **"Start Docker Desktop when you log in"**
4. Actívala para que inicie automáticamente
5. En **Advanced** o **Resources**, ajusta:
   - Desactiva **"Use Docker Compose V2"** (si causa problemas)
   - Asegúrate de tener suficientes recursos asignados

**Configurar contenedores para auto-restart:**

```bash
# Para contenedores existentes
docker update --restart unless-stopped NOMBRE_CONTENEDOR

# Al crear nuevos contenedores
docker run -d --restart unless-stopped nombre_imagen
```

**Política de restart:**
- `no`: No reiniciar automáticamente (default)
- `on-failure`: Reiniciar solo si falla
- `always`: Reiniciar siempre
- `unless-stopped`: Reiniciar siempre, excepto si se detuvo manualmente

---

### Solución 2: Desinstalar Docker Desktop y Usar Docker Engine (Intermedia)

**Nivel de dificultad:** ⭐⭐ Intermedio
**Tiempo:** 20-30 minutos
**Ventajas:** Sin dependencia de cuenta, mejor rendimiento
**Desventajas:** Solo línea de comandos, requiere WSL2 en Windows

**Para Linux (Recomendado para servidores):**

```bash
# 1. Desinstalar Docker Desktop (si está instalado)
sudo apt remove docker-desktop

# 2. Instalar Docker Engine
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 3. Agregar usuario al grupo docker (opcional, para no usar sudo)
sudo usermod -aG docker $USER
newgrp docker

# 4. Verificar instalación
docker --version
docker ps

# 5. Instalar Docker Compose (si lo necesitas)
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

**Para Windows (Requiere WSL2):**

```powershell
# 1. Habilitar WSL2
wsl --install

# 2. Desinstalar Docker Desktop
# (Desde Panel de Control → Programas)

# 3. Dentro de WSL2 (Ubuntu), instalar Docker Engine
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 4. Iniciar servicio Docker
sudo service docker start

# 5. Configurar para que inicie automáticamente
echo "sudo service docker start" >> ~/.bashrc
```

---

### Solución 3: Migrar a Docker Engine + Portainer (Avanzada)

**Nivel de dificultad:** ⭐⭐⭐ Avanzado
**Tiempo:** 30-45 minutos
**Ventajas:** GUI web, sin dependencia de Docker Desktop, gestión avanzada
**Desventajas:** Requiere configuración adicional

**Portainer** es una GUI web para gestionar Docker (alternativa a Docker Desktop GUI).

```bash
# 1. Asegúrate de tener Docker Engine instalado (ver Solución 2)

# 2. Crear volumen para datos de Portainer
docker volume create portainer_data

# 3. Instalar Portainer
docker run -d \
  -p 8000:8000 \
  -p 9443:9443 \
  --name portainer \
  --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest

# 4. Acceder a Portainer
# Abre navegador: https://localhost:9443
# Crea usuario admin en primer acceso
```

**Ventajas de Portainer:**
- Interfaz web moderna
- Gestión de contenedores, imágenes, volúmenes, redes
- Monitoreo de recursos en tiempo real
- No requiere cuenta externa
- Funciona en cualquier navegador

---

### Solución 4: Configurar Políticas de Restart y Monitoreo (Avanzada)

**Nivel de dificultad:** ⭐⭐⭐ Avanzado
**Tiempo:** 15-20 minutos
**Ventajas:** Contenedores siempre disponibles
**Desventajas:** No resuelve el problema de raíz

**Paso 1: Configurar restart policy en todos los contenedores**

```bash
# Ver contenedores actuales
docker ps -a

# Actualizar política de restart
docker update --restart unless-stopped $(docker ps -aq)
```

**Paso 2: Crear script de monitoreo (opcional)**

```bash
# Crear archivo monitor-docker.sh
cat > monitor-docker.sh << 'EOF'
#!/bin/bash
# Verifica cada 60 segundos si Docker está corriendo

while true; do
  if ! docker ps > /dev/null 2>&1; then
    echo "Docker no está corriendo. Intentando iniciar..."
    sudo systemctl start docker
  fi
  sleep 60
done
EOF

# Dar permisos de ejecución
chmod +x monitor-docker.sh

# Ejecutar en segundo plano
nohup ./monitor-docker.sh &
```

**Paso 3: Crear servicio systemd (Linux)**

```bash
# Crear archivo de servicio
sudo nano /etc/systemd/system/docker-monitor.service

# Contenido:
[Unit]
Description=Docker Monitor Service
After=docker.service

[Service]
ExecStart=/ruta/completa/a/monitor-docker.sh
Restart=always

[Install]
WantedBy=multi-user.target

# Habilitar servicio
sudo systemctl daemon-reload
sudo systemctl enable docker-monitor
sudo systemctl start docker-monitor
```

---

### Solución 5: Usar Docker Compose con Auto-Restart (Intermedia)

**Nivel de dificultad:** ⭐⭐ Intermedio
**Tiempo:** 10 minutos
**Ventajas:** Gestión declarativa, fácil de replicar
**Desventajas:** Requiere aprender sintaxis Docker Compose

**Ejemplo: docker-compose.yml**

```yaml
version: '3.8'

services:
  # Ejemplo: MobSF
  mobsf:
    image: opensecurity/mobile-security-framework-mobsf:latest
    ports:
      - "8000:8000"
    restart: unless-stopped
    volumes:
      - mobsf-data:/home/mobsf/.MobSF

  # Ejemplo: SonarQube
  sonarqube:
    image: sonarqube:community
    ports:
      - "9000:9000"
    restart: unless-stopped
    environment:
      - SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true
    volumes:
      - sonarqube_data:/opt/sonarqube/data
      - sonarqube_logs:/opt/sonarqube/logs

volumes:
  mobsf-data:
  sonarqube_data:
  sonarqube_logs:
```

**Comandos:**

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver estado
docker-compose ps

# Ver logs
docker-compose logs -f

# Detener (pero no eliminar)
docker-compose stop

# Reiniciar
docker-compose restart
```

---

## 📊 Comparativa de Soluciones

| Solución | Dificultad | Tiempo | Mantiene GUI | Sin Login | Mejor para |
|----------|-----------|--------|--------------|-----------|------------|
| **1. Configurar Docker Desktop** | ⭐ | 5 min | ✅ Sí | ❌ No | Principiantes, uso personal |
| **2. Docker Engine** | ⭐⭐ | 30 min | ❌ No | ✅ Sí | Servidores, DevOps |
| **3. Engine + Portainer** | ⭐⭐⭐ | 45 min | ✅ Sí (web) | ✅ Sí | Servidores con GUI |
| **4. Políticas Restart** | ⭐⭐⭐ | 20 min | Depende | Depende | Complemento |
| **5. Docker Compose** | ⭐⭐ | 10 min | Depende | Depende | Proyectos multi-contenedor |

---

## 💡 Recomendaciones Finales

### Para Computadora Personal (Desarrollo Local)

**Opción A - Principiantes:**
- Usar **Docker Desktop**
- Mantener sesión activa
- Configurar `restart: unless-stopped` en contenedores

**Opción B - Usuarios Avanzados:**
- **Windows:** Docker Engine en WSL2
- **Mac:** Docker Desktop (no hay alternativa nativa)
- **Linux:** Docker Engine + Portainer

### Para Servidores (Desarrollo, Staging, Producción)

**Recomendación Fuerte: Docker Engine + Portainer**

Razones:
- ✅ Sin dependencia de cuenta externa
- ✅ Mejor rendimiento
- ✅ Sin problemas de licenciamiento
- ✅ GUI web accesible desde cualquier navegador
- ✅ Ideal para equipos

**NO usar Docker Desktop en servidores** porque:
- ❌ Requiere login periódico
- ❌ Consume más recursos
- ❌ Problemas de licencia empresarial (>250 empleados o >$10M ingresos)

---

## 🔐 Mejores Prácticas de Seguridad

### 1. No Ejecutar Docker como Root

```bash
# Agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Cerrar sesión y volver a entrar
```

### 2. Configurar Restart Policies

```bash
# NUNCA usar "always" en producción sin límites
# Usar "unless-stopped" o "on-failure" con max-retries

docker run -d \
  --restart on-failure:5 \
  nombre_imagen
```

### 3. Limitar Recursos

```bash
# Limitar memoria y CPU
docker run -d \
  --memory="512m" \
  --cpus="1.0" \
  nombre_imagen
```

### 4. Usar Imágenes Oficiales

```bash
# ✅ Bueno - Imagen oficial
docker pull sonarqube:community

# ❌ Malo - Imagen de fuente desconocida
docker pull usuario_random/sonarqube
```

### 5. Mantener Imágenes Actualizadas

```bash
# Actualizar imagen
docker pull nombre_imagen:latest

# Recrear contenedor con nueva imagen
docker-compose up -d --force-recreate
```

---

## 🆘 Comandos Útiles de Diagnóstico

```bash
# Ver si Docker está corriendo
docker ps

# Ver todos los contenedores (incluso detenidos)
docker ps -a

# Ver logs de un contenedor
docker logs NOMBRE_CONTENEDOR

# Ver logs en tiempo real
docker logs -f NOMBRE_CONTENEDOR

# Ver consumo de recursos
docker stats

# Reiniciar contenedor
docker restart NOMBRE_CONTENEDOR

# Ver información del sistema Docker
docker info

# Limpiar recursos no utilizados
docker system prune -a
```

---

## 📚 Recursos Adicionales

- **Documentación Oficial Docker:** [https://docs.docker.com/](https://docs.docker.com/)
- **Portainer Documentation:** [https://docs.portainer.io/](https://docs.portainer.io/)
- **Docker Compose Reference:** [https://docs.docker.com/compose/](https://docs.docker.com/compose/)
- **Docker Best Practices:** [https://docs.docker.com/develop/dev-best-practices/](https://docs.docker.com/develop/dev-best-practices/)

---

## ❓ Preguntas Frecuentes

**P: ¿Puedo tener Docker Engine y Docker Desktop instalados al mismo tiempo?**
R: No es recomendable. Pueden entrar en conflicto. Elige uno según tu caso de uso.

**P: ¿Docker Desktop es gratis?**
R: Sí para uso personal, estudiantes y empresas pequeñas (menos de 250 empleados y menos de $10M ingresos). Empresas grandes requieren licencia.

**P: ¿Necesito una cuenta Docker Hub para usar Docker Engine?**
R: No. Solo la necesitas si quieres descargar imágenes de repositorios privados o publicar imágenes.

**P: ¿Portainer es seguro para usar en producción?**
R: Sí, pero asegúrate de:
- Usar HTTPS
- Configurar autenticación fuerte
- Limitar acceso por firewall
- Mantenerlo actualizado

**P: ¿Los contenedores sobrevivirán a un reinicio del servidor?**
R: Sí, si configuraste `restart: unless-stopped` o `restart: always`.

---

**Última actualización:** Enero 2026
**Versión:** 1.0
