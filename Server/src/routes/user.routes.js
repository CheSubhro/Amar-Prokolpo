
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { 
        registerUser,
        loginUser, 
        getCurrentUser,
        getAllUser,
        updateUser,
        changeCurrentPassword,
        deleteUser,
        logoutUser ,
        refreshAccessToken
    } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin, verifyAdminOrModerator } from "../middlewares/admin.middleware.js";


const router = Router()

// Public Route
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
router.route("/refresh-token").post(refreshAccessToken);

// Protected routes (Login required)
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/logout").delete(verifyJWT, logoutUser)
router.route("/change-password").patch(verifyJWT, changeCurrentPassword);

// Admin-only routes
router.route("/all-user").get(verifyJWT,verifyAdminOrModerator,getAllUser);
router.route("/delete-user/:id").delete(verifyJWT, verifyAdmin,deleteUser)

router.route("/update-user/:id").patch(
    verifyJWT,
    verifyAdmin,
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    updateUser
);





 

export default router
