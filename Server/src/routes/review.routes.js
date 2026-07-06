
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

router.route("/add").post(verifyJWT, addReview);
router.route("/:schemeId").get(getApprovedReviews);
router.route("/helpful/:reviewId").patch(verifyJWT, toggleHelpful);

router.route("/admin/pending").get(verifyJWT, verifyAdmin, getPendingReviews);
router.route("/admin/status/:reviewId").patch(verifyJWT, verifyAdmin, updateReviewStatus);

export default router;