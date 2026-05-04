const { classrooms: seedClassrooms, courses: seedCourses, teachers: seedTeachers } = require("../data/academic.seed");
const { contains, overlaps, toMinutes } = require("./time.service");

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const SLOTS = [
  { start: "08:00", end: "10:00", duration: 2 },
  { start: "10:00", end: "12:00", duration: 2 },
  { start: "14:00", end: "16:00", duration: 2 },
  { start: "16:00", end: "18:00", duration: 2 }
];

function getDefaultDataset() {
  return {
    teachers: seedTeachers,
    courses: seedCourses,
    classrooms: seedClassrooms
  };
}

function buildSlots() {
  return DAYS.flatMap((day) => SLOTS.map((slot) => ({ day, ...slot })));
}

function isTeacherAvailable(teacher, slot) {
  return teacher.availability.some((availability) => contains(availability, slot));
}

function canUseClassroom(course, classroom) {
  return classroom.capacity >= course.enrollment && (classroom.type === course.type || classroom.type === "theory");
}

function hasConflict(items, candidate) {
  return items.some((item) => {
    const sameTeacher = item.teacherCode === candidate.teacherCode;
    const sameClassroom = item.classroomCode === candidate.classroomCode;
    return (sameTeacher || sameClassroom) && overlaps(item, candidate);
  });
}

function dayLoad(items, day) {
  return items.filter((item) => item.day === day).length;
}

function entityIdlePenalty(items, candidate, key) {
  const sameDay = items
    .filter((item) => item[key] === candidate[key] && item.day === candidate.day)
    .map((item) => ({ start: toMinutes(item.start), end: toMinutes(item.end) }));

  if (sameDay.length === 0) {
    return 0;
  }

  const candidateStart = toMinutes(candidate.start);
  const candidateEnd = toMinutes(candidate.end);
  const gaps = sameDay.map((item) => Math.min(Math.abs(candidateStart - item.end), Math.abs(item.start - candidateEnd)));
  return Math.min(...gaps) / 60;
}

function scoreCandidate(items, candidate, classroom, course) {
  const capacityWaste = classroom.capacity - course.enrollment;
  const teacherIdle = entityIdlePenalty(items, candidate, "teacherCode");
  const classroomIdle = entityIdlePenalty(items, candidate, "classroomCode");
  const balance = dayLoad(items, candidate.day);

  return capacityWaste * 3 + teacherIdle * 2 + classroomIdle + balance;
}

function validateSchedule({ items, teachers, courses, classrooms }) {
  const issues = [];
  const teacherByCode = new Map(teachers.map((teacher) => [teacher.code, teacher]));
  const classroomByCode = new Map(classrooms.map((classroom) => [classroom.code, classroom]));
  const courseByCode = new Map(courses.map((course) => [course.code, course]));
  const assignedHoursByCourse = new Map();

  items.forEach((item, index) => {
    const teacher = teacherByCode.get(item.teacherCode);
    const classroom = classroomByCode.get(item.classroomCode);
    const course = courseByCode.get(item.courseCode);
    const enrollment = item.enrollment || (course && course.enrollment) || 0;

    assignedHoursByCourse.set(item.courseCode, (assignedHoursByCourse.get(item.courseCode) || 0) + item.duration);

    if (!teacher) {
      issues.push(`Item ${index + 1}: docente inexistente ${item.teacherCode}.`);
    } else if (!isTeacherAvailable(teacher, item)) {
      issues.push(`Item ${index + 1}: ${teacher.name} no esta disponible ${item.day} ${item.start}-${item.end}.`);
    }

    if (!classroom) {
      issues.push(`Item ${index + 1}: aula inexistente ${item.classroomCode}.`);
    } else if (classroom.capacity < enrollment) {
      issues.push(`Item ${index + 1}: ${classroom.code} no cubre capacidad requerida.`);
    }
  });

  for (let i = 0; i < items.length; i += 1) {
    for (let j = i + 1; j < items.length; j += 1) {
      if (!overlaps(items[i], items[j])) {
        continue;
      }

      if (items[i].teacherCode === items[j].teacherCode) {
        issues.push(`Conflicto docente: ${items[i].teacherCode} tiene dos clases simultaneas.`);
      }

      if (items[i].classroomCode === items[j].classroomCode) {
        issues.push(`Conflicto aula: ${items[i].classroomCode} esta ocupada simultaneamente.`);
      }
    }
  }

  courses.forEach((course) => {
    const assigned = assignedHoursByCourse.get(course.code) || 0;
    if (assigned !== course.requiredHours) {
      issues.push(`Curso ${course.code}: requiere ${course.requiredHours} horas y tiene ${assigned}.`);
    }
  });

  return {
    valid: issues.length === 0,
    issues
  };
}

function calculateMetrics(items, courses, classrooms) {
  const classroomByCode = new Map(classrooms.map((classroom) => [classroom.code, classroom]));
  const courseByCode = new Map(courses.map((course) => [course.code, course]));
  const totalWaste = items.reduce((sum, item) => {
    const classroom = classroomByCode.get(item.classroomCode);
    const course = courseByCode.get(item.courseCode);
    return sum + (classroom.capacity - course.enrollment);
  }, 0);
  const dayCounts = DAYS.map((day) => dayLoad(items, day));
  const maxDay = Math.max(...dayCounts);
  const minDay = Math.min(...dayCounts);
  const idlePenalty = items.reduce((sum, item) => {
    const otherItems = items.filter((other) => other !== item);
    return sum + entityIdlePenalty(otherItems, item, "teacherCode");
  }, 0);

  return {
    classroomEfficiency: Number((1 - totalWaste / Math.max(items.length * 60, 1)).toFixed(2)),
    balanceScore: Number((1 / (1 + maxDay - minDay)).toFixed(2)),
    idlePenalty: Number(idlePenalty.toFixed(2)),
    assignedCourses: new Set(items.map((item) => item.courseCode)).size
  };
}

function generateSchedule(dataset = getDefaultDataset()) {
  const { teachers, courses, classrooms } = dataset;
  const teacherByCode = new Map(teachers.map((teacher) => [teacher.code, teacher]));
  const slots = buildSlots();
  const items = [];
  const unscheduled = [];

  const orderedCourses = [...courses].sort((a, b) => {
    const aRooms = classrooms.filter((room) => canUseClassroom(a, room)).length;
    const bRooms = classrooms.filter((room) => canUseClassroom(b, room)).length;
    return aRooms - bRooms || b.requiredHours - a.requiredHours || a.code.localeCompare(b.code);
  });

  orderedCourses.forEach((course) => {
    const teacher = teacherByCode.get(course.teacherCode);
    const sessionsNeeded = course.requiredHours / 2;
    let assignedSessions = 0;

    for (let session = 0; session < sessionsNeeded; session += 1) {
      const candidates = [];

      slots.forEach((slot) => {
        if (!teacher || !isTeacherAvailable(teacher, slot)) {
          return;
        }

        classrooms.filter((classroom) => canUseClassroom(course, classroom)).forEach((classroom) => {
          const candidate = {
            courseCode: course.code,
            courseName: course.name,
            teacherCode: teacher.code,
            teacherName: teacher.name,
            classroomCode: classroom.code,
            day: slot.day,
            start: slot.start,
            end: slot.end,
            duration: slot.duration,
            enrollment: course.enrollment
          };

          if (!hasConflict(items, candidate)) {
            candidates.push({
              item: candidate,
              score: scoreCandidate(items, candidate, classroom, course)
            });
          }
        });
      });

      candidates.sort((a, b) => a.score - b.score || a.item.day.localeCompare(b.item.day) || a.item.start.localeCompare(b.item.start));

      if (candidates.length === 0) {
        unscheduled.push({
          courseCode: course.code,
          reason: "Sin docente/aula/slot disponible para respetar restricciones."
        });
        break;
      }

      items.push(candidates[0].item);
      assignedSessions += 1;
    }

    if (assignedSessions < sessionsNeeded && !unscheduled.some((entry) => entry.courseCode === course.code)) {
      unscheduled.push({
        courseCode: course.code,
        reason: `Solo se asignaron ${assignedSessions * 2} de ${course.requiredHours} horas.`
      });
    }
  });

  const orderedItems = items.sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day) || toMinutes(a.start) - toMinutes(b.start));
  const validation = validateSchedule({ items: orderedItems, teachers, courses, classrooms });

  return {
    generatedAt: new Date().toISOString(),
    items: orderedItems,
    metrics: calculateMetrics(orderedItems, courses, classrooms),
    validation: {
      valid: validation.valid && unscheduled.length === 0,
      issues: [...validation.issues, ...unscheduled.map((item) => `${item.courseCode}: ${item.reason}`)]
    }
  };
}

module.exports = {
  DAYS,
  SLOTS,
  canUseClassroom,
  generateSchedule,
  getDefaultDataset,
  hasConflict,
  isTeacherAvailable,
  validateSchedule
};
