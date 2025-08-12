 
module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const code = err.errorCode || 'INTERNAL_ERROR';
  res.status(status).json({
    error: {
      message: err.message,
      code,
      status
    }
  });
};
