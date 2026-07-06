
import { Router } from "express";
import { addReview, getApprovedReviews, toggleHelpful } from "../controllers/review.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add").post(verifyJWT, addReview);
router.route("/:schemeId").get(getApprovedReviews);
router.route("/helpful/:reviewId").patch(verifyJWT, toggleHelpful);

export default router;