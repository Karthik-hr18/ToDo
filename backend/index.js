import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import route from "./routes/toDoRote.js";
import bodyParser from "body-parser";
dotenv.config();

const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


const PORT=process.env.PORT || 7000;
const MONGO_URL=process.env.MONGO_URL;

mongoose.connect(MONGO_URL).then(()=>{
    console.log("DB connected successfully");
    app.listen(PORT,()=>{
        console.log(`app is listening in PORT:${PORT}`);
    });
})
.catch((error)=>console.log(error));

 app.use("/api",route)