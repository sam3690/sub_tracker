import user from "../models/user.model.js";

export const getUsers = async (req,res,next)=>{
    try {
        const users = await user.find().select('-password')

        res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req,res,next)=>{
    try {
        const getUser = await user.findById(req.params.id).select('-password')

        if(!getUser){
            consterror = new Error('User not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            success: true,
            data: getUser
        })
    } catch (error) {
        next(error)
    }
}