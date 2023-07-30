const mongoose = require("mongoose");
const { DB_URL } = require("../var.js");

module.exports = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.log("Database Connection Error", error);
    throw new Error(error);
  }
};
