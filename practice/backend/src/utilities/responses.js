const responses = {

  success: (res, message = "Ok", statusCode = 200) => {
    res.status(statusCode).send({
      body: message,
      status : statusCode,
      error : false
    });
  },
  //-------------------------------------------------------------
  error: (res, message = "Error", statusCode = 500) => {
    res.status(statusCode).send({
      body: message,
      status : statusCode,
      error : true
    });
  }
  
};

export default responses;
