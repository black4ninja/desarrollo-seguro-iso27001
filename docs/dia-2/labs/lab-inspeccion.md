---
sidebar_position: 1
---

# Lab: Inspección de Seguridad

## Reunión de inspección de seguridad

Las entradas del proceso son el componente de software listo para ser presentado e inspeccionado, la checklist de inspección, y la bitácora de inspección. Sin estas entradas, el proceso no debe ser iniciado, ya que resultará en trabajo poco efectivo y pérdida de tiempo para todos los participantes.

La reunión de inspección de seguridad comienza una vez que el moderador y al menos 4 inspectores se encuentran presentes. Debe comenzar de acuerdo a las políticas de puntualidad y juntas de la organización.

Se designan los siguientes roles:
- Moderador: La persona que dirigirá y mantendrá el ritmo de la sesión.
- Inspectores: Para un inspección efectiva, se recomienda entre 4 y 6 inspectores.

### Inicio de la reunión

1. El moderador inicia el crónometro y registra en la bitácora de inspección la fecha, su nombre y el número de inspectores. 
2. El encargado del componente de software asegura el acceso a los artefactos del componente a los inspectores y presenta el componente. El encargado del componente responde a las preguntas de los inspectores. 

### Inspeccción

#### Políticas de inspección:
- No debe haber comunicación entre los inspectores, únicamente con el moderador y el encargado del componente. Esto para obtener una estimación precisa de los defectos pendientes por encontrar al finalizar la inspección.
- No se discuten soluciones, sólo se identifican los defectos

#### Procedimiento de inspección:
1. Cada inspector realiza su revisión.  
2. El inspector debe revisar el componente completo **una vez por cada tipo de defecto**, enfocándose en encontrar los defectos correspondientes al tipo de defecto que está revisando. Para cada defecto encontrado, **determinar la fase de ingeniería donde se originó el defecto** (análisis, diseño, desarrollo, pruebas). Determinar la severidad del defecto, un defecto mayor es aquel que produce resultados incorrecctos o compromete la operación del negocio.
3. Los defectos encontrados los debe registrar en su pestaña correspondiente en la bitácora de defectos del inspector. Ante la duda de si un hallazgo es un defecto, se debe registrar como defecto. En el análisis de la inspección se discutirán las dudas y se determinará si es o no un defecto.
4. Una vez que el inspector termine su inspección, debe notificar al moderador. 


### Entregables

- Componente inspeccionado
- Bitácoras de defectos de los inspectores 