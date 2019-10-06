import { ApolloServer } from 'apollo-server'
import loadSchema from './src/util/loadSchema'
import resolvers from './src/resolvers'

const typeDefs = loadSchema('./src/schema.graphql')
const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
