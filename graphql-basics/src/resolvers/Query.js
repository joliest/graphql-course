const Query = {
    users(parent, args, { db }, info) {
        if (!args.query) {
            return db.users;
        }

        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    posts(parent, args, { db }) {
        if (!args.query) {
            return db.posts;
        }

        return db.posts.filter((post) => {
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
    comments(parent, args, { db }) {
        return db.comments;
    }
};

export default Query;