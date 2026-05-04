const horarioStore = require("../data/horario.store");

function listarHorarios(req, res) {
  res.json(horarioStore.findAll());
}

function crearHorario(req, res) {
  const { curso, aula, hora } = req.body;

  if (!curso || !aula || !hora) {
    return res.status(400).json({
      message: "curso, aula y hora son obligatorios"
    });
  }

  const horario = horarioStore.create({
    curso: curso.trim(),
    aula: aula.trim(),
    hora: hora.trim()
  });

  return res.status(201).json(horario);
}

function eliminarHorario(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "El id debe ser numerico" });
  }

  const eliminado = horarioStore.remove(id);

  if (!eliminado) {
    return res.status(404).json({ message: "Horario no encontrado" });
  }

  return res.status(204).send();
}

module.exports = {
  listarHorarios,
  crearHorario,
  eliminarHorario
};
