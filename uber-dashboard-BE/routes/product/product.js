import express from "express";
import { addProduct, deleteProduct, getAllProduct, getProductById, getProductBySearch, updateProduct } from "../../Controller/product/product.js";
import { handleFileUpload } from "../../middlewares/fileUploadMidlleware.js";
const router = express.Router();

router.post("/",handleFileUpload, addProduct)
router.get("/", getAllProduct)
router.get("/:productId", getProductById)
router.get("/search/:searchTerm", getProductBySearch)
router.delete("/:productId", deleteProduct)
router.put("/:productId", handleFileUpload,updateProduct)

export default router;