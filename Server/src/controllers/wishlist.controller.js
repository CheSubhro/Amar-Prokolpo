
import { Wishlist } from "../models/wishlist.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import HttpStatus from "../utils/HttpStatus.js";
import { logActivity } from "../utils/Logger.js";

const addToWishlist = asyncHandler(async (req, res) => {

    const { schemeId, notes, reminderDate, folderName } = req.body;

    if (!schemeId) throw new ApiError(HttpStatus.BAD_REQUEST, "Scheme ID is required");

    const wish = await Wishlist.create({
        userId: req.user._id,
        schemeId,
        notes,
        reminderDate,
        folderName
    });

    await logActivity(req.user._id, "ADD_WISHLIST", `Added scheme ${schemeId} to wishlist`);

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

export { 
    addToWishlist, 
    getWishlist, 
    removeFromWishlist 
};