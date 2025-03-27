import dotenv from "dotenv"
dotenv.config({
    path: "./.env",
});
import express from "express";
import cors from 'cors';
const app = express();
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";


connectDB();



app.use(cors({
    origin: process.env.CORS_ORIGIN,
    // credential: true 
}))
// app.use(cors());
app.use(express.json({limit: "32kb"}));
app.use(express.urlencoded({extended: true , limit: "16kb" }));
// app.use(express.static("public"));
app.use(cookieParser());


import userRouter from "./routes/user.routes.js"
import captainRouter from "./routes/captain.routes.js"

app.get("/", (req, res) => {
  res.send("hii");
});

app.use("/users" , userRouter);
app.use("/captains" , captainRouter);


export default app;
