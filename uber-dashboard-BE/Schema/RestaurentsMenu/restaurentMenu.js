
import mongoose from "mongoose";
const RestaurentMenu = new mongoose.Schema({

    id:{
        type:String,
        required:true,   
        unique:true,
    },
    name:{
        type:String,
        required:true,   
        unique:true,
    },
    price:{
        type:Number,
        required:true,
    },
   
    quantity:{
        type:Number,
        default:1,
        required:true
    }
}
)

export default  mongoose.model("RestaurentMenu",RestaurentMenu)
