const mongoose = require("mongoose");

const connectDB = async (URI) => {
  console.log("Start connecting");
  try {
    const conn = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to database...");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
