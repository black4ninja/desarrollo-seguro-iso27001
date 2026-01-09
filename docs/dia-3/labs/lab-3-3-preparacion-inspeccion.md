---
sidebar_position: 3
---

# Lab 3.3: Preparación para la Inspección de Seguridad

## Proceso general

Las inspecciones son la práctica más efectiva para encontrar defectos en el software. 

Una inspección de seguridad es un proceso estructurado diseñado para encontrar defectos, que además permite determinar si el sofware ya está libre de defectos o en su caso, estimar cuántos defectos aún no han sido encontrados.

Se sugiere agregar a la política de seguridad de la información: *Todos los componentes críticos de los proyectos deben ser inspeccionados*. Esta es una aplicación ISO 27001 de los controles 5.1 (*Policies for information security*) y 5.8 (*Information security in project management*). Aplicar esta política, es una aplicación del control 8.25 (*Secure coding*) y a su vez es parte de los controles 8.25 (*Secure development life cycle*) y 8.29 (*Security testing in development
and acceptance*). Agregar esto al SoA (*Statement of Applicability*).

El proceso de inspección se compone de las siguientes fases:

- Preparación
- Reunión de inspección
- Corrección
- Seguimiento

En este laboratorio, ejecutaremos la fase de preparación del proceso.

La entrada del proceso es un componente de software terminado. Sin el componente listo, el proceso no debe ser iniciado, pues resultará en trabajo poco efectivo y pérdida de tiempo para todos los participantes.

## Inspección: Fase de Preparación

1. Reúnete en el equipo de tu proyecto actual. 
2. Seleccionen el componente a inspeccionar, de preferencia el componente más crítico que tengan listo.
3. Designen a un encargado del componente, de preferencia la persona que tuvo una mayor participación en la creación del componente. El encargado del componente se encargará de preparar el componente a inspeccionar.
4. El resto del equipo se encargará de preparar la checklist para la inspeccción.

### Preparación del componente a inspeccionar

Acciones del encargado del componente:
- Familiarizarse con el componente.
- Identificar y reunir todos los artefactos relacionados con el componente (análisis, diseños, todos los archivos de código, diseños de pruebas, bitácoras de pruebas, artefactos de gestión, y todos los que apliquen).
- Asegurar que todos los artefactos estén disponibles para el equipo de inspección. Si es necesario preparar un artefacto para que el acceso a los artefactos sea fácil (por ejemplo, la matriz de trazabilidad).
- Prepararse para presentar el componente al equipo. La presentación debe incluir la demostración del componente, y todos los artefactos.
- Preparar la bitácora de la inspección creando una copia de la [plantilla de inspección](https://docs.google.com/spreadsheets/d/1-9UjQQLEmqfwnGWBUo_5AanqcGt8bXKLx3d-troUZGQ/edit?usp=sharing). 
- Registrar el proyecto, componente y tamaño del componente en la bitácora de inspección.

### Preparación de la checklist de inspección

Acciones del equipo de inspección:
- Crear una copia de la [checklist de inspección](https://docs.google.com/spreadsheets/d/1CX52ZQID6SzLC5qb225VK5lwZ5q_8GzaaT-yK6IJAvk/edit?usp=sharing)
- Familiarizarse con la checklist de inspección
- Complementar la checklist de inspección con la experiencia propia
    - Incluir aspectos a revisar que en el pasado han sido graves para el equipo
    - Incluir aspectos a revisar que son defectos comunes en el equipo
- Priorizar los elementos de la checklist de acuerdo a lo que puede ser más grave para el equipo y lo que es más común.

### Entregables

- Checklist lista para realizar inspección
- Bitácora de la inspección