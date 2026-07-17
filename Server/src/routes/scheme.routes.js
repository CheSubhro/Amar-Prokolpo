

import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js"; 
import { 
    createScheme,
    getAllSchemes,
    getSchemeBySlug,
    updateScheme,
    deleteScheme,
    getTopViewedSchemes,
    getSchemesByCategory
} from "../controllers/scheme.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin, verifyAdminOrModerator } from "../middlewares/admin.middleware.js";
import { validateScheme } from "../middlewares/scheme.validator.js";


const router = Router()

router.route("/create").post(
    verifyJWT,
    verifyAdmin,
    verifyAdminOrModerator,
    upload.single("image"), 
    validateScheme,        
    createScheme
);

router.get("/top-viewed", getTopViewedSchemes);

router.route("/all").get(getAllSchemes);

router.route("/:slug").get(getSchemeBySlug);

router.route("/category/:categoryId").get(getSchemesByCategory);

router.route("/update/:id").patch(
    verifyJWT,
    verifyAdminOrModerator,
    upload.single("image"),
    validateScheme, 
    updateScheme
);

router.route("/delete/:id").delete(
    verifyJWT,
    verifyAdminOrModerator,
    deleteScheme
);


export default router