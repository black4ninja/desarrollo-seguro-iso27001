---
sidebar_position: 1
---

# Día 1: Controles ISO 27001/27002:2022 y OWASP Top 10

## 📅 Agenda del Día (8 horas)

| Hora | Duración | Actividad | Tipo |
|------|----------|-----------|------|
| 09:00 - 09:15 | 15 min | Bienvenida y presentación del curso | Intro |
| 09:15 - 10:30 | 75 min | Marco normativo ISO 27001/27002 + OWASP Top 10 | Teoría |
| 10:30 - 10:45 | 15 min | ☕ Receso | - |
| 10:45 - 11:45 | 60 min | Principios fundamentales de seguridad | Teoría |
| 11:45 - 12:30 | 45 min | **Lab 1.1:** Mapeo de controles ISO | Práctica |
| 12:30 - 13:30 | 60 min | 🍽️ Almuerzo | - |
| 13:30 - 14:15 | 45 min | Introducción a pentesting | Teoría |
| 14:15 - 15:30 | 75 min | **Lab 1.2:** DVWA - Exploración de vulnerabilidades | Práctica |
| 15:30 - 15:45 | 15 min | ☕ Receso | - |
| 15:45 - 17:15 | 90 min | **Lab 1.3:** Reconocimiento básico | Práctica |
| 17:15 - 18:00 | 45 min | Revisión de hallazgos, Q&A | Discusión |

## 🎯 Objetivos del Día

Al finalizar el Día 1, podrás:

1. ✅ Comprender el marco normativo ISO 27001/27002:2022
2. ✅ Identificar las vulnerabilidades del OWASP Top 10
3. ✅ Mapear controles ISO a vulnerabilidades OWASP
4. ✅ Explotar vulnerabilidades básicas en DVWA
5. ✅ Realizar reconocimiento de aplicaciones web

## 📚 Contenido Teórico

### Sesión 1: Marco Normativo (09:15 - 10:30)
**Facilitador:** Procesos y Calidad

- Introducción a ISO 27001/27002:2022
- Control 8.28: Secure coding training
- OWASP Top 10:2021 - Visión general
- Mapeo entre ISO 27001 y OWASP Top 10
- Casos de estudio: Brechas famosas

📄 [Ver contenido completo: ISO 27001/27002](./iso-27001-27002)

### Sesión 2: Principios de Seguridad (10:45 - 11:45)
**Facilitador:** Procesos y Calidad

- Confidencialidad, Integridad, Disponibilidad (CIA Triad)
- Principio de menor privilegio
- Defense in Depth (Defensa en profundidad)
- Fail Securely
- Validación de entrada
- Codificación de salida
- Gestión de sesiones

📄 [Ver contenido completo: Principios de Seguridad](./principios-seguridad)

### Sesión 3: Introducción a Pentesting (13:30 - 14:15)
**Facilitador:** Técnico y Laboratorios

- ¿Qué es el pentesting?
- Metodologías: OWASP Testing Guide, PTES
- Fases: Reconocimiento, Escaneo, Explotación, Post-explotación
- Herramientas básicas: nmap, Nikto, whatweb
- Consideraciones éticas y legales

## 🔬 Laboratorios Prácticos

### Lab 1.1: Mapeo de Controles ISO (11:45 - 12:30)
**Facilitador:** Procesos y Calidad (lidera)
**Tipo:** Ejercicio en equipos

En este laboratorio:
- Analizar un proyecto C# de ejemplo
- Identificar controles ISO 27002:2022 aplicables
- Mapear controles a vulnerabilidades OWASP
- Crear matriz de mapeo

📄 [Ver guía completa del Lab 1.1](./labs/lab-1-1-mapeo-controles)

**Entregable:** Matriz Excel/PDF con mapeo ISO-OWASP

---

### Lab 1.2: DVWA - Exploración de Vulnerabilidades (14:15 - 15:30)
**Facilitador:** Técnico y Laboratorios
**Tipo:** Práctica individual/parejas

En este laboratorio:
- Levantar DVWA con Docker
- Explotar XSS (Reflejado y Almacenado)
- Explotar CSRF
- Explotar Command Injection
- Documentar hallazgos

📄 [Ver guía completa del Lab 1.2](./labs/lab-1-2-dvwa)

**Herramientas:**
- Docker
- Navegador web
- Burp Suite Community (opcional)

**Entregable:** Reporte de explotación con capturas

---

### Lab 1.3: Reconocimiento Básico (15:45 - 17:15)
**Facilitador:** Técnico y Laboratorios
**Tipo:** Práctica individual

En este laboratorio:
- Usar nmap para escaneo de puertos
- Identificar servicios con Nikto
- Analizar tecnologías con whatweb
- Mapear estructura de aplicación

📄 [Ver guía completa del Lab 1.3](./labs/lab-1-3-reconocimiento)

**Herramientas:**
- nmap
- Nikto
- whatweb
- Aplicación vulnerable de ejemplo

**Entregable:** Reporte de reconocimiento

## 📦 Entregables del Día 1

1. ✅ Matriz de mapeo de controles ISO → OWASP
2. ✅ Reporte de explotación de DVWA
3. ✅ Reporte de reconocimiento de aplicación vulnerable

## 🛠️ Preparación Previa

### Software Requerido
```bash
# Verificar Docker
docker --version

# Descargar imagen DVWA
docker pull vulnerables/web-dvwa

# Instalar herramientas (Linux/Mac)
sudo apt-get install nmap nikto  # Linux
brew install nmap nikto          # Mac
```

### Material a Revisar
- [ ] OWASP Top 10:2021 (lectura rápida)
- [ ] ISO 27002:2022 Control 8.28 (opcional)
- [ ] Familiarizarse con Docker básico

## 📚 Recursos Adicionales

- [OWASP Top 10:2021](https://owasp.org/Top10/)
- [ISO/IEC 27002:2022](https://www.iso.org/standard/75652.html)
- [DVWA GitHub](https://github.com/digininja/DVWA)
- [nmap Reference Guide](https://nmap.org/book/man.html)

## ❓ Preguntas Frecuentes

**P: ¿Necesito experiencia previa en seguridad?**
R: No, este día comienza desde conceptos fundamentales.

**P: ¿Qué hago si no puedo instalar Docker?**
R: Los facilitadores tienen VMs de respaldo y opciones de trabajo en parejas.

**P: ¿Es legal hacer pentesting?**
R: Sí, pero SOLO en aplicaciones de prueba (como DVWA) o con autorización explícita.

---

**Próximo:** [Día 2 - Preparación para Implementar](../dia-2/intro)
