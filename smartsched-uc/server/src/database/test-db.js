const { getConnectionStatus, testConnection } = require("../config/db");

async function main() {
  const status = await testConnection();

  if (!status.connected) {
    console.log("PostgreSQL no disponible, usando mock data local");
    process.exit(1);
  }

  const current = getConnectionStatus();
  console.log("PostgreSQL conectado correctamente");
  console.log(JSON.stringify({
    status: "ok",
    database: current.driver,
    postgresEnabled: current.postgresEnabled,
    usingFallback: current.usingFallback
  }, null, 2));
}

main().catch((error) => {
  console.error("Fallo db:test:", error.message);
  process.exit(1);
});
