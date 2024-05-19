import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({extended: true,limit: "500mb"}))
app.use(express.urlencoded({extended: true, limit: "100kb"}))
app.use(cookieParser())

import userRouter from "./routes/user.route.js";

app.use("/api/user", userRouter);

import eventrouter from "./routes/event.route.js";
app.use("/api/event", eventrouter);

import mediarouter from "./routes/media.route.js";
app.use("/api/media", mediarouter);

import guestrouter from "./routes/guest.route.js";
app.use("/api/guest", guestrouter);

import subeventrouter from "./routes/subevent.route.js";
app.use("/api/subevent", subeventrouter);

import generalrouter from "./routes/general.route.js";
app.use("/api/general", generalrouter);

export {app}