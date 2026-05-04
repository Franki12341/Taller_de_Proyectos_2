let nextId = 3;

let horarios = [
  {
    id: 1,
    curso: "Matematica Discreta",
    aula: "A-101",
    hora: "08:00-10:00"
  },
  {
    id: 2,
    curso: "Programacion II",
    aula: "B-204",
    hora: "10:00-12:00"
  }
];

function findAll() {
  return horarios;
}

function create({ curso, aula, hora }) {
  const horario = {
    id: nextId,
    curso,
    aula,
    hora
  };

  nextId += 1;
  horarios.push(horario);

  return horario;
}

function remove(id) {
  const initialLength = horarios.length;
  horarios = horarios.filter((horario) => horario.id !== id);

  return horarios.length < initialLength;
}

function reset(seed = []) {
  horarios = seed;
  nextId = seed.reduce((maxId, horario) => Math.max(maxId, horario.id), 0) + 1;
}

module.exports = {
  findAll,
  create,
  remove,
  reset
};
