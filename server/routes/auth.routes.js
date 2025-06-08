import express from 'express';
import { signin, signout, signup } from '../controllers/auth.controller.js';
import upload from '../middlewares/multer.middleware.js'
const authRouter = express.Router();

//API EndPoints for Authentication
authRouter.post('/register', upload.single('image'), signup);
authRouter.post('/login', signin);
authRouter.post('/logout', signout);

export default authRouter;