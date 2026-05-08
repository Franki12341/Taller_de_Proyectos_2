# ⚙️ Especificación Formal (Spec.md) - SmartSched-UC

## 1. Definición del Sistema
Sistema de generación de horarios basado en optimización combinatoria y evaluación de restricciones mediante la técnica de Backtracking.

## 2. Entradas (Inputs)
Para que el motor CSP inicie, requiere la siguiente estructura de datos:
- **Cursos Solicitados ($X$):** Array de cursos seleccionados por el estudiante para la matrícula.
- **Oferta Académica ($D$):** Tuplas de disponibilidad por curso con la estructura `(id_curso, día, hora_inicio, hora_fin, id_aula, aforo)`.
- **Historial del Estudiante:** Registro de cursos aprobados y cantidad de créditos matriculados actualmente.

## 3. Salidas (Outputs)
- **Caso de Éxito:** Un objeto JSON que contiene la matriz de horarios asignados, la cual cumple al 100% las restricciones duras y presenta el mejor puntaje de la función objetivo.
- **Caso de Fallo (Error):** Un mensaje de excepción estructurado indicando el motivo de insatisfacción (ej. `ERROR_HC01: Conflicto inevitable de solapamiento entre Curso A y Curso B`).

## 4. Reglas de Negocio
- El motor CSP debe realizar un filtrado previo de los dominios ($D$) antes de iniciar el Backtracking (ej. pre-filtrado de aulas sin aforo) para reducir el espacio de búsqueda computacional.
- Un horario generado es solo una "propuesta óptima" hasta que el sistema de matrícula confirme la reserva en base de datos.

## 5. Casos Límite (Edge Cases)
- **Caso Límite 1 (Inviabilidad Temprana de Créditos):** El estudiante envía a la API un bloque de cursos cuyos créditos suman 15 o suman 28.
  - *Acción:* El sistema rechaza la solicitud en el endpoint REST antes de invocar al motor CSP, ahorrando procesamiento.
- **Caso Límite 2 (Falta de Aforo General):** Existen combinaciones sin solapamiento de tiempo, pero ninguna combinación satisface el aforo de las aulas.
  - *Acción:* Fallo de restricción dura (HC04). Retorna respuesta nula.
- **Caso Límite 3 (Múltiples soluciones óptimas):** El motor encuentra dos combinaciones de horarios con exactamente la misma cantidad de "horas huecas" (empate en función objetivo).
  - *Acción:* Se selecciona y retorna la primera solución válida encontrada en el árbol de decisión para mantener el determinismo.
