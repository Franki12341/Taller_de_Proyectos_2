const path = require("path");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config({
  path: path.resolve(__dirname, "../../.env")
});

const postgresEnabled = String(process.env.USE_POSTGRES || "false").toLowerCase() === "true";
const sslEnabled = String(process.env.DB_SSL || "false").toLowerCase() === "true";

let pool = null;
let lastConnectionStatus = {
  connected: false,
  driver: "local-mock-data",
  usingFallback: true,
  message: "PostgreSQL no disponible, usando mock data local"
};

function isPostgresEnabled() {
  return postgresEnabled && Boolean(process.env.DATABASE_URL);
}

function getPool() {
  if (!isPostgresEnabled()) {
    return null;
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: sslEnabled ? { rejectUnauthorized: false } : false
    });

    pool.on("error", (error) => {
      lastConnectionStatus = {
        connected: false,
        driver: "local-mock-data",
        usingFallback: true,
        message: "PostgreSQL no disponible, usando mock data local",
        error: error.message
      };
      console.error("PostgreSQL pool error:", error.message);
    });
  }

  return pool;
}

async function getClient() {
  const activePool = getPool();

  if (!activePool) {
    throw new Error("PostgreSQL no esta habilitado.");
  }

  return activePool.connect();
}

async function query(text, params = []) {
  const activePool = getPool();

  if (!activePool) {
    throw new Error("PostgreSQL no esta habilitado.");
  }

  return activePool.query(text, params);
}

async function testConnection() {
  if (!isPostgresEnabled()) {
    lastConnectionStatus = {
      connected: false,
      driver: "local-mock-data",
      usingFallback: true,
      message: "PostgreSQL no disponible, usando mock data local"
    };
    return lastConnectionStatus;
  }

  try {
    const activePool = getPool();
    await activePool.query("SELECT 1");
    lastConnectionStatus = {
      connected: true,
      driver: "postgresql",
      usingFallback: false,
      message: "PostgreSQL conectado correctamente"
    };
    return lastConnectionStatus;
  } catch (error) {
    lastConnectionStatus = {
      connected: false,
      driver: "local-mock-data",
      usingFallback: true,
      message: "PostgreSQL no disponible, usando mock data local",
      error: error.message
    };
    return lastConnectionStatus;
  }
}

async function connectDatabase() {
  const status = await testConnection();
  console.log(status.message);
  return status;
}

async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

function getConnectionStatus() {
  return { ...lastConnectionStatus, postgresEnabled: isPostgresEnabled() };
}

module.exports = {
  closePool,
  connectDatabase,
  getClient,
  getConnectionStatus,
  getPool,
  isPostgresEnabled,
  query,
  testConnection
};

Object.defineProperty(module.exports, "pool", {
  enumerable: true,
  get: () => getPool()
});
