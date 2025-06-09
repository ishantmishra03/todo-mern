import express from 'express';
import protect from "../middlewares/protect.middleware.js";
import { signin, signout, signup, isAuthenticated } from '../controllers/auth.controller.js';
import upload from '../middlewares/multer.middleware.js'
const authRouter = express.Router();

//API EndPoints for Authentication
authRouter.post('/register', upload.single('image'), signup);
authRouter.post('/login', signin);
authRouter.post('/logout', signout);
authRouter.get('/', protect, isAuthenticated);

export default authRouter;