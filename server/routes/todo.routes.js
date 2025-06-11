import express from 'express';
import protect from "../middlewares/protect.middleware.js";
import { addTodo, getTodo, toggleIsCompleted, deleteTodo, getOneTodo, changePriority } from '../controllers/todo.controller.js';
const todoRouter = express.Router();

//API EndPoints for Authentication
todoRouter.post('/add', protect, addTodo);
todoRouter.get('/get', protect, getTodo);
todoRouter.post('/toggle-isCompleted', protect, toggleIsCompleted);
todoRouter.post('/delete', protect, deleteTodo);
todoRouter.post('/getOne', protect, getOneTodo);
todoRouter.post('/change-priority', protect, changePriority);

export default todoRouter;