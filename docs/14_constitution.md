# 📜 Constitution (Spec-Driven Development) - SmartSched-UC

## 1. Principios del Sistema
- **Determinismo Matemático:** El motor CSP debe encontrar una solución válida si y solo si existe al menos una combinación en los dominios que satisfaga todas las restricciones.
- **Trazabilidad de Fallos:** Si no se puede generar un horario, el sistema debe ser capaz de indicar qué restricción exacta causó el bloqueo.
- **Eficiencia:** El sistema priorizará la poda temprana de dominios para optimizar el tiempo de respuesta del algoritmo.

## 2. Reglas Globales
- El entorno operará bajo un modelo de currículo flexible de la Universidad Continental.
- La evaluación se realizará de forma estricta: todo cruce detectado invalidará automáticamente la rama de búsqueda actual (Backtracking).

## 3. Clasificación de Restricciones (Del Modelo CSP)

### 3.1. Restricciones Duras (Hard Constraints)
Son obligatorias. Su incumplimiento genera un estado de fallo y rechaza el horario.
- **HC01 - No solapamiento:** Para cualquier par de cursos $i, j$, se debe cumplir que $(fin_i \leq inicio_j) \vee (fin_j \leq inicio_i)$.
- **HC02 - Límite de Créditos:** La suma total de créditos de los cursos asignados debe cumplir la inecuación $20 \leq \Sigma \text{ créditos} \leq 22$.
- **HC03 - Prerrequisitos:** Un curso solo es elegible (variable $X$) si el estudiante ha aprobado previamente sus prerrequisitos.
- **HC04 - Disponibilidad Técnica:** Un aula no puede asignarse a más de un curso en el mismo bloque horario y debe contar con la capacidad (aforo) requerida.

### 3.2. Restricciones Blandas (Soft Constraints / Función Objetivo)
No invalidan el horario, pero guían la optimización.
- **SC01 - Minimización de huecos:** Minimizar los tiempos muertos entre clases en un mismo día.
- **SC02 - Maximización de bloques:** Agrupar horarios para consolidar bloques libres completos (turno mañana o turno tarde).
