import { GraphQLServer } from 'graphql-yoga';

// Demo user database
const users  = [{
    id: '1',
    name: 'Joli',
    email: 'joli@example.com',
    age: 27
}, {
    id: '2',
    name: 'Je',
    email: 'je@example.com',
    age: 29
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com',
    age: 30
}]

const posts  = [{
    id: '1',
    title: 'My Post',
    body: 'Lorem ipsum chena',
    published: false,
    author: '1',
}, {
    id: '2',
    title: 'Joli Post',
    body: 'Test 123',
    published: true,
    author: '1',
}, {
    id: '3',
    title: 'Je Post',
    body: 'Hello',
    published: false,
    author: '2',
}]


const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
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
        author: User!
    }
`

const resolvers = {
    Query: {
        users(parent, args) {
            if (!args.query) {
                return users;
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args) {
            if (!args.query) {
                return posts;
            }

            return posts.filter((post) => {
                return post.body.toLowerCase().includes(args.query.toLowerCase()) 
                    || post.title.toLowerCase().includes(args.query.toLowerCase())
            })

        },
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
        },
    }, 
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    },
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
})

server.start(() => {
    console.log('The server is app');
});