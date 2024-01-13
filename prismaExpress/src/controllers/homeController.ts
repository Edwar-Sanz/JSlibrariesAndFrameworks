import { Request, Response } from 'express';

class HomeController {
  //---------------------------------------------------------------
  async getDoc(req: Request, res: Response) {
    
    const docs = {
      "publicRoutes": {
        "get": "/",
        "post":["/login", "/register"]
      },
      "authRoutes": {
        "users" : {
          "get": ["/users", "/users/:id"],
          "post":"/create-user",
          "put":"/update-user/:id",
          "delete":"/delete-user/:id"
        }
      }
    }

    res.json(docs);
  }

}

export default HomeController;
