---
sidebar_position: 1
---

# Inspección

## Objetivo
Detectar y corregir problemas de seguridad en los componentes de software.

## Entradas

- Componente de software terminado
- Checklists
- Plantilla de inspección

## Proceso

| Fase | Actividades | Mapeo ISO 27001 |
|----------|----------|----------|
| Preparación | <ul><li>Definir encargado del componente</li><li>El encargado prepara la presentación del componente</li><li>El encargado prepara la bitácora de inspección a partir de la plantilla de inspección</li><li>Agendar reunión de inspección con los inspectores</li></ul>  | |
| Reunión de inspección | <ul><li>Se define el moderador y se registra el inicio de la reunión en la bitácora de inspección</li><li>El encargado del componente presenta el componente</li><li>Los inspectores realizan su revisión y registran los defectos en su log de defectos de la bitácora</li><li>El moderador realiza el log de defectos de la inspección y registra en la bitácora los datos de los defectos encontrados.</li><li>Con base en los datos de la inspección: <ul><li>Se agregan a las checklists de análisis, diseño y desarrollo nuevos elementos descubiertos a raíz de la fase de inyección de los defectos encontrados</li><li>Se eliminan de las checklists de análisis, diseño y desarrollo elementos asociados a defectos que el equipo ya no inyecta</li><li>Se repriorizan los elementos de las checklists de análisis, diseño y desarrollo de acuerdo a los datos de los defectos mayores y más comunes</li><li>Se definen mejoras al proceso de ingeniería de software</li></ul></li><li>Se estima el tiempo de corrección de los defectos y se agenda una reunión de seguimiento. Si el tiempo estimado de corrección es mayor al tiempo de volver a construir el componente, entonces se cierra el proceso de inspección, se inicia la construcción del componente y se planea una nueva inspección</li><li>Se cierra la bitácora de inspección</li></ul> | 8.2, 8.3, 8.5, 8.8, 8.9, 8.12, 8.15, 8.16, 8.21, 8.24, 8.25, 8.26, 8.27, 8.29, 8.31, 8.33 |
| Corrección | <ul><li>Se corrigen todos los defectos del componente de software registrados en la bitácora</li><li>Un miembro del equipo distinto a quien hizo las correcciones revisa el componente con la checklist para asegurar que la corrección no introduzca nuevos defectos </li></ul> | 8.28, 8.25 |
| Seguimiento | <ul><li>Dependiendo de la cantidad de defectos, se planea una nueva inspección o se hace una revisión con el moderador y al menos 2 revisores para verificar que todos los defectos se hayan corregido y que no se inyectaron nuevos defectos. Se cierra el proceso de inspección.</li></ul> | 8.25 |

## Salidas

- Componente de software corregido
- Checklists actualizadas
- Riesgos de seguridad de la información controlados
- Bitácora de inspección