const { isPostgresEnabled, query, testConnection } = require("../config/db");

async function getTablesAndColumns() {
  const result = await query(`
    SELECT table_name, column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
    ORDER BY table_name, ordinal_position
  `);

  return result.rows.reduce((accumulator, row) => {
    accumulator[row.table_name] = accumulator[row.table_name] || [];
    accumulator[row.table_name].push(row.column_name);
    return accumulator;
  }, {});
}

async function getCounts(tableNames) {
  const counts = {};

  for (const tableName of tableNames) {
    try {
      const result = await query(`SELECT COUNT(*)::int AS total FROM ${tableName}`);
      counts[tableName] = result.rows[0].total;
    } catch (error) {
      counts[tableName] = `error: ${error.message}`;
    }
  }

  return counts;
}

async function main() {
  if (!isPostgresEnabled()) {
    console.log("USE_POSTGRES=false o DATABASE_URL no definido. No se puede inspeccionar el schema.");
    process.exit(1);
  }

  const status = await testConnection();
  if (!status.connected) {
    console.log("PostgreSQL no disponible, usando mock data local");
    process.exit(1);
  }

  const tables = await getTablesAndColumns();
  const counts = await getCounts([
    "courses",
    "teachers",
    "classrooms",
    "time_blocks",
    "students",
    "student_course_requests",
    "constraints"
  ]);

  console.log("Tablas y columnas detectadas:");
  console.log(JSON.stringify(tables, null, 2));
  console.log("Cantidad de registros:");
  console.log(JSON.stringify(counts, null, 2));
}

main().catch((error) => {
  console.error("Fallo db:inspect:", error.message);
  process.exit(1);
});
