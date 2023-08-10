// not Found

const notFound = (req, res, next) => {
  const error = new Error(`Not Found : ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Error Handler

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  const errorMessage = error.message || "Internal Server Error";
  if (error.name === "ValidationError") {
    const errorArray = Object.values(error.errors).map(
      (error) => error.message
    );
    return res.status(422).json({
      errors: errorArray,
    });
  }

  res.status(statusCode).json({
    status: "error",
    message: errorMessage,
    stack: error.stack,
  });
};

module.exports = { errorHandler, notFound };
