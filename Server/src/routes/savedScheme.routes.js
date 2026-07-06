
import { Router } from "express";
import { toggleSaveScheme, getSavedSchemes } from "../controllers/savedScheme.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"; 

const router = Router();

router.use(verifyJWT); 

router.route("/toggle").post(toggleSaveScheme);
router.route("/list").get(getSavedSchemes);

export default router;