import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    // this will be auto generated, configured in .graphqlconfig
    typeDefs: 'src/generated/prisma.graphql',
    // docker's localhost and port
    endpoint: 'localhost:4466',

})