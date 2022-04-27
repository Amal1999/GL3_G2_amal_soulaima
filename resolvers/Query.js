import { db } from "../data/db.js";

export const Query = {
    getAllTodos: () => 
    {
        return db.todos;
    },
    getTodoById:(_,{id})=>
    {
        return db.todos.find((e) => e.id == id);
    },
    getUserById:(_,{id})=>
    {
        return db.users.find((e) => e.id == id);
    }
}
