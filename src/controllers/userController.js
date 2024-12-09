const argon2 = require("argon2");

const User = require("../models/User");
const sendSuccessResponse = require("../utils/reponse");
const userSchema = require("../validators/userValidator");
const signJwt = require("../utils/jwt");

const setCookie = (res, encryptedToken) => {
  res.cookie("authToken", encryptedToken, {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    maxAge: 60 * 60 * 1000, // 1 hour
    path: "/", // Accessible throughout the app
  });
};

exports.createUser = async (req, res, next) => {
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
    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      email,
    });

    const savedUser = await newUser.save();
    const encryptedJwtToken = signJwt({ userid: savedUser._id });
    setCookie(res, encryptedJwtToken);
    return sendSuccessResponse(res, 201, "", "User Registered successfully.");
  } catch (err) {
    next(err);
  }
};

exports.signinUser = async (req, res, next) => {
  const { userName, password } = req.body;
  const existingUser = await User.findOne({ userName });

  try {
    if (!existingUser) {
      throw new ApiError(
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
      throw new ApiError(
        401,
        "Invalid credentials",
        "The provided username or password is incorrect."
      );
    }

    const encryptedJwtToken = signJwt({ userid: savedUser._id });
    setCookie(res, encryptedJwtToken);
    sendSuccessResponse(res, 200, "", "User loggedin successfully.");
  } catch (err) {
    next(err);
  }
};
