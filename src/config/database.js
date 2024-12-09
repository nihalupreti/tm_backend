const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to the database succesfully.");
  } catch (err) {
    console.log(
      "some error occured while trying to connect to the database." + err
    );
  }
};

module.exports = connectDB;
