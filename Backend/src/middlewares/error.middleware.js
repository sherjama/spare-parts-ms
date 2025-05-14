import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
  console.error("ErrorHandler caught:", err);

  // Handle known ApiError
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
      data: null,
    });
  }

  // Fallback for other unexpected errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [err.message],
    data: null,
  });
};
