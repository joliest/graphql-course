import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

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

const comments = [{
    id: '1',
    text: 'comment 1',
    author: '1',
    post: '1',
}, {
    id: '2',
    text: 'comment 2',
    author: '2',
    post: '1',
}, {
    id: '3',
    text: 'comment 3',
    author: '2',
    post: '2',
}, {
    id: '4',
    text: 'comment 4',
    author: '3',
    post: '3',
}]


const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
        comments: [Comment!]!
    }
    
    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!
    }
    
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post
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
        comments() {
            return comments;
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some(user => user.email === args.email);
            if (emailTaken) {
                throw new Error('Email taken');
            }

            const { name, email, age } = args;
            const user = {
                id: uuidv4(), name, email, age,
            };

            users.push(user);
            return user;
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            });
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
            })
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