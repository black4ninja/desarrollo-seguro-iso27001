---
sidebar_position: 1
---

# Guía del Facilitador

## 📋 Información General del Curso

**Duración Total:** 5 días (40 horas presenciales)
**Grupo:** Hasta 25 participantes
**Modalidad:** Presencial (Instalaciones del cliente o Tec Campus Chihuahua)
**Instructores:** 2 facilitadores (coordinación requerida)

## 👥 División de Responsabilidades entre Facilitadores

### Facilitador 1: Procesos, Auditoría y Calidad

**Rol:** Experto en procesos de ingeniería de software, auditoría y cumplimiento normativo

**Responsabilidades:**
- ✅ Presentación de checklists por fase del SDLC
- ✅ Inspección de componentes con estándares de calidad
- ✅ Evaluación de procesos de auditoría
- ✅ Sesiones de threat modeling (facilitación del proceso)
- ✅ Metodologías de code review
- ✅ Establecimiento de programas de mejora continua
- ✅ KPIs y métricas de seguridad

**Enfoque:** "¿QUÉ debe mejorarse y CÓMO establecer el proceso?"

### Facilitador 2: Laboratorios, Herramientas y Código

**Rol:** Experto técnico en desarrollo seguro, herramientas de seguridad y pentesting

**Responsabilidades:**
- ✅ Todos los laboratorios prácticos (setup, ejecución, troubleshooting)
- ✅ Demostración de herramientas (SonarQube, ZAP, Dependency-Check, etc.)
- ✅ Sesiones de pentesting y análisis de vulnerabilidades
- ✅ Implementación técnica de controles de seguridad
- ✅ Configuración de CI/CD security gates
- ✅ Validación técnica de correcciones de código
- ✅ Soporte en Docker y entornos de desarrollo

**Enfoque:** "CÓMO implementar técnicamente y usar las herramientas"

## 🎯 Estrategias de Coordinación

### Antes del Curso

**1-2 Semanas Antes:**
- ✅ Reunión de alineación entre facilitadores (2 horas)
- ✅ Revisión conjunta de todo el material
- ✅ División clara de responsabilidades
- ✅ Validación de labs (ambos deben conocer todos los labs)
- ✅ Prueba del entorno Docker en ambas máquinas

**1 Semana Antes:**
- ✅ Enviar a participantes: Requisitos previos, instalación de software
- ✅ Confirmar logística (proyector, WiFi, espacio para labs)
- ✅ Preparar materiales impresos (checklists, templates)

**1 Día Antes:**
- ✅ Setup del aula (proyector, red, acceso a internet)
- ✅ Verificar Docker en máquinas de participantes (si es posible)
- ✅ Preparar USB con instaladores (backup)

### Durante el Curso

**Dinámicas de Transición:**
1. **Cambio de facilitador:** Anunciar claramente "Ahora [Nombre] va a continuar con..."
2. **Transición teoría → práctica:** Facilitador 1 presenta, luego: "Vamos a poner esto en práctica con [Facilitador 2]"
3. **Labs colaborativos:** F2 lidera técnicamente, F1 circula apoyando con checklists/proceso

**Roles durante labs:**
- **Facilitador principal del lab:** Instruye, demuestra, troubleshooting técnico
- **Facilitador secundario:** Circula, apoya equipos, responde preguntas de proceso/concepto

**Comunicación:**
- 📱 **WhatsApp/Slack:** Grupo privado entre facilitadores para coordinación en tiempo real
- ⏰ **Timing:** Monitorear tiempos mutuamente, avisar si se está alargando una sesión
- 🚨 **Señales:** Establecer señales discretas si hay que ajustar (ej: "Tenemos 10 min")

### Después del Curso

**Inmediatamente después:**
- ✅ Reunión de retrospectiva (30 min)
- ✅ Identificar qué funcionó / qué mejorar
- ✅ Documentar ajustes para futuras ediciones

**1 Semana Después:**
- ✅ Procesar evaluaciones de participantes
- ✅ Actualizar materiales según feedback
- ✅ Archivar evidencias (listas de asistencia, fotos, trabajos)

## 📊 Evaluación Conjunta

### Rúbrica de Evaluación (Total: 100 puntos)

| Componente | Evaluador | Puntos | Criterios |
|------------|-----------|--------|-----------|
| **Auditoría técnica** | Facilitador 2 | 40 pts | Uso correcto de herramientas, identificación de vulnerabilidades, correcciones efectivas |
| **Proceso de auditoría** | Facilitador 1 | 20 pts | Aplicación de checklists, documentación, mapeo a ISO/OWASP |
| **Plan de mejora** | Facilitador 1 | 15 pts | Roadmap realista, KPIs, programa de mejora continua |
| **Presentación** | AMBOS | 10 pts | Claridad, demostración, Q&A |
| **Examen teórico** | AMBOS | 15 pts | 25 preguntas, calificación objetiva |

**Escala de calificación:**
- 90-100 pts (A) = Excelente
- 80-89 pts (B) = Muy Bueno
- 70-79 pts (C) = Bueno
- 60-69 pts (D) = Satisfactorio
- Menor a 60 pts (F) = Insuficiente

## 🛠️ Troubleshooting y Contingencias

### Problemas Técnicos Comunes

| Problema | Responsable | Solución |
|----------|-------------|----------|
| Docker no inicia | Facilitador 2 | USB con VMs alternativas, pares de trabajo |
| SonarQube consume mucha RAM | Facilitador 2 | Ajustar docker-compose, trabajar en grupos |
| Participantes sin permisos admin | Facilitador 2 | Coordinar con IT previo al curso |
| Red WiFi lenta/caída | Facilitador 2 | Hotspot móvil, materiales offline |
| Proyector/pantalla falla | AMBOS | Laptop de respaldo, compartir pantalla |

### Problemas de Dinámica

| Situación | Responsable | Solución |
|-----------|-------------|----------|
| Grupo muy heterogéneo (niveles) | AMBOS | Pares de trabajo (avanzado + principiante) |
| Participantes se atrasan en labs | Facilitador del lab | Extender tiempo, simplificar ejercicio, apoyo 1-a-1 |
| Preguntas fuera de alcance | AMBOS | Parking lot (lista de temas pendientes) |
| Baja participación | AMBOS | Preguntas directas, gamificación, incentivos |

## ✅ Checklist Pre-Curso

### 2 Semanas Antes
- [ ] Reunión de coordinación entre facilitadores
- [ ] Validar todos los labs en ambas máquinas
- [ ] Preparar materiales impresos
- [ ] Confirmar logística del aula

### 1 Semana Antes
- [ ] Enviar email a participantes con requisitos previos
- [ ] Confirmar instalación de software (Docker, .NET, Visual Studio/Code)
- [ ] Preparar USB con instaladores de respaldo
- [ ] Validar acceso a internet en aula

### 1 Día Antes
- [ ] Setup de aula (proyector, red, mesas)
- [ ] Imprimir listas de asistencia
- [ ] Preparar certificados en blanco
- [ ] Validar que Docker funcione en al menos 2 máquinas de prueba

### Día 1 - Mañana
- [ ] Llegar 30 min antes
- [ ] Validar proyector y presentaciones
- [ ] Arrancar Docker en máquina de demo
- [ ] Colocar materiales en mesas
- [ ] Verificar WhatsApp/Slack de coordinación

## 🎓 Certificación y Evidencias

### Para Auditoría ISO 27001

✅ **Control 8.28 (ISO 27002:2022): Secure coding training**

**Evidencias requeridas:**
1. Lista de asistencia firmada (por día)
2. Agenda del curso con temas cubiertos
3. Material didáctico (presentaciones, labs)
4. Evaluaciones aplicadas (examen + rúbricas)
5. Certificados emitidos
6. Fotos del curso (opcional, para evidencia visual)

**Responsable de recopilación:** Facilitador 1

## 📝 Notas Finales

- **Flexibilidad:** Este timeline es una guía, ajustar según dinámica del grupo
- **Participación:** Priorizar aprendizaje activo sobre cubrir todo el contenido
- **Código propio:** Si los participantes quieren auditar su código y hay tiempo, facilitarlo (Día 5)
- **Feedback continuo:** Al final de cada día, breve sesión de feedback (5 min)

---

**Versión:** 1.0
**Última actualización:** Diciembre 2025
