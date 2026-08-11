const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Yolnoma"
    });

    console.log("✓ MongoDB connected");
    console.log(`✓ Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error("✗ MongoDB connection failed");
    console.error(error.message);

    process.exit(1);
  }
};

module.exports = connectDatabase;