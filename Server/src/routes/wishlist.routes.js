
import { Router } from "express";
import { 
    addToWishlist, 
    getWishlist, 
    removeFromWishlist } from "../controllers/wishlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT); 

router.route("/").post(addToWishlist).get(getWishlist);
router.route("/:wishlistId").delete(removeFromWishlist);

export default router;