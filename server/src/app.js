const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
const scheduleRoutes = require("./routes/schedule.routes");
app.use("/api", scheduleRoutes);

app.get("/", (req, res) => {
  res.send("API SmartSched-UC funcionando 🚀");
});

app.listen(3001, () => {
  console.log("Servidor en http://localhost:3001");
});