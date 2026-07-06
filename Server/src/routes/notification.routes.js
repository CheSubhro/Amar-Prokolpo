
import { Router } from "express";
import { 
    updateDeviceToken, 
    getNotifications, 
    markAsRead 
} from "../controllers/notification.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/register-token").post(updateDeviceToken);
router.route("/list").get(getNotifications);
router.route("/read/:notificationId").patch(markAsRead);

export default router;