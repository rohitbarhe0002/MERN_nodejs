

import mongoose from "mongoose";
const {Schema} = mongoose;
const OrdersSchema = new mongoose.Schema({
    orderID:{
        type:String,
        required:true,   
        unique:true,
    },
    price:{
        type:Number,
        required:true,   
    },
    deliveryAddress:{
        type:String,
        required:true,
    },
   
    status:{
        type:String,
        required:true,   
        
    }
}
)

export default  mongoose.model("Orders",OrdersSchema)

