// Sample error response
//{
//     "status": "error",
//     "statusCode": 404,
//     "error": {
//       "message": "The requested resource was not found.",
//       "details": "The user with the ID '12345' does not exist in our records.",
//       "timestamp": "2023-12-08T12:30:45Z",
//     },
//   }

class ApiError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.status = "error";
    this.statusCode = statusCode;
    this.error = {
      message,
      details,
      timestamp: new Date().toISOString(),
    };
  }
}

module.exports = ApiError;
