import responses from "../utilities/responses.js";

const greetingsController = {

  hello: (req, res) => {
    responses.success(res, "Api says hello", 200);
  },
  //-------------------------------------------------------------
  bye: (req, res) => {
    responses.success(res, "Api says bye", 200);    
  }

};

export default greetingsController;
