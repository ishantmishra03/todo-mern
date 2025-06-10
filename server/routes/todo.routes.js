import express from 'express';
import protect from "../middlewares/protect.middleware.js";
import { addTodo } from '../controllers/todo.controller.js';
const todoRouter = express.Router();

//API EndPoints for Authentication
todoRouter.post('/add', protect, addTodo);

export default todoRouter;