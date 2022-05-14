import uuidv4 from "uuid/v4";

const Mutation = {
    createUser(parent, args, { db }, info) {
        const emailTaken = db.users.some(user => user.email === args.data.email);
        if (emailTaken) {
            throw new Error('Email taken');
        }

        const user = {
            id: uuidv4(),
            ...args.data,
        };

        db.users.push(user);
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
        
        pubsub.publish(`comment ${args.data.post}`, { comment })

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
    updateComment(parent, args, { db }, info) {
        const { id, data } = args;
        const comment = db.comments.find(comment => comment.id === id);
        if (!comment) {
            throw new Error('Comment not found');
        }

        if (typeof data.text === 'string') {
            comment.text = data.text
        }

        return comment
    },
    deleteUser(parent, args, { db }, info) {
        const userIndex = db.users.findIndex(user => user.id === args.id);
        if (userIndex === -1) {
            throw new Error('User not found');
        }

        const deletedUsers = db.users.splice(userIndex, 1);

        db.posts = posts.filter(post => {
            const match = post.author === args.id;
            if (match) {
                db.comments = db.comments.filter(comment => comment.post !== post.id);
            }

            return !match;
        });

        db.comments = db.comments.filter(comment => comment.author !== args.id);
        return deletedUsers[0];
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
    deleteComment(parent, args, { db }, info) {
        const commentIndex = db.comments.findIndex(comment => comment.id === args.id);
        if(commentIndex === -1) {
            throw new Error('Comment not found');
        }

        const deletedComments = db.comments.splice(commentIndex, 1);
        return deletedComments[0];
    }
};

export default Mutation;