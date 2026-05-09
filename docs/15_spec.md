# ⚙️ Especificación Formal del Sistema (Spec.md) - SmartSched-UC

## 1. Definición del Sistema
SmartSched-UC es un motor de resolución de problemas de satisfacción de restricciones (CSP) diseñado para la generación automatizada de horarios académicos en la Universidad Continental. El sistema garantiza el cumplimiento de mallas curriculares flexibles mediante algoritmos de búsqueda por Backtracking y poda de dominios.

## 2. Definición del Modelo CSP
El problema se define formalmente como una terna $(X, D, C)$:
- **Variables ($X$):** Conjunto de cursos solicitados por el estudiante $\{x_1, x_2, ..., x_n\}$.
- **Dominios ($D$):** Espacio de búsqueda compuesto por las secciones, aulas y franjas horarias disponibles para cada curso.
- **Restricciones ($C$):** Conjunto de reglas lógicas que deben satisfacerse para una solución válida.

## 3. Entradas (Inputs)
- **Perfil Estudiantil:** Identificación única, historial de créditos aprobados y ciclo actual.
- **Solicitud de Carga Académica ($X$):** Lista de IDs de cursos deseados (entre 20 y 22 créditos).
- **Catálogo de Disponibilidad ($D$):** Datos estructurados de la oferta docente, física y horaria de la universidad.

## 4. Salidas (Outputs)
- **Solución Óptima ($S$):** Objeto JSON con la asignación final que maximiza bloques compactos y minimiza "horas huecas".
- **Excepción de Insatisfactibilidad:** Diagnóstico técnico en caso de que $C$ no pueda cumplirse, identificando la variable crítica (ej. `ERROR_HC04: Capacidad de aula insuficiente para la sección seleccionada`).

## 5. Especificación de Restricciones (Reglas de Negocio)

### 5.1. Restricciones Duras (Hard Constraints - Obligatorias)
1. **HC01 - No Solapamiento:** Para cualquier par de sesiones asignadas $s_i, s_j \in S$, el intervalo de tiempo $[t_{inicio}, t_{fin}]$ no debe interceptarse si comparten el mismo docente o aula.
2. **HC02 - Límite de Créditos:** $\sum Credits(x_i) \in [20, 22]$. El motor rechaza solicitudes fuera de este rango en la capa de API (Pre-processing).
3. **HC03 - Prerrequisitos:** El curso $x_i$ solo puede asignarse si el historial del estudiante confirma la aprobación de sus requisitos académicos previos.

### 5.2. Restricciones Blandas (Soft Constraints - Optimización)
1. **SC01 - Horario Compacto:** Preferencia por la agrupación de sesiones para evitar tiempos muertos superiores a 120 minutos.
2. **SC02 - Preferencia de Turno:** Priorización de bloques horarios según la disponibilidad laboral declarada por el estudiante.

## 6. Casos Límite (Edge Cases) y Resolución de Conflictos
- **Conflictos Inevitables:** Si tras agotar el árbol de búsqueda no existe solución, el sistema aplica una técnica de **Relaxation** informando al usuario qué curso específico causa la inviabilidad para que pueda modificar su solicitud.
- **Empate de Heurística:** Ante dos soluciones con igual valor de optimización, el sistema aplica un criterio determinista basado en el menor desplazamiento físico entre aulas.
- **Inconsistencia de Datos:** Si la oferta académica ($D$) es nula para un curso solicitado, se genera una alerta temprana de "Falta de Oferta" antes de consumir recursos de cómputo en el servidor.
