import { PrismaClient } from "@prisma/client";
import responses from "../utilities/responses.js";
const prisma = new PrismaClient();

const userController = {

  getUsers: async (req, res) => {
    const users = await prisma.user.findMany();
    responses.success(res, users, 200);
  },
  //-------------------------------------------------------------
  

};
  
export default userController;
