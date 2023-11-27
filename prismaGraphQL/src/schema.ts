import { createSchema} from 'graphql-yoga'
import { resolvers } from './resolvers'
import fs from'fs'
import path from'path'
//--------------------------------
/* 
los tipos en GraphQL son parecidos
a las rutas, estos tipos representan 
los datos que se pueden recuperar 
desde el servidor.

*/
const typeDefs = fs.readFileSync(
  path.join(__dirname, 'typeDefs.graphql'),
  'utf-8'
)

//--------------------------------
export const schema = createSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefs]
})