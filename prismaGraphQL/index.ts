import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'
import { schema } from './src/schema'

const yoga = createYoga({
  graphqlEndpoint: '/',
  schema,
})

const server = createServer(yoga)

server.listen(4000, () => {
  console.log(`Server ready at: http://localhost:4000`)
})