
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import { initReminderCron } from './services/cron.service.js';

initReminderCron();


//routes import
import userRouter from './routes/user.routes.js'
import categoryRouter from './routes/categories.routes.js'
import schemeRouter from './routes/scheme.routes.js'
import savedSchemeRouter from './routes/savedScheme.routes.js'
import notificationRouter from "./routes/notification.routes.js"
import reviewRouter from "./routes/review.routes.js"
import wishlistRouter from "./routes/wishlist.routes.js"
import supportRouter from "./routes/support.routes.js";



//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/scheme", schemeRouter)
app.use("/api/v1/saved-schemes", savedSchemeRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/support", supportRouter);


export { app }
