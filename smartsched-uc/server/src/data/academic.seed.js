const teachers = [
  {
    code: "T-ALG",
    name: "Dra. Rosa Medina",
    specialties: ["algorithms", "programming"],
    availability: [
      { day: "Monday", start: "08:00", end: "12:00" },
      { day: "Wednesday", start: "08:00", end: "12:00" },
      { day: "Friday", start: "10:00", end: "16:00" }
    ]
  },
  {
    code: "T-DB",
    name: "Mg. Carlos Ibarra",
    specialties: ["databases", "systems"],
    availability: [
      { day: "Monday", start: "10:00", end: "18:00" },
      { day: "Tuesday", start: "08:00", end: "12:00" },
      { day: "Thursday", start: "08:00", end: "14:00" }
    ]
  },
  {
    code: "T-MATH",
    name: "Ing. Paola Vargas",
    specialties: ["math", "discrete"],
    availability: [
      { day: "Tuesday", start: "08:00", end: "16:00" },
      { day: "Wednesday", start: "14:00", end: "18:00" },
      { day: "Friday", start: "08:00", end: "12:00" }
    ]
  },
  {
    code: "T-NET",
    name: "Mg. Andres Salas",
    specialties: ["networks", "security"],
    availability: [
      { day: "Monday", start: "14:00", end: "18:00" },
      { day: "Wednesday", start: "08:00", end: "16:00" },
      { day: "Thursday", start: "14:00", end: "18:00" }
    ]
  }
];

const courses = [
  { code: "CS201", name: "Algoritmos", teacherCode: "T-ALG", requiredHours: 4, enrollment: 32, type: "lab" },
  { code: "CS305", name: "Base de Datos", teacherCode: "T-DB", requiredHours: 4, enrollment: 38, type: "lab" },
  { code: "MA210", name: "Matematica Discreta", teacherCode: "T-MATH", requiredHours: 4, enrollment: 45, type: "theory" },
  { code: "CS330", name: "Redes y Comunicaciones", teacherCode: "T-NET", requiredHours: 4, enrollment: 28, type: "lab" },
  { code: "CS150", name: "Programacion II", teacherCode: "T-ALG", requiredHours: 2, enrollment: 30, type: "lab" }
];

const classrooms = [
  { code: "A-101", name: "Aula A-101", capacity: 50, type: "theory" },
  { code: "B-204", name: "Laboratorio B-204", capacity: 36, type: "lab" },
  { code: "C-302", name: "Laboratorio C-302", capacity: 42, type: "lab" },
  { code: "D-110", name: "Aula D-110", capacity: 35, type: "theory" }
];

module.exports = {
  teachers,
  courses,
  classrooms
};
