const mongoose = require("mongoose");

exports.connectDB = async () => {
  const MONGO_URI =
  process.env.USE_DOCKER === "true"
    ? process.env.MONGO_URI_DOCKER
    : process.env.MONGO_URI;
  console.log('8: ', MONGO_URI)
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Database Connection Failed", err);
    process.exit(1);
  }
};
