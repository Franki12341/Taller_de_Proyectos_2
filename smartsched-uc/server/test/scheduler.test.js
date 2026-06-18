const request = require("supertest");
const app = require("../src/app");
const { closePool } = require("../src/config/db");
const {
  canUseClassroom,
  generateSchedule,
  getDefaultDataset,
  normalizeClassroomStatus,
  selectCoursesForCreditTarget,
  validateSchedule
} = require("../src/services/scheduler.service");

describe("SmartSched-UC academic scheduler", () => {
  afterAll(async () => {
    await closePool();
  });

  test("detecta conflictos de docente, aula y estudiante en horarios solapados", () => {
    const dataset = getDefaultDataset();
    const items = [
      {
        courseCode: "CS201",
        teacherCode: "DOC-001",
        classroomCode: "LAB-B204",
        day: "Monday",
        start: "08:00",
        end: "10:00",
        duration: 2,
        studentGroup: "cohort-2026-2",
        estimatedStudents: 30,
        occupancyRate: 0.94,
        occupancyStatus: "acceptable"
      },
      {
        courseCode: "CS410",
        teacherCode: "DOC-001",
        classroomCode: "LAB-B204",
        day: "Monday",
        start: "09:00",
        end: "11:00",
        duration: 2,
        studentGroup: "cohort-2026-2",
        estimatedStudents: 36,
        occupancyRate: 1.13,
        occupancyStatus: "invalid"
      }
    ];

    const result = validateSchedule({ ...dataset, items });

    expect(result.valid).toBe(false);
    expect(result.conflicts.join(" ")).toContain("Conflicto docente");
    expect(result.conflicts.join(" ")).toContain("Conflicto aula");
    expect(result.conflicts.join(" ")).toContain("Conflicto estudiantil");
  });

  test("genera una asignacion automatica valida y repetible", () => {
    const dataset = getDefaultDataset();
    const first = generateSchedule(dataset);
    const second = generateSchedule(dataset);

    expect(first.validation.valid).toBe(true);
    expect(first.items).toEqual(second.items);
    expect(first.items).toHaveLength(11);
    expect(first.summary.assignedCourses).toBe(dataset.courses.length);
  });

  test("no supera 25 creditos y optimiza hacia el objetivo", () => {
    const dataset = getDefaultDataset();
    const result = generateSchedule({
      ...dataset,
      selectedCourseCodes: dataset.courses.slice(0, 2).map((course) => course.code),
      targetCredits: 25,
      minRecommendedCredits: 20,
      maxCredits: 25,
      allowAutoComplete: true
    });

    expect(result.summary.assignedCredits).toBeLessThanOrEqual(25);
    expect(result.creditOptimization.targetCredits).toBe(25);
    expect(result.creditOptimization.maxCredits).toBe(25);
    expect(["optimal", "near_optimal", "acceptable", "low_load", "over_limit"]).toContain(result.creditOptimization.status);
  });

  test("selecciona una combinacion exacta de 25 creditos si existe", () => {
    const selection = selectCoursesForCreditTarget([
      { code: "A", credits: 5 },
      { code: "B", credits: 4 },
      { code: "C", credits: 4 },
      { code: "D", credits: 6 },
      { code: "E", credits: 6 },
      { code: "F", credits: 3 }
    ], {
      selectedCourseCodes: ["A"],
      targetCredits: 25,
      minRecommendedCredits: 20,
      maxCredits: 25,
      allowAutoComplete: true
    });

    expect(selection.assignedCredits).toBe(25);
    expect(selection.creditOptimizationStatus).toBe("optimal");
  });

  test("respeta disponibilidad docente, capacidad de aula y horas asignadas", () => {
    const dataset = getDefaultDataset();
    const schedule = generateSchedule(dataset);

    expect(schedule.validation.valid).toBe(true);
    expect(schedule.infrastructureUsage.averageOccupancyRate).toBeGreaterThan(0.6);

    dataset.courses.forEach((course) => {
      const assignedHours = schedule.items
        .filter((item) => item.courseCode === course.code)
        .reduce((sum, item) => sum + item.duration, 0);

      expect(assignedHours).toBe(course.requiredHours);
    });
  });

  test("detecta aula sobreocupada como issue", () => {
    const dataset = getDefaultDataset();
    const crowdedClassroom = { ...dataset.classrooms[0], capacity: 10, status: "available", type: dataset.courses[0].requiredClassroomType };
    const items = [{
      courseCode: dataset.courses[0].code,
      teacherCode: dataset.teachers[0].code,
      classroomCode: crowdedClassroom.code,
      day: "Monday",
      start: "08:00",
      end: "10:00",
      duration: 2,
      studentGroup: "cohort-2026-2",
      estimatedStudents: 45,
      occupancyRate: 4.5,
      occupancyStatus: "invalid"
    }];

    const result = validateSchedule({
      ...dataset,
      classrooms: [crowdedClassroom, ...dataset.classrooms.slice(1)],
      items
    });

    expect(result.valid).toBe(false);
    expect(result.conflicts.join(" ")).toContain("excede la capacidad");
  });

  test("no usa aulas en mantenimiento o inactivas", () => {
    const theoryCourse = { code: "TMP-101", estimatedStudents: 20, requiredClassroomType: "theory", requiresLab: false };
    expect(normalizeClassroomStatus("MAINTENANCE")).toBe("maintenance");
    expect(canUseClassroom(theoryCourse, { code: "X", capacity: 30, type: "theory", status: "MAINTENANCE" })).toBe(false);
    expect(canUseClassroom(theoryCourse, { code: "Y", capacity: 30, type: "theory", status: "inactive" })).toBe(false);
  });

  test("recomienda completar creditos cuando queda debajo del objetivo", () => {
    const result = generateSchedule({
      ...getDefaultDataset(),
      selectedCourseCodes: ["ONE-101"],
      targetCredits: 25,
      minRecommendedCredits: 20,
      maxCredits: 25,
      allowAutoComplete: false,
      courses: [
        {
          code: "ONE-101",
          name: "Curso Unico",
          credits: 4,
          courseType: "mandatory",
          requiredHours: 2,
          estimatedStudents: 20,
          requiresLab: false,
          requiredClassroomType: "theory",
          eligibleTeacherCodes: ["DOC-001"]
        }
      ]
    });

    expect(result.creditOptimization.assignedCredits).toBeLessThan(25);
    expect(result.recommendations.join(" ")).toContain("Agregar un curso mas");
  });

  test("POST /api/schedules/generate expone el motor por API", async () => {
    const response = await request(app).post("/api/schedules/generate").send({});

    expect(response.status).toBe(201);
    expect(response.body.validation.valid).toBe(true);
    expect(response.body.items.length).toBeGreaterThan(0);
    expect(response.body.summary.assignedCourses).toBeGreaterThan(0);
  });

  test("GET /api/courses devuelve paginacion simulada", async () => {
    const response = await request(app).get("/api/courses?page=1&limit=2");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(2);
    expect(response.body.pagination.total).toBeGreaterThan(2);
    expect(response.body.pagination.totalPages).toBeGreaterThan(1);
  });

  test("GET /api/health reporta fallback cuando PostgreSQL no esta disponible", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(["postgresql", "mock-data"]).toContain(response.body.database);
    expect(typeof response.body.usingFallback).toBe("boolean");
  });
});
