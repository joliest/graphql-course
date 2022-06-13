import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Comment from './resolvers/Comment';
import Post from './resolvers/Post';
import User from './resolvers/User';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import prisma from './prisma';

const pubsub = new PubSub();
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        Post,
        User,
        Comment,
    },
    context: {
        db,
        pubsub,
        prisma,
    }
})

server.start(() => {
    console.log('The server is app');
});