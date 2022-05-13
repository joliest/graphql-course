const Subscription = {
    count: {
        /** what runs when something subscribes */
        subscribe(parent, args, { pubsub }, info) {
            // setup subscription
            let count = 0;

            setInterval(() => {
                count++
                // publishes the data
                // trigger name should match with a channel name
                pubsub.publish('count', {
                    count,
                })

            }, 1000)

            // assign a channel name (like a chat name)
            // asyncIterator sets the channel
            return pubsub.asyncIterator('count');
        }
    },
    comment: {
        subscribe(parent, { postId }, { pubsub, db }, info) {
            const post = db.posts.find((post) => post.id === postId && post.published);
            if(!post) {
                throw new Error('Post not found');
            }

            return pubsub.asyncIterator(`comment ${postId}`);
        }
    },
    post: {
        subscribe(parent, args, { pubsub, db }, info) {
            return pubsub.asyncIterator('post');
        }
    }
}

export default Subscription;