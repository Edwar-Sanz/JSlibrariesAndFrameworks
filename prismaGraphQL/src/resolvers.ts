import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/*
 Los resolvers son funciones que 
 determinan cómo se obtienen o 
 calculan los valores de los 
 campos en un tipo GraphQL.
 Son parecidos a los métodos de
 un controlador
*/
export const resolvers = {
  Query: {
    hello: (): string => 'Hello World!!!',
    getAllUsers: async()=> await prisma.user.findMany(),
    getUserById: async(root: any, args: any)=> await prisma.user.findUnique({where: { id: parseInt(args.id) }})
  },
  Mutation: {
    createUser: async(root: any, { input }: { input: { name: string, password: string } })=> await prisma.user.create({ data: { name:input.name , password: input.password } })
  }
}