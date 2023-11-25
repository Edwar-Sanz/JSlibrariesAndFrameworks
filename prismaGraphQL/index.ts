import { createYoga } from 'graphql-yoga'
import { schema } from './src/schema'
import express from 'express'

//----config graphql Endpoint---
const yoga = createYoga({
  graphqlEndpoint: '/',
  schema,
  graphiql: true
});
//-------server configs---------
const app = express();
app.use(yoga)

//-------run server------------
app.listen(4000, () => {
  console.log(`Server ready at: http://localhost:4000`)
});