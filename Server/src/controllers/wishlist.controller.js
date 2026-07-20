
import { Wishlist } from "../models/wishlist.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import HttpStatus from "../utils/HttpStatus.js";
import { logActivity } from "../utils/Logger.js";

const addToWishlist = asyncHandler(async (req, res) => {
    
    const { schemeId, notes, reminderDate, folderName } = req.body;
    if (!schemeId) throw new ApiError(HttpStatus.BAD_REQUEST, "Scheme ID is required");

    const userId = req.user?._id || null; 

    const wish = await Wishlist.create({
        userId: userId,
        schemeId,
        notes,
        reminderDate,
        folderName
    });

    if (userId) {
        await logActivity(userId, "ADD_WISHLIST", `Added scheme ${schemeId} to wishlist`);
    }

    res.status(HttpStatus.CREATED).json(new ApiResponse(HttpStatus.CREATED, wish, "Added to wishlist"));
});

const getWishlist = asyncHandler(async (req, res) => {

    const wishlist = await Wishlist.find({ userId: req.user._id }).populate("schemeId");
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, wishlist, "Wishlist fetched"));
});

const removeFromWishlist = asyncHandler(async (req, res) => {

    const { wishlistId } = req.params;
    await Wishlist.findByIdAndDelete(wishlistId);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, {}, "Removed from wishlist"));
});

const toggleWishlist = asyncHandler(async (req, res) => {
    const { schemeId, notes, reminderDate, folderName } = req.body;
    if (!schemeId) throw new ApiError(HttpStatus.BAD_REQUEST, "Scheme ID is required");

    const userId = req.user._id;

    const existingWish = await Wishlist.findOne({ userId, schemeId });

    if (existingWish) {
        await Wishlist.findByIdAndDelete(existingWish._id);
        await logActivity(userId, "REMOVE_WISHLIST", `Removed scheme ${schemeId} from wishlist`);
        return res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, { isWishlisted: false }, "Removed from wishlist"));
    } else {
        const wish = await Wishlist.create({
            userId,
            schemeId,
            notes,
            reminderDate,
            folderName
        });
        await logActivity(userId, "ADD_WISHLIST", `Added scheme ${schemeId} to wishlist`);
        return res.status(HttpStatus.CREATED).json(new ApiResponse(HttpStatus.CREATED, { isWishlisted: true }, "Added to wishlist"));
    }
});

export { 
    addToWishlist, 
    getWishlist, 
    removeFromWishlist,
    toggleWishlist 
};