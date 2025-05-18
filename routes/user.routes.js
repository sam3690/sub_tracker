import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getUser, getUsers } from "../controllers/user.controller.js";
import user from "../models/user.model.js";

const userRouter = Router()

userRouter.get('/',  getUsers)
userRouter.get('/:id', authorize, getUser)
userRouter.post('/', (req,res)=> res.send({tile : 'CREATE a new user'}))
userRouter.put('/:id', (req,res)=> res.send({tile : 'UPDATE user'}))
userRouter.delete('/:id', (req,res)=> res.send({tile : 'DELET a user'}))

// test route for errors
userRouter.get('/test', async (req, res) => {
  try {
    const testDoc = await user.findOne(); // Simple query
    res.json({ success: true, data: testDoc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default userRouter
