import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userResolvers = {
  Query: {
    getAllUsers: async()=> await prisma.user.findMany(),
    getUserById: async(root: any, args: any)=> await prisma.user.findUnique({where: { id: parseInt(args.id) }})
  },
  Mutation: {
    createUser: async(root: any, { input }: { input: { name: string, password: string } })=> await prisma.user.create({ data: { name:input.name , password: input.password } })
  }
}