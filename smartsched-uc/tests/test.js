const assert = require("assert");

// Simulación simple
function validar(creditos, sinCruces) {
  return creditos >= 20 && creditos <= 22 && sinCruces;
}

// Test
const resultado = validar(20, true);

assert.strictEqual(resultado, true);

console.log("✅ Test aprobado");