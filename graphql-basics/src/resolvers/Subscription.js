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
    }
}

export default Subscription;