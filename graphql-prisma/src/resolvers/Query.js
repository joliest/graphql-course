const Query = {
    users(parent, args, { db, prisma }, info) {
        const operationArguments = {}

        if (args.query) {
            operationArguments.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            }
        }
        return prisma.query.users(operationArguments, info)
    },
    posts(parent, args, { prisma }, info) {
        const operationArguments = {}

        if (args.query) {
            operationArguments.where = {
                OR: [{
                    title_contains: args.query
                }, {
                    body_contains: args.query
                }]
            }
        }

        return prisma.query.posts(operationArguments, info);
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
    comments(parent, args, { prisma }, info) {
        return prisma.query.comments(null, info);
    }
};

export default Query;