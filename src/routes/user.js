const express = require("express");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const { user } = require("../config/database");
const userSchema = require("../config/types");
const sendSuccessResponse = require("../utils/reponse");
const ApiError = require("../utils/customError");

const router = express.Router();

//middleware that checks if the user already exist when trying to signup. Does so by searching if the username in the form is already present in DB.
const userExist = async (req, res, next) => {
  const userName = req.body["userName"];

  try {
    const userInfo = await user.findOne({ userName: userName });
    if (userInfo) {
      throw new ApiError(
        409,
        "User already exists.",
        "This user already exists in our records."
      );
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

router.post("/signup", userExist, async (req, res, next) => {
  const { fullName, userName, password, email } = req.body;

  const inputValidation = userSchema.safeParse({
    fullName,
    userName,
    password,
    email,
  });
  try {
    if (!inputValidation.success) {
      throw new ApiError(
        400,
        "Input validation failed.",
        inputValidation.error.errors.map((err) => err.message)
      );
    }

    const hashedPassword = await argon2.hash(inputValidation.data.password);
    const newUser = new user({
      fullName,
      userName,
      password: hashedPassword,
      email,
    });

    const savedUser = await newUser.save();
    const jwtToken = jwt.sign(
      { userid: savedUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return sendSuccessResponse(
      res,
      201,
      { token: jwtToken },
      "User Registered successfully."
    );
  } catch (err) {
    next(err);
  }
});

router.post("/signin", async (req, res, next) => {
  const { userName, password } = req.body;
  const existingUser = await user.findOne({ userName });

  try {
    if (!existingUser) {
      new ApiError(
        401,
        "Invalid credentials",
        "The provided username or password is incorrect."
      );
    }
    const isPasswordValid = await argon2.verify(
      existingUser.password,
      password
    );

    if (!isPasswordValid) {
      new ApiError(
        401,
        "Invalid credentials",
        "The provided username or password is incorrect."
      );
    }

    const jwtToken = jwt.sign(
      { userid: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    sendSuccessResponse(
      res,
      200,
      { token: jwtToken },
      "User loggedin successfully."
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;
