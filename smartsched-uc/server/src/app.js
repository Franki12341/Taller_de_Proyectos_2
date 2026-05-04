const express = require("express");
const cors = require("cors");
const horarioRoutes = require("./routes/horario.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API SmartSched-UC funcionando",
    cspReady: true
  });
});

app.use("/api/horarios", horarioRoutes);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor SmartSched-UC en http://localhost:${PORT}`);
  });
}

module.exports = app;
