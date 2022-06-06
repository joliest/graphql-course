import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
})

const userQuery = `
    {
        id
        name 
        posts {
            id 
            title 
        } 
    }  
`;

const post = `
    {
        id
        title
        body
        published
    }
`
/*
prisma.mutation.createPost({
    data: {
        title: 'lorem ipsum',
        body: 'Test lorem',
        published: true,
        author: {
            connect: {
                id: 'cl3p7rp1n00070g28azri542w'
            }
        }
    }
}, post).then((data) => {
    console.log(data)
    return prisma.query.users(null, userQuery)
}).then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
})
 */

/*
prisma.mutation.updatePost({
    data: {
        published: false,
    },
    where: {
        id: 'cl41yuetc003i0g28zyx6t1cn'
    }
}, post).then((data) => {
    console.log(data)
    return prisma.query.users(null, userQuery)
}).then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
})
 */