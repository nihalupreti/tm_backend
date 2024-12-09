const ApiError = require("../utils/customError");

const doesUserExist = async (req, res, next) => {
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

module.exports = doesUserExist;
