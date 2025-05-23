import Subscription from "../models/subscription.model.js";
import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";


export const createSubscription = async (req,res,next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })
        await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id
            },
            headers:{
                'content-type': 'application/json'
            },
            retruies: 0
        })

        res.status(201).json({success: true, data: subscription })
    } catch (error) {
        next(error)
    }
}

export const getAllSubscriptions = async (req,res,next) => {
    try {
        const subscriptions = await Subscription.find()
        res.status(200).json({success: true, data: subscriptions })
    }catch (error) {
        next(error)
    }
}

export const getuserSubscriptions = async (req,res,next) => {
    try {
        if(req.user.id!== req.params.id){
            const error = new Error('You are not authorized to view this user subscriptions')
            error.status = 401
            throw error
        }

        const subscriptions = await Subscription.find({user: req.params.id})

        res.status(200).json({success: true, data: subscriptions })
    } catch (error) {
        next(error)
    }
}

export const getSubscriptionByUser = async (req,res,next) => {
    try {
        const subscription = await Subscription.findById(req.params.id)
        if(!subscription){
            const error = new Error('Subscription not found')
            error.status = 404
            throw error
        }
        res.status(200).json({success: true, data: subscription })
    }catch (error) {
        next(error)
    }
}

export const updateSubscription = async (req,res,next) => {
    try {
        const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!subscription){
            const error = new Error('Subscription not found')
            error.status = 404
            throw error
        }
        res.status(200).json({success: true, message: 'Deleted subscription successfully', data: subscription._id })
    }catch (error) {
        next(error)
    }
}

export const deleteSubscription = async (req,res,next) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id)
        if(!subscription){
            const error = new Error('Subscription not found')
            error.status = 404
            throw error
        }
        res.status(200).json({success: true, data: subscription })
    }catch (error) {
        next(error)
    }
}

export const getUpcomingRenewals = async (req,res,next) => {
    try {
        const subscriptions = await Subscription.find({renewalDate: {$get: new Date()}})
        res.status(200).json({success: true, data: subscriptions })
    }catch (error) {
        next(error)
    }
}

export const cancelSubscription = async (req,res,next) => {
    try {
        const subscription = await Subscription.findByIdAndUpdate(req.params.id, {status: 'cancelled'}, {new: true})
        if(!subscription){
            const error = new Error('Subscription not found')
            error.status = 404
            throw error
        }
        res.status(200).json({success: true, message: 'Cancelled subscription successfully', data: subscription._id })
    }catch (error) {
        next(error)
    }
}