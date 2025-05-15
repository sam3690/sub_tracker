import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign_up', () => res.send({title : 'Sign Up'}))
authRouter.post('/sign_in', () => res.send({title : 'Sign In'}))
authRouter.post('/sign_out', () => res.send({title : 'Sign Out'}))

export default authRouter
