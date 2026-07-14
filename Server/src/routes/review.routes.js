
import { Router } from "express";
import { 
    addReview, 
    getApprovedReviews, 
    toggleHelpful, 
    updateReviewStatus, 
    getPendingReviews } from "../controllers/review.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin, verifyAdminOrModerator } from "../middlewares/admin.middleware.js";


const router = Router();

router.route("/admin/pending").get(verifyJWT, verifyAdmin, getPendingReviews);
router.route("/admin/status/:reviewId").patch(verifyJWT, verifyAdmin, updateReviewStatus);

router.route("/add").post(verifyJWT, addReview);
router.route("/helpful/:reviewId").patch(verifyJWT, toggleHelpful);
router.route("/:schemeId").get(getApprovedReviews);



export default router;