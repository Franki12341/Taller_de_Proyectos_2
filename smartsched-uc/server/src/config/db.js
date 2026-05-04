const mongoose = require("mongoose");

async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return {
      connected: false,
      reason: "MONGODB_URI no definido; usando dataset academico en memoria."
    };
  }

  await mongoose.connect(uri);

  return {
    connected: true,
    database: mongoose.connection.name
  };
}

module.exports = {
  connectDatabase
};
