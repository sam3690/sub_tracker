import express from "express";

import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";


const app = express();

app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(arcjetMiddleware)

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)
app.use('/api/v1/workflow', workflowRouter)

app.use(errorMiddleware)

app.get('/', (req,res) => {
    res.send('Welcome to Subscription tracker API!')
});

app.listen(PORT, async () => {
    console.log(`Subscription Tracker API running at port http://localhost:${PORT}`);
    await connectToDatabase()
});

export default app