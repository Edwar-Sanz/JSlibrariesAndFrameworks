const responses = {

  success: (res, message = "Ok", statusCode = 200) => {
    res.status(statusCode).send({
      status : statusCode,
      body: message,
      error : false
    });
  },
  //-------------------------------------------------------------
  error: (res, message = "Error", statusCode = 500) => {
    res.status(statusCode).send({
      status : statusCode,
      body: message,
      error : true
    });
  }
  
};

export default responses;
