const {
  getAcademicDataset,
  getConstraintsSummary,
  getDataSourceStatus,
  getSchemaDebugData,
  listEntity,
  saveSchedule
} = require("../services/academic-data.service");
const { isPostgresEnabled, query, testConnection } = require("../config/db");
const { generateSchedule, validateSchedule } = require("../services/scheduler.service");

async function getDatasetFromRequest(body = {}) {
  const defaultDataset = await getAcademicDataset();
  const selectedCourseCodes = Array.isArray(body.selectedCourseCodes)
    ? body.selectedCourseCodes.filter(Boolean)
    : [];
  const shouldFilterCourses = selectedCourseCodes.length > 0 && !body.allowAutoComplete;
  const filteredCourses = shouldFilterCourses
    ? defaultDataset.courses.filter((course) => selectedCourseCodes.includes(course.code))
    : defaultDataset.courses;

  return {
    ...defaultDataset,
    ...body,
    classrooms: body.classrooms || defaultDataset.classrooms,
    constraints: body.constraints || defaultDataset.constraints,
    courses: body.courses || filteredCourses,
    teachers: body.teachers || defaultDataset.teachers,
    timeBlocks: body.timeBlocks || defaultDataset.timeBlocks,
    selectedCourseCodes
  };
}

async function listTeachers(req, res) {
  return res.json(await listEntity("teachers", req.query));
}

async function listCourses(req, res) {
  return res.json(await listEntity("courses", req.query));
}

async function listClassrooms(req, res) {
  return res.json(await listEntity("classrooms", req.query));
}

async function listTimeBlocks(req, res) {
  return res.json(await listEntity("timeBlocks", req.query));
}

async function listConstraints(req, res) {
  return res.json(await getConstraintsSummary());
}

async function healthcheck(req, res) {
  const dataset = await getAcademicDataset();
  await testConnection();
  const status = getDataSourceStatus();

  return res.json({
    status: "ok",
    database: status.database,
    postgresEnabled: status.postgresEnabled,
    usingFallback: status.usingFallback,
    counts: {
      courses: dataset.courses.length,
      teachers: dataset.teachers.length,
      classrooms: dataset.classrooms.length,
      students: (dataset.students || []).length
    },
    lastCheckedAt: new Date().toISOString()
  });
}

async function debugSchema(req, res) {
  const schema = await getSchemaDebugData();
  return res.json({
    status: "ok",
    database: "postgresql",
    tables: schema
  });
}

async function generateAcademicSchedule(req, res) {
  const dataset = await getDatasetFromRequest(req.body);
  const startedAt = Date.now();
  const result = generateSchedule(dataset);
  const executionMs = Date.now() - startedAt;
  const persistence = await saveSchedule(result, {
    period: req.body.period,
    status: "generated"
  });

  return res.status(result.validation.valid ? 201 : 422).json({
    ...result,
    api: {
      executionMs,
      cached: false,
      responseMode: result.meta.source,
      nextDatabase: "postgresql",
      persisted: persistence.persisted
    }
  });
}

async function validateAcademicSchedule(req, res) {
  const dataset = await getDatasetFromRequest(req.body);
  const result = validateSchedule({
    items: req.body.items || [],
    classrooms: dataset.classrooms,
    constraints: dataset.constraints,
    courses: dataset.courses,
    teachers: dataset.teachers,
    timeBlocks: dataset.timeBlocks
  });

  return res.status(result.valid ? 200 : 422).json({
    valid: result.valid,
    conflicts: result.conflicts,
    warnings: result.warnings,
    recommendations: result.recommendations
  });
}

async function createAuditLog(req, res) {
  const {
    action,
    entity = "ui",
    description = "",
    userRole = "STUDENT",
    source = "frontend",
    metadata = {}
  } = req.body || {};

  if (!action) {
    return res.status(400).json({
      saved: false,
      message: "El campo action es obligatorio."
    });
  }

  if (!isPostgresEnabled()) {
    return res.status(200).json({
      saved: false,
      message: "Auditoria local registrada en frontend"
    });
  }

  try {
    await query(
      `
        INSERT INTO audit_logs (action, entity, description, user_role, source, metadata)
        VALUES ($1, $2, $3, $4, $5, $6::jsonb)
      `,
      [action, entity, description, userRole, source, JSON.stringify(metadata || {})]
    );

    return res.status(201).json({
      saved: true,
      message: "Evento de auditoria registrado correctamente"
    });
  } catch (error) {
    return res.status(200).json({
      saved: false,
      message: "Auditoria local registrada en frontend",
      detail: error.message
    });
  }
}

async function listAuditLogs(req, res) {
  if (!isPostgresEnabled()) {
    return res.json({
      saved: false,
      message: "Auditoria local registrada en frontend",
      data: []
    });
  }

  try {
    const result = await query(
      `
        SELECT id, action, entity, description, user_role, source, metadata, created_at
        FROM audit_logs
        ORDER BY created_at DESC
        LIMIT 50
      `
    );

    return res.json({
      saved: true,
      data: result.rows
    });
  } catch (error) {
    return res.status(200).json({
      saved: false,
      message: "Auditoria local registrada en frontend",
      data: [],
      detail: error.message
    });
  }
}

module.exports = {
  createAuditLog,
  debugSchema,
  generateAcademicSchedule,
  healthcheck,
  listAuditLogs,
  listClassrooms,
  listConstraints,
  listCourses,
  listTeachers,
  listTimeBlocks,
  validateAcademicSchedule
};
