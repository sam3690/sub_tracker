import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req)

        if (decision.isDenied()){
            if (decision.reason.isRateLimit()) return res.status(429).json({ error: 'Rate limit exceeded' });
            // if (decision.reason.isBot()) return res.status(403).json({ error: 'Bot detected' });

            return res.status(403).json({ error: 'Access denied' });
        }
        next()
    } catch (error) {
        console.error('Error in arcjetMiddleware:', error);
        // res.status(500).json({ message: 'Internal server error' });
        next(error)
    }
};

export default arcjetMiddleware;