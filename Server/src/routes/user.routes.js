
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { 
        registerUser,
        loginUser, 
        getCurrentUser,
        getAllUser
    } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/all-user").get(verifyJWT, getAllUser)

export default router
