const fs = require("fs");
const path = require("path");
const { isPostgresEnabled, query, testConnection } = require("../config/db");

async function runFile(filename) {
  const filepath = path.resolve(__dirname, filename);
  const sql = fs.readFileSync(filepath, "utf8");
  await query(sql);
  console.log(`Ejecutado: ${filename}`);
}

async function main() {
  if (!isPostgresEnabled()) {
    console.log("USE_POSTGRES=false o DATABASE_URL no definido. No se inicializo PostgreSQL.");
    process.exit(0);
  }

  const status = await testConnection();
  if (!status.connected) {
    console.log("PostgreSQL no disponible, usando mock data local");
    process.exit(1);
  }

  await runFile("smartsched_uc.sql");
  console.log("Base de datos SmartSched-UC inicializada correctamente.");
}

main().catch((error) => {
  console.error("Fallo db:init:", error.message);
  process.exit(1);
});
