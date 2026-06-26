# EV-APP-10-modo-demostracion — Modo demostración

- Fecha: 2026-06-25 18:53:51
- Módulo: Aplicación web
- Escenario: Vista docente
- Datos utilizados: Datos servidos desde PostgreSQL según /api/health
- Acción realizada: Abrir Modo demostración
- Resultado esperado: Se muestran auditoría, notificaciones y casos
- Resultado obtenido: SmartSched-UC
Periodo 2026-10
Creditos seleccionados: 25/25
Cursos: 7
Estado: Optimo
Matricular
Estudiante
Matricula
Seleccionar periodo
Matriculate
Vista alumno
Vista docente
Proyecciones
Buscar NRC
Horario
Resumen
Coordinacion
Modo demostracion
Estado del sistema

La base relacional permite mantener consistencia entre cursos, docentes, aulas, estudiantes y horarios.

Revisar conexion
Reintentar carga de datos
API
Activa
Base de datos
PostgreSQL
Fallback
Inactivo
Ultima sincronizacion
2026-06-25T23:53:37.267Z
Cursos cargados
20
Docentes cargados
16
Aulas cargadas
14
Estudiantes
60
Estado de pruebas
Verificado manualmente
Flujo estudiante
7 cursos agregados y 25 creditos acumulados.
PostgreSQL conectado. El sistema trabaja con datos reales.
Notificaciones del sistema

La bitacora registra acciones importantes para revisar decisiones y errores.

success
06:53:41 p. m.

Horario optimo generado correctamente.

Accion sugerida: Revisa Horario, Resumen y Modo demostracion.
success
06:53:40 p. m.

Curso agregado al resumen de matricula.

Accion sugerida: Revisa el horario preliminar.
success
06:53:37 p. m.

PostgreSQL conectado correctamente.

Accion sugerida: El sistema trabaja con datos reales.
success
06:53:37 p. m.

PostgreSQL conectado correctamente.

Accion sugerida: El sistema trabaja con datos reales.
info
06:53:37 p. m.

Se cargaron cursos, docentes, aulas y reglas.

Accion sugerida: Ya puedes revisar proyecciones y generar horarios.
info
06:53:37 p. m.

Se cargaron cursos, docentes, aulas y reglas.

Accion sugerida: Ya puedes revisar proyecciones y generar horarios.
Horario optimo generado para la simulacion.
Modo demostracion

Vista compacta para demostrar madurez, resiliencia y validaciones del MVP.

Estado general del sistema
API
Activa
Base de datos
PostgreSQL
Fallback
Inactivo
Ultima sincronizacion
2026-06-25T23:53:37.267Z
Cursos
20
Docentes
16
Aulas
14
Estudiantes
60
Que valida el sistema
Cruce de horario entre cursos
Cumplido
No se detectan cruces critico
- Requisito relacionado: RF-13
- Prueba relacionada: PRB-12
- Estado: Verificado
- Alcance: evidencia funcional para SmartSched-UC; no representa una matrícula institucional real.
