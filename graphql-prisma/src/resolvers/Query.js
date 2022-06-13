import prisma from '../prisma';

const Query = {
    users(parent, args, { db, prisma }, info) {
        // if (!args.query) {
        //     return db.users;
        // }
        //
        // return db.users.filter((user) => {
        //     return user.name.toLowerCase().includes(args.query.toLowerCase())
        // })

        /*
         * info` contains all the information
         * return this call as it's a promise
         */
        return prisma.query.users(null, info)
    },
    posts(parent, args, { prisma }, info) {
        // if (!args.query) {
        //     return db.posts;
        // }
        //
        // return db.posts.filter((post) => {
        //     return post.body.toLowerCase().includes(args.query.toLowerCase())
        //         || post.title.toLowerCase().includes(args.query.toLowerCase())
        // })
        return prisma.query.posts(null, info);
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
    comments(parent, args, { db }) {
        return db.comments;
    }
};

export default Query;