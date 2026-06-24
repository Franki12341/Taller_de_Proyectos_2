# SmartSched-UC Frontend

La interfaz React consume la API local de SmartSched-UC y presenta un MVP academico mas claro para estudiantes y coordinacion.

## Que muestra ahora

- nombre del sistema y proposito academico
- cursos, docentes, aulas y bloques horarios desde la API local
- generacion de horario con estado, metricas, advertencias y recomendaciones
- vista amigable para estudiante y vista operativa para coordinacion

## Scripts utiles

- `npm start`: inicia el frontend en desarrollo
- `npm test`: ejecuta las pruebas del cliente
- `npm run build`: genera la version de produccion

## Notas

- El frontend sigue usando datos locales servidos por Express.
- La forma de la respuesta ya esta pensada para reemplazar la fuente local por PostgreSQL mas adelante.
