
import { Router } from "express";
import { 
    addToWishlist, 
    getWishlist, 
    removeFromWishlist,
    toggleWishlist 
} from "../controllers/wishlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT,addToWishlist);

router.route("/").get(verifyJWT, getWishlist);
router.route("/:wishlistId").delete(verifyJWT, removeFromWishlist);
router.route("/toggle").post(verifyJWT, toggleWishlist);

export default router;