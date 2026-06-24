const { getLocalAcademicDataset } = require("./academic-data.service");
const { contains, overlaps, toMinutes } = require("./time.service");

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const DEFAULT_TARGET_CREDITS = 25;
const DEFAULT_MAX_CREDITS = 25;
const DEFAULT_MIN_RECOMMENDED_CREDITS = 20;

function getDefaultDataset() {
  return getLocalAcademicDataset();
}

function getTeacherByCode(dataset) {
  return new Map(dataset.teachers.map((teacher) => [teacher.code, teacher]));
}

function getCourseByCode(dataset) {
  return new Map(dataset.courses.map((course) => [course.code, course]));
}

function getClassroomByCode(dataset) {
  return new Map(dataset.classrooms.map((classroom) => [classroom.code, classroom]));
}

function normalizeClassroomStatus(status) {
  const normalized = String(status || "available").trim().toLowerCase();

  if (["maintenance", "mantenimiento"].includes(normalized)) {
    return "maintenance";
  }

  if (["inactive", "inactivo"].includes(normalized)) {
    return "inactive";
  }

  if (["unavailable", "no-disponible", "nodisponible"].includes(normalized)) {
    return "unavailable";
  }

  if (["available", "activo", "disponible"].includes(normalized)) {
    return "available";
  }

  return normalized;
}

function getOccupancyStatus(rate, policy) {
  if (rate > policy.invalidAbove) {
    return "invalid";
  }

  if (rate > policy.riskAbove) {
    return "risk";
  }

  if (rate < policy.underuseBelow) {
    return "underused";
  }

  if (rate >= policy.idealMin && rate <= policy.idealMax) {
    return "ideal";
  }

  return "acceptable";
}

function calculateOccupancy(estimatedStudents, classroom, policy) {
  const capacity = Number(classroom.capacity || 0);
  const rate = capacity <= 0
    ? Number.POSITIVE_INFINITY
    : Number((estimatedStudents / capacity).toFixed(2));

  return {
    rate,
    status: getOccupancyStatus(rate, policy)
  };
}

function isTeacherAvailable(teacher, slot) {
  return teacher.availability.some((availability) => contains(availability, slot));
}

function isProtectedBlock(teacher, slot) {
  return (teacher.protectedBlocks || []).some((block) => overlaps(block, slot));
}

function getEligibleTeachers(course, dataset) {
  const teacherByCode = getTeacherByCode(dataset);
  return (course.eligibleTeacherCodes || [])
    .map((code) => teacherByCode.get(code))
    .filter(Boolean);
}

function canUseClassroom(course, classroom) {
  const normalizedStatus = normalizeClassroomStatus(classroom.status);
  const classroomType = String(classroom.type || classroom.classroomType || "").toLowerCase();
  const requiredType = String(course.requiredClassroomType || course.type || "theory").toLowerCase();
  const requiresLab = Boolean(course.requiresLab) || requiredType === "lab";
  const typeCompatible = requiresLab
    ? classroomType === "lab"
    : classroomType === "theory" || classroomType === requiredType || classroomType === "general";

  return normalizedStatus === "available"
    && classroom.capacity >= course.estimatedStudents
    && typeCompatible;
}

function hasConflict(items, candidate) {
  return items.some((item) => {
    if (!overlaps(item, candidate)) {
      return false;
    }

    return item.teacherCode === candidate.teacherCode
      || item.classroomCode === candidate.classroomCode
      || item.studentGroup === candidate.studentGroup;
  });
}

function getAssignedHoursByTeacher(items) {
  return items.reduce((accumulator, item) => {
    accumulator.set(item.teacherCode, (accumulator.get(item.teacherCode) || 0) + item.duration);
    return accumulator;
  }, new Map());
}

function getAssignedHoursByCourse(items) {
  return items.reduce((accumulator, item) => {
    accumulator.set(item.courseCode, (accumulator.get(item.courseCode) || 0) + item.duration);
    return accumulator;
  }, new Map());
}

function getStudentDaySpan(items, day) {
  const sameDay = items
    .filter((item) => item.day === day)
    .sort((left, right) => toMinutes(left.start) - toMinutes(right.start));

  if (sameDay.length <= 1) {
    return 0;
  }

  return (toMinutes(sameDay[sameDay.length - 1].end) - toMinutes(sameDay[0].start)) / 60;
}

function getStudentGapHours(items, candidate) {
  const sameDay = items
    .filter((item) => item.day === candidate.day)
    .sort((left, right) => toMinutes(left.start) - toMinutes(right.start));

  if (sameDay.length === 0) {
    return 0;
  }

  const candidateStart = toMinutes(candidate.start);
  const candidateEnd = toMinutes(candidate.end);
  const distances = sameDay.map((item) => {
    const beforeGap = Math.abs(candidateStart - toMinutes(item.end));
    const afterGap = Math.abs(toMinutes(item.start) - candidateEnd);
    return Math.min(beforeGap, afterGap) / 60;
  });

  return Math.min(...distances);
}

function scoreCandidate(items, candidate, course, teacher, classroom, dataset) {
  const occupancyPolicy = dataset.constraints.occupancyPolicy;
  const occupancy = calculateOccupancy(course.estimatedStudents, classroom, occupancyPolicy);
  const assignedTeacherHours = getAssignedHoursByTeacher(items);
  const currentTeacherLoad = assignedTeacherHours.get(teacher.code) || 0;
  const teacherLoadRatio = (teacher.currentAcademicLoad + currentTeacherLoad) / Math.max(teacher.maxTeachingLoad, 1);
  const compactnessPenalty = getStudentGapHours(items, candidate);
  const daySpanPenalty = getStudentDaySpan([...items, candidate], candidate.day);
  const sameCourseDayPenalty = items.some((item) => item.courseCode === course.code && item.day === candidate.day) ? 1.5 : 0;
  const occupancyPenaltyByStatus = {
    ideal: 0,
    acceptable: 1,
    underused: 3,
    risk: 5,
    invalid: 50
  };

  return (
    occupancyPenaltyByStatus[occupancy.status]
    + teacherLoadRatio * 3
    + compactnessPenalty * 1.5
    + Math.max(daySpanPenalty - dataset.constraints.studentPolicy.maxDailySpanHoursRecommended, 0)
    + sameCourseDayPenalty
  );
}

function buildSessionTasks(dataset) {
  const candidateSpace = dataset.courses.map((course) => {
    const eligibleTeachers = getEligibleTeachers(course, dataset);
    const eligibleClassrooms = dataset.classrooms.filter((classroom) => canUseClassroom(course, classroom));
    const compatibleBlocks = dataset.timeBlocks.filter((slot) =>
      eligibleTeachers.some((teacher) => isTeacherAvailable(teacher, slot) && !isProtectedBlock(teacher, slot))
    );

    return {
      course,
      sessionsNeeded: course.requiredHours / 2,
      candidateCount: Math.max(eligibleTeachers.length * eligibleClassrooms.length * compatibleBlocks.length, 1)
    };
  });

  return candidateSpace
    .sort((left, right) =>
      left.candidateCount - right.candidateCount
      || right.course.requiredHours - left.course.requiredHours
      || right.course.estimatedStudents - left.course.estimatedStudents
      || left.course.code.localeCompare(right.course.code))
    .flatMap(({ course, sessionsNeeded }) =>
      Array.from({ length: sessionsNeeded }, (_, index) => ({
        course,
        sessionIndex: index + 1
      }))
    );
}

function buildCandidates(items, task, dataset) {
  const assignedHoursByTeacher = getAssignedHoursByTeacher(items);
  const candidates = [];

  getEligibleTeachers(task.course, dataset).forEach((teacher) => {
    dataset.timeBlocks.forEach((slot) => {
      if (!isTeacherAvailable(teacher, slot) || isProtectedBlock(teacher, slot)) {
        return;
      }

      const nextTeacherLoad = (assignedHoursByTeacher.get(teacher.code) || 0) + slot.duration;
      if (nextTeacherLoad > teacher.maxTeachingLoad) {
        return;
      }

      dataset.classrooms.filter((classroom) => canUseClassroom(task.course, classroom)).forEach((classroom) => {
        const occupancy = calculateOccupancy(
          task.course.estimatedStudents,
          classroom,
          dataset.constraints.occupancyPolicy
        );

        const candidate = {
          courseCode: task.course.code,
          courseName: task.course.name,
          credits: task.course.credits,
          courseType: task.course.courseType,
          teacherCode: teacher.code,
          teacherName: teacher.name,
          teacherContractType: teacher.contractType,
          classroomCode: classroom.code,
          classroomName: classroom.name,
          classroomType: classroom.type,
          studentGroup: "cohort-2026-2",
          day: slot.day,
          start: slot.start,
          end: slot.end,
          duration: slot.duration,
          timeBlockId: slot.id,
          estimatedStudents: task.course.estimatedStudents,
          occupancyRate: occupancy.rate,
          occupancyStatus: occupancy.status,
          sessionLabel: `${task.course.code}-S${task.sessionIndex}`
        };

        if (!hasConflict(items, candidate)) {
          candidates.push({
            item: candidate,
            score: scoreCandidate(items, candidate, task.course, teacher, classroom, dataset)
          });
        }
      });
    });
  });

  return candidates.sort((left, right) =>
    left.score - right.score
    || DAYS.indexOf(left.item.day) - DAYS.indexOf(right.item.day)
    || toMinutes(left.item.start) - toMinutes(right.item.start)
    || left.item.classroomCode.localeCompare(right.item.classroomCode)
  );
}

function backtrack(tasks, dataset, index = 0, items = [], failures = []) {
  if (index >= tasks.length) {
    return {
      success: true,
      items,
      failures
    };
  }

  const task = tasks[index];
  const candidates = buildCandidates(items, task, dataset);

  if (candidates.length === 0) {
    return {
      success: false,
      items,
      failures: [
        ...failures,
        {
          courseCode: task.course.code,
          sessionLabel: `${task.course.code}-S${task.sessionIndex}`,
          reason: "No existe combinacion valida de docente, aula y bloque horario."
        }
      ]
    };
  }

  for (const candidate of candidates) {
    const result = backtrack(tasks, dataset, index + 1, [...items, candidate.item], failures);
    if (result.success) {
      return result;
    }
  }

  return {
    success: false,
    items,
    failures: [
      ...failures,
      {
        courseCode: task.course.code,
        sessionLabel: `${task.course.code}-S${task.sessionIndex}`,
        reason: "La busqueda retrocedio sin encontrar una combinacion sostenible."
      }
    ]
  };
}

function buildTeacherLoadSummary(items, dataset) {
  const assignedHoursByTeacher = getAssignedHoursByTeacher(items);

  return dataset.teachers.map((teacher) => {
    const assignedHours = assignedHoursByTeacher.get(teacher.code) || 0;
    const totalAcademicLoad = teacher.currentAcademicLoad + assignedHours;
    const remainingHours = Math.max(teacher.maxTeachingLoad - assignedHours, 0);
    const loadRatio = Number((assignedHours / Math.max(teacher.maxTeachingLoad, 1)).toFixed(2));

    return {
      code: teacher.code,
      name: teacher.name,
      contractType: teacher.contractType,
      currentAcademicLoad: teacher.currentAcademicLoad,
      administrativeLoad: teacher.administrativeLoad,
      assignedHours,
      totalAcademicLoad,
      maxTeachingLoad: teacher.maxTeachingLoad,
      remainingHours,
      loadRatio,
      hasProtectedBlocks: (teacher.protectedBlocks || []).length > 0,
      status: loadRatio > 1 ? "overloaded" : loadRatio >= 0.85 ? "high" : "healthy"
    };
  });
}

function buildInfrastructureSummary(items, dataset) {
  const usageByClassroom = dataset.classrooms.map((classroom) => {
    const classroomItems = items.filter((item) => item.classroomCode === classroom.code);
    const averageOccupancy = classroomItems.length === 0
      ? 0
      : Number((classroomItems.reduce((sum, item) => sum + item.occupancyRate, 0) / classroomItems.length).toFixed(2));

    const statuses = classroomItems.map((item) => item.occupancyStatus);

    return {
      code: classroom.code,
      name: classroom.name,
      type: classroom.type,
      capacity: classroom.capacity,
      status: normalizeClassroomStatus(classroom.status),
      usagePercent: classroom.usagePercent,
      scheduledSessions: classroomItems.length,
      averageOccupancy,
      idealSessions: statuses.filter((status) => status === "ideal").length,
      riskSessions: statuses.filter((status) => status === "risk").length,
      underusedSessions: statuses.filter((status) => status === "underused").length,
      invalidSessions: statuses.filter((status) => status === "invalid").length
    };
  });

  const totals = usageByClassroom.reduce((accumulator, classroom) => ({
    ideal: accumulator.ideal + classroom.idealSessions,
    risk: accumulator.risk + classroom.riskSessions,
    underused: accumulator.underused + classroom.underusedSessions,
    invalid: accumulator.invalid + classroom.invalidSessions
  }), { ideal: 0, risk: 0, underused: 0, invalid: 0 });

  const scheduledClassrooms = usageByClassroom.filter((classroom) => classroom.scheduledSessions > 0);
  const averageOccupancyRate = scheduledClassrooms.length === 0
    ? 0
    : Number((
      scheduledClassrooms.reduce((sum, classroom) => sum + classroom.averageOccupancy, 0) / scheduledClassrooms.length
    ).toFixed(2));

  return {
    classrooms: usageByClassroom,
    averageOccupancyRate,
    idealUsageCount: totals.ideal,
    riskCount: totals.risk,
    subutilizedCount: totals.underused,
    invalidCount: totals.invalid
  };
}

function getCreditOptimizationStatus(assignedCredits, targetCredits, minRecommendedCredits) {
  if (assignedCredits === targetCredits) {
    return "optimal";
  }

  if (assignedCredits >= Math.max(targetCredits - 3, minRecommendedCredits + 2)) {
    return "near_optimal";
  }

  if (assignedCredits >= minRecommendedCredits) {
    return "acceptable";
  }

  return "low_load";
}

function buildCreditOptimizationMessage(status, assignedCredits, targetCredits, minRecommendedCredits, creditGap) {
  if (status === "optimal") {
    return "Se alcanzo exactamente el objetivo de 25 creditos sin superar el limite.";
  }

  if (status === "near_optimal") {
    return `Se genero una carga cercana al objetivo de ${targetCredits} creditos sin superar el limite.`;
  }

  if (status === "acceptable") {
    return `La carga generada es valida, pero quedo por debajo del objetivo. Se asignaron ${assignedCredits} creditos.`;
  }

  return `La carga quedo por debajo del minimo recomendado de ${minRecommendedCredits} creditos. Faltan ${creditGap} para el objetivo.`;
}

function evaluateCourseSubset(courses, targetCredits, maxCredits) {
  const assignedCredits = courses.reduce((sum, course) => sum + Number(course.credits || 0), 0);
  if (assignedCredits > maxCredits) {
    return null;
  }

  return {
    courses,
    assignedCredits,
    gap: Math.abs(targetCredits - assignedCredits),
    count: courses.length
  };
}

function pickBetterSubset(candidate, best, targetCredits) {
  if (!candidate) {
    return best;
  }

  if (!best) {
    return candidate;
  }

  const candidateOver = candidate.assignedCredits > targetCredits ? candidate.assignedCredits - targetCredits : 0;
  const bestOver = best.assignedCredits > targetCredits ? best.assignedCredits - targetCredits : 0;

  if (candidateOver !== bestOver) {
    return candidateOver < bestOver ? candidate : best;
  }

  if (candidate.gap !== best.gap) {
    return candidate.gap < best.gap ? candidate : best;
  }

  if (candidate.assignedCredits !== best.assignedCredits) {
    return candidate.assignedCredits > best.assignedCredits ? candidate : best;
  }

  if (candidate.count !== best.count) {
    return candidate.count > best.count ? candidate : best;
  }

  return best;
}

function searchBestCourseSubset(courses, targetCredits, maxCredits, baseCourses = []) {
  const sortedCourses = [...courses].sort((left, right) =>
    Number(right.credits || 0) - Number(left.credits || 0) || left.code.localeCompare(right.code)
  );
  const baseCredits = baseCourses.reduce((sum, course) => sum + Number(course.credits || 0), 0);
  let best = evaluateCourseSubset(baseCourses, targetCredits, maxCredits);

  function walk(index, chosen, currentCredits) {
    const candidate = evaluateCourseSubset(chosen, targetCredits, maxCredits);
    best = pickBetterSubset(candidate, best, targetCredits);

    if (index >= sortedCourses.length || currentCredits >= maxCredits) {
      return;
    }

    for (let currentIndex = index; currentIndex < sortedCourses.length; currentIndex += 1) {
      const course = sortedCourses[currentIndex];
      const nextCredits = currentCredits + Number(course.credits || 0);
      if (nextCredits > maxCredits) {
        continue;
      }

      walk(currentIndex + 1, [...chosen, course], nextCredits);
    }
  }

  walk(0, [...baseCourses], baseCredits);
  return best || {
    courses: [...baseCourses],
    assignedCredits: baseCredits,
    gap: Math.abs(targetCredits - baseCredits),
    count: baseCourses.length
  };
}

function selectCoursesForCreditTarget(courses, options = {}) {
  const {
    allowAutoComplete = false,
    maxCredits = DEFAULT_MAX_CREDITS,
    minRecommendedCredits = DEFAULT_MIN_RECOMMENDED_CREDITS,
    selectedCourseCodes = [],
    targetCredits = DEFAULT_TARGET_CREDITS
  } = options;
  const selectedSet = new Set(selectedCourseCodes || []);
  const selectedCourses = courses.filter((course) => selectedSet.has(course.code));
  const selectedCredits = selectedCourses.reduce((sum, course) => sum + Number(course.credits || 0), 0);
  const remainingCourses = courses.filter((course) => !selectedSet.has(course.code));
  let overLimitTrimmed = false;
  let baseSelection = selectedCourses;

  if (selectedCredits > maxCredits) {
    baseSelection = searchBestCourseSubset(selectedCourses, targetCredits, maxCredits).courses;
    overLimitTrimmed = true;
  }

  const completedSelection = allowAutoComplete
    ? searchBestCourseSubset(remainingCourses, targetCredits, maxCredits, baseSelection).courses
    : baseSelection;
  const assignedCredits = completedSelection.reduce((sum, course) => sum + Number(course.credits || 0), 0);
  const autoAddedCourseCodes = completedSelection
    .filter((course) => !baseSelection.some((baseCourse) => baseCourse.code === course.code))
    .map((course) => course.code);
  const status = overLimitTrimmed
    ? "over_limit"
    : getCreditOptimizationStatus(assignedCredits, targetCredits, minRecommendedCredits);
  const creditGap = Math.max(targetCredits - assignedCredits, 0);

  return {
    selectedCourses: completedSelection,
    assignedCredits,
    targetCredits,
    maxCredits,
    creditGap,
    creditOptimizationStatus: status,
    autoAddedCourseCodes,
    message: overLimitTrimmed
      ? "La seleccion inicial superaba 25 creditos y fue recortada para respetar el limite."
      : buildCreditOptimizationMessage(status, assignedCredits, targetCredits, minRecommendedCredits, creditGap)
  };
}

function buildClassroomAlerts(items, dataset) {
  const classroomByCode = getClassroomByCode(dataset);

  return items.map((item) => {
    const classroom = classroomByCode.get(item.classroomCode);
    let recommendation = "Mantener monitoreo de ocupacion y disponibilidad del aula.";

    if (item.occupancyStatus === "invalid") {
      recommendation = "Cambiar aula o seccion antes de confirmar la matricula.";
    } else if (item.occupancyStatus === "risk") {
      recommendation = "Se recomienda aula con mayor capacidad para reducir el riesgo.";
    } else if (item.occupancyStatus === "underused") {
      recommendation = "Considerar un aula mas pequena para mejorar el uso de infraestructura.";
    } else if (item.occupancyStatus === "ideal") {
      recommendation = "La ocupacion del aula se encuentra en el rango ideal.";
    }

    return {
      courseCode: item.courseCode,
      classroomCode: item.classroomCode,
      capacity: classroom?.capacity || 0,
      estimatedStudents: item.estimatedStudents,
      occupancyRate: Number(item.occupancyRate || 0),
      occupancyStatus: item.occupancyStatus,
      statusLabel: item.occupancyStatus === "invalid"
        ? "llena/invalida"
        : item.occupancyStatus === "risk"
          ? "riesgo"
          : item.occupancyStatus === "underused"
            ? "subutilizada"
            : item.occupancyStatus === "ideal"
              ? "ideal"
              : "aceptable",
      recommendation
    };
  });
}

function buildDecisionExplanation(creditOptimization) {
  return {
    title: "Como decide el motor de horario",
    items: [
      "Recibe cursos seleccionados.",
      `Intenta completar hasta ${creditOptimization.targetCredits} creditos sin superar el limite.`,
      "Busca docentes disponibles.",
      "Descarta bloques con carga administrativa.",
      "Verifica aulas disponibles.",
      "Calcula ocupacion de aulas.",
      "Evita cruces entre cursos.",
      "Evalua carga docente.",
      "Devuelve horario, advertencias y recomendaciones."
    ],
    note: "Este motor no aprende como una IA, pero registra casos, detecta conflictos frecuentes y genera recomendaciones para corregir el horario."
  };
}

function buildValidation(dataset, items, failures = []) {
  const issues = [];
  const warnings = [];
  const recommendations = [];
  const teacherByCode = getTeacherByCode(dataset);
  const courseByCode = getCourseByCode(dataset);
  const classroomByCode = getClassroomByCode(dataset);
  const assignedHoursByTeacher = getAssignedHoursByTeacher(items);
  const assignedHoursByCourse = getAssignedHoursByCourse(items);

  items.forEach((item, index) => {
    const teacher = teacherByCode.get(item.teacherCode);
    const course = courseByCode.get(item.courseCode);
    const classroom = classroomByCode.get(item.classroomCode);

    if (!teacher || !course || !classroom) {
      issues.push(`Item ${index + 1}: la referencia academica no existe en el dataset local.`);
      return;
    }

    if (!isTeacherAvailable(teacher, item)) {
      issues.push(`Item ${index + 1}: ${teacher.name} no esta disponible en ${item.day} ${item.start}-${item.end}.`);
    }

    if (isProtectedBlock(teacher, item)) {
      issues.push(`Item ${index + 1}: ${teacher.name} tiene bloque protegido en ${item.day} ${item.start}-${item.end}.`);
    }

    if (!canUseClassroom(course, classroom)) {
      issues.push(`Item ${index + 1}: ${classroom.code} no cumple tipo o capacidad para ${course.code}.`);
    }

    if (normalizeClassroomStatus(classroom.status) !== "available") {
      issues.push(`Item ${index + 1}: ${classroom.code} no esta disponible por estado ${classroom.status}.`);
    }

    if (item.occupancyStatus === "risk") {
      warnings.push(`${course.code} usa ${classroom.code} con ocupacion de riesgo (${Math.round(item.occupancyRate * 100)}%).`);
    }

    if (item.occupancyStatus === "underused") {
      warnings.push(`${course.code} usa ${classroom.code} con subutilizacion (${Math.round(item.occupancyRate * 100)}%).`);
    }

    if (item.occupancyStatus === "invalid") {
      issues.push(`${course.code} excede la capacidad del aula ${classroom.code}.`);
    }
  });

  for (let index = 0; index < items.length; index += 1) {
    for (let innerIndex = index + 1; innerIndex < items.length; innerIndex += 1) {
      if (!overlaps(items[index], items[innerIndex])) {
        continue;
      }

      if (items[index].teacherCode === items[innerIndex].teacherCode) {
        issues.push(`Conflicto docente: ${items[index].teacherCode} tiene dos cursos simultaneos.`);
      }

      if (items[index].classroomCode === items[innerIndex].classroomCode) {
        issues.push(`Conflicto aula: ${items[index].classroomCode} esta ocupada simultaneamente.`);
      }

      if (items[index].studentGroup === items[innerIndex].studentGroup) {
        issues.push(`Conflicto estudiantil: ${items[index].courseCode} y ${items[innerIndex].courseCode} se cruzan.`);
      }
    }
  }

  dataset.courses.forEach((course) => {
    const assignedHours = assignedHoursByCourse.get(course.code) || 0;

    if (assignedHours !== course.requiredHours) {
      issues.push(`Curso ${course.code}: requiere ${course.requiredHours} horas y tiene ${assignedHours}.`);
    }
  });

  dataset.teachers.forEach((teacher) => {
    const assignedHours = assignedHoursByTeacher.get(teacher.code) || 0;

    if (assignedHours > teacher.maxTeachingLoad) {
      issues.push(`${teacher.name} supera su carga docente disponible.`);
    } else if (assignedHours >= teacher.maxTeachingLoad * 0.85) {
      warnings.push(`${teacher.name} queda cerca del limite de carga docente.`);
    }
  });

  failures.forEach((failure) => {
    issues.push(`${failure.sessionLabel}: ${failure.reason}`);
  });

  const uniqueWarnings = [...new Set(warnings)];
  const uniqueIssues = [...new Set(issues)];

  if (uniqueIssues.length === 0 && uniqueWarnings.length === 0) {
    recommendations.push("El horario es defendible para matricula y coordinacion academica.");
  }

  if (uniqueWarnings.some((warning) => warning.includes("subutilizacion"))) {
    recommendations.push("Revisar aulas grandes para cursos con menor demanda y mejorar ocupacion.");
  }

  if (uniqueWarnings.some((warning) => warning.includes("cerca del limite"))) {
    recommendations.push("Revisar docente con carga administrativa.");
  }

  if (uniqueIssues.some((issue) => issue.includes("Conflicto estudiantil"))) {
    recommendations.push("Cambiar seccion para evitar cruce.");
    recommendations.push("Usar horario alternativo compatible con practicas.");
  }

  if (uniqueIssues.some((issue) => issue.includes("capacidad del aula"))) {
    recommendations.push("Cambiar aula por una de mayor capacidad.");
  }

  return {
    valid: uniqueIssues.length === 0,
    conflicts: uniqueIssues,
    warnings: uniqueWarnings,
    recommendations: [...new Set(recommendations)]
  };
}

function calculateMetrics(dataset, items, validation) {
  const summary = dataset.courses.reduce((accumulator, course) => ({
    totalCourses: accumulator.totalCourses + 1,
    totalCredits: accumulator.totalCredits + course.credits
  }), { totalCourses: 0, totalCredits: 0 });
  const assignedCourses = new Set(items.map((item) => item.courseCode)).size;
  const assignedCredits = dataset.courses
    .filter((course) => items.some((item) => item.courseCode === course.code))
    .reduce((sum, course) => sum + course.credits, 0);
  const infrastructure = buildInfrastructureSummary(items, dataset);
  const teacherLoad = buildTeacherLoadSummary(items, dataset);
  const dailySpans = DAYS.map((day) => getStudentDaySpan(items, day)).filter(Boolean);
  const averageSpan = dailySpans.length === 0
    ? 0
    : Number((dailySpans.reduce((sum, span) => sum + span, 0) / dailySpans.length).toFixed(2));
  const compatibilityScore = Math.max(
    0,
    Number((1 - Math.max(averageSpan - dataset.constraints.studentPolicy.maxDailySpanHoursRecommended, 0) / 6).toFixed(2))
  );

  return {
    summary: {
      assignedCourses,
      totalCourses: summary.totalCourses,
      assignedCredits,
      totalCredits: summary.totalCredits,
      assignedSessions: items.length
    },
    student: {
      validSchedule: validation.valid,
      hasConflicts: validation.conflicts.length > 0,
      compactScheduleScore: compatibilityScore,
      internshipCompatibility: compatibilityScore >= 0.7 ? "high" : compatibilityScore >= 0.45 ? "medium" : "low"
    },
    infrastructure,
    teachers: {
      overloadedCount: teacherLoad.filter((teacher) => teacher.status === "overloaded").length,
      highLoadCount: teacherLoad.filter((teacher) => teacher.status === "high").length,
      protectedBlockTeachers: teacherLoad.filter((teacher) => teacher.hasProtectedBlocks).length
    },
    optimization: {
      score: Number(((
        (validation.valid ? 1 : 0.4)
        + (infrastructure.averageOccupancyRate >= dataset.constraints.occupancyPolicy.idealMin ? 0.4 : 0.2)
        + compatibilityScore * 0.2
      )).toFixed(2))
    }
  };
}

function buildResponse(dataset, items, failures = [], options = {}) {
  const orderedItems = [...items].sort((left, right) =>
    DAYS.indexOf(left.day) - DAYS.indexOf(right.day) || toMinutes(left.start) - toMinutes(right.start)
  );
  const validation = buildValidation(dataset, orderedItems, failures);
  const metrics = calculateMetrics(dataset, orderedItems, validation);
  const teacherLoad = buildTeacherLoadSummary(orderedItems, dataset);
  const infrastructure = buildInfrastructureSummary(orderedItems, dataset);
  const creditOptimization = options.creditOptimization || {
    targetCredits: DEFAULT_TARGET_CREDITS,
    maxCredits: DEFAULT_MAX_CREDITS,
    assignedCredits: metrics.summary.assignedCredits,
    creditGap: Math.max(DEFAULT_TARGET_CREDITS - metrics.summary.assignedCredits, 0),
    status: getCreditOptimizationStatus(
      metrics.summary.assignedCredits,
      DEFAULT_TARGET_CREDITS,
      DEFAULT_MIN_RECOMMENDED_CREDITS
    ),
    autoAddedCourseCodes: [],
    message: buildCreditOptimizationMessage(
      getCreditOptimizationStatus(
        metrics.summary.assignedCredits,
        DEFAULT_TARGET_CREDITS,
        DEFAULT_MIN_RECOMMENDED_CREDITS
      ),
      metrics.summary.assignedCredits,
      DEFAULT_TARGET_CREDITS,
      DEFAULT_MIN_RECOMMENDED_CREDITS,
      Math.max(DEFAULT_TARGET_CREDITS - metrics.summary.assignedCredits, 0)
    )
  };
  const classroomAlerts = buildClassroomAlerts(orderedItems, dataset);
  const decisionExplanation = buildDecisionExplanation(creditOptimization);
  const warnings = [...validation.warnings];
  const recommendations = [...validation.recommendations];

  if (creditOptimization.status === "near_optimal" || creditOptimization.status === "acceptable") {
    warnings.push(creditOptimization.message);
  }

  if (creditOptimization.status === "low_load") {
    warnings.push(`La carga generada quedo por debajo del minimo recomendado de ${creditOptimization.minRecommendedCredits || DEFAULT_MIN_RECOMMENDED_CREDITS} creditos.`);
  }

  if (creditOptimization.status !== "optimal") {
    recommendations.push(
      creditOptimization.assignedCredits < creditOptimization.targetCredits
        ? "Agregar un curso mas para acercarse a 25 creditos."
        : "Reducir cursos si supera 25 creditos."
    );
  }

  if (classroomAlerts.some((alert) => alert.occupancyStatus === "risk")) {
    warnings.push("Se detecto al menos un aula con ocupacion alta.");
    recommendations.push("Cambiar aula por una de mayor capacidad.");
  }

  if (classroomAlerts.some((alert) => alert.occupancyStatus === "invalid")) {
    recommendations.push("La matricula no debe confirmarse hasta corregir el aula o cambiar seccion.");
  }

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      source: dataset.source || "local-mock-data",
      postgresReady: true
    },
    summary: {
      ...metrics.summary,
      valid: validation.valid
    },
    items: orderedItems,
    validation,
    metrics,
    teacherLoad,
    infrastructureUsage: infrastructure,
    warnings: [...new Set(warnings)],
    recommendations: [...new Set(recommendations)],
    creditOptimization,
    classroomAlerts,
    decisionExplanation
  };
}

function buildEmptyScheduleResponse(dataset, options = {}) {
  const targetCredits = Number(options.targetCredits || DEFAULT_TARGET_CREDITS);
  const maxCredits = Number(options.maxCredits || DEFAULT_MAX_CREDITS);
  const minRecommendedCredits = Number(options.minRecommendedCredits || DEFAULT_MIN_RECOMMENDED_CREDITS);

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      source: dataset.source || "local-mock-data",
      postgresReady: true
    },
    summary: {
      assignedCourses: 0,
      totalCourses: 0,
      assignedCredits: 0,
      totalCredits: 0,
      assignedSessions: 0,
      valid: false
    },
    items: [],
    validation: {
      valid: false,
      conflicts: ["No hay cursos seleccionados para generar el horario."],
      warnings: [],
      recommendations: ["Selecciona al menos un curso antes de generar el horario."]
    },
    metrics: {
      summary: {
        assignedCourses: 0,
        totalCourses: 0,
        assignedCredits: 0,
        totalCredits: 0,
        assignedSessions: 0
      },
      student: {
        validSchedule: false,
        hasConflicts: true,
        compactScheduleScore: 0,
        internshipCompatibility: "low"
      },
      infrastructure: {
        classrooms: [],
        averageOccupancyRate: 0,
        idealUsageCount: 0,
        riskCount: 0,
        subutilizedCount: 0,
        invalidCount: 0
      },
      teachers: {
        overloadedCount: 0,
        highLoadCount: 0,
        protectedBlockTeachers: 0
      },
      optimization: {
        score: 0
      }
    },
    teacherLoad: [],
    infrastructureUsage: {
      classrooms: [],
      averageOccupancyRate: 0,
      idealUsageCount: 0,
      riskCount: 0,
      subutilizedCount: 0,
      invalidCount: 0
    },
    warnings: [],
    recommendations: ["Selecciona al menos un curso antes de generar el horario."],
    creditOptimization: {
      targetCredits,
      maxCredits,
      assignedCredits: 0,
      creditGap: targetCredits,
      status: "low_load",
      autoAddedCourseCodes: [],
      message: `Selecciona cursos para iniciar la optimizacion academica hacia ${targetCredits} creditos.`,
      minRecommendedCredits
    },
    classroomAlerts: [],
    decisionExplanation: buildDecisionExplanation({ targetCredits, maxCredits })
  };
}

function generateSchedule(inputDataset = getDefaultDataset()) {
  const dataset = {
    ...getDefaultDataset(),
    ...inputDataset
  };
  const selectedCourseCodes = Array.isArray(inputDataset.selectedCourseCodes)
    ? inputDataset.selectedCourseCodes.filter(Boolean)
    : [];
  const effectiveSelectedCourseCodes = selectedCourseCodes.length > 0
    ? selectedCourseCodes
    : dataset.courses.map((course) => course.code);
  const targetCredits = Number(inputDataset.targetCredits || DEFAULT_TARGET_CREDITS);
  const maxCredits = Number(inputDataset.maxCredits || DEFAULT_MAX_CREDITS);
  const minRecommendedCredits = Number(inputDataset.minRecommendedCredits || DEFAULT_MIN_RECOMMENDED_CREDITS);
  const allowAutoComplete = Boolean(inputDataset.allowAutoComplete);

  const creditSelection = selectCoursesForCreditTarget(dataset.courses, {
    selectedCourseCodes: effectiveSelectedCourseCodes,
    targetCredits,
    maxCredits,
    minRecommendedCredits,
    allowAutoComplete
  });
  dataset.courses = creditSelection.selectedCourses;

  if (dataset.courses.length === 0) {
    return buildEmptyScheduleResponse(dataset, {
      targetCredits,
      maxCredits,
      minRecommendedCredits
    });
  }

  const tasks = buildSessionTasks(dataset);
  const result = backtrack(tasks, dataset);

  return buildResponse(dataset, result.items, result.success ? [] : result.failures, {
    creditOptimization: {
      targetCredits,
      maxCredits,
      assignedCredits: creditSelection.assignedCredits,
      creditGap: creditSelection.creditGap,
      status: creditSelection.creditOptimizationStatus,
      autoAddedCourseCodes: creditSelection.autoAddedCourseCodes,
      message: creditSelection.message,
      minRecommendedCredits
    }
  });
}

function validateSchedule({ items = [], ...inputDataset }) {
  const dataset = {
    ...getDefaultDataset(),
    ...inputDataset
  };

  return buildResponse(dataset, items).validation;
}

module.exports = {
  DAYS,
  buildResponse,
  calculateOccupancy,
  canUseClassroom,
  generateSchedule,
  getDefaultDataset,
  hasConflict,
  isTeacherAvailable,
  normalizeClassroomStatus,
  selectCoursesForCreditTarget,
  validateSchedule
};
