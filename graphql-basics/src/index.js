import { GraphQLServer } from 'graphql-yoga';

// Type definitions - a.k.a application schema
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`

// resolvers for api
const resolvers = {
    Query: {
        // one method for each query we setup
        hello() {
            return 'This is my first query!'
        },
        name() {
            return 'Andrew Mead'
        }, 
        location() {
            return 'Apalit'
        }, 
        bio() {
            return 'I am a software developer'
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
})

server.start(() => {
    console.log('The server is app');
});