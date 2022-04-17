import { GraphQLServer } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Comment from './resolvers/Comment';
import Post from './resolvers/Post';
import User from './resolvers/User';
import Mutation from './resolvers/Mutation';

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Post,
        User,
        Comment,
    },
    context: {
        db
    }
})

server.start(() => {
    console.log('The server is app');
});