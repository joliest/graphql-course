import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
    type Query {
        me: User!
        post: Post!
    }
    
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

const resolvers = {
    Query: {
        me() {
            return {
                id: '123098',
                name: 'Mike',
                email: 'mike@example.com',
                age: 28,
            }
        },
        post() {
            return {
                id: '123097',
                title: 'My Post',
                body: 'Lorem ipsum chena',
                published: false,
            }
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