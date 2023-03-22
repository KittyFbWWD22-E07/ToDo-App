import express from 'express';
import { getAllTodos, createNewTodo, deleteTodo, getTodo, updateTodo } from '../controllers/todos.controller.js';
export const todoRouter = express.Router();



todoRouter.route('/')
    .get(getAllTodos)
    .post(createNewTodo);

todoRouter.route('/:tdid')
    .get(getTodo)
    .put(updateTodo)
    .delete(deleteTodo);