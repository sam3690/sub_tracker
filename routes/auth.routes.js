import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";


const authRouter = Router();

authRouter.post('/sign_up', signUp)
authRouter.post('/sign_in', signIn)
authRouter.post('/sign_out', signOut)

export default authRouter
