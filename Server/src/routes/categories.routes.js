

import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { 
        createCategory,
        getAllCategories,
        updateCategory,
        deleteCategory 
    } from "../controllers/categories.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin, verifyAdminOrModerator } from "../middlewares/admin.middleware.js";


const router = Router()

// Public Route
router.route("/create").post(
    verifyJWT,
    verifyAdminOrModerator,
    upload.fields([
        {
            name: "icon",
            maxCount: 1
        },
        {
            name: "image",
            maxCount: 1
        }
    ]),
    createCategory
)

router.route("/all").get(verifyJWT,verifyAdminOrModerator,getAllCategories);

router.route("/update/:id").patch(
    verifyJWT,
    verifyAdminOrModerator,
    upload.fields([
        { name: "icon", maxCount: 1 },
        { name: "image", maxCount: 1 }
    ]),
    updateCategory
);

router.route("/delete/:id").delete(verifyJWT,verifyAdmin,deleteCategory);


export default router
