import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/horarios";

const initialForm = {
  curso: "",
  aula: "",
  hora: ""
};

function App() {
  const [horarios, setHorarios] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function cargarHorarios() {
    try {
      setError("");
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("No se pudieron cargar los horarios.");
      }

      const data = await response.json();
      setHorarios(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarHorarios();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "No se pudo registrar el horario.");
      }

      const nuevoHorario = await response.json();
      setHorarios((currentHorarios) => [...currentHorarios, nuevoHorario]);
      setForm(initialForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function eliminarHorario(id) {
    try {
      setError("");
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar el horario.");
      }

      setHorarios((currentHorarios) =>
        currentHorarios.filter((horario) => horario.id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="app-shell">
      <section className="app-header">
        <div>
          <p className="eyebrow">SmartSched-UC</p>
          <h1>Gestion de horarios academicos</h1>
          <p className="subtitle">
            Registro inicial conectado a una API REST y preparado para crecer
            hacia asignacion automatica mediante CSP.
          </p>
        </div>
      </section>

      <section className="content-grid">
        <form className="schedule-form" onSubmit={handleSubmit}>
          <h2>Nuevo horario</h2>

          <label>
            Curso
            <input
              name="curso"
              value={form.curso}
              onChange={handleChange}
              placeholder="Ej. Algoritmos"
              required
            />
          </label>

          <label>
            Aula
            <input
              name="aula"
              value={form.aula}
              onChange={handleChange}
              placeholder="Ej. C-302"
              required
            />
          </label>

          <label>
            Hora
            <input
              name="hora"
              value={form.hora}
              onChange={handleChange}
              placeholder="Ej. 14:00-16:00"
              required
            />
          </label>

          <button type="submit" disabled={saving}>
            {saving ? "Guardando..." : "Agregar horario"}
          </button>
        </form>

        <section className="schedule-list">
          <div className="list-header">
            <h2>Horarios registrados</h2>
            <span>{horarios.length} total</span>
          </div>

          {error && <p className="error-message">{error}</p>}

          {loading ? (
            <p className="empty-state">Cargando horarios...</p>
          ) : horarios.length === 0 ? (
            <p className="empty-state">Aun no hay horarios registrados.</p>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Curso</th>
                    <th>Aula</th>
                    <th>Hora</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {horarios.map((horario) => (
                    <tr key={horario.id}>
                      <td>{horario.curso}</td>
                      <td>{horario.aula}</td>
                      <td>{horario.hora}</td>
                      <td>
                        <button
                          className="delete-button"
                          type="button"
                          onClick={() => eliminarHorario(horario.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default App;
