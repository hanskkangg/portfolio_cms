import express from 'express';
import {loginUser, registerUser, adminLogin} from '../controllers/userController.js'

// Create an instance of an Express router
const userRouter = express.Router();


// Route to register a new user
userRouter.post('/register', registerUser)

// Route to log in a user
userRouter.post('/login', loginUser)

// Route for admin login
userRouter.post('/admin', adminLogin)

export default userRouter;