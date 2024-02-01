import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    productName: String,
    price: Number,
    productId: String,
    productImage: String, 
  });

 export  const Product = mongoose.model("Product", productSchema);