# SmartSched-UC

SmartSched-UC es un MVP academico para generar horarios universitarios con reglas tipo CSP/backtracking. Ahora puede usar PostgreSQL como fuente principal con `pg` y mantiene fallback automatico a datos locales estructurados cuando la base no esta disponible.

## Mejoras incluidas

- backend Express organizado para listar cursos, docentes, aulas, bloques horarios y restricciones
- motor de horarios con validacion, metricas, advertencias y recomendaciones
- optimizacion de carga academica para acercarse a 25 creditos sin superar el limite
- validacion de ocupacion de aulas con estados ideal, riesgo, subutilizada e invalida
- dataset local mas realista con carga docente, carga administrativa, capacidad de aulas y uso de infraestructura
- frontend React mas claro para estudiantes y coordinacion academica
- integracion PostgreSQL con `pg`, healthcheck y persistencia de horarios validos
- auditoria de eventos, notificaciones, manejo de errores y modo demostracion para exposicion academica
- notas operativas en `server/src/database/README.md` y `server/src/database/postgres.notes.md`

## Endpoints principales

- `GET /api/courses`
- `GET /api/teachers`
- `GET /api/classrooms`
- `GET /api/time-blocks`
- `GET /api/constraints`
- `GET /api/health`
- `POST /api/schedules/generate`
- `POST /api/schedules/validate`

Todos los listados devuelven `data`, `pagination` y `meta`.

## Como probar

1. `cd server`
2. `npm install`
3. `Copy-Item .env.example .env`
4. `npm run db:init`
5. `npm run db:test`
6. `npm test`
7. `npm start`
8. `cd ../client`
9. `npm test -- --watchAll=false`
10. `npm run build`

## Estado actual

- Fuente de datos: PostgreSQL con fallback a local mock data
- Compresion HTTP: activa en Express
- Cache simple: activa en endpoints GET
- Base de datos: conectable con `DATABASE_URL` y `USE_POSTGRES=true`
