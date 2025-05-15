import { Router } from "express";

const userRouter = Router()

userRouter.get('/', (req,res)=> res.send({tile : 'GET all users'}))
userRouter.get('/:id', (req,res)=> res.send({tile : 'GET all users'}))
userRouter.post('/', (req,res)=> res.send({tile : 'CREATE a new user'}))
userRouter.put('/:id', (req,res)=> res.send({tile : 'UPDATE user'}))
userRouter.delete('/:id', (req,res)=> res.send({tile : 'DELET a user'}))


export default userRouter
