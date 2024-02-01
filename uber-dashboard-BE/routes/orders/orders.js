import express from "express";
import { createOrder,deleteOrder,getAllOrders,getOrdersById,getOrderByPageLimit, updateOrders } from "../../Controller/orders/order.js";
import { verifyUser } from "../../verifyAuth/verifyToken.js";
const router = express.Router();

router.get("/",verifyUser, getAllOrders)
router.get("/:id", verifyUser, getOrdersById);
router.put("/:id", verifyUser, updateOrders);
router.delete("/:id", verifyUser, deleteOrder);
router.post("/orders", verifyUser, createOrder);
router.get("/orders/all", verifyUser, getOrderByPageLimit);


export default router;