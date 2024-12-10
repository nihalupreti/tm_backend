const ApiError = require("../utils/customError");
const { verifyJwt } = require("../utils/jwt");

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  const encryptedToken = req.cookies.authToken;
  if (!encryptedToken) {
    throw new ApiError(401, "Access denied.", "Token was not provided");
  }
  const decodedValue = verifyJwt(encryptedToken);
  req.user = decodedValue;
  next();
};

module.exports = verifyToken;
