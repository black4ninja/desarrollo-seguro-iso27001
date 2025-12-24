---
sidebar_position: 1
---

# Día 1: Controles ISO 27001/27002:2022 y OWASP Top 10

## 📅 Agenda del Día (5 horas)


| Hora | Duración | Actividad | Tipo |
|------|----------|-----------|------|
| 09:05 - 10:00 | 55 min | Presentación y expectativas | Intro |
| 10:00 - 10:50 | 50 min | Introducción a ISO y OWASP | Teoría |
| 10:50 - 11:10 | 20 min | ☕ Receso | - |
| 11:10 - 11:50 | 40 min | Conceptos fundamentales de seguridad | Teoría |
| 11:50 - 12:50 | 60 min | **Lab 1.1:** Práctica controles de ISO | Práctica |
| 12:50 - 13:10 | 20 min | ☕ Receso | - |
| 13:10 - 14:00 | 50 min | Preparación para inspección de seguridad | Práctica |


## 🎯 Objetivos del Día

Al finalizar el Día 1, podrás:

1. ✅ Comprender el marco normativo ISO 27001/27002:2022
2. ✅ Identificar las vulnerabilidades del OWASP Top 10
3. ✅ Mapear controles ISO a vulnerabilidades OWASP
4. ✅ Explotar vulnerabilidades básicas en DVWA
5. ✅ Realizar reconocimiento de aplicaciones web

## 📚 Contenido Teórico

### Presentación y expectativas

📄 [Ver contenido completo: Presentaciones y expectativas](https://padlet.com/edjuarezp1/desarrollo-seguro-sgf83yviy1mmpcy2)

### Introducción a ISO 27001

📄 [Ver contenido completo: Introducción a ISO 27001](https://docs.google.com/presentation/d/11ZiM_yI5Au4D1wAwae2dKe9fiT9plT4l40wRjwhTWjk/edit?usp=sharing)


### Sesión 1: Marco Normativo 
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

### Sesión 3: Introducción a Pentesting 
**Facilitador:** Técnico y Laboratorios

- ¿Qué es el pentesting?
- Metodologías: OWASP Testing Guide, PTES
- Fases: Reconocimiento, Escaneo, Explotación, Post-explotación
- Herramientas básicas: nmap, Nikto, whatweb
- Consideraciones éticas y legales

## 🔬 Laboratorios Prácticos

### Lab 1.1: Mapeo de Controles ISO 
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

### Lab 1.2: DVWA - Exploración de Vulnerabilidades 
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

### Lab 1.3: Reconocimiento Básico 
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

### Lab: Preparación para inspección de seguridad
**Tipo:** Práctica en equipo

📄 [Ver contenido completo: Lab: Preparación para inspección de seguridad](./labs/lab-preparacion-inspeccion)

**Entregables:** Componente listo para ser inspeccionado, checklist para inspección y plantilla de inspección.

## 📦 Entregables del Día 1

1. ✅ Matriz de mapeo de controles ISO → OWASP
2. ✅ Reporte de explotación de DVWA
3. ✅ Reporte de reconocimiento de aplicación vulnerable
<!-- @Alex lo de abajo ya son entregables de la sesión, lo de arriba hay que revisarlos si todavía aplican -->
4. ✅ Componente listo para ser inspeccionado
5. ✅ Checklist lista para realizar inspección
6. ✅ Plantilla de inspección

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

- [Checklist para inspección](./recursos/checklists/inspeccion)
<!-- @Alex lo de arriba ya son recursos de la sesión, lo de abajo hay que revisarlos si todavía aplican -->
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
