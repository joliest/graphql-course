import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
})

/*
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
prisma.query.users(null, userQuery)
    .then((data) => {
        console.log(JSON.stringify(data, undefined, 2))
    })
    .catch((e) => {

    })


const commentQuery = `
    {
        id
        text
        author {
            name
            email
        }
  }
`
prisma.query.comments(null, commentQuery)
    .then((data) => {
        // console.log(JSON.stringify(data, undefined, 2))
    })
    .catch((e) => {

    })
 */