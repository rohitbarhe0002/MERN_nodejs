
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import userRoute from './routes/user/user.js';
import authRoute from './routes/auth/auth.js';
import restaurentRoute from './routes/restaurentsMenu/restaurentsMenu.js'
import ordersRoute from './routes/orders/orders.js'
import connectToDatabase from "./Db/connection.js";
import productRoute from './routes/product/product.js'
const app = express();
const PORT = 8000;


connectToDatabase();
const router = express.Router();

//midddleware
app.use(express.json());
app.use(cookieParser());
app.use(cors())



app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/restaurent",restaurentRoute)
app.use("/api/orders",ordersRoute)
app.use("/api/products",productRoute)



app.use((req,res,next,err)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message   || "something went wrong"
    if(errorStatus||errorMessage) {
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
}
else{
    next();
}
})
app.listen(8000,()=>{
    console.log("succesfully connected to backend ");
})