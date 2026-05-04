const express = require("express");
const router = express.Router();

// 📚 Cursos con múltiples opciones (dominios)
const cursos = [
  {
    nombre: "Matemática",
    opciones: [
      { inicio: 8, fin: 10, creditos: 4 },
      { inicio: 14, fin: 16, creditos: 4 }
    ]
  },
  {
    nombre: "Programación",
    opciones: [
      { inicio: 10, fin: 12, creditos: 4 },
      { inicio: 16, fin: 18, creditos: 4 }
    ]
  },
  {
    nombre: "Redes",
    opciones: [
      { inicio: 9, fin: 11, creditos: 3 },
      { inicio: 13, fin: 15, creditos: 3 }
    ]
  }
];

// 🔒 Verificar solapamientos
function hayCruce(horario) {
  for (let i = 0; i < horario.length; i++) {
    for (let j = i + 1; j < horario.length; j++) {
      if (
        horario[i].fin > horario[j].inicio &&
        horario[i].inicio < horario[j].fin
      ) {
        return true;
      }
    }
  }
  return false;
}

// 🧠 Heurística MRV: seleccionar curso con menos opciones
function seleccionarVariable(cursosRestantes) {
  return cursosRestantes.sort(
    (a, b) => a.opciones.length - b.opciones.length
  )[0];
}

// 🎯 Backtracking Mejorado + Métricas
router.get("/schedule", (req, res) => {

  let intentos = 0;

  function backtrackingMejorado(cursosRestantes, solucion) {

    intentos++;

    if (cursosRestantes.length === 0) {
      const creditos = solucion.reduce((sum, c) => sum + c.creditos, 0);

      if (creditos >= 20 && creditos <= 22 && !hayCruce(solucion)) {
        return solucion;
      }
      return null;
    }

    // 🔥 MRV aplicado
    const curso = seleccionarVariable([...cursosRestantes]);

    const nuevosCursos = cursosRestantes.filter(c => c !== curso);

    for (let opcion of curso.opciones) {

      const intento = [...solucion, { ...opcion, nombre: curso.nombre }];

      if (!hayCruce(intento)) {
        const resultado = backtrackingMejorado(nuevosCursos, intento);
        if (resultado) return resultado;
      }
    }

    return null;
  }

  const inicio = Date.now();

  const resultado = backtrackingMejorado([...cursos], []);

  const fin = Date.now();

  if (resultado) {
    const creditos = resultado.reduce((sum, c) => sum + c.creditos, 0);

    res.json({
      horario: resultado,
      creditos,
      valido: true,
      tiempo_ms: fin - inicio,
      intentos,
      mensaje: "Horario generado correctamente con CSP + MRV"
    });

  } else {
    res.json({
      horario: [],
      valido: false,
      tiempo_ms: fin - inicio,
      intentos,
      mensaje: "No se encontró solución válida"
    });
  }
});

module.exports = router;