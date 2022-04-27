import {db} from "../data/db.js";

export const User = {
    todos : ( user ) => {
        var todos = [];
        db.todos.forEach((e)=>{
            if(e.user == user.id)
            todos.push(e);
        })
        return todos;
    }
}
