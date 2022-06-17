import uuidv4 from "uuid/v4";

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        const emailTaken = await prisma.exists.User({ email: args.data.email })
        if (emailTaken) {
            throw new Error('Email taken');
        }

        // pass info as second arg
        const user = await prisma.mutation.createUser({ data: args.data }, info)
        return user;
    },
    createPost(parent, args, { db, pubsub }, info) {
        const { data } = args;
        const userExists = db.users.some(user => user.id === data.author);

        if (!userExists) {
            throw new Error('User not found');
        }

        const post = {
            id: uuidv4(),
            ...data,
        }

        if (post.published) {
            pubsub.publish('post', {
                post: {
                    mutation: 'CREATED',
                    data: post,
                }
            })
        }

        db.posts.push(post);
        return post;
    },
    createComment(parent, args, { db, pubsub }, info) {
        const userExists = db.users.some(user => user.id === args.data.author);
        if (!userExists) {
            throw new Error('User not found');
        }

        const postExists = db.posts.some(post => post.id === args.data.post);
        if (!postExists) {
            throw new Error('Post not found');
        }

        const comment = {
            id: uuidv4(),
            ...args.data,
        }
        db.comments.push(comment);
        
        pubsub.publish(`comment ${args.data.post}`, {
            comment: {
                mutation: 'CREATED',
                data: comment,
            }
        })

        return comment;
    },
    updateUser(parent, args, { db }, info) {
        const { id, data } = args;
        const user = db.users.find(user => user.id === id);
        if (!user) {
            throw new Error('User not found');
        }

        if (typeof data.email === 'string') {
            const emailTaken = db.users.some(user => user.email === data.email);

            if (emailTaken) {
                throw new Error('You cannot use that email');
            }

            user.email = data.email;
        }

        if (typeof data.name === 'string') {
            user.name = data.name;
        }

        if (typeof data.age !== undefined) {
            user.age = data.age;
        }

        return user;
    },
    updatePost(parent, args, { db, pubsub }, info) {
        const { id, data } = args;
        const post = db.posts.find(post => post.id === id);
        const originalPost = { ...post };
        if (!post) {
            throw new Error('Post not found');
        }

        if (typeof data.title === 'string') {
            post.title = data.title;
        }

        if (typeof data.body === 'string') {
            post.body = data.body;
        }

        if (typeof data.published === 'boolean') {
            post.published = data.published;

            if (originalPost.published && !post.published) {
                pubsub.publish('post', {
                    post: {
                        mutation: 'DELETED',
                        data: originalPost
                    }
                })
            } else if (!originalPost.published && post.published) {
                pubsub.publish('post', {
                    post: {
                        mutation: 'CREATED',
                        data: post
                    }
                })
            }
        } else if (post.published) {
            pubsub.publish('post', {
                post: {
                    mutation: 'UPDATED',
                    data: post
                }
            })
        }

        return post;
    },
    updateComment(parent, args, { db, pubsub }, info) {
        const { id, data } = args;
        const comment = db.comments.find(comment => comment.id === id);
        if (!comment) {
            throw new Error('Comment not found');
        }

        if (typeof data.text === 'string') {
            comment.text = data.text

            pubsub.publish(`comment ${comment.post}`, {
                comment: {
                    mutation: 'UPDATED',
                    data: comment,
                }
            })
        }

        return comment
    },
    async deleteUser(parent, args, { prisma }, info) {
        const userExists = await prisma.exists.User({ id: args.id });
        if (!userExists) {
            throw new Error('User not found');
        }

        const deletedUser = await prisma.mutation.deleteUser({
            where: { id: args.id },
        }, info)
        return deletedUser;
    },
    deletePost(parent, args, { db, pubsub }, info) {
        const postIndex = db.posts.findIndex(post => post.id === args.id);
        if (postIndex === -1) {
            throw new Error('Post not found');
        }

        const [deletedPost] = db.posts.splice(postIndex, 1);
        if (deletedPost.published) {
            pubsub.publish('post', {
                post : {
                    mutation: 'DELETED',
                    data: deletedPost,
                }
            })
        }
        db.comments = db.comments.filter(comment => comment.post !== args.id);
        return deletedPost;
    },
    deleteComment(parent, args, { db, pubsub }, info) {
        const commentIndex = db.comments.findIndex(comment => comment.id === args.id);
        if(commentIndex === -1) {
            throw new Error('Comment not found');
        }

        const [deletedComment] = db.comments.splice(commentIndex, 1);
        pubsub.publish(`comment ${deletedComment.post}`, {
            comment: {
                mutation: 'DELETED',
                data: deletedComment,
            }
        })
        return deletedComment;
    }
};

export default Mutation;