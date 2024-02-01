import express from "express";
import {
  createUser,
  updateUser,
getAllUser,
getUserById,

} from "../../Controller/User/users.js";



const router =  express.Router();


/////post
router.post("/",  createUser);

router.get("/",getAllUser)
router.get("/:id",getUserById)
router.put("/:id",updateUser)
router.post("/user",createUser)


// ////update
// router.put("/:id", verifyUser,updateUser);

// ///delete
// router.delete("/:id",verifyUser, deleteUser);

// ///get a single user
// router.get("/:id",verifyUser, getUserById);

// ///get All Users
// router.get("/", verifyAdmin,getAllUser);

export default router;