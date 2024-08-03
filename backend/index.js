import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "mongoose";
import connectDB from "./utils/db.js";
dotenv.config();

import authRouter from "./controller/user.controller.js";

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
// const corsOptions = {
//     origin:'http//localhost:5173',
//     Credential: true
// }
// app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;
console.log(process.env.MONGO_URL, "port")

app.use('/api/v1/auth', authRouter)
// app.use('/api/v1/job', jobRouter)

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Backend Status</title>
</head>
<body>
    <h1>Backend is working!</h1>
</body>
</html>
`)
})

app.listen(PORT,()=>{
 connectDB();
    console.log(`server running at port ${PORT}`);
})