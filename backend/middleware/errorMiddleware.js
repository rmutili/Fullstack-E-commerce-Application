export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`); // req.originalUrl is the URL that was requested
  res.status(404);
  next(error); // Pass error to error handler below
};

export const errorHandler = (err, req, res, next) => {
  // Set status code to 200 if status code is 200 (OK) or 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    // Return error message in JSON format
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
