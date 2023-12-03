import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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


  async getAllUsers(): Promise<UserInterface[]> {
    
    return await prisma.user.findMany();
  }

  async getUserById(root: any, args: any): Promise<UserInterface | null> {

    const userId = parseInt(args.id);
    return await prisma.user.findUnique({where: { id: userId }});
  }

  async createUser(root: any, { input }: InputUserInterface ) {
    
    return await prisma.user.create({ data: { name:input.name , password: input.password } })

  }
}
export default User;