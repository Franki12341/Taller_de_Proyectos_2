const express = require("express");
const {
  listarHorarios,
  crearHorario,
  eliminarHorario
} = require("../controllers/horario.controller");

const router = express.Router();

router.get("/", listarHorarios);
router.post("/", crearHorario);
router.delete("/:id", eliminarHorario);

module.exports = router;
