import { PrismaClient } from "@prisma/client";
import responses from "../utilities/responses.js";
const prisma = new PrismaClient();

const userController = {

  getUsers: async (req, res) => {
    const users = await prisma.user.findMany();
    responses.success(res, users, 200);
  },
  //-------------------------------------------------------------
  addUser: async (req, res) => {
    console.log(req.body.id);
    try {
      const newUser = await prisma.user.create({
        data: {
          name: req.body.name,
          email: req.body.email,
        }
      });
      const msj = "Created user " + newUser;
      responses.success(res, msj, 200);
    } catch (error) {
      const err = "Error to create user " + error;
      responses.error(res, err, 500);
    }
  },
  //-------------------------------------------------------------
  

};
  
export default userController;
