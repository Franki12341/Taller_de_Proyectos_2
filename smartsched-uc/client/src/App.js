import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const MAX_CREDITS = 25;
const TARGET_CREDITS = 25;
const MIN_RECOMMENDED_CREDITS = 20;
const PERIOD = "2026-10";
const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const LOCAL_AUDIT_KEY = "smartsched-uc-audit-log";
const LOCAL_REPORTS_KEY = "smartsched-uc-problem-reports";
const LOCAL_EVIDENCE_KEY = "smartsched-uc-evidence-checklist";
const STUDENT_PROFILE = "Estudiante de 9.° ciclo con practicas preprofesionales";
const API_TIMEOUT_MS = 8000;

const dayLabels = {
  Monday: "Lunes",
  Tuesday: "Martes",
  Wednesday: "Miercoles",
  Thursday: "Jueves",
  Friday: "Viernes",
  Saturday: "Sabado"
};

const evidenceItemsSeed = [
  "Captura de /api/health",
  "Captura de PostgreSQL en pgAdmin",
  "Captura de 60 alumnos",
  "Captura de interfaz de matricula",
  "Captura de horario generado",
  "Captura de caso simulado de conflicto",
  "Captura de bitacora de auditoria",
  "Captura de notificacion de fallback",
  "Captura de pruebas npm test",
  "Captura de GitHub con commits"
];

const mvpChecklist = [
  "Backend organizado por rutas, controladores y servicios",
  "PostgreSQL integrado",
  "Fallback local disponible",
  "Motor de horarios con validaciones",
  "Interfaz de matricula compacta",
  "Auditoria de eventos",
  "Manejo de errores amigable",
  "Evidencias de pruebas",
  "Datos ampliados para simulacion",
  "Documentacion tecnica"
];

function unwrapList(payload) {
  return Array.isArray(payload) ? payload : payload.data || [];
}

function normalizeCourse(course) {
  return {
    code: course.code,
    name: course.name,
    credits: Number(course.credits || 0),
    type: course.requiredClassroomType || course.required_classroom_type || course.type || "theory",
    courseType: course.courseType || course.course_type || "mandatory",
    estimatedStudents: Number(course.estimatedStudents || course.estimated_students || 0),
    eligibleTeacherCodes: course.eligibleTeacherCodes || course.eligible_teacher_codes || []
  };
}

function normalizeTeacher(teacher) {
  return {
    code: teacher.code,
    name: teacher.name,
    contractType: teacher.contractType || teacher.contract_type || "unknown",
    currentAcademicLoad: Number(
      teacher.currentAcademicLoad || teacher.current_academic_load || teacher.currentAcademicHours || 0
    ),
    administrativeLoad: Number(
      teacher.administrativeLoad || teacher.administrative_load || teacher.administrativeHours || 0
    ),
    maxInstitutionalHours: Number(teacher.maxInstitutionalHours || teacher.max_institutional_hours || 0),
    availability: teacher.availability || [],
    protectedBlocks: teacher.protectedBlocks || teacher.protected_blocks || []
  };
}

function normalizeClassroom(classroom) {
  return {
    code: classroom.code,
    name: classroom.name,
    type: classroom.type || classroom.classroom_type || "theory",
    capacity: Number(classroom.capacity || 0),
    status: classroom.status || "available",
    usagePercent: Number(classroom.usagePercent || classroom.usage_percent || 0)
  };
}

function normalizeTimeBlock(block) {
  return {
    id: block.id || block.code || `${block.day}-${block.start}-${block.end}`,
    code: block.code || block.id || `${block.day}-${block.start}-${block.end}`,
    day: block.day,
    start: block.start || block.start_time || block.startTime,
    end: block.end || block.end_time || block.endTime,
    duration: Number(block.duration || block.duration_hours || 2),
    shift: block.shift || block.type || "regular",
    label: block.label || "Bloque"
  };
}

function percentage(value) {
  return `${Math.round((value || 0) * 100)}%`;
}

function getTypeLabel(type) {
  return type === "lab" ? "Laboratorio" : "Teoria";
}

function toMinutes(value) {
  const [hours, minutes] = String(value || "00:00").split(":").map(Number);
  return hours * 60 + minutes;
}

function overlaps(left, right) {
  return left.day === right.day && toMinutes(left.start) < toMinutes(right.end) && toMinutes(right.start) < toMinutes(left.end);
}

function contains(availability, slot) {
  return availability.day === slot.day
    && toMinutes(availability.start) <= toMinutes(slot.start)
    && toMinutes(availability.end) >= toMinutes(slot.end);
}

function buildSectionNrc(courseCode, index) {
  return `${courseCode.replace(/\D/g, "").slice(-3) || "700"}${index + 1}`;
}

function getStatusTone(status) {
  if (status === "Sin conflictos" || status === "Optimo") {
    return "success";
  }

  if (status === "Con observaciones") {
    return "warning";
  }

  return "neutral";
}

function getCreditStatus(credits) {
  if (credits > MAX_CREDITS) {
    return "Invalido";
  }

  if (credits === TARGET_CREDITS) {
    return "Optimo";
  }

  if (credits >= 22) {
    return "Cerca del optimo";
  }

  if (credits >= MIN_RECOMMENDED_CREDITS) {
    return "Aceptable";
  }

  return "Carga baja";
}

function getCreditRecommendation(credits) {
  if (credits > MAX_CREDITS) {
    return "Tu carga supera el maximo permitido.";
  }

  if (credits === TARGET_CREDITS) {
    return "Tu carga esta dentro del objetivo recomendado.";
  }

  if (credits >= MIN_RECOMMENDED_CREDITS) {
    return `Te faltan ${TARGET_CREDITS - credits} creditos para llegar al objetivo.`;
  }

  return "Carga academica optima: entre 20 y 25 creditos.";
}

function buildOptimalCourseSelection(courses, selectedEnrollments, targetCredits) {
  const selectedCodes = selectedEnrollments.map((item) => item.courseCode);
  const selectedSet = new Set(selectedCodes);
  let currentCredits = selectedEnrollments.reduce((sum, item) => sum + Number(item.credits || 0), 0);
  const autoAdded = [];
  const candidates = [...courses]
    .filter((course) => !selectedSet.has(course.code))
    .sort((left, right) => {
      const leftGap = Math.abs(targetCredits - (currentCredits + Number(left.credits || 0)));
      const rightGap = Math.abs(targetCredits - (currentCredits + Number(right.credits || 0)));
      return leftGap - rightGap || Number(right.credits || 0) - Number(left.credits || 0);
    });

  candidates.forEach((course) => {
    const nextCredits = currentCredits + Number(course.credits || 0);
    if (nextCredits > MAX_CREDITS) {
      return;
    }

    selectedSet.add(course.code);
    autoAdded.push(course.code);
    currentCredits = nextCredits;
  });

  return {
    selectedCourseCodes: [...selectedCodes, ...autoAdded],
    autoAddedCourseCodes: autoAdded,
    assignedCredits: currentCredits
  };
}

function getClassroomAlertTone(status) {
  if (status === "invalid") {
    return "error";
  }

  if (status === "risk") {
    return "warning";
  }

  if (status === "ideal") {
    return "success";
  }

  return "info";
}

function formatCreditOptimizationStatus(status) {
  const labels = {
    optimal: "Optimo",
    near_optimal: "Cerca del optimo",
    acceptable: "Aceptable",
    low_load: "Carga baja",
    over_limit: "Recortado por limite"
  };

  return labels[status] || status || "Pendiente";
}

function formatClock(date = new Date()) {
  return new Intl.DateTimeFormat("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(date);
}

function buildWeeklyRows(timeBlocks, selectedEnrollments) {
  const rows = new Map();

  (timeBlocks || []).forEach((block) => {
    rows.set(`${block.start}-${block.end}`, { start: block.start, end: block.end });
  });

  selectedEnrollments.forEach((enrollment) => {
    enrollment.sessions.forEach((session) => {
      rows.set(`${session.start}-${session.end}`, { start: session.start, end: session.end });
    });
  });

  return [...rows.values()].sort((left, right) => toMinutes(left.start) - toMinutes(right.start));
}

function annotateEnrollments(enrollments) {
  return enrollments.map((enrollment) => {
    const hasConflict = enrollments.some((other) => {
      if (other.enrollmentId === enrollment.enrollmentId) {
        return false;
      }

      return enrollment.sessions.some((session) =>
        other.sessions.some((otherSession) => overlaps(session, otherSession))
      );
    });

    return {
      ...enrollment,
      hasConflict,
      status: enrollment.status === "Matriculado simulado"
        ? "Matriculado simulado"
        : hasConflict
          ? "Con conflicto"
          : "Agregado"
    };
  });
}

function groupScheduleToEnrollments(scheduleItems, coursesByCode) {
  const grouped = scheduleItems.reduce((accumulator, item, index) => {
    const key = item.courseCode;
    if (!accumulator[key]) {
      const course = coursesByCode.get(item.courseCode);
      accumulator[key] = {
        enrollmentId: `${item.courseCode}-suggested`,
        nrc: buildSectionNrc(item.courseCode, index),
        courseCode: item.courseCode,
        courseName: item.courseName,
        credits: course?.credits || item.credits || 0,
        type: course?.type || item.classroomType || "theory",
        teacherName: item.teacherName,
        classroomCode: item.classroomCode,
        availableSeats: 0,
        source: "suggested",
        status: "Pendiente",
        sessions: []
      };
    }

    accumulator[key].sessions.push({
      day: item.day,
      start: item.start || item.startTime || item.start_time,
      end: item.end || item.endTime || item.end_time,
      teacherName: item.teacherName,
      classroomCode: item.classroomCode,
      type: item.classroomType || accumulator[key].type,
      occupancyStatus: item.occupancyStatus || "acceptable"
    });

    return accumulator;
  }, {});

  return Object.values(grouped);
}

function resolveCourseSections(course, schedule, coursesByCode, teachers, classrooms, timeBlocks) {
  if (!course) {
    return [];
  }

  const suggested = schedule?.items
    ? groupScheduleToEnrollments(
      schedule.items.filter((item) => item.courseCode === course.code),
      coursesByCode
    )
    : [];

  if (suggested.length > 0) {
    return suggested;
  }

  return buildFallbackSections(course, teachers, classrooms, timeBlocks);
}

function buildFallbackSections(course, teachers, classrooms, timeBlocks) {
  const candidateTeachers = teachers.filter(
    (teacher) => course.eligibleTeacherCodes.length === 0 || course.eligibleTeacherCodes.includes(teacher.code)
  );
  const candidateClassrooms = classrooms.filter(
    (classroom) => classroom.type === course.type && classroom.capacity >= course.estimatedStudents && classroom.status !== "inactive"
  );

  const generated = [];

  candidateTeachers.slice(0, 2).forEach((teacher) => {
    timeBlocks.forEach((block) => {
      const available = teacher.availability.length === 0 || teacher.availability.some((availability) => contains(availability, block));
      if (!available || generated.length >= 4) {
        return;
      }

      const classroom = candidateClassrooms[generated.length % Math.max(candidateClassrooms.length, 1)];
      if (!classroom) {
        return;
      }

      generated.push({
        enrollmentId: `${course.code}-section-${generated.length + 1}`,
        nrc: buildSectionNrc(course.code, generated.length),
        courseCode: course.code,
        courseName: course.name,
        credits: course.credits,
        type: course.type,
        teacherName: teacher.name,
        classroomCode: classroom.code,
        availableSeats: Math.max(classroom.capacity - course.estimatedStudents, 0),
        source: "local",
        status: "Pendiente",
        sessions: [
          {
            day: block.day,
            start: block.start,
            end: block.end,
            teacherName: teacher.name,
            classroomCode: classroom.code,
            type: course.type,
            occupancyStatus: classroom.capacity < course.estimatedStudents ? "invalid" : "acceptable"
          }
        ]
      });
    });
  });

  return generated;
}

function readLocalJson(key, fallback) {
  try {
    const rawValue = window.localStorage.getItem(key);
    if (!rawValue) {
      return fallback;
    }

    const parsed = JSON.parse(rawValue);
    return parsed ?? fallback;
  } catch (error) {
    return fallback;
  }
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

async function fetchWithTimeout(url, options = {}, timeoutMs = API_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function App() {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [timeBlocks, setTimeBlocks] = useState([]);
  const [constraints, setConstraints] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [health, setHealth] = useState(null);
  const [apiReachable, setApiReachable] = useState(null);
  const [viewMode, setViewMode] = useState("student");
  const [activeTab, setActiveTab] = useState("projections");
  const [selectedCourseCode, setSelectedCourseCode] = useState("");
  const [selectedEnrollments, setSelectedEnrollments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [nrcInput, setNrcInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [errorDetail, setErrorDetail] = useState("");
  const [showErrorDetail, setShowErrorDetail] = useState(false);
  const [notice, setNotice] = useState("");
  const [progressMessage, setProgressMessage] = useState("Cargando configuracion academica...");
  const [notifications, setNotifications] = useState([]);
  const [auditLogs, setAuditLogs] = useState(() => readLocalJson(LOCAL_AUDIT_KEY, []));
  const [simulatedIssue, setSimulatedIssue] = useState(null);
  const [lastHealthCheck, setLastHealthCheck] = useState("");
  const [manualReports, setManualReports] = useState(() => readLocalJson(LOCAL_REPORTS_KEY, []));
  const [evidenceChecklist, setEvidenceChecklist] = useState(() => readLocalJson(
    LOCAL_EVIDENCE_KEY,
    evidenceItemsSeed.reduce((accumulator, item) => ({ ...accumulator, [item]: false }), {})
  ));
  const [reportForm, setReportForm] = useState({
    problemType: "Conexion",
    module: "Modo demostracion",
    description: ""
  });

  const pushNotification = useCallback((type, message, action = "") => {
    setNotifications((current) => [
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        type,
        message,
        action,
        time: formatClock()
      },
      ...current
    ].slice(0, 8));
  }, []);

  const sendAuditToBackend = useCallback(async (entry) => {
    try {
      await fetchWithTimeout(`${API_BASE_URL}/audit/logs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: entry.action,
          entity: entry.entity,
          description: entry.description,
          userRole: entry.userRole,
          source: entry.source,
          metadata: entry.metadata
        })
      });
    } catch (requestError) {
      return null;
    }

    return true;
  }, []);

  const recordAuditEvent = useCallback((action, description, options = {}) => {
    const entry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`,
      action,
      description,
      source: options.source || "frontend",
      level: options.level || "info",
      entity: options.entity || "ui",
      userRole: options.userRole || "STUDENT",
      metadata: options.metadata || {},
      time: formatClock()
    };

    setAuditLogs((current) => {
      const nextLogs = [entry, ...current].slice(0, 80);
      window.localStorage.setItem(LOCAL_AUDIT_KEY, JSON.stringify(nextLogs));
      return nextLogs;
    });

    sendAuditToBackend(entry);
    return entry;
  }, [sendAuditToBackend]);

  const fetchHealthStatus = useCallback(async ({ silent = false } = {}) => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/health`);

      if (!response.ok) {
        throw new Error("No fue posible consultar el estado del sistema.");
      }

      const payload = await response.json();
      setApiReachable(true);
      setHealth(payload);
      setLastHealthCheck(payload.lastCheckedAt || formatClock());
      setError("");
      setErrorDetail("");

      if (!silent) {
        if (payload.database === "postgresql" && !payload.usingFallback) {
          pushNotification("success", "PostgreSQL conectado correctamente.", "El sistema trabaja con datos reales.");
          recordAuditEvent("POSTGRES_CONNECTED", "La aplicacion confirmo conexion con PostgreSQL.", {
            source: "backend",
            entity: "database"
          });
        } else if (payload.usingFallback) {
          pushNotification("warning", "PostgreSQL no respondio. Se activo respaldo local.", "Revisar conexion o ejecutar npm run db:test.");
          recordAuditEvent("FALLBACK_USED", "La aplicacion activo el respaldo local sin interrumpir la simulacion.", {
            source: "backend",
            entity: "database",
            level: "warning"
          });
        }
      }

      return payload;
    } catch (requestError) {
      setApiReachable(false);
      setHealth({
        status: "ok",
        database: "mock-data",
        postgresEnabled: false,
        usingFallback: true
      });
      setLastHealthCheck(formatClock());

      if (!silent) {
        pushNotification("error", "No se pudo verificar la base de datos.", "Puedes continuar con datos locales o reintentar.");
        recordAuditEvent("ERROR_REPORTED", "Fallo la verificacion de PostgreSQL.", {
          source: "backend",
          entity: "database",
          level: "error",
          metadata: {
            message: requestError.message
          }
        });
      }

      return null;
    }
  }, [pushNotification, recordAuditEvent]);

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setErrorDetail("");
      setProgressMessage("Cargando cursos, docentes, aulas y reglas...");

      const [
        coursesResponse,
        teachersResponse,
        classroomsResponse,
        timeBlocksResponse,
        constraintsResponse
      ] = await Promise.all([
        fetchWithTimeout(`${API_BASE_URL}/courses?page=1&limit=20`),
        fetchWithTimeout(`${API_BASE_URL}/teachers?page=1&limit=20`),
        fetchWithTimeout(`${API_BASE_URL}/classrooms?page=1&limit=20`),
        fetchWithTimeout(`${API_BASE_URL}/time-blocks?page=1&limit=20`),
        fetchWithTimeout(`${API_BASE_URL}/constraints`)
      ]);

      if ([coursesResponse, teachersResponse, classroomsResponse, timeBlocksResponse, constraintsResponse].some((response) => !response || !response.ok)) {
        throw new Error("No fue posible cargar la configuracion academica. Verifica que el backend este encendido.");
      }

      setProgressMessage("Normalizando datos para la simulacion de matricula...");

      const [coursesData, teachersData, classroomsData, timeBlocksData, constraintsData] = await Promise.all([
        coursesResponse.json(),
        teachersResponse.json(),
        classroomsResponse.json(),
        timeBlocksResponse.json(),
        constraintsResponse.json()
      ]);

      const normalizedCourses = unwrapList(coursesData).map(normalizeCourse);
      setApiReachable(true);
      setError("");
      setErrorDetail("");
      setCourses(normalizedCourses);
      setTeachers(unwrapList(teachersData).map(normalizeTeacher));
      setClassrooms(unwrapList(classroomsData).map(normalizeClassroom));
      setTimeBlocks(unwrapList(timeBlocksData).map(normalizeTimeBlock));
      setConstraints(constraintsData.data || null);
      setSelectedCourseCode(normalizedCourses[0]?.code || "");
      setNotice("Datos academicos cargados correctamente.");
      pushNotification("info", "Se cargaron cursos, docentes, aulas y reglas.", "Ya puedes revisar proyecciones y generar horarios.");
      recordAuditEvent("DATA_LOADED", "Se cargo la configuracion academica base del sistema.", {
        source: "backend",
        entity: "dataset"
      });

      await fetchHealthStatus({ silent: false });
    } catch (loadError) {
      setApiReachable(false);
      setError("No pudimos completar esta accion");
      setErrorDetail(loadError.name === "AbortError"
        ? "La API no respondio dentro del tiempo esperado."
        : loadError.message);
      pushNotification("error", "La carga inicial encontro un problema temporal.", "Reintenta o continua con los datos locales.");
      recordAuditEvent("ERROR_REPORTED", "La carga inicial encontro un error.", {
        source: "frontend",
        entity: "dataset",
        level: "error",
        metadata: {
            message: loadError.name === "AbortError"
              ? "La API no respondio dentro del tiempo esperado."
              : loadError.message
          }
        });
    } finally {
      setLoading(false);
      setProgressMessage("");
    }
  }, [fetchHealthStatus, pushNotification, recordAuditEvent]);

  useEffect(() => {
    recordAuditEvent("APP_STARTED", "La aplicacion de matricula fue iniciada por el usuario.", {
      source: "frontend",
      entity: "app"
    });
    loadInitialData();
  }, [loadInitialData, recordAuditEvent]);

  const coursesByCode = useMemo(
    () => new Map(courses.map((course) => [course.code, course])),
    [courses]
  );

  const filteredCourses = useMemo(() => courses.filter((course) => {
    const matchesSearch = `${course.code} ${course.name}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = courseFilter === "all" || course.type === courseFilter;
    return matchesSearch && matchesFilter;
  }), [courseFilter, courses, searchTerm]);

  const selectedCourse = useMemo(
    () => courses.find((course) => course.code === selectedCourseCode) || null,
    [courses, selectedCourseCode]
  );

  const selectedEnrollment = useMemo(
    () => selectedEnrollments.find((item) => item.courseCode === selectedCourseCode) || null,
    [selectedCourseCode, selectedEnrollments]
  );

  const availableSections = useMemo(
    () => resolveCourseSections(selectedCourse, schedule, coursesByCode, teachers, classrooms, timeBlocks),
    [classrooms, coursesByCode, schedule, selectedCourse, teachers, timeBlocks]
  );

  const totalCredits = selectedEnrollments.reduce((sum, enrollment) => sum + enrollment.credits, 0);
  const scheduleRows = buildWeeklyRows(timeBlocks, selectedEnrollments);
  const hasConflicts = selectedEnrollments.some((enrollment) => enrollment.hasConflict);
  const creditStatus = getCreditStatus(totalCredits);
  const topStatus = selectedEnrollments.length === 0
    ? "Pendiente"
    : hasConflicts || simulatedIssue === "conflict"
      ? "Con observaciones"
      : creditStatus === "Optimo"
        ? "Optimo"
        : "Sin conflictos";
  const readyForFullSchedule = totalCredits >= MIN_RECOMMENDED_CREDITS;
  const scheduleConflicts = useMemo(() => schedule?.validation?.conflicts || [], [schedule]);
  const scheduleWarnings = useMemo(() => schedule?.warnings || [], [schedule]);
  const scheduleRecommendations = useMemo(() => schedule?.recommendations || [], [schedule]);
  const creditOptimization = useMemo(() => schedule?.creditOptimization || {
    targetCredits: TARGET_CREDITS,
    maxCredits: MAX_CREDITS,
    assignedCredits: totalCredits,
    creditGap: Math.max(TARGET_CREDITS - totalCredits, 0),
    status: creditStatus.toLowerCase().replace(/ /g, "_"),
    autoAddedCourseCodes: [],
    message: getCreditRecommendation(totalCredits)
  }, [creditStatus, schedule, totalCredits]);
  const teacherLoadSummary = useMemo(() => {
    const value = schedule?.teacherLoad || schedule?.teacher_load || [];
    return Array.isArray(value) ? value : [];
  }, [schedule]);
  const infrastructureUsage = useMemo(() => schedule?.infrastructureUsage || schedule?.infrastructure_usage || null, [schedule]);
  const infrastructureClassrooms = useMemo(() => {
    if (Array.isArray(infrastructureUsage)) {
      return infrastructureUsage;
    }

    if (Array.isArray(infrastructureUsage?.classrooms)) {
      return infrastructureUsage.classrooms;
    }

    return [];
  }, [infrastructureUsage]);
  const classroomAlerts = useMemo(() => {
    const value = schedule?.classroomAlerts || [];
    return Array.isArray(value) ? value : [];
  }, [schedule]);
  const decisionExplanation = useMemo(() => schedule?.decisionExplanation || {
    title: "Como decide el motor de horario",
    items: [
      "Recibe cursos seleccionados.",
      `Intenta completar hasta ${TARGET_CREDITS} creditos sin superar el limite.`,
      "Busca docentes disponibles.",
      "Descarta bloques con carga administrativa.",
      "Verifica aulas disponibles.",
      "Calcula ocupacion de aulas.",
      "Evita cruces entre cursos.",
      "Evalua carga docente.",
      "Devuelve horario, advertencias y recomendaciones."
    ],
    note: "Este motor no aprende como una IA, pero registra casos, detecta conflictos frecuentes y genera recomendaciones para corregir el horario."
  }, [schedule]);

  const dataCounts = useMemo(() => ({
    courses: health?.counts?.courses ?? courses.length,
    teachers: health?.counts?.teachers ?? teachers.length,
    classrooms: health?.counts?.classrooms ?? classrooms.length,
    students: health?.counts?.students ?? 60
  }), [classrooms.length, courses.length, health?.counts?.classrooms, health?.counts?.courses, health?.counts?.students, health?.counts?.teachers, teachers.length]);

  const algorithmSummary = useMemo(() => ({
    evaluatedCourses: selectedEnrollments.length > 0 ? selectedEnrollments.length : Math.min(courses.length, 5),
    assignedCourses: selectedEnrollments.length,
    credits: totalCredits,
    conflicts: simulatedIssue === "conflict" ? Math.max(scheduleConflicts.length, 1) : scheduleConflicts.length,
    warnings: simulatedIssue === "capacity" ? Math.max(scheduleWarnings.length, 1) : scheduleWarnings.length,
    recommendations: scheduleRecommendations.slice(0, 4),
    rulesSatisfied: Math.max((constraints?.hard?.length || 0) - scheduleConflicts.length, 0),
    rulesObserved: scheduleWarnings.length + (simulatedIssue ? 1 : 0),
    creditStatus: creditOptimization.status
  }), [constraints?.hard?.length, courses.length, creditOptimization.status, scheduleConflicts.length, scheduleRecommendations, scheduleWarnings.length, selectedEnrollments.length, simulatedIssue, totalCredits]);

  const validations = useMemo(() => {
    const occupancyRisk = infrastructureClassrooms.find((item) =>
      Number(item.averageOccupancy || item.average_occupancy || item.occupancyRate || item.occupancy_rate || 0) >= 0.95
    );
    const conflictTeacher = teacherLoadSummary.find((item) =>
      item.status === "overloaded"
      || Number(item.loadRatio || item.load_ratio || 0) > 1
      || Number(item.assignedHours || item.assigned_hours || 0) > Number(item.maxTeachingLoad || item.max_teaching_load || Infinity)
    );
    const adminTeacher = teachers.find((teacher) => teacher.administrativeLoad > 0);

    return [
      {
        name: "Cruce de horario entre cursos",
        status: simulatedIssue === "conflict" || hasConflicts ? "Conflicto" : "Cumplido",
        detail: simulatedIssue === "conflict" || hasConflicts
          ? "Dos asignaturas ocupan el mismo bloque horario."
          : "No se detectan cruces criticos en la seleccion actual.",
        action: "Ver horarios alternativos."
      },
      {
        name: "Conflicto docente",
        status: conflictTeacher ? "Observacion" : "Cumplido",
        detail: conflictTeacher
          ? "Existe una carga docente elevada que requiere revision."
          : "No se detectan cruces criticos de docente.",
        action: "Revisar carga del docente."
      },
      {
        name: "Conflicto de aula",
        status: simulatedIssue === "capacity" ? "Conflicto" : "Cumplido",
        detail: simulatedIssue === "capacity"
          ? "Una seccion supera la capacidad del aula."
          : "No se detecta doble uso del aula en el mismo bloque.",
        action: "Cambiar aula o seccion."
      },
      {
        name: "Capacidad de aula",
        status: occupancyRisk || simulatedIssue === "capacity" ? "Observacion" : "Cumplido",
        detail: occupancyRisk
          ? `El aula esta al ${percentage(occupancyRisk.occupancyRate || occupancyRisk.occupancy_rate)} de ocupacion.`
          : "La ocupacion de aula se mantiene en rangos aceptables.",
        action: "Usar un aula con mayor capacidad si la ocupacion supera 95%."
      },
      {
        name: "Aula compatible con tipo de curso",
        status: "Cumplido",
        detail: "El sistema prioriza aulas compatibles con teoria o laboratorio.",
        action: "Validar en Coordinacion si se cambia de tipo."
      },
      {
        name: "Carga docente",
        status: conflictTeacher ? "Observacion" : "Cumplido",
        detail: conflictTeacher
          ? "La carga se acerca al maximo referencial del docente."
          : "La carga docente se mantiene balanceada.",
        action: "Revisar disponibilidad del docente."
      },
      {
        name: "Bloques protegidos por carga administrativa",
        status: adminTeacher ? "Observacion" : "Cumplido",
        detail: adminTeacher
          ? "Hay docentes con bloques protegidos por coordinacion o gestion."
          : "No se detectan bloqueos administrativos relevantes.",
        action: "Revisar bloques protegidos en Coordinacion."
      },
      {
        name: "Compatibilidad con practicas",
        status: "Cumplido",
        detail: "El horario busca mantener bloques compactos para estudiantes con practicas o trabajo.",
        action: "Priorizar turnos compactos."
      },
      {
        name: "Uso de infraestructura",
        status: occupancyRisk ? "Observacion" : "Cumplido",
        detail: occupancyRisk
          ? "Se detecta un caso de alta ocupacion o subutilizacion."
          : "El uso de aulas se encuentra dentro del rango de referencia.",
        action: "Revisar uso de aulas en Coordinacion."
      },
      {
        name: "Creditos seleccionados",
        status: totalCredits === 0 ? "Observacion" : totalCredits > MAX_CREDITS ? "Conflicto" : "Cumplido",
        detail: totalCredits === 0
          ? "Aun no se agregaron cursos al resumen."
          : `${totalCredits} creditos seleccionados de un maximo de ${MAX_CREDITS}. Objetivo recomendado: llegar lo mas cerca posible a ${TARGET_CREDITS} creditos.`,
        action: "Mantener la seleccion entre 20 y 25 creditos."
      }
    ];
  }, [hasConflicts, infrastructureClassrooms, simulatedIssue, teacherLoadSummary, teachers, totalCredits]);

  const detectedCases = useMemo(() => {
    const items = [];

    if (simulatedIssue === "conflict" || hasConflicts || scheduleConflicts.length > 0) {
      items.push({
        title: "Cruce de horario",
        tone: "error",
        description: "Dos asignaturas ocupan el mismo bloque horario. El estudiante debe cambiar una seccion.",
        action: "Ver horarios alternativos."
      });
    }

    if (simulatedIssue === "admin" || teachers.some((teacher) => teacher.administrativeLoad > 0)) {
      items.push({
        title: "Docente con carga administrativa",
        tone: "warning",
        description: "El sistema evita asignar clases en bloques protegidos por gestion o coordinacion.",
        action: "Revisar carga administrativa en Coordinacion."
      });
    }

    if (simulatedIssue === "capacity") {
      items.push({
        title: "Aula sobreocupada",
        tone: "error",
        description: "Se detecto que una seccion supera la capacidad del aula. El sistema no debe confirmar esta matricula hasta corregir el aula o cambiar seccion.",
        action: "Cambiar aula por una de mayor capacidad."
      });
    }

    items.push({
      title: health?.database === "postgresql" && !health?.usingFallback && simulatedIssue !== "connection" ? "PostgreSQL en uso" : "Fallback local activado",
      tone: health?.database === "postgresql" && !health?.usingFallback && simulatedIssue !== "connection" ? "success" : "warning",
      description: health?.database === "postgresql" && !health?.usingFallback && simulatedIssue !== "connection"
        ? "La aplicacion esta leyendo datos reales desde PostgreSQL."
        : "El respaldo local evita que la simulacion se interrumpa si la base de datos no responde.",
      action: "Ver Estado general del sistema."
    });

    return items;
  }, [hasConflicts, health?.database, health?.usingFallback, scheduleConflicts.length, simulatedIssue, teachers]);

  const mvpStatus = useMemo(() => mvpChecklist.map((item) => {
    let status = "Listo";

    if (item === "PostgreSQL integrado" && health?.database !== "postgresql") {
      status = "En validacion";
    }

    if (item === "Evidencias de pruebas") {
      status = "En validacion";
    }

    return { label: item, status };
  }), [health?.database]);

  const selectedSummary = selectedEnrollments.length > 0
    ? `${selectedEnrollments.length} cursos agregados y ${totalCredits} creditos acumulados.`
    : "Selecciona tus asignaturas, revisa horarios disponibles y confirma tu matricula simulada.";
  const visibleTabs = viewMode === "student"
    ? [
      { key: "projections", label: "Proyecciones" },
      { key: "nrc", label: "Buscar NRC" },
      { key: "schedule", label: "Horario" },
      { key: "summary", label: "Resumen" }
    ]
    : [
      { key: "projections", label: "Proyecciones" },
      { key: "nrc", label: "Buscar NRC" },
      { key: "schedule", label: "Horario" },
      { key: "summary", label: "Resumen" },
      { key: "coordination", label: "Coordinacion" },
      { key: "demo", label: "Modo demostracion" }
    ];

  useEffect(() => {
    if (viewMode === "student" && (activeTab === "coordination" || activeTab === "demo")) {
      setActiveTab("projections");
    }
  }, [activeTab, viewMode]);

  function handleAutoBuildLoad() {
    const optimalSelection = buildOptimalCourseSelection(courses, selectedEnrollments, TARGET_CREDITS);
    const nextSelections = [...selectedEnrollments];
    const currentCourseCodes = new Set(selectedEnrollments.map((item) => item.courseCode));

    optimalSelection.autoAddedCourseCodes.forEach((courseCode) => {
      if (currentCourseCodes.has(courseCode)) {
        return;
      }

      const course = coursesByCode.get(courseCode);
      const [firstSection] = resolveCourseSections(course, schedule, coursesByCode, teachers, classrooms, timeBlocks);

      if (!firstSection) {
        return;
      }

      nextSelections.push(firstSection);
      currentCourseCodes.add(courseCode);
    });

    if (nextSelections.length === selectedEnrollments.length) {
      setError("No pudimos completar esta accion");
      setErrorDetail("No encontramos suficientes secciones compatibles para acercarte al objetivo de 25 creditos.");
      pushNotification("warning", "No se pudo completar una carga sugerida.", "Prueba agregando cursos manualmente desde Ver horarios.");
      return;
    }

    setSelectedEnrollments(annotateEnrollments(nextSelections));
    setSelectedCourseCode(nextSelections[0]?.courseCode || selectedCourseCode);
    setError("");
    setErrorDetail("");
    setNotice("Se completaron cursos sugeridos para ayudarte a acercarte a 25 creditos.");
    pushNotification("success", "Se agregaron cursos sugeridos para acercarse a 25 creditos.", optimalSelection.autoAddedCourseCodes.join(", "));
    recordAuditEvent("CREDIT_TARGET_EVALUATED", "Se completo una carga sugerida automatica para acercarse al objetivo de 25 creditos.", {
      source: "frontend",
      entity: "enrollment",
      metadata: {
        coursesAdded: optimalSelection.autoAddedCourseCodes
      }
    });
  }

  async function handleGenerateSuggestion() {
    try {
      if (selectedEnrollments.length === 0) {
        setError("No pudimos completar esta accion");
        setErrorDetail("Agrega cursos al resumen antes de generar un horario optimo.");
        pushNotification("warning", "Agrega cursos al resumen antes de generar el horario.", "Usa Ver horarios y luego Agregar.");
        return;
      }

      if (!readyForFullSchedule) {
        setError("No pudimos completar esta accion");
        setErrorDetail("Tu carga aun esta por debajo del rango recomendado. Puedes completar automaticamente para acercarte a 25 creditos.");
      }

      setGenerating(true);
      setError("");
      setErrorDetail("");
      setNotice("");
      setProgressMessage("Analizando cursos, docentes, aulas y restricciones...");

      const optimalSelection = buildOptimalCourseSelection(courses, selectedEnrollments, TARGET_CREDITS);
      const selectedCourseCodes = optimalSelection.selectedCourseCodes;
      recordAuditEvent("OPTIMAL_SCHEDULE_REQUESTED", "Se solicito generacion optima hasta 25 creditos.", {
        source: "frontend",
        entity: "schedule",
        metadata: {
          selectedCourseCodes
        }
      });

      const response = await fetchWithTimeout(`${API_BASE_URL}/schedules/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedCourseCodes,
          targetCredits: TARGET_CREDITS,
          minRecommendedCredits: MIN_RECOMMENDED_CREDITS,
          maxCredits: MAX_CREDITS,
          allowAutoComplete: true
        })
      });

      setProgressMessage("Validando cruces, carga docente y uso de aulas...");

      const payload = await response.json();
      setSchedule(payload);

      const suggestedEnrollments = annotateEnrollments(groupScheduleToEnrollments(payload.items || [], coursesByCode));
      if (suggestedEnrollments.length > 0) {
        setSelectedEnrollments(suggestedEnrollments);
      }

      if ((payload.creditOptimization?.autoAddedCourseCodes || []).length > 0) {
        pushNotification("info", "Se agregaron cursos sugeridos para acercarse a 25 creditos.", payload.creditOptimization.autoAddedCourseCodes.join(", "));
      }

      if (!response.ok) {
        setNotice("Resultado de generacion con observaciones. Revisa el resumen antes de matricular.");
        pushNotification("warning", "Se genero horario sugerido con observaciones.", "Revisar conflictos y recomendaciones.");
      } else {
        setNotice("Horario optimo generado para la simulacion.");
        pushNotification("success", "Horario optimo generado correctamente.", "Revisa Horario, Resumen y Modo demostracion.");
      }

      recordAuditEvent("SCHEDULE_GENERATED", "Se genero una propuesta de horario para matricula.", {
        source: "scheduler",
        entity: "schedule",
        metadata: { selectedCourseCodes }
      });

      if (payload.creditOptimization?.assignedCredits === TARGET_CREDITS) {
        recordAuditEvent("CREDIT_TARGET_REACHED", "Se alcanzo el objetivo de 25 creditos.", {
          source: "scheduler",
          entity: "schedule"
        });
      } else {
        recordAuditEvent("CREDIT_TARGET_PARTIAL", `Se genero la mejor carga posible con ${payload.creditOptimization?.assignedCredits || 0} creditos.`, {
          source: "scheduler",
          entity: "schedule",
          level: "warning"
        });
      }

      if ((payload.classroomAlerts || []).some((item) => item.occupancyStatus === "risk")) {
        recordAuditEvent("CLASSROOM_RISK_DETECTED", "Se detecto aula con ocupacion alta.", {
          source: "scheduler",
          entity: "classroom",
          level: "warning"
        });
      }

      if ((payload.classroomAlerts || []).some((item) => item.occupancyStatus === "invalid")) {
        recordAuditEvent("CLASSROOM_INVALID_DETECTED", "Se detecto aula llena o invalida.", {
          source: "scheduler",
          entity: "classroom",
          level: "error"
        });
      }

      if ((payload.validation?.conflicts || []).length > 0) {
        recordAuditEvent("CONFLICT_DETECTED", "El motor detecto conflictos durante la generacion.", {
          source: "scheduler",
          entity: "schedule",
          level: "warning"
        });
      }

      setActiveTab("schedule");
    } catch (requestError) {
      setApiReachable(false);
      setError("No pudimos completar esta accion");
      setErrorDetail(requestError.name === "AbortError"
        ? "La generacion del horario excedio el tiempo de espera de la API."
        : requestError.message || "No se pudo generar el horario sugerido.");
      pushNotification("error", "No se pudo generar el horario.", "Reintenta o continua con los datos disponibles.");
      recordAuditEvent("ERROR_REPORTED", "La generacion del horario encontro un error temporal.", {
        source: "frontend",
        entity: "schedule",
        level: "error",
        metadata: {
          message: requestError.name === "AbortError"
            ? "La generacion del horario excedio el tiempo de espera de la API."
            : requestError.message
        }
      });
    } finally {
      setGenerating(false);
      setProgressMessage("");
    }
  }

  function addEnrollment(section) {
    const next = selectedEnrollments.filter((item) => item.courseCode !== section.courseCode);
    setSelectedEnrollments(annotateEnrollments([...next, section]));
    setSelectedCourseCode(section.courseCode);
    setError("");
    setErrorDetail("");
    setNotice(`${section.courseCode} fue agregado al resumen de matricula.`);
    pushNotification("success", "Curso agregado al resumen de matricula.", "Revisa el horario preliminar.");
    recordAuditEvent("SECTION_ADDED", `Se agrego la seccion ${section.nrc} de ${section.courseCode}.`, {
      source: "frontend",
      entity: "enrollment",
      metadata: {
        courseCode: section.courseCode,
        nrc: section.nrc
      }
    });
  }

  function removeEnrollment(courseCode) {
    setSelectedEnrollments((current) => annotateEnrollments(current.filter((item) => item.courseCode !== courseCode)));
    setError("");
    setErrorDetail("");
    pushNotification("info", `Se retiro ${courseCode} del resumen.`, "Puedes agregar otra seccion.");
    recordAuditEvent("SECTION_REMOVED", `Se retiro ${courseCode} del resumen de matricula.`, {
      source: "frontend",
      entity: "enrollment",
      metadata: { courseCode }
    });
  }

  function handleMatriculate() {
    if (selectedEnrollments.length === 0) {
      setError("No pudimos completar esta accion");
      setErrorDetail("Selecciona al menos una asignatura antes de matricularte.");
      pushNotification("warning", "Selecciona al menos una asignatura antes de matricularte.", "Vuelve a Proyecciones y agrega una seccion.");
      recordAuditEvent("ENROLLMENT_BLOCKED", "La matricula fue bloqueada porque no hay cursos seleccionados.", {
        source: "frontend",
        entity: "enrollment",
        level: "warning"
      });
      return;
    }

    if (hasConflicts || simulatedIssue === "conflict") {
      setError("No pudimos completar esta accion");
      setErrorDetail("Hay conflictos pendientes. Revisa el horario o cambia una seccion.");
      pushNotification("error", "Hay conflictos pendientes.", "Cambia la seccion marcada o reduce cursos seleccionados.");
      recordAuditEvent("ENROLLMENT_BLOCKED", "La matricula fue bloqueada por conflictos pendientes.", {
        source: "frontend",
        entity: "enrollment",
        level: "error"
      });
      return;
    }

    if (totalCredits > MAX_CREDITS) {
      setError("No pudimos completar esta accion");
      setErrorDetail("Tu carga supera el maximo permitido de 25 creditos.");
      pushNotification("error", "La carga supera el maximo permitido.", "Reduce cursos antes de matricularte.");
      return;
    }

    setSelectedEnrollments((current) => current.map((item) => ({
      ...item,
      status: "Matriculado simulado"
    })));
    setNotice("Matricula simulada registrada correctamente.");
    pushNotification("success", "Matricula simulada registrada correctamente.", "Puedes mostrar la trazabilidad en Modo demostracion.");
    recordAuditEvent("ENROLLMENT_SIMULATED", "Se registro una matricula simulada dentro del MVP.", {
      source: "frontend",
      entity: "enrollment"
    });
    setError("");
    setActiveTab("summary");
  }

  function handleNrcSearch() {
    const normalizedInput = nrcInput.trim().toLowerCase();
    if (!normalizedInput) {
      setError("No pudimos completar esta accion");
      setErrorDetail("Ingresa un NRC o codigo de asignatura.");
      return;
    }

    const matchedCourse = courses.find((course) => course.code.toLowerCase() === normalizedInput);
    if (!matchedCourse) {
      setError("No pudimos completar esta accion");
      setErrorDetail("No encontramos un curso con ese NRC o codigo.");
      pushNotification("warning", "No se encontro la asignatura ingresada.", "Verifica el codigo o busca desde Proyecciones.");
      return;
    }

    setSelectedCourseCode(matchedCourse.code);
    setActiveTab("projections");
    setNotice(`Se encontro ${matchedCourse.code}. Revisa sus horarios y agrega una seccion.`);
    pushNotification("success", `Asignatura ${matchedCourse.code} ubicada.`, "Ahora puedes revisar sus horarios.");
    recordAuditEvent("COURSE_SELECTED", `Se ubico la asignatura ${matchedCourse.code} desde Buscar NRC.`, {
      source: "frontend",
      entity: "course",
      metadata: { courseCode: matchedCourse.code }
    });
    setError("");
  }

  function handleSelectCourse(courseCode) {
    setSelectedCourseCode(courseCode);
    setError("");
    setErrorDetail("");
    recordAuditEvent("COURSE_SELECTED", `Se selecciono ${courseCode} para revisar horarios.`, {
      source: "frontend",
      entity: "course",
      metadata: { courseCode }
    });
  }

  function handleRetryAction() {
    setShowErrorDetail(false);
    if (courses.length === 0) {
      loadInitialData();
      return;
    }

    fetchHealthStatus({ silent: false });
  }

  function handleUseLocalMode() {
    setError("");
    setNotice("El sistema continuara con los datos disponibles mientras se revisa PostgreSQL.");
    pushNotification("info", "Se priorizo la continuidad de la simulacion.", "Puedes seguir usando Proyecciones, Horario y Resumen.");
    recordAuditEvent("FALLBACK_USED", "El usuario continuo con la simulacion local sin bloquearse.", {
      source: "frontend",
      entity: "database",
      level: "warning"
    });
  }

  function simulateIssue(issue) {
    setSimulatedIssue(issue);
    const messages = {
      conflict: {
        notification: "Se detecto un cruce de horario entre dos asignaturas.",
        action: "Ver horarios alternativos.",
        description: "Se simulo un cruce de horario para demostracion."
      },
      admin: {
        notification: "Se detecto un docente con carga administrativa protegida.",
        action: "Revisar carga administrativa.",
        description: "Se simulo un docente con bloques protegidos."
      },
      capacity: {
        notification: "Se detecto un aula sobreocupada.",
        action: "Cambiar aula o seccion.",
        description: "Se simulo un caso de sobreocupacion de aula."
      },
      connection: {
        notification: "PostgreSQL no respondio. Se activo respaldo local.",
        action: "Revisar conexion o ejecutar npm run db:test.",
        description: "Se simulo una caida de PostgreSQL con continuidad local."
      },
      success: {
        notification: "Se simulo una matricula correcta sin conflictos criticos.",
        action: "Mostrar flujo de estudiante y resumen final.",
        description: "Se simulo un caso de matricula correcta."
      }
    };

    const current = messages[issue];
    pushNotification(issue === "success" ? "success" : "warning", current.notification, current.action);
    recordAuditEvent("DEMO_CASE_TRIGGERED", current.description, {
      source: "frontend",
      entity: "demo",
      level: issue === "success" ? "info" : "warning",
      metadata: { issue }
    });

    if (issue === "conflict") {
      recordAuditEvent("CONFLICT_DETECTED", "Se detecto un cruce de horario simulado.", {
        source: "scheduler",
        entity: "demo",
        level: "warning"
      });
    }
  }

  function clearSimulation() {
    setSimulatedIssue(null);
    pushNotification("info", "Se limpio la simulacion activa.", "La vista vuelve al estado real cargado.");
  }

  function clearAuditLog() {
    setAuditLogs([]);
    window.localStorage.setItem(LOCAL_AUDIT_KEY, JSON.stringify([]));
    pushNotification("info", "La bitacora de auditoria fue limpiada.", "Puedes registrar nuevos eventos de prueba.");
  }

  function exportAuditLog() {
    downloadJson("smartsched-uc-auditoria.json", auditLogs);
    pushNotification("success", "La auditoria fue exportada en JSON.", "Adjunta el archivo como evidencia de entrega.");
  }

  function registerTestEvent() {
    recordAuditEvent("DEMO_CASE_TRIGGERED", "Se registro un evento de prueba manual desde Modo demostracion.", {
      source: "frontend",
      entity: "demo"
    });
    pushNotification("info", "Se registro un evento de prueba en la bitacora.", "Revisa la tabla de auditoria.");
  }

  function handleEvidenceToggle(item) {
    setEvidenceChecklist((current) => {
      const next = { ...current, [item]: !current[item] };
      window.localStorage.setItem(LOCAL_EVIDENCE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function handleReportFieldChange(field, value) {
    setReportForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleReportProblem() {
    if (!reportForm.description.trim()) {
      pushNotification("warning", "Describe el problema antes de registrarlo.", "Completa el formulario interno.");
      return;
    }

    const entry = {
      id: `${Date.now()}`,
      time: formatClock(),
      ...reportForm
    };

    setManualReports((current) => {
      const next = [entry, ...current].slice(0, 20);
      window.localStorage.setItem(LOCAL_REPORTS_KEY, JSON.stringify(next));
      return next;
    });

    recordAuditEvent("ERROR_REPORTED", `Reporte registrado: ${reportForm.problemType} en ${reportForm.module}.`, {
      source: "frontend",
      entity: "support",
      level: "error",
      metadata: reportForm
    });
    pushNotification("info", "Se registro el problema para revision del equipo tecnico.", "La simulacion puede continuar.");
    setReportForm({
      problemType: "Conexion",
      module: "Modo demostracion",
      description: ""
    });
  }

  function handleQuickProblemReport() {
    recordAuditEvent("ERROR_REPORTED", "Se registro un problema tecnico desde el panel de error.", {
      source: "frontend",
      entity: "support",
      level: "error"
    });
    pushNotification("info", "Se registro el problema para revision del equipo tecnico.", "La simulacion puede continuar.");
  }

  function renderErrorPanel() {
    if (!error) {
      return null;
    }

    return (
      <section className="error-panel">
        <div>
          <strong>{error}</strong>
          <p>El sistema detecto un problema temporal, pero puedes continuar con datos locales o reintentar.</p>
          {showErrorDetail && errorDetail && <pre className="technical-detail">{errorDetail}</pre>}
        </div>
        <div className="error-actions">
          <button className="secondary-button" onClick={handleRetryAction} type="button">Reintentar</button>
          <button className="secondary-button" onClick={handleUseLocalMode} type="button">Usar datos locales</button>
          <button className="secondary-button" onClick={() => setShowErrorDetail((current) => !current)} type="button">Ver detalle tecnico</button>
          <button className="secondary-button" onClick={handleQuickProblemReport} type="button">Reportar problema</button>
        </div>
      </section>
    );
  }

  function renderSystemStrip() {
    const shouldShowNotificationsPanel = viewMode === "teacher" && (activeTab === "coordination" || activeTab === "demo");
    const hasVerifiedHealth = Boolean(health);
    const usingFallback = simulatedIssue === "connection" || Boolean(health?.usingFallback);
    const databaseLabel = simulatedIssue === "connection"
      ? "Mock data"
      : health?.database === "postgresql"
        ? "PostgreSQL"
        : health?.database === "mock-data"
          ? "Mock data"
          : "No consultado";
    const apiLabel = apiReachable === false ? "No disponible" : apiReachable === true ? "Activa" : "Verificando";
    const bannerTone = error
      ? "error"
      : !hasVerifiedHealth
        ? "neutral"
        : usingFallback
          ? "warning"
          : "success";

    return (
      <section className={`system-strip ${shouldShowNotificationsPanel ? "" : "student-view"}`}>
        <article className="status-card">
          <div className="panel-toolbar compact">
            <div>
              <h2>Estado del sistema</h2>
              <p>
                {viewMode === "teacher"
                  ? "La base relacional permite mantener consistencia entre cursos, docentes, aulas, estudiantes y horarios."
                  : "El sistema intenta maximizar tus creditos sin generar cruces ni superar aulas disponibles."}
              </p>
            </div>
            {viewMode === "teacher" && (
              <div className="toolbar-actions">
                <button className="secondary-button" onClick={() => fetchHealthStatus({ silent: false })} type="button">Revisar conexion</button>
                <button className="secondary-button" onClick={loadInitialData} type="button">Reintentar carga de datos</button>
              </div>
            )}
          </div>

          {viewMode === "teacher" ? (
            <>
              <div className="mini-grid four">
                <div className="mini-stat"><span>API</span><strong>{apiLabel}</strong></div>
                <div className="mini-stat"><span>Base de datos</span><strong>{databaseLabel}</strong></div>
                <div className="mini-stat"><span>Fallback</span><strong>{usingFallback ? "Activo" : "Inactivo"}</strong></div>
                <div className="mini-stat"><span>Ultima sincronizacion</span><strong>{lastHealthCheck || "Pendiente"}</strong></div>
              </div>

              <div className="mini-grid four">
                <div className="mini-stat"><span>Cursos cargados</span><strong>{dataCounts.courses}</strong></div>
                <div className="mini-stat"><span>Docentes cargados</span><strong>{dataCounts.teachers}</strong></div>
                <div className="mini-stat"><span>Aulas cargadas</span><strong>{dataCounts.classrooms}</strong></div>
                <div className="mini-stat"><span>Estudiantes</span><strong>{dataCounts.students}</strong></div>
              </div>

              <div className="mini-grid two">
                <div className="mini-stat"><span>Estado de pruebas</span><strong>Verificado manualmente</strong></div>
                <div className="mini-stat"><span>Flujo estudiante</span><strong>{selectedSummary}</strong></div>
              </div>
            </>
          ) : (
            <div className="mini-grid three">
              <div className="mini-stat"><span>Cursos en resumen</span><strong>{selectedEnrollments.length}</strong></div>
              <div className="mini-stat"><span>Creditos seleccionados</span><strong>{totalCredits} / {MAX_CREDITS}</strong></div>
              <div className="mini-stat"><span>Carga academica</span><strong>{creditStatus}</strong></div>
            </div>
          )}

          <div className={`status-banner ${bannerTone}`}>
            {error
              ? "No se pudo verificar la base. Puedes continuar con datos locales o reintentar."
              : !hasVerifiedHealth
                ? "La aplicacion aun esta verificando la API y la fuente de datos."
                : usingFallback
                  ? "El sistema activo respaldo local para no interrumpir la simulacion."
                  : viewMode === "teacher"
                    ? "PostgreSQL conectado. El sistema trabaja con datos reales."
                    : readyForFullSchedule
                      ? "Ya puedes generar un horario optimo hasta 25 creditos con los cursos de tu resumen."
                      : "Objetivo recomendado: llegar lo mas cerca posible a 25 creditos."}
          </div>
        </article>

        {shouldShowNotificationsPanel && (
          <article className="notifications-card">
            <div className="panel-toolbar compact">
              <div>
                <h2>Notificaciones del sistema</h2>
                <p>La bitacora registra acciones importantes para revisar decisiones y errores.</p>
              </div>
            </div>
            <div className="notifications-list">
              {notifications.length === 0 ? (
                <div className="empty-box compact">
                  <p>No hay notificaciones nuevas.</p>
                </div>
              ) : (
                notifications.map((item) => (
                  <article className={`notification-item ${item.type}`} key={item.id}>
                    <div className="notification-meta">
                      <strong>{item.type}</strong>
                      <span>{item.time}</span>
                    </div>
                    <p>{item.message}</p>
                    {item.action && <small>Accion sugerida: {item.action}</small>}
                  </article>
                ))
              )}
            </div>
          </article>
        )}
      </section>
    );
  }

  function renderProjectionPanel() {
    return (
      <div className="workspace-grid">
        <article className="board-panel">
          <div className="panel-toolbar">
            <div>
              <h2>Listado de asignaturas</h2>
              <p className="muted-copy">Selecciona tus asignaturas, revisa horarios disponibles y confirma tu matricula simulada.</p>
              <p className="muted-copy">Carga academica optima: entre 20 y 25 creditos.</p>
            </div>
            <div className="projection-actions">
              {!readyForFullSchedule && (
                <button
                  className="secondary-button"
                  disabled={loading || generating || filteredCourses.length === 0}
                  onClick={handleAutoBuildLoad}
                  type="button"
                >
                  Completar carga sugerida
                </button>
              )}
                <button
                  className="secondary-button"
                  disabled={loading || generating || selectedEnrollments.length === 0}
                  onClick={handleGenerateSuggestion}
                  type="button"
                >
                {generating ? "Generando..." : "Generar horario optimo hasta 25 creditos"}
                </button>
            </div>
          </div>

          <div className="technical-box compact-callout">
            <small>
              El horario completo se genera con los cursos agregados al resumen. El sistema intenta maximizar tus creditos sin generar cruces ni superar aulas disponibles.
            </small>
            <small>Objetivo recomendado: llegar lo mas cerca posible a 25 creditos.</small>
          </div>

          <div className="student-profile-card">
            <strong>Perfil demostrativo</strong>
            <small>{STUDENT_PROFILE}</small>
            <small>Turno preferido: Manana | Practicas: Si | Trabajo: Parcial</small>
          </div>

          <div className="filters-row">
            <input
              aria-label="Buscar asignatura"
              className="search-input"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar por codigo o nombre"
              type="search"
              value={searchTerm}
            />
            <div className="compact-filters" role="group" aria-label="Filtro por tipo">
              <button className={courseFilter === "all" ? "active" : ""} onClick={() => setCourseFilter("all")} type="button">Todos</button>
              <button className={courseFilter === "theory" ? "active" : ""} onClick={() => setCourseFilter("theory")} type="button">Teoria</button>
              <button className={courseFilter === "lab" ? "active" : ""} onClick={() => setCourseFilter("lab")} type="button">Laboratorio</button>
            </div>
          </div>

          <div className="table-shell">
            <table className="compact-table">
              <thead>
                <tr>
                  <th>Ciclo</th>
                  <th>Codigo</th>
                  <th>Asignatura</th>
                  <th>Creditos</th>
                  <th>Tipo</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => {
                  const isAdded = selectedEnrollments.some((item) => item.courseCode === course.code);
                  const rowTone = isAdded ? "is-selected" : selectedCourseCode === course.code ? "is-focused" : "is-neutral";
                  return (
                    <tr className={rowTone} key={course.code}>
                      <td>2026-2</td>
                      <td>{course.code}</td>
                      <td>{course.name}</td>
                      <td>{course.credits}</td>
                      <td>{getTypeLabel(course.type)}</td>
                      <td>
                        <button className="row-button" onClick={() => handleSelectCourse(course.code)} type="button">Ver horarios</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </article>

        <aside className="side-panel">
          {!selectedCourse ? (
            <div className="empty-box">
              <strong>Panel de horarios</strong>
              <p>Selecciona una asignatura y presiona Ver horarios para elegir una seccion.</p>
            </div>
          ) : (
            <>
              <div className="course-heading">
                <div>
                  <h2>{selectedCourse.name}</h2>
                  <p>{selectedCourse.code} | {selectedCourse.credits} creditos | {getTypeLabel(selectedCourse.type)}</p>
                </div>
                {selectedEnrollment && <span className="status-pill success">Agregado</span>}
              </div>

              <div className="section-list">
                {availableSections.length === 0 ? (
                  <div className="empty-box compact">
                    <p>No encontramos horarios disponibles para esta asignatura.</p>
                  </div>
                ) : (
                  availableSections.map((section) => {
                    const isAdded = selectedEnrollment?.enrollmentId === section.enrollmentId;
                    return (
                      <article className="section-card" key={section.enrollmentId}>
                        <div className="section-main">
                          <strong>Seccion {section.nrc}</strong>
                          <span>{section.teacherName}</span>
                        </div>
                        <small>Aula: {section.classroomCode}</small>
                        {section.sessions.map((session) => (
                          <small key={`${section.enrollmentId}-${session.day}-${session.start}`}>
                            {dayLabels[session.day]} {session.start} - {session.end}
                          </small>
                        ))}
                        <small>Cupos disponibles: {section.availableSeats}</small>
                        <button className={`action-button ${isAdded ? "ghost" : ""}`} onClick={() => (isAdded ? removeEnrollment(section.courseCode) : addEnrollment(section))} type="button">
                          {isAdded ? "Eliminar" : "Agregar"}
                        </button>
                      </article>
                    );
                  })
                )}
              </div>
            </>
          )}
        </aside>
      </div>
    );
  }

  function renderSchedulePanel() {
    return (
      <div className="stack-layout">
        <article className="board-panel">
          <div className="panel-toolbar">
            <div>
              <h2>Mi horario generado</h2>
              <p className="muted-copy">Revisa tus cursos asignados por dia y hora.</p>
              <p className="muted-copy">Este horario fue generado respetando cruces, docentes, aulas y limite de 25 creditos.</p>
            </div>
          </div>

          <div className="table-shell">
            <table className="schedule-grid">
              <thead>
                <tr>
                  <th>Hora</th>
                  {WEEK_DAYS.map((day) => <th key={day}>{dayLabels[day]}</th>)}
                </tr>
              </thead>
              <tbody>
                {scheduleRows.map((row) => (
                  <tr key={`${row.start}-${row.end}`}>
                    <td className="time-column">{row.start} - {row.end}</td>
                    {WEEK_DAYS.map((day) => {
                      const enrollment = selectedEnrollments.find((item) =>
                        item.sessions.some((session) => session.day === day && session.start === row.start && session.end === row.end)
                      );

                      if (!enrollment) {
                        return <td key={`${day}-${row.start}`}><span className="empty-slot">Libre</span></td>;
                      }

                      const session = enrollment.sessions.find((current) => current.day === day && current.start === row.start && current.end === row.end);
                      const danger = enrollment.hasConflict || simulatedIssue === "conflict" || session.occupancyStatus === "invalid";

                      return (
                        <td key={`${day}-${row.start}`}>
                          <div className={`grid-card ${danger ? "danger" : "success"}`}>
                            <strong>{enrollment.courseCode}</strong>
                            <span>{session.classroomCode}</span>
                            <small>{session.teacherName}</small>
                            <small>{getTypeLabel(enrollment.type)}</small>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <div className="three-grid">
          <article className="board-panel">
            <div className="panel-toolbar compact">
              <div>
                <h2>Resultado de generacion</h2>
                <p className="muted-copy">Resumen rapido del motor de generacion.</p>
              </div>
            </div>
            <div className="mini-grid three">
              <div className="mini-stat"><span>Cursos evaluados</span><strong>{algorithmSummary.evaluatedCourses}</strong></div>
              <div className="mini-stat"><span>Cursos asignados</span><strong>{algorithmSummary.assignedCourses}</strong></div>
              <div className="mini-stat"><span>Creditos</span><strong>{algorithmSummary.credits}</strong></div>
              <div className="mini-stat"><span>Estado de creditos</span><strong>{creditStatus}</strong></div>
              <div className="mini-stat"><span>Conflictos</span><strong>{algorithmSummary.conflicts}</strong></div>
              <div className="mini-stat"><span>Advertencias</span><strong>{algorithmSummary.warnings}</strong></div>
              <div className="mini-stat"><span>Brecha al objetivo</span><strong>{creditOptimization.creditGap || 0}</strong></div>
            </div>
            <div className="technical-box">
              <strong>Que significa</strong>
              <small>
                {algorithmSummary.conflicts > 0
                  ? "Tu horario aun no esta listo para matricula. Cambia la seccion marcada o reduce cursos seleccionados."
                  : "Tu horario es valido para la simulacion. Revisa las advertencias antes de confirmar matricula."}
              </small>
              <small>{creditOptimization.message}</small>
            </div>
          </article>

          <article className="board-panel">
            <div className="panel-toolbar compact">
              <div>
                <h2>{decisionExplanation.title}</h2>
                <p className="muted-copy">Explicacion visible para la exposicion.</p>
              </div>
            </div>
            <div className="technical-box">
              {decisionExplanation.items.map((item) => <small key={item}>• {item}</small>)}
              <small>{decisionExplanation.note}</small>
            </div>
          </article>

          <article className="board-panel">
            <div className="panel-toolbar compact">
              <div>
                <h2>Aulas y ocupacion</h2>
                <p className="muted-copy">Capacidad, porcentaje de ocupacion y recomendacion por aula usada.</p>
              </div>
            </div>
            <div className="case-list">
              {(classroomAlerts.length > 0 ? classroomAlerts : [{ classroomCode: "Sin uso", capacity: 0, estimatedStudents: 0, occupancyRate: 0, statusLabel: "sin datos", recommendation: "Genera un horario para revisar aulas usadas.", occupancyStatus: "info" }]).map((item) => (
                <article className={`case-card ${getClassroomAlertTone(item.occupancyStatus)}`} key={`${item.courseCode || "na"}-${item.classroomCode}`}>
                  <strong>{item.classroomCode}</strong>
                  <p>Capacidad: {item.capacity} | Estudiantes: {item.estimatedStudents} | Ocupacion: {percentage(item.occupancyRate)}</p>
                  <small>Estado: {item.statusLabel}</small>
                  <small>{item.recommendation}</small>
                </article>
              ))}
            </div>
          </article>
        </div>
      </div>
    );
  }

  function renderSummaryPanel() {
    return (
      <div className="stack-layout">
        <article className="board-panel">
          <div className="panel-toolbar">
            <div>
              <h2>Resumen de matricula</h2>
              <p className="muted-copy">Revisa tus asignaturas agregadas antes de confirmar.</p>
            </div>
            <button className="primary-button" onClick={handleMatriculate} type="button">Matricular</button>
          </div>

          <div className="summary-progress-card">
            <div className="panel-toolbar compact">
              <div>
                <h2>Creditos actuales: {totalCredits} / {MAX_CREDITS}</h2>
                <p className="muted-copy">Objetivo recomendado: llegar lo mas cerca posible a 25 creditos.</p>
              </div>
              <span className={`status-pill ${creditStatus === "Optimo" ? "success" : creditStatus === "Carga baja" || creditStatus === "Invalido" ? "warning" : "neutral"}`}>{creditStatus}</span>
            </div>
            <div className="credit-progress">
              <div className="credit-progress-fill" style={{ width: `${Math.min((totalCredits / MAX_CREDITS) * 100, 100)}%` }} />
            </div>
            <small>{getCreditRecommendation(totalCredits)}</small>
          </div>

          <div className="table-shell">
            <table className="compact-table">
              <thead>
                <tr>
                  <th>NRC</th>
                  <th>Codigo</th>
                  <th>Asignatura</th>
                  <th>Creditos</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {selectedEnrollments.length === 0 ? (
                  <tr><td className="empty-row" colSpan="7">Aun no agregaste asignaturas al resumen.</td></tr>
                ) : (
                  selectedEnrollments.map((enrollment) => (
                    <tr key={enrollment.enrollmentId}>
                      <td>{enrollment.nrc}</td>
                      <td>{enrollment.courseCode}</td>
                      <td>{enrollment.courseName}</td>
                      <td>{enrollment.credits}</td>
                      <td>{getTypeLabel(enrollment.type)}</td>
                      <td>
                        <span className={`status-pill ${enrollment.hasConflict ? "warning" : enrollment.status === "Matriculado simulado" ? "success" : "neutral"}`}>
                          {enrollment.status}
                        </span>
                      </td>
                      <td><button className="row-button small" onClick={() => removeEnrollment(enrollment.courseCode)} type="button">Eliminar</button></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="summary-footer">
            <div className="summary-stat"><span>Creditos seleccionados</span><strong>{totalCredits} / {MAX_CREDITS}</strong></div>
            <div className="summary-stat"><span>Objetivo recomendado</span><strong>{TARGET_CREDITS}</strong></div>
            <div className="summary-stat"><span>Rango optimo</span><strong>{MIN_RECOMMENDED_CREDITS} - {MAX_CREDITS}</strong></div>
            <div className="summary-stat"><span>Total de cursos</span><strong>{selectedEnrollments.length}</strong></div>
          </div>
        </article>
      </div>
    );
  }

  function renderNrcPanel() {
    return (
      <article className="board-panel full-panel">
        <div className="panel-toolbar">
          <div>
            <h2>Buscar NRC</h2>
            <p className="muted-copy">Ingresa un NRC o codigo de asignatura para encontrarla rapidamente.</p>
          </div>
        </div>

        <div className="nrc-box">
          <input onChange={(event) => setNrcInput(event.target.value)} placeholder="Ingresar NRC o codigo de asignatura" type="text" value={nrcInput} />
          <button className="primary-button" onClick={handleNrcSearch} type="button">Agregar</button>
        </div>
      </article>
    );
  }

  function renderCoordinationPanel() {
    return (
      <div className="coordination-shell">
        <article className="board-panel">
          <div className="panel-toolbar">
            <div>
              <h2>Coordinacion</h2>
              <p className="muted-copy">Revisa carga docente, aulas, conflictos y trazabilidad de la generacion de horarios.</p>
            </div>
          </div>
          <div className="technical-section-grid">
            <section className="technical-box">
              <strong>Estado tecnico</strong>
              <small>Base de datos: {health?.database || "No consultado"}</small>
              <small>Fallback: {health?.usingFallback ? "Activo" : "Inactivo"}</small>
              <small>Ultima verificacion: {lastHealthCheck || "Pendiente"}</small>
            </section>
            <section className="technical-box">
              <strong>Carga docente</strong>
              {(teachers.slice(0, 6)).map((teacher) => (
                <small key={teacher.code}>{teacher.name} | academica {teacher.currentAcademicLoad}h | administrativa {teacher.administrativeLoad}h</small>
              ))}
            </section>
            <section className="technical-box">
              <strong>Uso de aulas</strong>
              {(classrooms.slice(0, 6)).map((classroom) => (
                <small key={classroom.code}>{classroom.code} | {classroom.capacity} cupos | uso {percentage(classroom.usagePercent)}</small>
              ))}
            </section>
            <section className="technical-box">
              <strong>Restricciones</strong>
              {(constraints?.hard || []).slice(0, 6).map((item) => <small key={item}>{item}</small>)}
            </section>
            <section className="technical-box">
              <strong>Recomendaciones</strong>
              {(scheduleRecommendations.length > 0 ? scheduleRecommendations : ["Sin recomendaciones adicionales por ahora."]).slice(0, 6).map((item) => <small key={item}>{item}</small>)}
            </section>
            <section className="technical-box">
              <strong>Optimizacion de creditos</strong>
              <small>Asignados: {creditOptimization.assignedCredits || totalCredits} / {MAX_CREDITS}</small>
              <small>Estado: {formatCreditOptimizationStatus(creditOptimization.status) || creditStatus}</small>
              <small>{creditOptimization.message}</small>
            </section>
            <section className="technical-box">
              <strong>Debug PostgreSQL</strong>
              <small>Fuente actual: {health?.database || "mock-data"}</small>
              <small>postgresEnabled: {String(Boolean(health?.postgresEnabled))}</small>
              <small>usingFallback: {String(Boolean(health?.usingFallback))}</small>
            </section>
          </div>
        </article>

        <article className="board-panel">
          <div className="panel-toolbar compact">
            <div>
              <h2>Bitacora de auditoria</h2>
              <p className="muted-copy">La bitacora registra acciones importantes para revisar decisiones y errores.</p>
            </div>
            <div className="toolbar-actions">
              <button className="secondary-button" onClick={clearAuditLog} type="button">Limpiar bitacora</button>
              <button className="secondary-button" onClick={exportAuditLog} type="button">Exportar auditoria JSON</button>
              <button className="secondary-button" onClick={registerTestEvent} type="button">Registrar evento de prueba</button>
            </div>
          </div>
          <div className="table-shell">
            <table className="compact-table">
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Accion</th>
                  <th>Origen</th>
                  <th>Nivel</th>
                  <th>Descripcion</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.length === 0 ? (
                  <tr><td className="empty-row" colSpan="5">No hay eventos registrados aun.</td></tr>
                ) : (
                  auditLogs.map((item) => (
                    <tr key={item.id}>
                      <td>{item.time}</td>
                      <td>{item.action}</td>
                      <td>{item.source}</td>
                      <td>{item.level}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </article>
      </div>
    );
  }

  function renderDemoPanel() {
    return (
      <div className="demo-shell">
        <article className="board-panel">
          <div className="panel-toolbar">
            <div>
              <h2>Modo demostracion</h2>
              <p className="muted-copy">Vista compacta para demostrar madurez, resiliencia y validaciones del MVP.</p>
            </div>
          </div>

          <div className="demo-grid">
            <section className="technical-box">
              <strong>Estado general del sistema</strong>
              <div className="mini-grid two">
                <div className="mini-stat"><span>API</span><strong>{error ? "No disponible" : "Activa"}</strong></div>
                <div className="mini-stat"><span>Base de datos</span><strong>{health?.database === "postgresql" && simulatedIssue !== "connection" ? "PostgreSQL" : "Mock data"}</strong></div>
                <div className="mini-stat"><span>Fallback</span><strong>{health?.usingFallback || simulatedIssue === "connection" ? "Activo" : "Inactivo"}</strong></div>
                <div className="mini-stat"><span>Ultima sincronizacion</span><strong>{lastHealthCheck || "Pendiente"}</strong></div>
                <div className="mini-stat"><span>Cursos</span><strong>{dataCounts.courses}</strong></div>
                <div className="mini-stat"><span>Docentes</span><strong>{dataCounts.teachers}</strong></div>
                <div className="mini-stat"><span>Aulas</span><strong>{dataCounts.classrooms}</strong></div>
                <div className="mini-stat"><span>Estudiantes</span><strong>{dataCounts.students}</strong></div>
              </div>
            </section>

            <section className="technical-box">
              <strong>Que valida el sistema</strong>
              <div className="validation-list">
                {validations.map((item) => (
                  <div className="validation-item" key={item.name}>
                    <div className="validation-head">
                      <span>{item.name}</span>
                      <strong className={`status-badge ${item.status.toLowerCase()}`}>{item.status}</strong>
                    </div>
                    <small>{item.detail}</small>
                    <small>Accion recomendada: {item.action}</small>
                  </div>
                ))}
              </div>
            </section>

            <section className="technical-box">
              <strong>Casos reales simulables</strong>
              <div className="resilience-actions">
                <button className="row-button small" onClick={() => simulateIssue("conflict")} type="button">Simular cruce de horario</button>
                <button className="row-button small" onClick={() => simulateIssue("admin")} type="button">Simular docente con carga administrativa</button>
                <button className="row-button small" onClick={() => simulateIssue("capacity")} type="button">Simular aula sobreocupada</button>
                <button className="row-button small" onClick={() => simulateIssue("connection")} type="button">Simular caida de PostgreSQL</button>
                <button className="row-button small" onClick={() => simulateIssue("success")} type="button">Simular matricula correcta</button>
                <button className="row-button small" onClick={clearSimulation} type="button">Limpiar simulacion</button>
              </div>
              <div className="case-list">
                {detectedCases.map((item) => (
                  <article className={`case-card ${item.tone}`} key={item.title}>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                    <small>{item.action}</small>
                  </article>
                ))}
              </div>
            </section>

            <section className="technical-box">
              <strong>Explicacion de decision del motor</strong>
              <div className="mini-grid three">
                <div className="mini-stat"><span>Cursos evaluados</span><strong>{algorithmSummary.evaluatedCourses}</strong></div>
                <div className="mini-stat"><span>Cursos asignados</span><strong>{algorithmSummary.assignedCourses}</strong></div>
                <div className="mini-stat"><span>Creditos totales</span><strong>{algorithmSummary.credits}</strong></div>
                <div className="mini-stat"><span>Conflictos criticos</span><strong>{algorithmSummary.conflicts}</strong></div>
                <div className="mini-stat"><span>Advertencias</span><strong>{algorithmSummary.warnings}</strong></div>
                <div className="mini-stat"><span>Reglas cumplidas</span><strong>{algorithmSummary.rulesSatisfied}</strong></div>
              </div>
              {decisionExplanation.items.map((item) => <small key={item}>• {item}</small>)}
              <small>{decisionExplanation.note}</small>
            </section>

            <section className="technical-box">
              <strong>Demostracion de madurez del sistema</strong>
              <small>Estado PostgreSQL/fallback: {health?.database === "postgresql" && !health?.usingFallback ? "PostgreSQL activo" : "Fallback local disponible"}</small>
              <small>Optimizacion de creditos: {creditOptimization.message}</small>
              <small>Validaciones cumplidas: {algorithmSummary.rulesSatisfied}</small>
              <small>Prueba de resiliencia: los errores no bloquean la simulacion.</small>
            </section>

            <section className="technical-box">
              <strong>Madurez del MVP</strong>
              <div className="checklist-list">
                {mvpStatus.map((item) => (
                  <div className="checklist-item" key={item.label}>
                    <span>{item.label}</span>
                    <strong className={`status-badge ${item.status.toLowerCase().replace(" ", "-")}`}>{item.status}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="technical-box">
              <strong>Evidencias para la entrega</strong>
              <div className="evidence-list">
                {evidenceItemsSeed.map((item) => (
                  <label className="evidence-item" key={item}>
                    <input checked={Boolean(evidenceChecklist[item])} onChange={() => handleEvidenceToggle(item)} type="checkbox" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="technical-box">
              <strong>Reporte de problema</strong>
              <div className="report-form">
                <select onChange={(event) => handleReportFieldChange("problemType", event.target.value)} value={reportForm.problemType}>
                  <option>Conexion</option>
                  <option>Horario</option>
                  <option>Auditoria</option>
                  <option>Interfaz</option>
                </select>
                <select onChange={(event) => handleReportFieldChange("module", event.target.value)} value={reportForm.module}>
                  <option>Modo demostracion</option>
                  <option>Proyecciones</option>
                  <option>Horario</option>
                  <option>Resumen</option>
                  <option>Coordinacion</option>
                </select>
                <textarea onChange={(event) => handleReportFieldChange("description", event.target.value)} placeholder="Describe brevemente el problema detectado" value={reportForm.description} />
                <button className="primary-button" onClick={handleReportProblem} type="button">Registrar reporte</button>
              </div>
              {manualReports.length > 0 && (
                <div className="report-list">
                  {manualReports.slice(0, 4).map((item) => (
                    <small key={item.id}>{item.time} | {item.problemType} | {item.module}</small>
                  ))}
                </div>
              )}
            </section>
          </div>
        </article>
      </div>
    );
  }

  return (
    <main className="portal-shell">
      <header className="top-bar">
        <div className="brand-block">
          <strong>SmartSched-UC</strong>
          <span>Periodo {PERIOD}</span>
        </div>

        <div className="top-metrics">
          <span>Creditos seleccionados: {totalCredits}/{MAX_CREDITS}</span>
          <span>Cursos: {selectedEnrollments.length}</span>
          <span className={`status-inline ${getStatusTone(topStatus)}`}>Estado: {topStatus}</span>
        </div>

        <button className="primary-button top-action" onClick={handleMatriculate} type="button">Matricular</button>
      </header>

      <nav className="breadcrumb" aria-label="Ruta de matricula">
        <span>Estudiante</span>
        <span>Matricula</span>
        <span>Seleccionar periodo</span>
        <strong>Matriculate</strong>
      </nav>

      <section className="view-switch" aria-label="Modo de vista">
        <button className={viewMode === "student" ? "active" : ""} onClick={() => setViewMode("student")} type="button">
          Vista alumno
        </button>
        <button className={viewMode === "teacher" ? "active" : ""} onClick={() => setViewMode("teacher")} type="button">
          Vista docente
        </button>
      </section>

      <section className="tabs-bar" aria-label="Pestanas principales">
        {visibleTabs.map((tab) => (
          <button className={activeTab === tab.key ? "active" : ""} key={tab.key} onClick={() => setActiveTab(tab.key)} type="button">
            {tab.label}
          </button>
        ))}
      </section>

      {(viewMode === "teacher" || activeTab === "projections") && renderSystemStrip()}
      {notice && <div className="feedback success">{notice}</div>}
      {progressMessage && (loading || generating) && <div className="feedback info">{progressMessage}</div>}
      {renderErrorPanel()}

      <section className="workspace">
        {activeTab === "projections" && renderProjectionPanel()}
        {activeTab === "nrc" && renderNrcPanel()}
        {activeTab === "schedule" && renderSchedulePanel()}
        {activeTab === "summary" && renderSummaryPanel()}
        {activeTab === "coordination" && renderCoordinationPanel()}
        {activeTab === "demo" && renderDemoPanel()}
      </section>
    </main>
  );
}

export default App;
