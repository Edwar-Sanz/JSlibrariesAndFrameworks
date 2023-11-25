import { test1, TestItem } from "./helpers/testObjects"


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
    num: (): number => 1,
    // helloWithParam(root: any, args: any){
    //   return `Hello ${args.name}`
    // }
    helloWithParam(root: any, { name }: { name: string }): string{
      return `Hello ${name}`
    },
    testObjects: (): TestItem[] => test1
  }
}