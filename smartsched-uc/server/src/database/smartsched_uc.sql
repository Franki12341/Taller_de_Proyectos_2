-- SmartSched-UC PostgreSQL full setup
-- Incluye schema, indices y datos de demostracion

-- ===== schema.sql =====
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  credits INTEGER NOT NULL,
  course_type TEXT NOT NULL,
  type TEXT NOT NULL,
  required_hours INTEGER NOT NULL,
  estimated_students INTEGER NOT NULL,
  requires_lab BOOLEAN NOT NULL DEFAULT FALSE,
  required_classroom_type TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS teachers (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  contract_type TEXT NOT NULL,
  type TEXT NOT NULL,
  max_institutional_hours INTEGER NOT NULL,
  current_academic_hours INTEGER NOT NULL,
  administrative_hours INTEGER NOT NULL,
  max_teaching_hours INTEGER,
  specialties JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS classrooms (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  classroom_type TEXT NOT NULL,
  type TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  status TEXT NOT NULL,
  campus TEXT DEFAULT 'Huancayo',
  usage_percent NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS time_blocks (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  day TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  shift TEXT,
  type TEXT,
  duration_hours NUMERIC(4,2),
  label TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_teacher (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  teacher_id INTEGER REFERENCES teachers(id) ON DELETE CASCADE,
  course_code TEXT,
  teacher_code TEXT
);

CREATE TABLE IF NOT EXISTS teacher_availability (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER REFERENCES teachers(id) ON DELETE CASCADE,
  time_block_id INTEGER REFERENCES time_blocks(id) ON DELETE CASCADE,
  teacher_code TEXT,
  time_block_code TEXT,
  available BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS teacher_protected_blocks (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER REFERENCES teachers(id) ON DELETE CASCADE,
  time_block_id INTEGER REFERENCES time_blocks(id) ON DELETE CASCADE,
  teacher_code TEXT,
  time_block_code TEXT,
  reason TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS constraints (
  id SERIAL PRIMARY KEY,
  code TEXT,
  name TEXT NOT NULL,
  constraint_type TEXT NOT NULL,
  description TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  payload_json JSONB,
  severity TEXT
);

CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  cycle INTEGER NOT NULL,
  email TEXT NOT NULL,
  has_internship BOOLEAN NOT NULL DEFAULT FALSE,
  works BOOLEAN NOT NULL DEFAULT FALSE,
  preferred_shift TEXT,
  max_credits INTEGER NOT NULL DEFAULT 27,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_course_requests (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  priority INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'requested',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS schedules (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  valid BOOLEAN NOT NULL,
  summary JSONB NOT NULL DEFAULT '{}'::jsonb,
  metrics JSONB NOT NULL DEFAULT '{}'::jsonb,
  validation JSONB NOT NULL DEFAULT '{}'::jsonb,
  teacher_load JSONB NOT NULL DEFAULT '[]'::jsonb,
  infrastructure_usage JSONB NOT NULL DEFAULT '{}'::jsonb,
  warnings JSONB NOT NULL DEFAULT '[]'::jsonb,
  recommendations JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS schedule_items (
  id SERIAL PRIMARY KEY,
  schedule_id INTEGER NOT NULL REFERENCES schedules(id) ON DELETE CASCADE,
  course_code TEXT NOT NULL,
  course_name TEXT NOT NULL,
  teacher_code TEXT NOT NULL,
  teacher_name TEXT NOT NULL,
  classroom_code TEXT NOT NULL,
  classroom_name TEXT NOT NULL,
  day TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  duration_hours NUMERIC(4,2) NOT NULL,
  credits INTEGER NOT NULL,
  occupancy_rate NUMERIC(5,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  action VARCHAR(80) NOT NULL,
  entity VARCHAR(80) NOT NULL DEFAULT 'ui',
  description TEXT NOT NULL DEFAULT '',
  user_role VARCHAR(40) NOT NULL DEFAULT 'STUDENT',
  source VARCHAR(40) NOT NULL DEFAULT 'frontend',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE courses ADD COLUMN IF NOT EXISTS id SERIAL;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS type TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS requires_lab BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS required_classroom_type TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
UPDATE courses SET type = COALESCE(type, course_type);
UPDATE courses SET required_classroom_type = COALESCE(required_classroom_type, type, course_type);
UPDATE courses SET requires_lab = COALESCE(requires_lab, required_classroom_type = 'lab');

ALTER TABLE teachers ADD COLUMN IF NOT EXISTS id SERIAL;
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS type TEXT;
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS max_institutional_hours INTEGER;
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS current_academic_hours INTEGER;
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS administrative_hours INTEGER;
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS max_teaching_hours INTEGER;
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS specialties JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
UPDATE teachers SET type = COALESCE(type, contract_type);
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'teachers'
      AND column_name = 'max_institutional_load'
  ) THEN
    EXECUTE 'UPDATE teachers SET max_institutional_hours = COALESCE(max_institutional_hours, max_institutional_load)';
  END IF;
END $$;
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'teachers'
      AND column_name = 'current_academic_load'
  ) THEN
    EXECUTE 'UPDATE teachers SET current_academic_hours = COALESCE(current_academic_hours, current_academic_load)';
  END IF;
END $$;
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'teachers'
      AND column_name = 'administrative_load'
  ) THEN
    EXECUTE 'UPDATE teachers SET administrative_hours = COALESCE(administrative_hours, administrative_load)';
  END IF;
END $$;
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'teachers'
      AND column_name = 'max_teaching_load'
  ) THEN
    EXECUTE 'UPDATE teachers SET max_teaching_hours = COALESCE(max_teaching_hours, max_teaching_load, GREATEST(max_institutional_hours - administrative_hours, 0))';
  ELSE
    EXECUTE 'UPDATE teachers SET max_teaching_hours = COALESCE(max_teaching_hours, GREATEST(max_institutional_hours - administrative_hours, 0))';
  END IF;
END $$;

ALTER TABLE classrooms ADD COLUMN IF NOT EXISTS id SERIAL;
ALTER TABLE classrooms ADD COLUMN IF NOT EXISTS classroom_type TEXT;
ALTER TABLE classrooms ADD COLUMN IF NOT EXISTS campus TEXT DEFAULT 'Huancayo';
ALTER TABLE classrooms ADD COLUMN IF NOT EXISTS usage_percent NUMERIC(5,2) DEFAULT 0;
ALTER TABLE classrooms ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
UPDATE classrooms SET classroom_type = COALESCE(classroom_type, type);

ALTER TABLE time_blocks ADD COLUMN IF NOT EXISTS id SERIAL;
ALTER TABLE time_blocks ADD COLUMN IF NOT EXISTS shift TEXT;
ALTER TABLE time_blocks ADD COLUMN IF NOT EXISTS type TEXT;
ALTER TABLE time_blocks ADD COLUMN IF NOT EXISTS duration_hours NUMERIC(4,2);
ALTER TABLE time_blocks ADD COLUMN IF NOT EXISTS label TEXT;
ALTER TABLE time_blocks ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
UPDATE time_blocks
SET type = COALESCE(type, shift, 'regular'),
    label = COALESCE(label, code),
    duration_hours = COALESCE(duration_hours, 2);

ALTER TABLE course_teacher ADD COLUMN IF NOT EXISTS id SERIAL;
ALTER TABLE course_teacher ADD COLUMN IF NOT EXISTS course_id INTEGER;
ALTER TABLE course_teacher ADD COLUMN IF NOT EXISTS teacher_id INTEGER;
ALTER TABLE course_teacher ADD COLUMN IF NOT EXISTS course_code TEXT;
ALTER TABLE course_teacher ADD COLUMN IF NOT EXISTS teacher_code TEXT;

ALTER TABLE teacher_availability ADD COLUMN IF NOT EXISTS teacher_id INTEGER;
ALTER TABLE teacher_availability ADD COLUMN IF NOT EXISTS time_block_id INTEGER;
ALTER TABLE teacher_availability ADD COLUMN IF NOT EXISTS teacher_code TEXT;
ALTER TABLE teacher_availability ADD COLUMN IF NOT EXISTS time_block_code TEXT;
ALTER TABLE teacher_availability ADD COLUMN IF NOT EXISTS available BOOLEAN NOT NULL DEFAULT TRUE;

ALTER TABLE teacher_protected_blocks ADD COLUMN IF NOT EXISTS teacher_id INTEGER;
ALTER TABLE teacher_protected_blocks ADD COLUMN IF NOT EXISTS time_block_id INTEGER;
ALTER TABLE teacher_protected_blocks ADD COLUMN IF NOT EXISTS teacher_code TEXT;
ALTER TABLE teacher_protected_blocks ADD COLUMN IF NOT EXISTS time_block_code TEXT;

ALTER TABLE constraints ADD COLUMN IF NOT EXISTS code TEXT;
ALTER TABLE constraints ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE constraints ADD COLUMN IF NOT EXISTS active BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE constraints ADD COLUMN IF NOT EXISTS payload_json JSONB;
ALTER TABLE constraints ADD COLUMN IF NOT EXISTS severity TEXT;

ALTER TABLE schedules ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE schedules ADD COLUMN IF NOT EXISTS summary JSONB;
ALTER TABLE schedules ADD COLUMN IF NOT EXISTS metrics JSONB;
ALTER TABLE schedules ADD COLUMN IF NOT EXISTS validation JSONB;
ALTER TABLE schedules ADD COLUMN IF NOT EXISTS teacher_load JSONB;
ALTER TABLE schedules ADD COLUMN IF NOT EXISTS infrastructure_usage JSONB;
ALTER TABLE schedules ADD COLUMN IF NOT EXISTS warnings JSONB;
ALTER TABLE schedules ADD COLUMN IF NOT EXISTS recommendations JSONB;
ALTER TABLE schedules ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE schedule_items ADD COLUMN IF NOT EXISTS course_name TEXT;
ALTER TABLE schedule_items ADD COLUMN IF NOT EXISTS teacher_name TEXT;
ALTER TABLE schedule_items ADD COLUMN IF NOT EXISTS classroom_name TEXT;
ALTER TABLE schedule_items ADD COLUMN IF NOT EXISTS credits INTEGER;
ALTER TABLE schedule_items ADD COLUMN IF NOT EXISTS occupancy_rate NUMERIC(5,2);


-- ===== indexes.sql =====
CREATE INDEX IF NOT EXISTS idx_courses_code ON courses(code);
CREATE INDEX IF NOT EXISTS idx_courses_type ON courses(type);
CREATE INDEX IF NOT EXISTS idx_teachers_code ON teachers(code);
CREATE INDEX IF NOT EXISTS idx_teachers_contract_type ON teachers(contract_type);
CREATE INDEX IF NOT EXISTS idx_classrooms_code ON classrooms(code);
CREATE INDEX IF NOT EXISTS idx_classrooms_type ON classrooms(type);
CREATE INDEX IF NOT EXISTS idx_time_blocks_code ON time_blocks(code);
CREATE INDEX IF NOT EXISTS idx_time_blocks_day_start ON time_blocks(day, start_time);
CREATE INDEX IF NOT EXISTS idx_course_teacher_course_id ON course_teacher(course_id);
CREATE INDEX IF NOT EXISTS idx_course_teacher_teacher_id ON course_teacher(teacher_id);
CREATE INDEX IF NOT EXISTS idx_course_teacher_codes ON course_teacher(course_code, teacher_code);
CREATE INDEX IF NOT EXISTS idx_teacher_availability_teacher_id ON teacher_availability(teacher_id);
CREATE INDEX IF NOT EXISTS idx_teacher_availability_time_block_id ON teacher_availability(time_block_id);
CREATE INDEX IF NOT EXISTS idx_teacher_availability_codes ON teacher_availability(teacher_code, time_block_code);
CREATE INDEX IF NOT EXISTS idx_teacher_protected_blocks_teacher_id ON teacher_protected_blocks(teacher_id);
CREATE INDEX IF NOT EXISTS idx_teacher_protected_blocks_time_block_id ON teacher_protected_blocks(time_block_id);
CREATE INDEX IF NOT EXISTS idx_constraints_type ON constraints(constraint_type);
CREATE INDEX IF NOT EXISTS idx_students_code ON students(code);
CREATE INDEX IF NOT EXISTS idx_student_course_requests_student_id ON student_course_requests(student_id);
CREATE INDEX IF NOT EXISTS idx_schedules_created_at ON schedules(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_schedule_items_schedule_id ON schedule_items(schedule_id);
CREATE INDEX IF NOT EXISTS idx_schedule_items_course_code ON schedule_items(course_code);


-- ===== seed.sql =====
TRUNCATE TABLE
  audit_logs,
  schedule_items,
  schedules,
  student_course_requests,
  students,
  constraints,
  teacher_protected_blocks,
  teacher_availability,
  course_teacher,
  time_blocks,
  classrooms,
  teachers,
  courses
RESTART IDENTITY CASCADE;

INSERT INTO courses (code, name, credits, course_type, type, required_hours, estimated_students, requires_lab, required_classroom_type)
VALUES
  ('SIS-701', 'Ingenieria de Software II', 4, 'mandatory', 'theory', 4, 38, FALSE, 'theory'),
  ('SIS-702', 'Arquitectura de Software', 4, 'mandatory', 'theory', 4, 34, FALSE, 'theory'),
  ('SIS-703', 'Calidad y Pruebas de Software', 3, 'mandatory', 'theory', 4, 32, FALSE, 'theory'),
  ('SIS-704', 'Gestion de Proyectos TI', 3, 'mandatory', 'theory', 4, 36, FALSE, 'theory'),
  ('SIS-705', 'Experiencia de Usuario', 3, 'elective', 'theory', 4, 28, FALSE, 'theory'),
  ('SIS-706', 'Analitica de Datos', 4, 'mandatory', 'lab', 4, 30, TRUE, 'lab'),
  ('SIS-707', 'Base de Datos Avanzada', 4, 'mandatory', 'lab', 4, 34, TRUE, 'lab'),
  ('SIS-708', 'Mineria de Datos', 4, 'elective', 'lab', 4, 26, TRUE, 'lab'),
  ('SIS-709', 'Redes y Comunicaciones II', 4, 'mandatory', 'lab', 4, 24, TRUE, 'lab'),
  ('SIS-710', 'Seguridad Informatica', 4, 'mandatory', 'lab', 4, 22, TRUE, 'lab'),
  ('MAT-401', 'Matematica Discreta', 3, 'mandatory', 'theory', 4, 40, FALSE, 'theory'),
  ('MAT-402', 'Investigacion Operativa', 4, 'mandatory', 'theory', 4, 35, FALSE, 'theory'),
  ('ADM-501', 'Planeamiento Estrategico', 3, 'elective', 'theory', 4, 29, FALSE, 'theory'),
  ('ADM-502', 'Innovacion y Emprendimiento', 3, 'elective', 'theory', 4, 31, FALSE, 'theory'),
  ('COM-601', 'Comunicacion Profesional', 2, 'general', 'theory', 2, 42, FALSE, 'theory'),
  ('COM-602', 'Etica Profesional', 2, 'general', 'theory', 2, 44, FALSE, 'theory'),
  ('LAB-801', 'Laboratorio de Integracion I', 2, 'mandatory', 'lab', 2, 20, TRUE, 'lab'),
  ('LAB-802', 'Laboratorio de Integracion II', 2, 'mandatory', 'lab', 2, 18, TRUE, 'lab'),
  ('ELE-901', 'Topicos en IA Aplicada', 3, 'elective', 'lab', 4, 25, TRUE, 'lab'),
  ('ELE-902', 'Gobierno de TI', 3, 'elective', 'theory', 4, 27, FALSE, 'theory');

INSERT INTO teachers (
  code,
  name,
  contract_type,
  type,
  max_institutional_hours,
  current_academic_hours,
  administrative_hours,
  max_teaching_hours,
  specialties
)
VALUES
  ('DOC-001', 'Dra. Rosa Medina', 'FULL_TIME', 'FULL_TIME', 36, 10, 8, 18, '["software-engineering","software-design","requirements"]'::jsonb),
  ('DOC-002', 'Mg. Carlos Ibarra', 'FULL_TIME', 'FULL_TIME', 36, 12, 10, 16, '["databases","systems","analytics"]'::jsonb),
  ('DOC-003', 'Ing. Paola Vargas', 'PART_TIME', 'PART_TIME', 20, 4, 2, 10, '["math","logic","operations-research"]'::jsonb),
  ('DOC-004', 'Mg. Andres Salas', 'PART_TIME', 'PART_TIME', 20, 6, 2, 10, '["networks","security","infrastructure"]'::jsonb),
  ('DOC-005', 'Lic. Lucia Herrera', 'CONTRACTED', 'CONTRACTED', 12, 2, 0, 6, '["quality","project-management","ux"]'::jsonb),
  ('DOC-006', 'Mg. Elena Paredes', 'FULL_TIME', 'FULL_TIME', 36, 14, 6, 18, '["software-architecture","governance","innovation"]'::jsonb),
  ('DOC-007', 'Ing. Marco Huaman', 'PART_TIME', 'PART_TIME', 20, 6, 0, 12, '["data-mining","ai","analytics"]'::jsonb),
  ('DOC-008', 'Mg. Patricia Rojas', 'FULL_TIME', 'FULL_TIME', 36, 8, 12, 14, '["strategy","entrepreneurship","communication"]'::jsonb),
  ('DOC-009', 'Ing. Javier Cruz', 'PART_TIME', 'PART_TIME', 20, 8, 0, 12, '["lab-integration","programming","systems"]'::jsonb),
  ('DOC-010', 'Dra. Monica Flores', 'FULL_TIME', 'FULL_TIME', 36, 10, 4, 20, '["software-testing","ethics","communication"]'::jsonb),
  ('DOC-011', 'Mg. Jose Aliaga', 'CONTRACTED', 'CONTRACTED', 12, 4, 0, 8, '["governance","strategy","projects"]'::jsonb),
  ('DOC-012', 'Ing. Karen Cardenas', 'PART_TIME', 'PART_TIME', 20, 5, 1, 10, '["ux","innovation","requirements"]'::jsonb),
  ('DOC-013', 'Mg. Victor Caceres', 'FULL_TIME', 'FULL_TIME', 36, 12, 6, 18, '["databases","integration","security"]'::jsonb),
  ('DOC-014', 'Lic. Sergio Ramos', 'CONTRACTED', 'CONTRACTED', 12, 3, 0, 6, '["communication","ethics","general-studies"]'::jsonb),
  ('DOC-015', 'Dra. Nadia Rios', 'FULL_TIME', 'FULL_TIME', 36, 9, 9, 16, '["operations-research","math","analytics"]'::jsonb),
  ('DOC-016', 'Ing. Luis Galvez', 'PART_TIME', 'PART_TIME', 20, 4, 2, 10, '["security","networks","governance"]'::jsonb);

INSERT INTO classrooms (code, name, classroom_type, type, capacity, status, campus, usage_percent)
VALUES
  ('A-101', 'Aula Inteligente A-101', 'theory', 'theory', 45, 'available', 'Huancayo', 0.78),
  ('A-102', 'Aula Inteligente A-102', 'theory', 'theory', 40, 'available', 'Huancayo', 0.84),
  ('A-103', 'Aula Inteligente A-103', 'theory', 'theory', 42, 'available', 'Huancayo', 0.74),
  ('A-201', 'Aula Multimedia A-201', 'theory', 'theory', 50, 'available', 'Huancayo', 0.69),
  ('A-202', 'Aula Multimedia A-202', 'theory', 'theory', 55, 'available', 'Huancayo', 0.63),
  ('A-203', 'Aula Multimedia A-203', 'theory', 'theory', 60, 'available', 'Huancayo', 0.57),
  ('A-204', 'Aula Multimedia A-204', 'theory', 'theory', 48, 'available', 'Huancayo', 0.81),
  ('LAB-B201', 'Laboratorio B-201', 'lab', 'lab', 32, 'available', 'Huancayo', 0.87),
  ('LAB-B202', 'Laboratorio B-202', 'lab', 'lab', 30, 'available', 'Huancayo', 0.91),
  ('LAB-B203', 'Laboratorio B-203', 'lab', 'lab', 28, 'available', 'Huancayo', 0.76),
  ('LAB-B204', 'Laboratorio B-204', 'lab', 'lab', 34, 'available', 'Huancayo', 0.88),
  ('LAB-C301', 'Laboratorio C-301', 'lab', 'lab', 36, 'available', 'Huancayo', 0.72),
  ('LAB-C302', 'Laboratorio C-302', 'lab', 'lab', 40, 'available', 'Huancayo', 0.79),
  ('LAB-D110', 'Laboratorio de Redes D-110', 'lab', 'lab', 26, 'available', 'Huancayo', 0.66);

INSERT INTO time_blocks (code, day, start_time, end_time, shift, type, duration_hours, label)
VALUES
  ('TB-01', 'Monday', '08:00', '10:00', 'morning', 'morning', 2, 'Bloque 1'),
  ('TB-02', 'Monday', '10:00', '12:00', 'morning', 'morning', 2, 'Bloque 2'),
  ('TB-03', 'Monday', '14:00', '16:00', 'afternoon', 'afternoon', 2, 'Bloque 3'),
  ('TB-04', 'Monday', '16:00', '18:00', 'afternoon', 'afternoon', 2, 'Bloque 4'),
  ('TB-05', 'Tuesday', '08:00', '10:00', 'morning', 'morning', 2, 'Bloque 1'),
  ('TB-06', 'Tuesday', '10:00', '12:00', 'morning', 'morning', 2, 'Bloque 2'),
  ('TB-07', 'Tuesday', '14:00', '16:00', 'afternoon', 'afternoon', 2, 'Bloque 3'),
  ('TB-08', 'Tuesday', '16:00', '18:00', 'afternoon', 'afternoon', 2, 'Bloque 4'),
  ('TB-09', 'Wednesday', '08:00', '10:00', 'morning', 'morning', 2, 'Bloque 1'),
  ('TB-10', 'Wednesday', '10:00', '12:00', 'morning', 'morning', 2, 'Bloque 2'),
  ('TB-11', 'Wednesday', '14:00', '16:00', 'afternoon', 'afternoon', 2, 'Bloque 3'),
  ('TB-12', 'Wednesday', '16:00', '18:00', 'afternoon', 'afternoon', 2, 'Bloque 4'),
  ('TB-13', 'Thursday', '08:00', '10:00', 'morning', 'morning', 2, 'Bloque 1'),
  ('TB-14', 'Thursday', '10:00', '12:00', 'morning', 'morning', 2, 'Bloque 2'),
  ('TB-15', 'Thursday', '14:00', '16:00', 'afternoon', 'afternoon', 2, 'Bloque 3'),
  ('TB-16', 'Thursday', '16:00', '18:00', 'afternoon', 'afternoon', 2, 'Bloque 4'),
  ('TB-17', 'Friday', '08:00', '10:00', 'morning', 'morning', 2, 'Bloque 1'),
  ('TB-18', 'Friday', '10:00', '12:00', 'morning', 'morning', 2, 'Bloque 2'),
  ('TB-19', 'Friday', '14:00', '16:00', 'afternoon', 'afternoon', 2, 'Bloque 3'),
  ('TB-20', 'Friday', '16:00', '18:00', 'afternoon', 'afternoon', 2, 'Bloque 4'),
  ('TB-21', 'Saturday', '08:00', '10:00', 'morning', 'morning', 2, 'Bloque 1'),
  ('TB-22', 'Saturday', '10:00', '12:00', 'morning', 'morning', 2, 'Bloque 2');

INSERT INTO course_teacher (course_id, teacher_id, course_code, teacher_code)
SELECT c.id, t.id, links.course_code, links.teacher_code
FROM (VALUES
  ('SIS-701', 'DOC-001'), ('SIS-701', 'DOC-006'),
  ('SIS-702', 'DOC-006'), ('SIS-702', 'DOC-005'),
  ('SIS-703', 'DOC-010'), ('SIS-703', 'DOC-005'),
  ('SIS-704', 'DOC-005'), ('SIS-704', 'DOC-011'),
  ('SIS-705', 'DOC-012'), ('SIS-705', 'DOC-008'),
  ('SIS-706', 'DOC-007'), ('SIS-706', 'DOC-002'),
  ('SIS-707', 'DOC-002'), ('SIS-707', 'DOC-013'),
  ('SIS-708', 'DOC-007'), ('SIS-708', 'DOC-015'),
  ('SIS-709', 'DOC-004'), ('SIS-709', 'DOC-016'),
  ('SIS-710', 'DOC-004'), ('SIS-710', 'DOC-013'),
  ('MAT-401', 'DOC-003'), ('MAT-401', 'DOC-015'),
  ('MAT-402', 'DOC-003'), ('MAT-402', 'DOC-015'),
  ('ADM-501', 'DOC-008'), ('ADM-501', 'DOC-011'),
  ('ADM-502', 'DOC-008'), ('ADM-502', 'DOC-012'),
  ('COM-601', 'DOC-014'), ('COM-601', 'DOC-010'),
  ('COM-602', 'DOC-014'), ('COM-602', 'DOC-010'),
  ('LAB-801', 'DOC-009'), ('LAB-801', 'DOC-013'),
  ('LAB-802', 'DOC-009'), ('LAB-802', 'DOC-007'),
  ('ELE-901', 'DOC-007'), ('ELE-901', 'DOC-013'),
  ('ELE-902', 'DOC-011'), ('ELE-902', 'DOC-016')
) AS links(course_code, teacher_code)
JOIN courses c ON c.code = links.course_code
JOIN teachers t ON t.code = links.teacher_code;

INSERT INTO teacher_availability (teacher_id, time_block_id, teacher_code, time_block_code, available)
SELECT t.id, tb.id, t.code, tb.code, TRUE
FROM teachers t
JOIN time_blocks tb ON 1 = 1
WHERE
  (t.code IN ('DOC-001', 'DOC-006', 'DOC-010', 'DOC-013') AND tb.day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday') AND tb.start_time IN ('08:00', '10:00', '14:00'))
  OR (t.code IN ('DOC-002', 'DOC-007', 'DOC-009', 'DOC-015') AND tb.day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday') AND tb.start_time IN ('10:00', '14:00', '16:00'))
  OR (t.code IN ('DOC-003', 'DOC-004', 'DOC-012', 'DOC-016') AND tb.day IN ('Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday') AND tb.start_time IN ('08:00', '10:00', '16:00'))
  OR (t.code IN ('DOC-005', 'DOC-008', 'DOC-011', 'DOC-014') AND tb.day IN ('Monday', 'Thursday', 'Friday', 'Saturday') AND tb.start_time IN ('08:00', '10:00', '14:00'));

INSERT INTO teacher_protected_blocks (teacher_id, time_block_id, teacher_code, time_block_code, reason)
SELECT t.id, tb.id, t.code, tb.code, protected.reason
FROM (VALUES
  ('DOC-001', 'TB-06', 'Coordinacion de escuela'),
  ('DOC-002', 'TB-14', 'Comite curricular'),
  ('DOC-004', 'TB-11', 'Soporte de laboratorio'),
  ('DOC-006', 'TB-02', 'Revision de planes curriculares'),
  ('DOC-008', 'TB-18', 'Consejo de facultad'),
  ('DOC-010', 'TB-10', 'Tutoria academica'),
  ('DOC-015', 'TB-21', 'Investigacion institucional')
) AS protected(teacher_code, time_block_code, reason)
JOIN teachers t ON t.code = protected.teacher_code
JOIN time_blocks tb ON tb.code = protected.time_block_code;

INSERT INTO constraints (code, name, constraint_type, description, active, payload_json, severity)
VALUES
  ('HC-001', 'Un estudiante no puede tener dos cursos en el mismo horario.', 'HARD', 'Evita cruces de horario para el estudiante.', TRUE, NULL, 'critical'),
  ('HC-002', 'Un docente no puede dictar dos cursos al mismo tiempo.', 'HARD', 'Evita solapamiento de carga docente.', TRUE, NULL, 'critical'),
  ('HC-003', 'Un aula no puede ser usada por dos cursos simultaneamente.', 'HARD', 'Protege la asignacion exclusiva de aulas.', TRUE, NULL, 'critical'),
  ('HC-004', 'El aula debe cubrir la cantidad estimada de estudiantes.', 'HARD', 'Valida capacidad minima de aula.', TRUE, NULL, 'critical'),
  ('HC-005', 'Los bloques protegidos por carga administrativa no se pueden ocupar.', 'HARD', 'Respeta bloques de coordinacion y gestion.', TRUE, NULL, 'critical'),
  ('HC-006', 'La carga docente asignada no debe superar la disponibilidad efectiva.', 'HARD', 'Evita sobreasignacion docente.', TRUE, NULL, 'critical'),
  ('SC-001', 'Favorecer horarios compactos para estudiantes con practicas o trabajo.', 'SOFT', 'Mejora compatibilidad estudiantil.', TRUE, NULL, 'medium'),
  ('SC-002', 'Mantener la ocupacion de aula ideal entre 75% y 90%.', 'SOFT', 'Promueve uso eficiente de infraestructura.', TRUE, NULL, 'medium'),
  ('SC-003', 'Priorizar docentes con menor carga academica actual.', 'SOFT', 'Distribuye la carga de forma equilibrada.', TRUE, NULL, 'medium'),
  ('SC-004', 'Evitar sobreasignar docentes con alta carga administrativa.', 'SOFT', 'Reduce riesgo institucional.', TRUE, NULL, 'medium'),
  ('SC-005', 'Reducir subutilizacion de infraestructura y dispersion horaria.', 'SOFT', 'Aumenta sostenibilidad operativa.', TRUE, NULL, 'medium'),
  ('POL-001', 'occupancy-policy', 'SOFT', 'Parametros de ocupacion ideal.', TRUE, '{"occupancyPolicy":{"idealMin":0.75,"idealMax":0.9,"riskAbove":0.95,"invalidAbove":1,"underuseBelow":0.6}}'::jsonb, 'info'),
  ('POL-002', 'teacher-policy', 'SOFT', 'Parametros de carga docente.', TRUE, '{"teacherPolicy":{"fullTimeInstitutionalLimit":36,"partTimeInstitutionalLimit":20,"adjunctInstitutionalLimit":12}}'::jsonb, 'info'),
  ('POL-003', 'student-policy', 'SOFT', 'Parametros de compatibilidad estudiantil.', TRUE, '{"studentPolicy":{"compactSchedulePreferred":true,"compatibleWithInternships":true,"maxDailySpanHoursRecommended":6}}'::jsonb, 'info');

INSERT INTO students (code, first_name, last_name, cycle, email, has_internship, works, preferred_shift, max_credits)
SELECT
  'STU-' || LPAD(gs::text, 3, '0'),
  'Estudiante' || gs,
  'Demo' || gs,
  CASE
    WHEN gs <= 15 THEN 7
    WHEN gs <= 30 THEN 8
    WHEN gs <= 45 THEN 9
    ELSE 10
  END,
  'estudiante' || gs || '@uc.edu.pe',
  (gs % 3 = 0),
  (gs % 4 = 0),
  CASE
    WHEN gs % 3 = 0 THEN 'morning'
    WHEN gs % 3 = 1 THEN 'afternoon'
    ELSE 'mixed'
  END,
  CASE
    WHEN gs >= 46 THEN 27
    ELSE 24
  END
FROM generate_series(1, 60) AS gs;

INSERT INTO student_course_requests (student_id, course_id, priority, status)
SELECT
  s.id,
  c.id,
  pref.priority,
  'requested'
FROM students s
JOIN LATERAL (
  VALUES
    ((ARRAY['SIS-701','SIS-702','SIS-703','SIS-704','SIS-705','SIS-706','SIS-707','SIS-708','SIS-709','SIS-710','MAT-401','MAT-402','ADM-501','ADM-502','COM-601','COM-602','LAB-801','LAB-802','ELE-901','ELE-902'])[((s.id - 1 + 0) % 20) + 1], 1),
    ((ARRAY['SIS-701','SIS-702','SIS-703','SIS-704','SIS-705','SIS-706','SIS-707','SIS-708','SIS-709','SIS-710','MAT-401','MAT-402','ADM-501','ADM-502','COM-601','COM-602','LAB-801','LAB-802','ELE-901','ELE-902'])[((s.id - 1 + 3) % 20) + 1], 2),
    ((ARRAY['SIS-701','SIS-702','SIS-703','SIS-704','SIS-705','SIS-706','SIS-707','SIS-708','SIS-709','SIS-710','MAT-401','MAT-402','ADM-501','ADM-502','COM-601','COM-602','LAB-801','LAB-802','ELE-901','ELE-902'])[((s.id - 1 + 6) % 20) + 1], 3),
    ((ARRAY['SIS-701','SIS-702','SIS-703','SIS-704','SIS-705','SIS-706','SIS-707','SIS-708','SIS-709','SIS-710','MAT-401','MAT-402','ADM-501','ADM-502','COM-601','COM-602','LAB-801','LAB-802','ELE-901','ELE-902'])[((s.id - 1 + 9) % 20) + 1], 4),
    ((ARRAY['SIS-701','SIS-702','SIS-703','SIS-704','SIS-705','SIS-706','SIS-707','SIS-708','SIS-709','SIS-710','MAT-401','MAT-402','ADM-501','ADM-502','COM-601','COM-602','LAB-801','LAB-802','ELE-901','ELE-902'])[((s.id - 1 + 12) % 20) + 1], 5)
) AS pref(course_code, priority) ON TRUE
JOIN courses c ON c.code = pref.course_code;

