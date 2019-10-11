import { ApolloServer } from 'apollo-server'
import loadSchema from './util/loadSchema'
import resolvers from './resolvers'

const typeDefs = loadSchema('./schema.graphql')
const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
