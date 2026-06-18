# SmartSched-UC PostgreSQL preparation

SmartSched-UC ahora puede leer y guardar datos en PostgreSQL usando `pg`, pero conserva fallback a `academic.seed.js` si la conexion no esta disponible.

## Tablas previstas

- `courses`
  - `id`, `code`, `name`, `credits`, `course_type`, `type`, `required_hours`, `estimated_students`, `requires_lab`, `required_classroom_type`, `created_at`
- `teachers`
  - `id`, `code`, `name`, `contract_type`, `type`, `max_institutional_hours`, `current_academic_hours`, `administrative_hours`, `created_at`
- `classrooms`
  - `id`, `code`, `name`, `classroom_type`, `type`, `capacity`, `status`, `created_at`
- `time_blocks`
  - `id`, `code`, `day`, `start_time`, `end_time`, `shift`, `type`, `duration_hours`, `created_at`
- `teacher_availability`
  - `id`, `teacher_id`, `time_block_id`, `teacher_code`, `time_block_code`, `available`
- `teacher_protected_blocks`
  - `id`, `teacher_id`, `time_block_id`, `teacher_code`, `time_block_code`, `reason`
- `course_teacher`
  - `id`, `course_id`, `teacher_id`, `course_code`, `teacher_code`
- `constraints`
  - `id`, `code`, `name`, `constraint_type`, `description`, `active`
- `students`
  - `id`, `code`, `first_name`, `last_name`, `cycle`, `email`, `has_internship`, `works`, `preferred_shift`, `max_credits`, `created_at`
- `student_course_requests`
  - `id`, `student_id`, `course_id`, `priority`, `status`, `created_at`
- `schedules`
  - `id`, `name`, `valid`, `summary`, `metrics`, `validation`, `teacher_load`, `infrastructure_usage`, `warnings`, `recommendations`, `created_at`
- `schedule_items`
  - `id`, `schedule_id`, `course_code`, `course_name`, `teacher_code`, `teacher_name`, `classroom_code`, `classroom_name`, `day`, `start_time`, `end_time`, `duration_hours`, `credits`, `occupancy_rate`

## Relaciones previstas

- `courses` se relaciona con `teachers` mediante `course_teacher`.
- `schedules` tiene muchos `schedule_items`.
- `schedule_items` referencia `courses`, `teachers`, `classrooms` y `time_blocks`.
- `constraints.payload_json` puede almacenar reglas parametrizadas mientras el modelo termina de estabilizarse.

## Implementacion actual

1. `server/src/config/db.js` crea el `Pool`, expone `query`, `testConnection`, `isPostgresEnabled` y mantiene estado de fallback.
2. `server/src/services/academic-data.service.js` inspecciona el schema real y corrige lecturas con alias y joins antes de caer a mock data.
3. `server/src/database/smartsched_uc.sql` prepara la base completa y agrega compatibilidad a instalaciones previas.
4. `server/src/database/inspect-schema.js` permite comparar backend y base real.
5. `server/src/controllers/academic.controller.js` guarda horarios validos en `schedules` y `schedule_items`.
