import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
})

export default prisma

// const userQuery = `
//     {
//         id
//         name
//         email
//         posts {
//             id
//             title
//             published
//         }
//     }
// `;
//
// const post = `
//     {
//         id
//         title
//         body
//         published
//     }
// `
// const createPostForUser = async (authorId, data) => {
//     const userExists = await prisma.exists.User({ id: authorId });
//     if (!userExists) {
//         throw new Error('User not found')
//     }
//
//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         },
//     }, '{ author { id name email posts { id title published} } }')
//     return post.author
// }

// createPostForUser('cl3p9abv900380f284da2yfuv', {
//     title: 'Great books to read 4',
//     body: 'The war of art 4',
//     published: true,
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch(error => {
//     console.log(error)
// })

// const updatePostForUser = async (postId, data) => {
//     const postExists = await prisma.exists.Post({
//         id: postId,
//     });
//     if (!postExists) {
//         throw new Error('Post not found')
//     }
//     const newPost = await prisma.mutation.updatePost({
//         data,
//         where: {
//             id: postId
//         },
//     }, '{ author { id name email posts { id title published } } }')
//     return newPost;
// }

// updatePostForUser('cl41yuetc00s3i0g28zyx6t1cn', { published: false })
//     .then((post) => {
//         console.log(JSON.stringify(post, undefined, 2))
//     })
//     .catch((error) => {
//         console.log(error)
//     })

// prisma.mutation.createPost({
//     data: {
//         title: 'lorem ipsum',
//         body: 'Test lorem',
//         published: true,
//         author: {
//             connect: {
//                 id: 'cl3p7rp1n00070g28azri542w'
//             }
//         }
//     }
// }, post).then((data) => {
//     console.log(data)
//     return prisma.query.users(null, userQuery)
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })


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