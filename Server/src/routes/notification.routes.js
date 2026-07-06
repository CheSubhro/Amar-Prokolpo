
import { Router } from "express";
import { updateDeviceToken } from "../controllers/notification.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/register-token").post(verifyJWT, updateDeviceToken);

export default router;