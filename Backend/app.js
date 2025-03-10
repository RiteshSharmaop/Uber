import dotenv from "dotenv"
dotenv.config({
    path: "./.env",
});
import express from "express";
import cors from 'cors';
const app = express();
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credential: true 
}))

connectDB();

app.use(express.json({limit: "32kb"}));
app.use(express.urlencoded({extended: true , limit: "16kb" }));
// app.use(express.static("public"));
app.use(cookieParser());


import userRouter from "./routes/user.routes.js"
import captainRouter from "./routes/captain.routes.js"

app.get("/", (req, res) => {
  res.send("hii");
});

app.use("/api/v1/users" , userRouter);
app.use("/api/v1/captains" , captainRouter);


export default app;
