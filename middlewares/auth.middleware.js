import jwt from "jsonwebtoken"
import user from "../models/user.model.js"
import { JWT_SECRET } from "../config/env.js"

const authorize = async (req,res,next) =>{
    try {
        let token

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
        if(!token) return res.status(401).json({message: 'Unauthorized'})

        const decoded = jwt.verify(token, JWT_SECRET)

        const chkUser = await user.findById(decoded.userId)

        if(!chkUser) return res.status(401).json({message: 'Unauthorized'})

        req.user = chkUser

        next()

    } catch (error) {
        res.status(401).json({message: 'Unauthorized', error: error.message})
    }
}

export default authorize