import express from "express";
import { createMenuItem ,deleteRestaurentMenu,getAllRestaurentMenu,getRestaurentMenuById,updateRestaurant,searchBychar} from "../../Controller/restautrentsMenu/restaurentsMenu.js";
const router = express.Router();

router.get("/",getAllRestaurentMenu)
router.get("/searchByChar",searchBychar)
router.get("/:id",getRestaurentMenuById)

router.delete("/:id",deleteRestaurentMenu)
router.put("/:id",updateRestaurant)


router.post("/restuarentMenu",createMenuItem)

export default router;