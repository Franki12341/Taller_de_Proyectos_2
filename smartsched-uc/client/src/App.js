import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const dayLabels = {
  Monday: "Lu",
  Tuesday: "Ma",
  Wednesday: "Mi",
  Thursday: "Ju",
  Friday: "Vi"
};

const period = "2026-10";

function App() {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function loadAcademicData() {
    try {
      setError("");
      const [coursesResponse, teachersResponse, classroomsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/courses`),
        fetch(`${API_BASE_URL}/teachers`),
        fetch(`${API_BASE_URL}/classrooms`)
      ]);

      if (!coursesResponse.ok || !teachersResponse.ok || !classroomsResponse.ok) {
        throw new Error("No se pudieron cargar las entidades academicas.");
      }

      setCourses(await coursesResponse.json());
      setTeachers(await teachersResponse.json());
      setClassrooms(await classroomsResponse.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function generateSchedule(course = selectedCourse) {
    try {
      setGenerating(true);
      setError("");
      setNotice("");
      const response = await fetch(`${API_BASE_URL}/schedules/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.validation?.issues?.join(" ") || "No se pudo generar un horario valido.");
      }

      setSchedule(data);
      setSelectedCourse(course || courses[0] || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  }

  useEffect(() => {
    loadAcademicData();
  }, []);

  const teacherByCode = useMemo(
    () => new Map(teachers.map((teacher) => [teacher.code, teacher])),
    [teachers]
  );

  const classroomByCode = useMemo(
    () => new Map(classrooms.map((classroom) => [classroom.code, classroom])),
    [classrooms]
  );

  const selectedItems = useMemo(() => {
    if (!schedule || !selectedCourse) {
      return [];
    }

    return schedule.items.filter((item) => item.courseCode === selectedCourse.code);
  }, [schedule, selectedCourse]);

  const groupedItems = useMemo(() => {
    if (!schedule) {
      return {};
    }

    return schedule.items.reduce((groups, item) => {
      groups[item.day] = groups[item.day] || [];
      groups[item.day].push(item);
      return groups;
    }, {});
  }, [schedule]);

  function handleShowCourse(course) {
    setSelectedCourse(course);

    if (!schedule) {
      generateSchedule(course);
    }
  }

  function submitEnrollment() {
    if (!schedule?.validation.valid) {
      setError("Primero genera un horario valido antes de enviar la matricula.");
      return;
    }

    setNotice("Matricula simulada enviada correctamente. Horario sin conflictos listo para el estudiante.");
  }

  return (
    <main className="student-portal">
      <header className="top-strip">
        <strong>Universidad Continental</strong>
        <span>SmartSched-UC</span>
      </header>

      <nav className="breadcrumb" aria-label="Ruta de navegacion">
        <a href="#estudiante">Estudiante</a>
        <span>Matricula</span>
        <span>Seleccionar un periodo</span>
        <strong>Matriculate</strong>
      </nav>

      <section className="page-title">
        <div>
          <h1>Matriculate</h1>
          <p>Periodo {period} | Generacion automatica de bloques academicos</p>
        </div>
        <button className="primary-action" type="button" onClick={() => generateSchedule()} disabled={generating}>
          {generating ? "Generando..." : "Generar proyeccion"}
        </button>
      </section>

      <section className="tabs" aria-label="Proceso de matricula">
        <button type="button" disabled>Encontrar clases</button>
        <button type="button" disabled>Ingresar NRC</button>
        <button className="active-tab" type="button">Proyecciones</button>
        <button type="button">Horario y opciones</button>
        <button type="button">Bloques</button>
      </section>

      {error && <p className="error-message">{error}</p>}
      {notice && <p className="success-message">{notice}</p>}

      <section className="portal-frame">
        <div className="frame-heading">
          <h2>Listado de Asignaturas</h2>
          <span>{loading ? "Cargando datos" : `${courses.length} asignaturas disponibles`}</span>
        </div>

        <div className="course-table-wrap">
          <table className="course-table">
            <thead>
              <tr>
                <th>Periodo</th>
                <th>Codigo</th>
                <th>Asignatura</th>
                <th>Creditos</th>
                <th>Tipo</th>
                <th>Docente</th>
                <th>Estado</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => {
                const teacher = teacherByCode.get(course.teacherCode);
                const selected = selectedCourse?.code === course.code;

                return (
                  <tr className={selected ? "selected-row" : "available-row"} key={course.code}>
                    <td>{index < 1 ? "03" : "04"}</td>
                    <td>{course.code}</td>
                    <td>
                      <button className="link-button" type="button" onClick={() => handleShowCourse(course)}>
                        {course.name}
                      </button>
                    </td>
                    <td>{course.requiredHours}</td>
                    <td>{course.type === "lab" ? "Practica" : "Teoria"}</td>
                    <td>{teacher?.name || course.teacherCode}</td>
                    <td><span className="status-pill">Proyectado</span></td>
                    <td>
                      <button className="small-action" type="button" onClick={() => handleShowCourse(course)}>
                        Ver Horarios
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="work-area">
        <article className="blocks-panel">
          <div className="panel-title">
            <h2>Seleccionar su opcion de bloque</h2>
            <span>{selectedCourse ? selectedCourse.code : "Sin asignatura"}</span>
          </div>

          {!selectedCourse ? (
            <p className="empty-state">Selecciona una asignatura o genera la proyeccion para revisar bloques.</p>
          ) : (
            <div className="block-detail">
              <p>
                El plan de estudios seleccionado es {period}-{selectedCourse.name}. Cupos y aulas se validan
                automaticamente antes de enviar la matricula.
              </p>

              <table className="blocks-table">
                <thead>
                  <tr>
                    <th>Titulo</th>
                    <th>Horas</th>
                    <th>NRC</th>
                    <th>Docente</th>
                    <th>Horas de reunion</th>
                    <th>Campus</th>
                    <th>Status</th>
                    <th>Opcion</th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedItems.length > 0 ? selectedItems : []).map((item, index) => {
                    const classroom = classroomByCode.get(item.classroomCode);

                    return (
                      <tr key={`${item.courseCode}-${item.day}-${item.start}`}>
                        <td>{item.courseName}</td>
                        <td>{item.duration}</td>
                        <td>{6900 + index}</td>
                        <td>{item.teacherName}</td>
                        <td>
                          {dayLabels[item.day]} {item.start}-{item.end} Tipo: CLASE Aula: {item.classroomCode}
                        </td>
                        <td>Sede Huancayo</td>
                        <td>{classroom ? `${classroom.capacity - item.enrollment} cupos disp.` : "Validado"}</td>
                        <td>
                          <select aria-label={`Opcion para ${item.courseName}`}>
                            <option>Ninguno</option>
                            <option>Matricular</option>
                            <option>Quitar</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </article>

        <aside className="summary-panel">
          <h2>Horario final</h2>
          <div className="metrics-grid">
            <div>
              <strong>{schedule?.validation.valid ? "Valido" : "Pendiente"}</strong>
              <span>Estado</span>
            </div>
            <div>
              <strong>{schedule?.items.length || 0}</strong>
              <span>Sesiones</span>
            </div>
            <div>
              <strong>{schedule?.metrics.classroomEfficiency ?? "-"}</strong>
              <span>Eficiencia</span>
            </div>
            <div>
              <strong>{schedule?.metrics.balanceScore ?? "-"}</strong>
              <span>Balance</span>
            </div>
          </div>

          {!schedule ? (
            <p className="empty-state compact">Aun no hay horario generado.</p>
          ) : (
            <div className="calendar-preview">
              {Object.entries(groupedItems).map(([day, items]) => (
                <section key={day}>
                  <h3>{dayLabels[day] || day}</h3>
                  {items.map((item) => (
                    <div className="calendar-item" key={`${item.courseCode}-${day}-${item.start}`}>
                      <strong>{item.start}</strong>
                      <span>{item.courseName}</span>
                      <small>{item.classroomCode}</small>
                    </div>
                  ))}
                </section>
              ))}
            </div>
          )}

          <button className="send-button" type="button" onClick={submitEnrollment}>
            Enviar matricula
          </button>
        </aside>
      </section>
    </main>
  );
}

export default App;
