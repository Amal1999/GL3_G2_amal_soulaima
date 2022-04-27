export const Subscription = {
   /* newTodo: {
        subscribe(parent, args, { pubsub }, info) {
            return pubsub.asyncIterator('newTodo');
        }
    },
    updateTodo: {
        subscribe(parent, args, { pubsub }, info) {
            return pubsub.asyncIterator('updateTodo');
        }
    },
    deleteTodo: {
        subscribe(parent, args, { pubsub }, info) {
            return pubsub.asyncIterator('deleteTodo');
        }
    },*/
    operation : {
        subscribe(parent, args, { pubsub }, info) {
            return pubsub.asyncIterator("operation");
        }
    },
    
}
