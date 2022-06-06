import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
})

const userQuery = `
    {
        id
        name 
        email
        posts {
            id 
            title 
            published
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

const createPostForUser = async (authorId, data) => {
    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        },
    }, '{ id }')
    const user = await prisma.query.user({
        where: {
            id: authorId
        }
    }, userQuery)
    return user
}

// createPostForUser('cl3p9abv900380f284da2yfuv', {
//     title: 'Great books to read 2',
//     body: 'The war of art 2',
//     published: true,
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// })

const updatePostForUser = async (postId, data) => {
    const newPost = await prisma.mutation.updatePost({
        data,
        where: {
            id: postId
        },
    }, post)
    return newPost;
}

updatePostForUser('cl41yuetc003i0g28zyx6t1cn', { published: false })
    .then((post) => {
        console.log(JSON.stringify(post, undefined, 2))
    })
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