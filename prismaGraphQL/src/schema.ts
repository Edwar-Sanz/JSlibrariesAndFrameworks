import { createSchema} from 'graphql-yoga'
import { resolvers } from './resolvers'
import 'graphql-import-node';
import types from './typeDefs.graphql';
//--------------------------------
/* 
los tipos en GraphQL son parecidos
a las rutas, estos tipos representan 
los datos que se pueden recuperar 
desde el servidor.

*/
const typeDefs = types;

//--------------------------------
export const schema = createSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefs]
})