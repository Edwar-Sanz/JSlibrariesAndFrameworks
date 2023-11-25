import { createSchema  } from 'graphql-yoga'
import { resolvers } from './resolvers'

//--------------------------------
/* 
los tipos en GraphQL son parecidos
a las rutas, estos tipos representan 
los datos que se pueden recuperar 
desde el servidor.

*/
const typeDefs =
// Esto es sintaxis de graphql
  `type Query {
      hello: String
      num: Int
      helloWithParam(name: String!): String
      testObjects: [TestObjects]
    }
  type TestObjects{ 
    id: ID
    name: String
    phone: Int
  }

  `
//--------------------------------
export const schema = createSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefs]
})