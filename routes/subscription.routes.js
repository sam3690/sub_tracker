import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { cancelSubscription, createSubscription, deleteSubscription, getAllSubscriptions, getSubscriptionByUser, getUpcomingRenewals, getuserSubscriptions, updateSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router()

subscriptionRouter.get('/',getAllSubscriptions)
subscriptionRouter.get('/:id',authorize, getSubscriptionByUser)
subscriptionRouter.post('/', authorize,createSubscription)
subscriptionRouter.put('/:id', authorize,updateSubscription)
subscriptionRouter.delete('/:id',authorize, deleteSubscription)
subscriptionRouter.get('/user/:id',authorize, getuserSubscriptions)
subscriptionRouter.put('/:id/cancel',authorize, cancelSubscription)
subscriptionRouter.get('/upcoming_renewals',authorize, getUpcomingRenewals)


export default subscriptionRouter