import { createSchema} from 'graphql-yoga'
import 'graphql-import-node';
//--------------------------------------------------------------
/*
 Los resolvers son funciones que determinan cómo se obtienen o 
 calculan los valores de los campos en un tipo GraphQL.
 Son parecidos a los métodos de un controlador
*/

import { userResolvers } from './resolvers/users/usersResolvers'
import { helloResolvers } from './resolvers/hello/helloResolver';

//--------------------------------------------------------------
/* 
los tipos en GraphQL son parecidos a las rutas, estos tipos 
representan los datos que se pueden recuperar desde el servidor.
*/
import UserTypes from './typeDefs/User.graphql';
import HelloTypes from './typeDefs/Hello.graphql';

//--------------------------------
export const schema = createSchema({
  resolvers: [userResolvers, helloResolvers],
  typeDefs: [UserTypes, HelloTypes]
})