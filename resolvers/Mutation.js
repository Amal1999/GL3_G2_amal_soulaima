import {v4 as uuidv4} from 'uuid';

export const Mutation = {
    addTodo: (_, { addTodoInput }, { db,pubsub }, info) => {
        const newUser= db.users.find((e)=> e.id == addTodoInput.userId)
        if(!newUser)
        throw new Error("user doesn't exist")
        else{
            const newTodo = {id: uuidv4(),...addTodoInput,user:newUser.id};
            db.todos.push(newTodo);
            pubsub.publish('newTodo', {newTodo})
            return newTodo;    
        }
    },
    updateTodo:(_, { id,updateTodoInput }, { db,pubsub }, info) => {
        if(updateTodoInput.userId)
        {
            const newUser= db.users.find((e)=> e.id == updateTodoInput.userId)
                var todo= db.todos.find((e)=> e.id == id)
                if(!todo)
                throw new Error("todo doesn't exist")
                if(!newUser)
                todo = {...todo,...updateTodoInput};
                else
                todo = {...todo,...updateTodoInput,user:newUser.id};
                db.todos.forEach((item, index)=>{
                    if(item.id === id) {
                        db.todos[index] = todo
                    }
                })
               pubsub.publish('updateTodo', {todo})
                return todo;        
            }    
        
         
    },
    deleteTodo:(_, { id}, { db,pubsub }, info) => {
        
                var todo= db.todos.find((e)=> e.id == id)
                if(!todo)
                throw new Error("todo doesn't exist")
                let index = db.todos.findIndex((todo) => todo.id == id);
                db.todos.splice(index,1);
                pubsub.publish('deleteTodo', "deleted")
                return "deleted";        
    }
    
}