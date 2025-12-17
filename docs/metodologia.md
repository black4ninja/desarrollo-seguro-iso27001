---
sidebar_position: 3
---

# Metodología del Curso

## 🎓 Enfoque Pedagógico

Este curso utiliza un enfoque **learning by doing** (aprender haciendo) donde la teoría se aplica inmediatamente en laboratorios prácticos.

## 📊 Distribución del Tiempo

```
┌─────────────────────────────────────┐
│  30% Teoría                         │
│  - Presentaciones                   │
│  - Conceptos fundamentales          │
│  - Mejores prácticas                │
├─────────────────────────────────────┤
│  60% Práctica                       │
│  - Laboratorios hands-on            │
│  - Uso de herramientas              │
│  - Análisis de código real          │
├─────────────────────────────────────┤
│  10% Discusión                      │
│  - Q&A                              │
│  - Análisis de casos                │
│  - Presentaciones de equipos        │
└─────────────────────────────────────┘
```

## 👥 División de Responsabilidades

El curso cuenta con **2 facilitadores** con roles complementarios:

### Facilitador 1: Procesos, Auditoría y Calidad

**Enfoque**: "¿QUÉ debe mejorarse y CÓMO establecer el proceso?"

**Responsabilidades**:
- ✅ Presentación de checklists por fase del SDLC
- ✅ Inspección de componentes con estándares de calidad
- ✅ Evaluación de procesos de auditoría
- ✅ Facilitación de sesiones de threat modeling
- ✅ Metodologías de code review
- ✅ Establecimiento de programas de mejora continua
- ✅ KPIs y métricas de seguridad

### Facilitador 2: Laboratorios, Herramientas y Código

**Enfoque**: "CÓMO implementar técnicamente y usar las herramientas"

**Responsabilidades**:
- ✅ Todos los laboratorios prácticos (setup, ejecución, troubleshooting)
- ✅ Demostración de herramientas (SonarQube, ZAP, Dependency-Check, etc.)
- ✅ Sesiones de pentesting y análisis de vulnerabilidades
- ✅ Implementación técnica de controles de seguridad
- ✅ Configuración de CI/CD security gates
- ✅ Validación técnica de correcciones de código
- ✅ Soporte en Docker y entornos de desarrollo

## 🔄 Dinámica de Clases

### Estructura Típica de un Día

```
09:00 - 10:30  │ Teoría + Presentación (Facilitador 1 o 2)
10:30 - 10:45  │ ☕ Receso
10:45 - 12:30  │ Laboratorio Práctico (Facilitador 2 lidera)
               │ (Facilitador 1 circula y asesora)
12:30 - 13:30  │ 🍽️ Almuerzo
13:30 - 15:00  │ Teoría o Laboratorio (según agenda)
15:00 - 15:15  │ ☕ Receso
15:15 - 17:30  │ Laboratorio Práctico
17:30 - 18:00  │ Sesión de cierre, Q&A (AMBOS)
```

### Transiciones Efectivas

1. **Teoría → Práctica**: Facilitador 1 presenta conceptos, luego Facilitador 2 demuestra herramientas
2. **Durante Labs**: Facilitador 2 lidera técnicamente, Facilitador 1 apoya con checklists/proceso
3. **Cierre de Día**: Ambos facilitadores participan en retrospectiva y Q&A

## 🛠️ Metodología de Laboratorios

### Antes del Lab
1. **Presentación de objetivos** (5 min)
2. **Demostración en vivo** (10-15 min)
3. **Entrega de materiales** (guías, checklists)

### Durante el Lab
- Trabajo individual o en parejas
- Facilitadores circulan apoyando
- Troubleshooting en tiempo real
- Anotación de hallazgos

### Después del Lab
- **Revisión de hallazgos** (10-15 min)
- **Discusión de resultados**
- **Q&A abierta**
- **Entrega de reporte** (algunos labs)

## 📝 Estrategia de Evaluación

### Evaluación Continua

Durante el curso:
- ✅ Observación en laboratorios
- ✅ Calidad de reportes intermedios
- ✅ Participación en discusiones
- ✅ Aplicación de checklists

### Evaluación Final (Día 5)

| Componente | Evaluador | Puntos | Tipo |
|------------|-----------|--------|------|
| Auditoría técnica | Facilitador 2 | 40 pts | Práctica |
| Proceso de auditoría | Facilitador 1 | 20 pts | Práctica |
| Plan de mejora | Facilitador 1 | 15 pts | Documento |
| Presentación | AMBOS | 10 pts | Exposición |
| Examen teórico | AMBOS | 15 pts | Teórico |

## 🎯 Aprendizaje Activo

### Técnicas Utilizadas

1. **Pair Programming**: En laboratorios complejos
2. **Think-Pair-Share**: Para análisis de vulnerabilidades
3. **Gamificación**: Puntos por encontrar vulnerabilidades
4. **Casos Reales**: Análisis de brechas de seguridad famosas
5. **Peer Review**: Revisión entre equipos de hallazgos

### Recursos de Aprendizaje

- 📄 Presentaciones en formato PDF
- 🔧 Guías de laboratorio paso a paso
- ✅ Checklists de seguridad por tecnología
- 📋 Templates de reportes
- 🐳 Entornos Docker pre-configurados
- 📚 Material de referencia (links a OWASP, ISO, CWE)

## 🆘 Estrategias de Apoyo

### Para Participantes con Más Experiencia
- Ejercicios avanzados opcionales
- Rol de mentores en trabajo en parejas
- Investigación de CVEs relacionados
- Configuración de herramientas adicionales

### Para Participantes Principiantes
- Pair programming con alguien más experimentado
- Tiempo adicional en labs
- Apoyo 1-a-1 de facilitadores
- Material de nivelación pre-curso

### Troubleshooting Técnico
- USB con instaladores offline
- VMs pre-configuradas (backup)
- Hotspot móvil (si falla WiFi)
- Documentación offline

## 📅 Calendario de Entregas

| Día | Entregable | Formato |
|-----|------------|---------|
| 1 | Matriz de mapeo ISO-OWASP | Excel/PDF |
| 2 | Diagrama de amenazas (STRIDE) | Diagrama + PDF |
| 2 | Reporte SAST inicial | PDF |
| 3 | Reporte DAST de aplicación | PDF |
| 3 | Auditoría de configuraciones | Checklist completado |
| 4 | Pipeline CI/CD funcionando | Demo en vivo |
| 5 | Auditoría completa + Plan de acción | PDF + Presentación |

## 🔄 Mejora Continua del Curso

Después de cada impartición:
- ✅ Encuesta de satisfacción a participantes
- ✅ Reunión de retrospectiva entre facilitadores
- ✅ Actualización de materiales según feedback
- ✅ Ajuste de tiempos de laboratorios
- ✅ Incorporación de nuevas vulnerabilidades/herramientas

---

**Próximo**: [Día 1 - ISO 27001 y OWASP Top 10](./dia-1/intro)
