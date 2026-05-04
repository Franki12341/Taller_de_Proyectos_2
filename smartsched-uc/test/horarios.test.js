const assert = require("node:assert/strict");
const test = require("node:test");
const app = require("../server/src/app");
const horarioStore = require("../server/src/data/horario.store");

function listen() {
  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      const { port } = server.address();
      resolve({ server, baseUrl: `http://localhost:${port}` });
    });
  });
}

async function request(path, options = {}) {
  const { server, baseUrl } = await listen();

  try {
    const response = await fetch(`${baseUrl}${path}`, options);
    const text = await response.text();
    const body = text ? JSON.parse(text) : null;

    return {
      status: response.status,
      body
    };
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test("GET /api/horarios retorna todos los horarios", async () => {
  horarioStore.reset([
    { id: 1, curso: "CSP", aula: "A-101", hora: "08:00-10:00" }
  ]);

  const response = await request("/api/horarios");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, [
    { id: 1, curso: "CSP", aula: "A-101", hora: "08:00-10:00" }
  ]);
});

test("POST /api/horarios crea un horario", async () => {
  horarioStore.reset([]);

  const response = await request("/api/horarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      curso: "Algoritmos",
      aula: "B-204",
      hora: "10:00-12:00"
    })
  });

  assert.equal(response.status, 201);
  assert.deepEqual(response.body, {
    id: 1,
    curso: "Algoritmos",
    aula: "B-204",
    hora: "10:00-12:00"
  });
});

test("DELETE /api/horarios/:id elimina un horario", async () => {
  horarioStore.reset([
    { id: 1, curso: "CSP", aula: "A-101", hora: "08:00-10:00" }
  ]);

  const deleteResponse = await request("/api/horarios/1", {
    method: "DELETE"
  });
  const getResponse = await request("/api/horarios");

  assert.equal(deleteResponse.status, 204);
  assert.deepEqual(getResponse.body, []);
});
