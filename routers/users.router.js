import express from 'express';
import { getAllUsers, createNewUser, deleteUser, getUser, updateUser } from '../controllers/users.controller.js';
export const userRouter = express.Router();



userRouter.route('/')
    .get(getAllUsers)
    .post(createNewUser);

userRouter.route('/:uid')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);
