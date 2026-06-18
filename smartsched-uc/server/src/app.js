const express = require("express");
const cors = require("cors");
const compression = require("compression");
const academicRoutes = require("./routes/academic.routes");
const horarioRoutes = require("./routes/horario.routes");
const { connectDatabase } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(compression());

app.use(cors({
  origin: process.env.CLIENT_URL || "*"
}));

app.use(express.json({
  limit: "100kb"
}));

app.get("/", (req, res) => {
  res.set("Cache-Control", "public, max-age=60");
  res.json({
    message: "API SmartSched-UC operativa con fallback local y soporte PostgreSQL",
    stack: ["Express", "React", "Node.js", "PostgreSQL", "Local academic dataset"],
    schedulerReady: true,
    architecture: {
      localDataMode: true,
      postgresReady: true,
      compression: true,
      jsonLimit: "100kb",
      cacheReady: true,
      paginationReady: true
    }
  });
});

app.use("/api", academicRoutes);
app.use("/api/horarios", horarioRoutes);

if (require.main === module) {
  connectDatabase()
    .then((status) => {
      console.log(status.message);
      app.listen(PORT, () => {
        console.log(`Servidor SmartSched-UC en http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error("No se pudo inicializar el modo local", error);
      process.exit(1);
    });
}

module.exports = app;
