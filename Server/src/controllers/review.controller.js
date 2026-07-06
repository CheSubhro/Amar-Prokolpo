
import { Review } from "../models/review.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import HttpStatus from "../utils/HttpStatus.js";

const addReview = asyncHandler(async (req, res) => {
    
    const { schemeId, rating, comment } = req.body;
    const review = await Review.create({
        userId: req.user._id,
        schemeId,
        rating,
        comment
    });
    res.status(HttpStatus.CREATED).json(new ApiResponse(HttpStatus.CREATED, review, "Review submitted for approval"));
});

const getApprovedReviews = asyncHandler(async (req, res) => {
    const { schemeId } = req.params;
    const reviews = await Review.find({ schemeId, status: 'Approved' }).populate("userId", "fullName");
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, reviews, "Reviews fetched"));
});

const toggleHelpful = asyncHandler(async (req, res) => {
    const { reviewId } = req.params;
    const review = await Review.findByIdAndUpdate(reviewId, { $inc: { helpfulCount: 1 } }, { new: true });
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, review, "Helpful count updated"));
});

export { addReview, getApprovedReviews, toggleHelpful };