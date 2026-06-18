const timeBlocks = [
  { id: "TB-01", day: "Monday", start: "08:00", end: "10:00", duration: 2, label: "Bloque 1" },
  { id: "TB-02", day: "Monday", start: "10:00", end: "12:00", duration: 2, label: "Bloque 2" },
  { id: "TB-03", day: "Monday", start: "14:00", end: "16:00", duration: 2, label: "Bloque 3" },
  { id: "TB-04", day: "Monday", start: "16:00", end: "18:00", duration: 2, label: "Bloque 4" },
  { id: "TB-05", day: "Tuesday", start: "08:00", end: "10:00", duration: 2, label: "Bloque 1" },
  { id: "TB-06", day: "Tuesday", start: "10:00", end: "12:00", duration: 2, label: "Bloque 2" },
  { id: "TB-07", day: "Tuesday", start: "14:00", end: "16:00", duration: 2, label: "Bloque 3" },
  { id: "TB-08", day: "Tuesday", start: "16:00", end: "18:00", duration: 2, label: "Bloque 4" },
  { id: "TB-09", day: "Wednesday", start: "08:00", end: "10:00", duration: 2, label: "Bloque 1" },
  { id: "TB-10", day: "Wednesday", start: "10:00", end: "12:00", duration: 2, label: "Bloque 2" },
  { id: "TB-11", day: "Wednesday", start: "14:00", end: "16:00", duration: 2, label: "Bloque 3" },
  { id: "TB-12", day: "Wednesday", start: "16:00", end: "18:00", duration: 2, label: "Bloque 4" },
  { id: "TB-13", day: "Thursday", start: "08:00", end: "10:00", duration: 2, label: "Bloque 1" },
  { id: "TB-14", day: "Thursday", start: "10:00", end: "12:00", duration: 2, label: "Bloque 2" },
  { id: "TB-15", day: "Thursday", start: "14:00", end: "16:00", duration: 2, label: "Bloque 3" },
  { id: "TB-16", day: "Thursday", start: "16:00", end: "18:00", duration: 2, label: "Bloque 4" },
  { id: "TB-17", day: "Friday", start: "08:00", end: "10:00", duration: 2, label: "Bloque 1" },
  { id: "TB-18", day: "Friday", start: "10:00", end: "12:00", duration: 2, label: "Bloque 2" },
  { id: "TB-19", day: "Friday", start: "14:00", end: "16:00", duration: 2, label: "Bloque 3" },
  { id: "TB-20", day: "Friday", start: "16:00", end: "18:00", duration: 2, label: "Bloque 4" }
];

const constraints = {
  hard: [
    "Un estudiante no puede tener dos cursos en el mismo horario.",
    "Un docente no puede dictar dos cursos al mismo tiempo.",
    "Un aula no puede ser usada por dos cursos simultaneamente.",
    "El aula debe cubrir la cantidad estimada de estudiantes.",
    "Los bloques protegidos por carga administrativa no se pueden ocupar.",
    "La carga docente asignada no debe superar la disponibilidad efectiva."
  ],
  soft: [
    "Favorecer horarios compactos para estudiantes con practicas o trabajo.",
    "Mantener la ocupacion de aula ideal entre 75% y 90%.",
    "Priorizar docentes con menor carga academica actual.",
    "Evitar sobreasignar docentes con alta carga administrativa.",
    "Reducir subutilizacion de infraestructura y dispersion horaria."
  ],
  occupancyPolicy: {
    idealMin: 0.75,
    idealMax: 0.9,
    riskAbove: 0.95,
    invalidAbove: 1,
    underuseBelow: 0.6
  },
  teacherPolicy: {
    fullTimeInstitutionalLimit: 36,
    partTimeInstitutionalLimit: 20,
    adjunctInstitutionalLimit: 12
  },
  studentPolicy: {
    compactSchedulePreferred: true,
    compatibleWithInternships: true,
    maxDailySpanHoursRecommended: 6
  }
};

const teachers = [
  {
    code: "DOC-001",
    name: "Dra. Rosa Medina",
    contractType: "full-time",
    maxInstitutionalLoad: 36,
    maxTeachingLoad: 18,
    currentAcademicLoad: 10,
    administrativeLoad: 8,
    specialties: ["algorithms", "programming", "software-design"],
    protectedBlocks: [{ day: "Tuesday", start: "10:00", end: "12:00", reason: "Coordinacion de escuela" }],
    availability: [
      { day: "Monday", start: "08:00", end: "12:00" },
      { day: "Tuesday", start: "08:00", end: "16:00" },
      { day: "Wednesday", start: "08:00", end: "12:00" },
      { day: "Friday", start: "08:00", end: "16:00" }
    ]
  },
  {
    code: "DOC-002",
    name: "Mg. Carlos Ibarra",
    contractType: "full-time",
    maxInstitutionalLoad: 36,
    maxTeachingLoad: 16,
    currentAcademicLoad: 12,
    administrativeLoad: 10,
    specialties: ["databases", "data-modeling", "systems"],
    protectedBlocks: [{ day: "Thursday", start: "10:00", end: "12:00", reason: "Comite curricular" }],
    availability: [
      { day: "Monday", start: "10:00", end: "18:00" },
      { day: "Tuesday", start: "08:00", end: "12:00" },
      { day: "Thursday", start: "08:00", end: "18:00" },
      { day: "Friday", start: "08:00", end: "12:00" }
    ]
  },
  {
    code: "DOC-003",
    name: "Ing. Paola Vargas",
    contractType: "part-time",
    maxInstitutionalLoad: 20,
    maxTeachingLoad: 10,
    currentAcademicLoad: 4,
    administrativeLoad: 2,
    specialties: ["math", "discrete-math", "logic"],
    protectedBlocks: [],
    availability: [
      { day: "Tuesday", start: "08:00", end: "16:00" },
      { day: "Wednesday", start: "14:00", end: "18:00" },
      { day: "Friday", start: "08:00", end: "12:00" }
    ]
  },
  {
    code: "DOC-004",
    name: "Mg. Andres Salas",
    contractType: "part-time",
    maxInstitutionalLoad: 20,
    maxTeachingLoad: 10,
    currentAcademicLoad: 6,
    administrativeLoad: 2,
    specialties: ["networks", "security", "infrastructure"],
    protectedBlocks: [{ day: "Wednesday", start: "14:00", end: "16:00", reason: "Soporte de laboratorio" }],
    availability: [
      { day: "Monday", start: "14:00", end: "18:00" },
      { day: "Wednesday", start: "08:00", end: "18:00" },
      { day: "Thursday", start: "14:00", end: "18:00" }
    ]
  },
  {
    code: "DOC-005",
    name: "Lic. Lucia Herrera",
    contractType: "adjunct",
    maxInstitutionalLoad: 12,
    maxTeachingLoad: 6,
    currentAcademicLoad: 2,
    administrativeLoad: 0,
    specialties: ["software-quality", "requirements", "project-management"],
    protectedBlocks: [],
    availability: [
      { day: "Tuesday", start: "18:00", end: "20:00" },
      { day: "Thursday", start: "18:00", end: "20:00" },
      { day: "Friday", start: "16:00", end: "20:00" }
    ]
  }
];

const classrooms = [
  {
    code: "A-101",
    name: "Aula Inteligente A-101",
    type: "theory",
    capacity: 45,
    status: "available",
    campus: "Huancayo",
    usagePercent: 0.78
  },
  {
    code: "A-204",
    name: "Aula Multimedia A-204",
    type: "theory",
    capacity: 60,
    status: "available",
    campus: "Huancayo",
    usagePercent: 0.64
  },
  {
    code: "LAB-B204",
    name: "Laboratorio B-204",
    type: "lab",
    capacity: 32,
    status: "available",
    campus: "Huancayo",
    usagePercent: 0.88
  },
  {
    code: "LAB-C302",
    name: "Laboratorio C-302",
    type: "lab",
    capacity: 40,
    status: "available",
    campus: "Huancayo",
    usagePercent: 0.81
  },
  {
    code: "LAB-D110",
    name: "Laboratorio de Redes D-110",
    type: "lab",
    capacity: 28,
    status: "maintenance-window",
    campus: "Huancayo",
    usagePercent: 0.57
  }
];

const courses = [
  {
    code: "CS201",
    name: "Algoritmos y Estructuras de Datos",
    credits: 4,
    courseType: "mandatory",
    requiredHours: 4,
    estimatedStudents: 30,
    requiredClassroomType: "lab",
    eligibleTeacherCodes: ["DOC-001", "DOC-003"]
  },
  {
    code: "CS305",
    name: "Bases de Datos",
    credits: 4,
    courseType: "mandatory",
    requiredHours: 4,
    estimatedStudents: 34,
    requiredClassroomType: "lab",
    eligibleTeacherCodes: ["DOC-002"]
  },
  {
    code: "MA210",
    name: "Matematica Discreta",
    credits: 3,
    courseType: "mandatory",
    requiredHours: 4,
    estimatedStudents: 38,
    requiredClassroomType: "theory",
    eligibleTeacherCodes: ["DOC-003"]
  },
  {
    code: "CS330",
    name: "Redes y Comunicaciones",
    credits: 4,
    courseType: "mandatory",
    requiredHours: 4,
    estimatedStudents: 26,
    requiredClassroomType: "lab",
    eligibleTeacherCodes: ["DOC-004"]
  },
  {
    code: "CS410",
    name: "Ingenieria de Software",
    credits: 3,
    courseType: "mandatory",
    requiredHours: 4,
    estimatedStudents: 36,
    requiredClassroomType: "theory",
    eligibleTeacherCodes: ["DOC-001", "DOC-005"]
  },
  {
    code: "CS150",
    name: "Programacion II",
    credits: 3,
    courseType: "mandatory",
    requiredHours: 2,
    estimatedStudents: 28,
    requiredClassroomType: "lab",
    eligibleTeacherCodes: ["DOC-001"]
  }
];

module.exports = {
  classrooms,
  constraints,
  courses,
  teachers,
  timeBlocks
};
