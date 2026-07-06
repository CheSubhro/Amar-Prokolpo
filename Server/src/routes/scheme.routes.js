

import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js"; 
import { 
    createScheme,
    getAllSchemes,
    getSchemeBySlug,
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

router.route("/all").get(getAllSchemes);

router.route("/:slug").get(getSchemeBySlug);