const express = require("express");
const cors = require("cors");
const academicRoutes = require("./routes/academic.routes");
const horarioRoutes = require("./routes/horario.routes");
const { connectDatabase } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API SmartSched-UC MERN funcionando",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    schedulerReady: true
  });
});

app.use("/api", academicRoutes);
app.use("/api/horarios", horarioRoutes);

if (require.main === module) {
  connectDatabase()
    .then((status) => {
      console.log(status.connected ? `MongoDB conectado: ${status.database}` : status.reason);
      app.listen(PORT, () => {
        console.log(`Servidor SmartSched-UC en http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error("No se pudo conectar a MongoDB", error);
      process.exit(1);
    });
}

module.exports = app;
