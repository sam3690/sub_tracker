import { request } from "express";
import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        // const decision = await aj.protect(req)
         // Create a request details object with all necessary informations         

        const decision = await aj.protect(req, { requested: 1 })
        // console.log('Arcjet decision:', decision.results);

        if (decision.isDenied()){
            if (decision.reason.isBot()) return res.status(403).json({ error: 'Bot detected' });
            if (decision.reason.isRateLimit()) return res.status(429).json({ error: 'Rate limit exceeded' });

            return res.status(403).json({ error: 'Access denied' });

        }
        next()
    } catch (error) {
        console.error('Error in arcjetMiddleware: ', error);
        next(error)
    }
};

export default arcjetMiddleware;