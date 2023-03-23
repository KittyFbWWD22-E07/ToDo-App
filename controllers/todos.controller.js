import { db } from "../server.js";
import createError from "http-errors";



/* -------------------------------------------------------------------------- */
/*                                Retrieve All Todos                          */
/* -------------------------------------------------------------------------- */
export const getAllTodos = async (req, res, next) => {
    try {
        if (db.data.todos.length === 0) {
            return res.json({ message: "Sorry, there are no listed tasks at this time! 😞" })
        }
        res
            .status(200)
            .json(db.data.todos.length === 1 ? { message: `There is only ${db.data.todos.length} task logged 🛠️`, todos: db.data.todos } : { message: `There are ${db.data.todos.length} tasks logged 🛠️`, todos: db.data.todos });

    } catch (error) {
        next(error);
    }
};

/* -------------------------------------------------------------------------- */
/*                               Create New Todo                              */
/* -------------------------------------------------------------------------- */
export const createNewTodo = async (req, res, next) => {
    try {
        const newTodo = {
            id: db.data.todos.slice(-1)[0]?.id + 1 || 1,
            ...req.body,
            date: new Date().toLocaleDateString(),
        };
        //check required fields
        if (!newTodo.authorId || !newTodo.title || !newTodo.desc) {
            return next(createError(400, "Required information is missing! 🚨"));
        }

        //add newUser to array of users in db
        db.data.todos.push(newTodo);
        await db.write();
        //remove password from newtodo for security
        delete newTodo.password;
        res.status(200).json({
            message: "Successfully logged! ✅",
            todo: newTodo,
        });
    } catch (err) {
        next(err);
    }
};


/* -------------------------------------------------------------------------- */
/*                               Retrieve A Todo by ID                             */
/* -------------------------------------------------------------------------- */
export const getTodo = async (req, res, next) => {
    try {
        const todoid = parseInt(req.params.tdid);

        //check if todoid is valid
        if (isNaN(todoid)) return next(createError(400, "The id given in the url is not valid. 🚨"))

        //find todo with given tdid
        const todo = db.data.todos.find((td) => td.id == todoid);
        if (!todo) return next(createError(404, "There is no task with the given id. 🚨"))

        res.status(200).json({ message: "Task retrieved! ✅", todo: todo });
    } catch (err) {
        next(err);
    }
};

/* -------------------------------------------------------------------------- */
/*                        Update User Information by ID                       */
/* -------------------------------------------------------------------------- */
export const updateTodo = async (req, res, next) => {
    try {
        const todoid = parseInt(req.params.tdid);

        //check if todoid is valid
        if (isNaN(todoid)) return next(createError(400, "The id given in the url is not valid. 🚨"))

        //find todo with given tdid
        const todoIndex = db.data.todos.findIndex((td) => td.id === todoid);
        if (todoIndex === -1) return next(createError(404, "There is no task with given id. 🚨"))

        //update todo
        db.data.todos[todoIndex] = { ...db.data.todos[todoIndex], ...req.body };
        await db.write();
        res.status(200).json({
            message: "Task successfully updated! ✅",
            todo: db.data.todos[todoIndex],
        });
    } catch (err) {
        next(err);
    }
};

/* -------------------------------------------------------------------------- */
/*                              Delete Todo by ID                             */
/* -------------------------------------------------------------------------- */
export const deleteTodo = async (req, res, next) => {
    try {
        const todoid = parseInt(req.params.tdid);

        //check if todoid is valid
        if (isNaN(todoid)) return next(createError(400, "The id given in the url is not valid. 🚨"))

        //find todo with given tdid
        const todoIndex = db.data.todos.findIndex((td) => td.id === todoid);
        if (todoIndex === -1) return next(createError(404, "There is no task with the given id. 🚨"))

        //delete todo from array of todos
        const deletedTodo = db.data.todos[todoIndex].title;
        const todoAuthor = db.data.todos[todoIndex].username;
        db.data.todos.splice(todoIndex, 1);
        await db.write();
        res.status(200).json({ message: `Task: ${deletedTodo}, created by ${todoAuthor} has been deleted! ✅` });
    } catch (err) {
        next(err);
    }
};