const {
  classrooms: localClassrooms,
  constraints: localConstraints,
  courses: localCourses,
  teachers: localTeachers,
  timeBlocks: localTimeBlocks
} = require("../data/academic.seed");
const { getClient, getConnectionStatus, isPostgresEnabled, query, testConnection } = require("../config/db");

const SCHEMA_CACHE_TTL_MS = 30 * 1000;
const PRIMARY_TABLES = [
  "courses",
  "teachers",
  "classrooms",
  "time_blocks",
  "course_teacher",
  "teacher_availability",
  "teacher_protected_blocks",
  "constraints",
  "students",
  "student_course_requests",
  "schedules",
  "schedule_items"
];

let schemaCache = {
  loadedAt: 0,
  snapshot: null
};

let dataSourceStatus = {
  database: "mock-data",
  postgresEnabled: false,
  usingFallback: true,
  lastError: null,
  lastStep: null
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getLocalAcademicDataset() {
  return {
    source: "local-mock-data",
    classrooms: clone(localClassrooms),
    constraints: clone(localConstraints),
    courses: clone(localCourses),
    studentCourseRequests: [],
    students: [],
    teachers: clone(localTeachers),
    timeBlocks: clone(localTimeBlocks)
  };
}

function setDataSourceStatus(partialStatus) {
  dataSourceStatus = {
    ...dataSourceStatus,
    ...partialStatus
  };
}

function getDataSourceStatus() {
  return { ...dataSourceStatus };
}

function parsePagination(queryParams) {
  const page = Math.max(Number.parseInt(queryParams.page || "1", 10), 1);
  const limit = Math.min(Math.max(Number.parseInt(queryParams.limit || "10", 10), 1), 50);
  const skip = (page - 1) * limit;

  return { limit, page, skip };
}

function paginate(items, queryParams) {
  const { limit, page, skip } = parsePagination(queryParams);
  const data = items.slice(skip, skip + limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total: items.length,
      totalPages: Math.max(Math.ceil(items.length / limit), 1)
    }
  };
}

function normalizeJsonArray(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  return [];
}

function calculateDurationHours(startValue, endValue) {
  if (!startValue || !endValue) {
    return 2;
  }

  const [startHours, startMinutes] = String(startValue).split(":").map(Number);
  const [endHours, endMinutes] = String(endValue).split(":").map(Number);
  const totalMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);

  return totalMinutes > 0 ? Number((totalMinutes / 60).toFixed(2)) : 2;
}

function hasTable(snapshot, tableName) {
  return Boolean(snapshot[tableName]);
}

function hasColumn(snapshot, tableName, columnName) {
  return Boolean(snapshot[tableName] && snapshot[tableName].has(columnName));
}

function pickColumn(snapshot, tableName, candidateColumns, options = {}) {
  const foundColumn = candidateColumns.find((column) => hasColumn(snapshot, tableName, column));

  if (!foundColumn && options.required) {
    throw new Error(`no existe la columna requerida ${candidateColumns.join(" / ")} en ${tableName}`);
  }

  return foundColumn || null;
}

function sqlColumn(alias, columnName, cast = "") {
  return `${alias}.${columnName}${cast}`;
}

async function getSchemaSnapshot(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && schemaCache.snapshot && schemaCache.loadedAt + SCHEMA_CACHE_TTL_MS > now) {
    return schemaCache.snapshot;
  }

  const result = await query(
    `
      SELECT table_name, column_name
      FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position
    `
  );

  const snapshot = result.rows.reduce((accumulator, row) => {
    if (!accumulator[row.table_name]) {
      accumulator[row.table_name] = new Set();
    }

    accumulator[row.table_name].add(row.column_name);
    return accumulator;
  }, {});

  schemaCache = {
    loadedAt: now,
    snapshot
  };

  return snapshot;
}

async function getSchemaDebugData() {
  const snapshot = await getSchemaSnapshot(true);
  return PRIMARY_TABLES.reduce((accumulator, tableName) => {
    accumulator[tableName] = hasTable(snapshot, tableName)
      ? [...snapshot[tableName]].sort()
      : [];
    return accumulator;
  }, {});
}

function mapCourseRow(row) {
  const requiredClassroomType = row.required_classroom_type || row.type || row.course_type || "theory";
  const requiresLab = typeof row.requires_lab === "boolean"
    ? row.requires_lab
    : requiredClassroomType === "lab";

  return {
    id: row.id || null,
    code: row.code,
    name: row.name,
    credits: Number(row.credits || 0),
    type: row.type || requiredClassroomType,
    courseType: row.course_type || row.type || "mandatory",
    requiredHours: Number(row.required_hours || 0),
    estimatedStudents: Number(row.estimated_students || 0),
    requiresLab,
    requiredClassroomType,
    eligibleTeacherCodes: row.eligible_teacher_codes || []
  };
}

function mapTeacherRow(row) {
  const maxInstitutionalHours = Number(row.max_institutional_hours || 0);
  const currentAcademicHours = Number(row.current_academic_hours || 0);
  const administrativeHours = Number(row.administrative_hours || 0);
  const maxTeachingHours = Number(
    row.max_teaching_hours || Math.max(maxInstitutionalHours - administrativeHours, 0)
  );

  return {
    id: row.id || null,
    code: row.code,
    name: row.name,
    type: row.type || row.contract_type || "unknown",
    contractType: row.contract_type || row.type || "unknown",
    maxInstitutionalHours,
    currentAcademicHours,
    administrativeHours,
    maxInstitutionalLoad: maxInstitutionalHours,
    currentAcademicLoad: currentAcademicHours,
    administrativeLoad: administrativeHours,
    maxTeachingLoad: maxTeachingHours,
    specialties: normalizeJsonArray(row.specialties),
    availability: row.availability || [],
    protectedBlocks: row.protected_blocks || []
  };
}

function mapClassroomRow(row) {
  const classroomType = row.classroom_type || row.type || "theory";
  const normalizedStatus = String(row.status || "available").trim().toLowerCase();
  return {
    id: row.id || null,
    code: row.code,
    name: row.name,
    type: row.type || classroomType,
    classroomType,
    capacity: Number(row.capacity || 0),
    status: ["available", "activo", "disponible"].includes(normalizedStatus)
      ? "available"
      : ["maintenance", "mantenimiento"].includes(normalizedStatus)
        ? "maintenance"
        : ["inactive", "inactivo"].includes(normalizedStatus)
          ? "inactive"
          : ["unavailable", "no-disponible", "nodisponible"].includes(normalizedStatus)
            ? "unavailable"
            : normalizedStatus,
    campus: row.campus || "Huancayo",
    usagePercent: Number(row.usage_percent || 0)
  };
}

function mapTimeBlockRow(row) {
  const startTime = row.start_time || row.startTime || row.start || null;
  const endTime = row.end_time || row.endTime || row.end || null;
  const durationHours = Number(row.duration_hours || calculateDurationHours(startTime, endTime));

  return {
    id: row.id || row.code,
    code: row.code,
    day: row.day,
    startTime,
    endTime,
    start_time: startTime,
    end_time: endTime,
    start: startTime,
    end: endTime,
    shift: row.shift || null,
    type: row.type || row.shift || "regular",
    durationHours,
    duration: durationHours,
    label: row.label || row.code
  };
}

function buildConstraintsFromRows(rows) {
  const baseConstraints = clone(localConstraints);
  const grouped = {
    ...baseConstraints,
    hard: [],
    soft: []
  };

  rows.forEach((row) => {
    const normalizedType = String(row.constraint_type || "").toLowerCase();
    const isPolicyRow = String(row.code || "").toUpperCase().startsWith("POL-");

    if (isPolicyRow && row.payload_json) {
      Object.assign(grouped, row.payload_json);
      return;
    }

    if (normalizedType === "hard") {
      grouped.hard.push(row.name);
      return;
    }

    if (normalizedType === "soft") {
      grouped.soft.push(row.name);
      return;
    }
  });

  if (grouped.hard.length === 0) {
    grouped.hard = baseConstraints.hard;
  }

  if (grouped.soft.length === 0) {
    grouped.soft = baseConstraints.soft;
  }

  return grouped;
}

async function ensureCriticalSchema(snapshot) {
  const requiredTables = ["courses", "teachers", "classrooms", "time_blocks", "constraints"];

  requiredTables.forEach((tableName) => {
    if (!hasTable(snapshot, tableName)) {
      throw new Error(`no existe la tabla requerida ${tableName}`);
    }
  });
}

async function getCoursesFromPostgres(snapshot) {
  const courseTypeColumn = pickColumn(snapshot, "courses", ["course_type", "type"], { required: true });
  const typeColumn = pickColumn(snapshot, "courses", ["type", "required_classroom_type", "course_type"], { required: true });
  const requiredClassroomTypeColumn = pickColumn(snapshot, "courses", ["required_classroom_type", "type", "course_type"], { required: true });
  const requiresLabColumn = pickColumn(snapshot, "courses", ["requires_lab"]);
  const idColumn = pickColumn(snapshot, "courses", ["id"]);

  const queryText = `
    SELECT
      ${idColumn ? sqlColumn("c", idColumn) : "NULL"} AS id,
      ${sqlColumn("c", "code")} AS code,
      ${sqlColumn("c", "code")} AS course_code,
      ${sqlColumn("c", "name")} AS name,
      ${sqlColumn("c", "credits")} AS credits,
      ${sqlColumn("c", courseTypeColumn)} AS course_type,
      ${sqlColumn("c", typeColumn)} AS type,
      ${sqlColumn("c", "required_hours")} AS required_hours,
      ${sqlColumn("c", "estimated_students")} AS estimated_students,
      ${requiresLabColumn
    ? sqlColumn("c", requiresLabColumn)
    : `CASE WHEN ${sqlColumn("c", requiredClassroomTypeColumn)} = 'lab' THEN TRUE ELSE FALSE END`} AS requires_lab,
      ${sqlColumn("c", requiredClassroomTypeColumn)} AS required_classroom_type
    FROM courses c
    ORDER BY c.code
  `;

  try {
    const result = await query(queryText);
    return result.rows;
  } catch (error) {
    throw new Error(`Error en getCoursesFromPostgres: ${error.message}`);
  }
}

async function getCourseTeacherLinksFromPostgres(snapshot) {
  if (!hasTable(snapshot, "course_teacher")) {
    throw new Error("Error en getCourseTeacherLinksFromPostgres: no existe la tabla course_teacher");
  }

  const hasIds = hasColumn(snapshot, "course_teacher", "course_id")
    && hasColumn(snapshot, "course_teacher", "teacher_id")
    && hasColumn(snapshot, "courses", "id")
    && hasColumn(snapshot, "teachers", "id");

  const hasCodes = hasColumn(snapshot, "course_teacher", "course_code")
    && hasColumn(snapshot, "course_teacher", "teacher_code");

  let queryText = "";

  if (hasIds) {
    queryText = `
      SELECT
        ct.id,
        c.code AS course_code,
        t.code AS teacher_code,
        c.id AS course_id,
        t.id AS teacher_id
      FROM course_teacher ct
      JOIN courses c ON c.id = ct.course_id
      JOIN teachers t ON t.id = ct.teacher_id
      ORDER BY c.code, t.code
    `;
  } else if (hasCodes) {
    queryText = `
      SELECT
        ${hasColumn(snapshot, "course_teacher", "id") ? "ct.id" : "NULL"} AS id,
        ct.course_code,
        ct.teacher_code,
        NULL AS course_id,
        NULL AS teacher_id
      FROM course_teacher ct
      ORDER BY ct.course_code, ct.teacher_code
    `;
  } else {
    throw new Error("Error en getCourseTeacherLinksFromPostgres: faltan columnas course_id/teacher_id o course_code/teacher_code");
  }

  try {
    const result = await query(queryText);
    return result.rows;
  } catch (error) {
    throw new Error(`Error en getCourseTeacherLinksFromPostgres: ${error.message}`);
  }
}

async function getTeachersFromPostgres(snapshot) {
  const contractTypeColumn = pickColumn(snapshot, "teachers", ["contract_type", "type"], { required: true });
  const typeColumn = pickColumn(snapshot, "teachers", ["type", "contract_type"], { required: true });
  const maxInstitutionalHoursColumn = pickColumn(snapshot, "teachers", ["max_institutional_hours", "max_institutional_load"], { required: true });
  const currentAcademicHoursColumn = pickColumn(snapshot, "teachers", ["current_academic_hours", "current_academic_load"], { required: true });
  const administrativeHoursColumn = pickColumn(snapshot, "teachers", ["administrative_hours", "administrative_load"], { required: true });
  const maxTeachingHoursColumn = pickColumn(snapshot, "teachers", ["max_teaching_hours", "max_teaching_load"]);
  const specialtiesColumn = pickColumn(snapshot, "teachers", ["specialties"]);
  const idColumn = pickColumn(snapshot, "teachers", ["id"]);

  const queryText = `
    SELECT
      ${idColumn ? sqlColumn("t", idColumn) : "NULL"} AS id,
      ${sqlColumn("t", "code")} AS code,
      ${sqlColumn("t", "code")} AS teacher_code,
      ${sqlColumn("t", "name")} AS name,
      ${sqlColumn("t", contractTypeColumn)} AS contract_type,
      ${sqlColumn("t", typeColumn)} AS type,
      ${sqlColumn("t", maxInstitutionalHoursColumn)} AS max_institutional_hours,
      ${sqlColumn("t", currentAcademicHoursColumn)} AS current_academic_hours,
      ${sqlColumn("t", administrativeHoursColumn)} AS administrative_hours,
      ${maxTeachingHoursColumn
    ? sqlColumn("t", maxTeachingHoursColumn)
    : `GREATEST(${sqlColumn("t", maxInstitutionalHoursColumn)} - ${sqlColumn("t", administrativeHoursColumn)}, 0)`} AS max_teaching_hours,
      ${specialtiesColumn ? `COALESCE(${sqlColumn("t", specialtiesColumn)}, '[]'::jsonb)` : "'[]'::jsonb"} AS specialties
    FROM teachers t
    ORDER BY t.code
  `;

  try {
    const result = await query(queryText);
    return result.rows;
  } catch (error) {
    throw new Error(`Error en getTeachersFromPostgres: ${error.message}`);
  }
}

async function getTeacherAvailabilityFromPostgres(snapshot) {
  if (!hasTable(snapshot, "teacher_availability")) {
    throw new Error("Error en getTeacherAvailabilityFromPostgres: no existe la tabla teacher_availability");
  }

  const hasJoinColumns = hasColumn(snapshot, "teacher_availability", "teacher_id")
    && hasColumn(snapshot, "teacher_availability", "time_block_id")
    && hasColumn(snapshot, "teachers", "id")
    && hasColumn(snapshot, "time_blocks", "id");
  const hasCodeColumns = hasColumn(snapshot, "teacher_availability", "teacher_code")
    && hasColumn(snapshot, "teacher_availability", "day")
    && hasColumn(snapshot, "teacher_availability", "start_time")
    && hasColumn(snapshot, "teacher_availability", "end_time");
  const availableColumn = pickColumn(snapshot, "teacher_availability", ["available"]);

  let queryText = "";

  if (hasJoinColumns) {
    queryText = `
      SELECT
        ta.id,
        t.code AS teacher_code,
        tb.code AS time_block_code,
        tb.day,
        tb.start_time::text AS start_time,
        tb.end_time::text AS end_time,
        ${availableColumn ? "COALESCE(ta.available, true)" : "true"} AS available
      FROM teacher_availability ta
      JOIN teachers t ON t.id = ta.teacher_id
      JOIN time_blocks tb ON tb.id = ta.time_block_id
      ORDER BY t.code, tb.day, tb.start_time
    `;
  } else if (hasCodeColumns) {
    queryText = `
      SELECT
        ${hasColumn(snapshot, "teacher_availability", "id") ? "ta.id" : "NULL"} AS id,
        ta.teacher_code,
        ${hasColumn(snapshot, "teacher_availability", "time_block_code") ? "ta.time_block_code" : "NULL"} AS time_block_code,
        ta.day,
        ta.start_time::text AS start_time,
        ta.end_time::text AS end_time,
        ${availableColumn ? "COALESCE(ta.available, true)" : "true"} AS available
      FROM teacher_availability ta
      ORDER BY ta.teacher_code, ta.day, ta.start_time
    `;
  } else {
    throw new Error("Error en getTeacherAvailabilityFromPostgres: faltan columnas para reconstruir disponibilidad docente");
  }

  try {
    const result = await query(queryText);
    return result.rows;
  } catch (error) {
    throw new Error(`Error en getTeacherAvailabilityFromPostgres: ${error.message}`);
  }
}

async function getTeacherProtectedBlocksFromPostgres(snapshot) {
  if (!hasTable(snapshot, "teacher_protected_blocks")) {
    return [];
  }

  const hasJoinColumns = hasColumn(snapshot, "teacher_protected_blocks", "teacher_id")
    && hasColumn(snapshot, "teacher_protected_blocks", "time_block_id")
    && hasColumn(snapshot, "teachers", "id")
    && hasColumn(snapshot, "time_blocks", "id");
  const hasCodeColumns = hasColumn(snapshot, "teacher_protected_blocks", "teacher_code")
    && hasColumn(snapshot, "teacher_protected_blocks", "day")
    && hasColumn(snapshot, "teacher_protected_blocks", "start_time")
    && hasColumn(snapshot, "teacher_protected_blocks", "end_time");

  let queryText = "";

  if (hasJoinColumns) {
    queryText = `
      SELECT
        tpb.id,
        t.code AS teacher_code,
        tb.code AS time_block_code,
        tb.day,
        tb.start_time::text AS start_time,
        tb.end_time::text AS end_time,
        tpb.reason
      FROM teacher_protected_blocks tpb
      JOIN teachers t ON t.id = tpb.teacher_id
      JOIN time_blocks tb ON tb.id = tpb.time_block_id
      ORDER BY t.code, tb.day, tb.start_time
    `;
  } else if (hasCodeColumns) {
    queryText = `
      SELECT
        ${hasColumn(snapshot, "teacher_protected_blocks", "id") ? "tpb.id" : "NULL"} AS id,
        tpb.teacher_code,
        ${hasColumn(snapshot, "teacher_protected_blocks", "time_block_code") ? "tpb.time_block_code" : "NULL"} AS time_block_code,
        tpb.day,
        tpb.start_time::text AS start_time,
        tpb.end_time::text AS end_time,
        tpb.reason
      FROM teacher_protected_blocks tpb
      ORDER BY tpb.teacher_code, tpb.day, tpb.start_time
    `;
  } else {
    throw new Error("Error en getTeacherProtectedBlocksFromPostgres: faltan columnas para reconstruir bloques protegidos");
  }

  try {
    const result = await query(queryText);
    return result.rows;
  } catch (error) {
    throw new Error(`Error en getTeacherProtectedBlocksFromPostgres: ${error.message}`);
  }
}

async function getClassroomsFromPostgres(snapshot) {
  const classroomTypeColumn = pickColumn(snapshot, "classrooms", ["classroom_type", "type"], { required: true });
  const typeColumn = pickColumn(snapshot, "classrooms", ["type", "classroom_type"], { required: true });
  const idColumn = pickColumn(snapshot, "classrooms", ["id"]);
  const statusColumn = pickColumn(snapshot, "classrooms", ["status"]);
  const usagePercentColumn = pickColumn(snapshot, "classrooms", ["usage_percent"]);
  const campusColumn = pickColumn(snapshot, "classrooms", ["campus"]);

  const queryText = `
    SELECT
      ${idColumn ? sqlColumn("cl", idColumn) : "NULL"} AS id,
      ${sqlColumn("cl", "code")} AS code,
      ${sqlColumn("cl", "code")} AS classroom_code,
      ${sqlColumn("cl", "name")} AS name,
      ${sqlColumn("cl", classroomTypeColumn)} AS classroom_type,
      ${sqlColumn("cl", typeColumn)} AS type,
      ${sqlColumn("cl", "capacity")} AS capacity,
      ${statusColumn ? sqlColumn("cl", statusColumn) : "'available'"} AS status,
      ${campusColumn ? sqlColumn("cl", campusColumn) : "'Huancayo'"} AS campus,
      ${usagePercentColumn ? sqlColumn("cl", usagePercentColumn) : "0"} AS usage_percent
    FROM classrooms cl
    ORDER BY cl.code
  `;

  try {
    const result = await query(queryText);
    return result.rows;
  } catch (error) {
    throw new Error(`Error en getClassroomsFromPostgres: ${error.message}`);
  }
}

async function getTimeBlocksFromPostgres(snapshot) {
  const idColumn = pickColumn(snapshot, "time_blocks", ["id"]);
  const shiftColumn = pickColumn(snapshot, "time_blocks", ["shift"]);
  const typeColumn = pickColumn(snapshot, "time_blocks", ["type", "shift"]);
  const durationHoursColumn = pickColumn(snapshot, "time_blocks", ["duration_hours"]);
  const labelColumn = pickColumn(snapshot, "time_blocks", ["label"]);

  const queryText = `
    SELECT
      ${idColumn ? sqlColumn("tb", idColumn) : "NULL"} AS id,
      ${sqlColumn("tb", "code")} AS code,
      ${sqlColumn("tb", "day")} AS day,
      ${sqlColumn("tb", "start_time", "::text")} AS start_time,
      ${sqlColumn("tb", "end_time", "::text")} AS end_time,
      ${shiftColumn ? sqlColumn("tb", shiftColumn) : "NULL"} AS shift,
      ${typeColumn ? sqlColumn("tb", typeColumn) : "'regular'"} AS type,
      ${durationHoursColumn ? sqlColumn("tb", durationHoursColumn) : "NULL"} AS duration_hours,
      ${labelColumn ? sqlColumn("tb", labelColumn) : "tb.code"} AS label
    FROM time_blocks tb
    ORDER BY tb.day, tb.start_time
  `;

  try {
    const result = await query(queryText);
    return result.rows;
  } catch (error) {
    throw new Error(`Error en getTimeBlocksFromPostgres: ${error.message}`);
  }
}

async function getConstraintsFromPostgres(snapshot) {
  const descriptionColumn = pickColumn(snapshot, "constraints", ["description"]);
  const activeColumn = pickColumn(snapshot, "constraints", ["active"]);
  const payloadColumn = pickColumn(snapshot, "constraints", ["payload_json"]);
  const severityColumn = pickColumn(snapshot, "constraints", ["severity"]);
  const codeColumn = pickColumn(snapshot, "constraints", ["code"]);

  const queryText = `
    SELECT
      id,
      ${codeColumn ? codeColumn : "NULL"} AS code,
      name,
      constraint_type,
      ${descriptionColumn ? descriptionColumn : "NULL"} AS description,
      ${activeColumn ? activeColumn : "true"} AS active,
      ${payloadColumn ? payloadColumn : "NULL"} AS payload_json,
      ${severityColumn ? severityColumn : "NULL"} AS severity
    FROM constraints
    ${activeColumn ? "WHERE active = true" : ""}
    ORDER BY constraint_type, name
  `;

  try {
    const result = await query(queryText);
    return result.rows;
  } catch (error) {
    throw new Error(`Error en getConstraintsFromPostgres: ${error.message}`);
  }
}

async function getStudentsFromPostgres(snapshot) {
  if (!hasTable(snapshot, "students")) {
    return [];
  }

  try {
    const result = await query(`
      SELECT
        id,
        code,
        first_name,
        last_name,
        cycle,
        email,
        has_internship,
        works,
        preferred_shift,
        max_credits,
        created_at
      FROM students
      ORDER BY code
    `);
    return result.rows;
  } catch (error) {
    throw new Error(`Error en getStudentsFromPostgres: ${error.message}`);
  }
}

async function getStudentCourseRequestsFromPostgres(snapshot) {
  if (!hasTable(snapshot, "student_course_requests")) {
    return [];
  }

  try {
    const result = await query(`
      SELECT
        id,
        student_id,
        course_id,
        priority,
        status,
        created_at
      FROM student_course_requests
      ORDER BY priority, id
    `);
    return result.rows;
  } catch (error) {
    throw new Error(`Error en getStudentCourseRequestsFromPostgres: ${error.message}`);
  }
}

function mergeTeacherRows(baseTeachers, availabilityRows, protectedRows) {
  const availabilityByTeacher = availabilityRows.reduce((accumulator, row) => {
    if (!row.available) {
      return accumulator;
    }

    accumulator[row.teacher_code] = accumulator[row.teacher_code] || [];
    accumulator[row.teacher_code].push({
      day: row.day,
      start: row.start_time,
      end: row.end_time
    });
    return accumulator;
  }, {});

  const protectedByTeacher = protectedRows.reduce((accumulator, row) => {
    accumulator[row.teacher_code] = accumulator[row.teacher_code] || [];
    accumulator[row.teacher_code].push({
      day: row.day,
      start: row.start_time,
      end: row.end_time,
      reason: row.reason
    });
    return accumulator;
  }, {});

  return baseTeachers.map((row) =>
    mapTeacherRow({
      ...row,
      availability: availabilityByTeacher[row.code] || [],
      protected_blocks: protectedByTeacher[row.code] || []
    })
  );
}

function mergeCourseRows(baseCourses, courseTeacherLinks) {
  const linksByCourse = courseTeacherLinks.reduce((accumulator, row) => {
    accumulator[row.course_code] = accumulator[row.course_code] || [];
    accumulator[row.course_code].push(row.teacher_code);
    return accumulator;
  }, {});

  return baseCourses.map((row) =>
    mapCourseRow({
      ...row,
      eligible_teacher_codes: linksByCourse[row.code] || []
    })
  );
}

async function canUsePostgres() {
  if (!isPostgresEnabled()) {
    return false;
  }

  const status = await testConnection();
  return status.connected;
}

async function getPostgresDataset() {
  const snapshot = await getSchemaSnapshot();
  await ensureCriticalSchema(snapshot);

  const [
    courseRows,
    courseTeacherLinks,
    teacherRows,
    teacherAvailabilityRows,
    teacherProtectedRows,
    classroomRows,
    timeBlockRows,
    constraintRows,
    studentRows,
    studentCourseRequestRows
  ] = await Promise.all([
    getCoursesFromPostgres(snapshot),
    getCourseTeacherLinksFromPostgres(snapshot),
    getTeachersFromPostgres(snapshot),
    getTeacherAvailabilityFromPostgres(snapshot),
    getTeacherProtectedBlocksFromPostgres(snapshot),
    getClassroomsFromPostgres(snapshot),
    getTimeBlocksFromPostgres(snapshot),
    getConstraintsFromPostgres(snapshot),
    getStudentsFromPostgres(snapshot),
    getStudentCourseRequestsFromPostgres(snapshot)
  ]);

  return {
    source: "postgresql",
    classrooms: classroomRows.map(mapClassroomRow),
    constraints: buildConstraintsFromRows(constraintRows),
    courses: mergeCourseRows(courseRows, courseTeacherLinks),
    studentCourseRequests: studentCourseRequestRows,
    students: studentRows,
    teachers: mergeTeacherRows(teacherRows, teacherAvailabilityRows, teacherProtectedRows),
    timeBlocks: timeBlockRows.map(mapTimeBlockRow)
  };
}

async function getAcademicDataset() {
  if (await canUsePostgres()) {
    try {
      const dataset = await getPostgresDataset();
      setDataSourceStatus({
        database: "postgresql",
        postgresEnabled: true,
        usingFallback: false,
        lastError: null,
        lastStep: null
      });
      return dataset;
    } catch (error) {
      console.error(error.message);
      setDataSourceStatus({
        database: "mock-data",
        postgresEnabled: true,
        usingFallback: true,
        lastError: error.message,
        lastStep: "getAcademicDataset"
      });
    }
  } else {
    setDataSourceStatus({
      database: "mock-data",
      postgresEnabled: false,
      usingFallback: true,
      lastError: null,
      lastStep: null
    });
  }

  return getLocalAcademicDataset();
}

async function listEntity(entityName, queryParams) {
  const dataset = await getAcademicDataset();
  return {
    ...paginate(dataset[entityName] || [], queryParams),
    meta: {
      source: dataset.source,
      entity: entityName,
      postgresReady: true
    }
  };
}

async function getConstraintsSummary() {
  const dataset = await getAcademicDataset();
  return {
    data: dataset.constraints,
    meta: {
      source: dataset.source,
      postgresReady: true
    }
  };
}

async function saveSchedule(result, options = {}) {
  const status = getConnectionStatus();

  if (!result.validation.valid || !status.connected || result.meta.source !== "postgresql") {
    return {
      persisted: false,
      usingFallback: !status.connected
    };
  }

  const snapshot = await getSchemaSnapshot();
  const client = await getClient();
  const name = options.name || `Horario ${options.period || "2026-2"} ${new Date().toISOString()}`;

  try {
    await client.query("BEGIN");

    const schedulesHasExpectedColumns = hasColumn(snapshot, "schedules", "summary")
      && hasColumn(snapshot, "schedules", "metrics")
      && hasColumn(snapshot, "schedules", "validation");

    let scheduleId;

    if (schedulesHasExpectedColumns) {
      const scheduleInsert = await client.query(
        `
          INSERT INTO schedules (
            name,
            valid,
            summary,
            metrics,
            validation,
            teacher_load,
            infrastructure_usage,
            warnings,
            recommendations,
            created_at
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING id
        `,
        [
          name,
          result.validation.valid,
          JSON.stringify(result.summary),
          JSON.stringify(result.metrics),
          JSON.stringify(result.validation),
          JSON.stringify(result.teacherLoad),
          JSON.stringify(result.infrastructureUsage),
          JSON.stringify(result.warnings),
          JSON.stringify(result.recommendations),
          result.meta.generatedAt
        ]
      );
      scheduleId = scheduleInsert.rows[0].id;
    } else {
      const legacyInsert = await client.query(
        `
          INSERT INTO schedules (period, status, valid, score, generated_at, source_mode, summary_json)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING id
        `,
        [
          options.period || "2026-2",
          options.status || "generated",
          result.validation.valid,
          result.metrics.optimization.score,
          result.meta.generatedAt,
          result.meta.source,
          JSON.stringify(result.summary)
        ]
      );
      scheduleId = legacyInsert.rows[0].id;
    }

    const scheduleItemsHasExpectedColumns = hasColumn(snapshot, "schedule_items", "course_name")
      && hasColumn(snapshot, "schedule_items", "teacher_name")
      && hasColumn(snapshot, "schedule_items", "classroom_name");

    for (const item of result.items) {
      if (scheduleItemsHasExpectedColumns) {
        await client.query(
          `
            INSERT INTO schedule_items (
              schedule_id,
              course_code,
              course_name,
              teacher_code,
              teacher_name,
              classroom_code,
              classroom_name,
              day,
              start_time,
              end_time,
              duration_hours,
              credits,
              occupancy_rate
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
          `,
          [
            scheduleId,
            item.courseCode,
            item.courseName,
            item.teacherCode,
            item.teacherName,
            item.classroomCode,
            item.classroomName,
            item.day,
            item.start,
            item.end,
            item.duration,
            item.credits,
            item.occupancyRate
          ]
        );
      } else {
        await client.query(
          `
            INSERT INTO schedule_items (
              schedule_id,
              course_code,
              teacher_code,
              classroom_code,
              time_block_code,
              course_name,
              teacher_name,
              classroom_name,
              day,
              start_time,
              end_time,
              duration_hours,
              credits,
              course_type,
              student_group,
              estimated_students,
              occupancy_rate,
              occupancy_status,
              session_label
            )
            VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
              $11, $12, $13, $14, $15, $16, $17, $18, $19
            )
          `,
          [
            scheduleId,
            item.courseCode,
            item.teacherCode,
            item.classroomCode,
            item.timeBlockId,
            item.courseName,
            item.teacherName,
            item.classroomName,
            item.day,
            item.start,
            item.end,
            item.duration,
            item.credits,
            item.courseType,
            item.studentGroup,
            item.estimatedStudents,
            item.occupancyRate,
            item.occupancyStatus,
            item.sessionLabel
          ]
        );
      }
    }

    await client.query("COMMIT");

    return {
      persisted: true,
      scheduleId,
      usingFallback: false
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(`Error en saveSchedule: ${error.message}`);
    return {
      persisted: false,
      usingFallback: true,
      error: error.message
    };
  } finally {
    client.release();
  }
}

module.exports = {
  getAcademicDataset,
  getConstraintsSummary,
  getDataSourceStatus,
  getLocalAcademicDataset,
  getSchemaDebugData,
  listEntity,
  mapClassroomRow,
  mapCourseRow,
  mapTeacherRow,
  mapTimeBlockRow,
  paginate,
  parsePagination,
  saveSchedule
};
