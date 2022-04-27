import {v4 as uuidv4} from 'uuid';

export const Mutation = {
    addTodo: (_, { addTodoInput }, { db,pubsub }, info) => {
        const newUser= db.users.find((e)=> e.id == addTodoInput.userId)
        if(!newUser)
        throw new Error("user doesn't exist")
        else{
            const newTodo = {id: uuidv4(),...addTodoInput,user:newUser.id};
            db.todos.push(newTodo);
            pubsub.publish('operation', {todo})
            return newTodo;    
        }
    },
    updateTodo:(_, { id,updateTodoInput }, { db,pubsub }, info) => {
        
                var todo= db.todos.find((e)=> e.id == id)
                if(todo==null)
                {
                    throw new Error("todo doesn't exist")}
                if(updateTodoInput.userId!=null)
                {
                const newUser= db.users.find((e)=> e.id == updateTodoInput.userId)
                if(!newUser)
                {
                    todo = {...todo,...updateTodoInput,user:todo.userId};
                }
                else
                todo = {...todo,...updateTodoInput,user:newUser.id};
            }
                db.todos.forEach((item, index)=>{
                    if(item.id === id) {
                        db.todos[index] = todo
                    }
                })
               pubsub.publish('operation', {todo})
                return todo;        
            

    },
    deleteTodo:(_, { id}, { db,pubsub }, info) => {
        
                var todo= db.todos.find((e)=> e.id == id)
                if(!todo)
                throw new Error("todo doesn't exist")
                let index = db.todos.findIndex((todo) => todo.id == id);
                db.todos.splice(index,1);
                const obj ={todo : db.todos[index] , operation:"delete"}
                console.log(obj);
                pubsub.publish('operation',  obj )
                return "deleted";        
    }
    
}