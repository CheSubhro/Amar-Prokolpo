
import { Router } from "express";
import { 
    createSupportTicket, 
    getAllTickets, 
    respondToTicket } from "../controllers/support.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { validateSupport } from "../middlewares/support.validator.js";

const router = Router();

router.route("/create").post(validateSupport,createSupportTicket); 
router.route("/all").get(verifyJWT, verifyAdmin, getAllTickets); 
router.route("/respond/:ticketId").patch(verifyJWT, verifyAdmin, respondToTicket); 

export default router;