function logErrors(err, req, res, next) {
  console.log('logError')
  next(err);
};

function errorHandler(err, req, res, next){
  console.log('errorHandler')
  res.status(500).json({
    mesage: err.message,
    stack: err.stack,
  })
}

function boomErrorHandler(err, req, res, next){

  if(err.isBoom){
    const {output} = err;
    res.status(output.statusCode).json(output.payload)
  }else {
    next(err)
  }
}

module.exports = {logErrors, errorHandler, boomErrorHandler}
