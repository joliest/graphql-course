import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
    type Query {
    }
`

const resolvers = {
    Query: {
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
})

server.start(() => {
    console.log('The server is app');
});