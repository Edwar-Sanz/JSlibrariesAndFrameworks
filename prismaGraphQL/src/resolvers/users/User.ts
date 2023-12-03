import { PrismaClient } from '@prisma/client';
import { ResInterface, Response } from '../../core/responses/Responses';
const prisma = new PrismaClient();
const res = new Response();


interface UserInterface {
  id: number;
  name: string;
  password: string;
}

interface InputUserInterface {
  input: {
    name: string;
    password: string;
  };
}


class User {

  // ----------------------------------------------------------------------------------------------
  async getAllUsers():  Promise<ResInterface> {
    try {
      const result: UserInterface[] = await prisma.user.findMany();
      return res.success(result, "ok");
    } catch (error) {
      return res.error("fail to get users.  Error: " + error , 500);
    }
    
  }

  // ----------------------------------------------------------------------------------------------
  async getUserById(root: any, args: any): Promise<ResInterface> {
    
    try {
      const userId: number = parseInt(args.id);
      if (isNaN(userId) || userId <= 0) {
        return res.error("Not valid userId" , 500);
      }
      const result: UserInterface | null = await prisma.user.findUnique({where: { id: userId }});
      if (!result) {
        return res.error("User not found!" , 404);
      }
      return res.success(result, "ok");
    } catch (error) {
      return res.error("fail to get user.  Error: " + error , 500);
    }
  }

  // ----------------------------------------------------------------------------------------------
  async createUser(root: any, { input }: InputUserInterface ) : Promise<ResInterface> {
    
    try {
      const userData: { name: string; password: string; } = { name:input.name , password: input.password };
      if (!userData.name || !userData.name) {
        return res.error("Not valid user data" , 400);
      }

      const existingUser = await prisma.user.findUnique({ where: { name: userData.name } });
      if (existingUser) {
        return res.error("User already exists", 409); 
      }

      const result: UserInterface | null = await prisma.user.create({ data: userData });
      if (!result) {
        return res.error("User not found!" , 404);
      }
      return res.success(result, "ok");
    } catch (error) {
      return res.error("fail to create user.  Error: " + error , 500);
    }

  }

  // ----------------------------------------------------------------------------------------------
}
export default User;