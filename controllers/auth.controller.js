import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import user from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js"


export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession()
        session.startTransaction()

        try {
            const {name, email, password } = req.body
            const existingUser = await user.findOne({email})

            if(existingUser) {
                const error = new Error('User already exists')
                error.status = 409
                throw error
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = await user.create([{name, email, password: hashedPassword}], {session})

            const token = jwt.sign({userId: newUser[0]._id }, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

            await session.commitTransaction()
            session.endSession()

            res.status(201).json({
                success: true,
                message: "User created successfully",
                data:{
                    token,
                    user: newUser[0]
                }
            })


        } catch (error) {
            await session.abortTransaction()            
            session.endSession()
            next(error)
        }
    
}

// export const signUp = async (req, res, next) => console.log('hello world');


export const signIn = async (req, res, next) => {
    try {
        const {email, password } = req.body

        const checkUser = await user.findOne({email})
        if(!checkUser) {
            const error = new Error('User not found')
            error.status = 404
            throw error
        }

        const isPasswordValid = await bcrypt.compare(password, checkUser.password)

        if(!isPasswordValid){
            const error = new Error('Invalid credentials')
            error.status = 401
            throw error
        }

        const token = jwt.sign({userId: checkUser._id }, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

        res.status(200).json({
            success: true,
            message: 'user signed in successfully',
            data: {
                token,
                checkUser
            }
        })
    } catch (error) {
        next(error)
    }
}

export const signOut = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: 'user signed out successfully'
        })
    } catch (error) {
        next(error)
    }
}