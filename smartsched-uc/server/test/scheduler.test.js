const request = require("supertest");
const app = require("../src/app");
const { generateSchedule, getDefaultDataset, validateSchedule } = require("../src/services/scheduler.service");

describe("SmartSched-UC academic scheduler", () => {
  test("detecta conflictos de docente y aula en horarios solapados", () => {
    const dataset = getDefaultDataset();
    const items = [
      {
        courseCode: "CS201",
        teacherCode: "T-ALG",
        classroomCode: "B-204",
        day: "Monday",
        start: "08:00",
        end: "10:00",
        duration: 2,
        enrollment: 32
      },
      {
        courseCode: "CS150",
        teacherCode: "T-ALG",
        classroomCode: "B-204",
        day: "Monday",
        start: "09:00",
        end: "11:00",
        duration: 2,
        enrollment: 30
      }
    ];

    const result = validateSchedule({ ...dataset, items });

    expect(result.valid).toBe(false);
    expect(result.issues.join(" ")).toContain("Conflicto docente");
    expect(result.issues.join(" ")).toContain("Conflicto aula");
  });

  test("genera una asignacion automatica valida y repetible", () => {
    const dataset = getDefaultDataset();
    const first = generateSchedule(dataset);
    const second = generateSchedule(dataset);

    expect(first.validation.valid).toBe(true);
    expect(first.items).toEqual(second.items);
    expect(first.items).toHaveLength(9);
    expect(first.metrics.assignedCourses).toBe(dataset.courses.length);
  });

  test("respeta disponibilidad docente, capacidad de aula y horas asignadas", () => {
    const dataset = getDefaultDataset();
    const schedule = generateSchedule(dataset);
    const validation = validateSchedule({ ...dataset, items: schedule.items });

    expect(validation.valid).toBe(true);

    dataset.courses.forEach((course) => {
      const assignedHours = schedule.items
        .filter((item) => item.courseCode === course.code)
        .reduce((sum, item) => sum + item.duration, 0);

      expect(assignedHours).toBe(course.requiredHours);
    });
  });

  test("POST /api/schedules/generate expone el motor por API", async () => {
    const response = await request(app).post("/api/schedules/generate").send({});

    expect(response.status).toBe(201);
    expect(response.body.validation.valid).toBe(true);
    expect(response.body.items.length).toBeGreaterThan(0);
  });
});
