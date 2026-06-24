# PostgreSQL en SmartSched-UC

SmartSched-UC mantiene dos modos de datos:

- `postgresql`: lectura principal desde PostgreSQL usando `pg`
- `local-mock-data`: fallback automatico cuando PostgreSQL no esta habilitado o falla

## Archivos

- `smartsched_uc.sql`: archivo unico con schema, indices y datos de demostracion
- `init-db.js`: ejecuta `smartsched_uc.sql`
- `test-db.js`: prueba la conexion
- `inspect-schema.js`: lista tablas, columnas y conteos para auditar el schema real

## Flujo recomendado

1. `Copy-Item .env.example .env`
2. Ajustar `DATABASE_URL`
3. `npm run db:init`
4. `npm run db:test`
5. `npm run db:inspect`
6. `npm test`
7. `npm start`

## Dataset de demostracion

El archivo `smartsched_uc.sql` carga un escenario academico demostrativo con:

- `20` cursos
- `16` docentes
- `14` aulas
- `22` bloques horarios
- `60` estudiantes
- solicitudes de cursos por estudiante para pruebas de volumen

Este dataset esta preparado para:

- probar la generacion de horarios con seleccion parcial de cursos;
- validar `GET /api/health` con conteos reales;
- demostrar fallback local y PostgreSQL en la interfaz;
- exponer conflictos, recomendaciones y auditoria con un volumen defendible.

## Tablas creadas

- `courses`
- `teachers`
- `classrooms`
- `time_blocks`
- `teacher_availability`
- `teacher_protected_blocks`
- `course_teacher`
- `constraints`
- `schedules`
- `schedule_items`
