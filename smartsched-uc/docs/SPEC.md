# SmartSched-UC - Spec Driven Development

## Objetivo del sistema

SmartSched-UC genera horarios academicos automaticamente para una oferta de cursos. El sistema debe producir una solucion valida que asigne curso, docente, aula, dia y bloque horario sin conflictos.

## Entidades y relaciones

- Teacher: docente con codigo, nombre, especialidades y disponibilidad semanal.
- Course: curso con codigo, docente asignado, horas requeridas, tipo de aula y cantidad de estudiantes.
- Classroom: aula o laboratorio con codigo, capacidad y tipo.
- Schedule: resultado generado; contiene sesiones con curso, docente, aula, dia, hora de inicio y hora de fin.

Relaciones:

- Course.teacherCode referencia Teacher.code.
- Schedule.items.courseCode referencia Course.code.
- Schedule.items.teacherCode referencia Teacher.code.
- Schedule.items.classroomCode referencia Classroom.code.

## Endpoints API

- GET `/api/teachers`: lista docentes.
- GET `/api/courses`: lista cursos.
- GET `/api/classrooms`: lista aulas.
- POST `/api/schedules/generate`: genera un horario automatico.
- POST `/api/schedules/validate`: valida un horario recibido.
- GET `/api/horarios`: endpoint heredado CRUD para compatibilidad del prototipo inicial.

## Flujo completo

1. React consulta docentes, cursos y aulas al backend Express.
2. El usuario ejecuta "Generar horario".
3. Express obtiene datos desde MongoDB si `MONGODB_URI` esta activo; si no, usa el dataset academico semilla.
4. El servicio `scheduler.service.js` crea dominios de dias, bloques y aulas posibles.
5. El algoritmo asigna sesiones por curso con heuristica determinista.
6. El validador formal revisa conflictos, disponibilidad, capacidad y horas.
7. React muestra horario, metricas y estado de validacion.

## Reglas de validacion formal

- R1: Dos sesiones del mismo docente no pueden solaparse.
- R2: Dos sesiones de la misma aula no pueden solaparse.
- R3: Todo bloque asignado debe estar contenido en la disponibilidad del docente.
- R4: La capacidad del aula debe ser mayor o igual a la matricula del curso.
- R5: El tipo de aula debe satisfacer el tipo requerido por el curso.
- R6: La suma de duraciones asignadas a cada curso debe ser igual a `requiredHours`.
- R7: Una solucion con cursos no asignados es invalida.

## Criterios de optimizacion

El generador evalua candidatos con un puntaje compuesto:

- Menor desperdicio de capacidad de aula.
- Menor separacion entre clases del mismo docente.
- Menor separacion entre usos de la misma aula.
- Balance de carga entre dias de la semana.

## TDD aplicado

Las pruebas Jest se escribieron para cubrir:

- RED: deteccion de conflictos de docente y aula.
- GREEN: generacion valida con restricciones completas.
- REFACTOR: separacion del motor puro, controladores Express y modelos MongoDB.

Comando: `cd server && npm.cmd test`.

## Google Antigravity como soporte

Se documenta el uso simulado de IA asistida como apoyo metodologico para:

- Revisar el modelado CSP del problema.
- Sugerir casos limite de solapamiento y disponibilidad.
- Mejorar la heuristica de generacion con criterios de capacidad, huecos y balance.

La decision final del algoritmo, validaciones y pruebas queda implementada en el repositorio.
