import {v4 as uuidv4} from 'uuid';

export const Mutation = {
    addTodo: (_, { addTodoInput }, { db }, info) => {
        const newUser= db.users.find((e)=> e.id == addTodoInput.userId)
        if(!newUser)
        throw new Error("user doesn't exist")
        else{
            const newTodo = {id: uuidv4(),...addTodoInput,user:newUser.id};
            db.todos.push(newTodo);
            return newTodo;    
        }
    },
    updateTodo:(_, { id,updateTodoInput }, { db }, info) => {
        if(updateTodoInput.userId)
        {
            const newUser= db.users.find((e)=> e.id == updateTodoInput.userId)
            if(!newUser)
            throw new Error("user doesn't exist")
            else
            {
                var todo= db.todos.find((e)=> e.id == id)
                if(!todo)
                throw new Error("todo doesn't exist")
                todo = {...todo,...updateTodoInput,user:newUser.id};
                db.todos.forEach((item, index)=>{
                    if(item.id ==id) item = todo
                })
                return todo;        
            }    
        }
         
    },
    deleteTodo:(_, { id}, { db }, info) => {
        
                var todo= db.todos.find((e)=> e.id == id)
                if(!todo)
                throw new Error("todo doesn't exist")
                db.todos.splice(db.todos.findIndex((e)=> e.id == id,1))
                return "deleted";        
    }
}