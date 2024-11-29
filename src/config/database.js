const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to the database succesfully.");
  })
  .catch(() => {
    console.log("some error occured while trying to connect to the database.");
  });

const userSchema = new mongoose.Schema({
  fullName: String,
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

const users = mongoose.model("users", userSchema);

module.exports = users;
