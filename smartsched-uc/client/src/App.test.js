import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  global.fetch = jest.fn((url, options = {}) => {
    if (url.includes("/audit/logs") && options.method === "POST") {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ saved: true })
      });
    }

    if (url.includes("/courses")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [{ code: "CS201", name: "Algoritmos", credits: 4, requiredHours: 4, estimatedStudents: 30 }] })
      });
    }

    if (url.includes("/teachers")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [{ code: "DOC-001", name: "Dra. Rosa Medina", contractType: "full-time", currentAcademicLoad: 10, administrativeLoad: 8 }] })
      });
    }

    if (url.includes("/classrooms")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [{ code: "A-101", name: "Aula Inteligente A-101", type: "theory", capacity: 45, status: "available" }] })
      });
    }

    if (url.includes("/time-blocks")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [{ id: "TB-01", day: "Monday", start: "08:00", end: "10:00" }] })
      });
    }

    if (url.includes("/constraints")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: { hard: ["h1"], soft: ["s1"] } })
      });
    }

    if (url.includes("/health")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ status: "ok", database: "mock-data", postgresEnabled: false, usingFallback: true })
      });
    }

    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({})
    });
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders compact enrollment dashboard", async () => {
  render(<App />);
  expect(await screen.findByText(/SmartSched-UC/i)).toBeInTheDocument();
  expect(await screen.findByText(/Proyecciones/i)).toBeInTheDocument();
  expect(await screen.findByText(/Vista alumno/i)).toBeInTheDocument();
  fireEvent.click(await screen.findByText(/Vista docente/i));
  expect(await screen.findByText(/Modo demostracion/i)).toBeInTheDocument();
  expect(await screen.findByText(/Estado del sistema/i)).toBeInTheDocument();
  fireEvent.click(await screen.findByRole("button", { name: /^Horario$/i }));
  expect(await screen.findByText(/Aulas y ocupacion/i)).toBeInTheDocument();
  fireEvent.click(await screen.findByRole("button", { name: /^Proyecciones$/i }));
  expect(await screen.findByText(/Generar horario optimo hasta 25 creditos/i)).toBeInTheDocument();
  expect(await screen.findByText(/Creditos seleccionados/i)).toBeInTheDocument();
  expect(await screen.findByText(/Listado de asignaturas/i)).toBeInTheDocument();
});
