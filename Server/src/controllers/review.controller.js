
import { Review } from "../models/review.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"; 
import { logActivity } from "../utils/Logger.js"; 
import HttpStatus from "../utils/HttpStatus.js";

const addReview = asyncHandler(async (req, res) => {

    const { schemeId, rating, comment } = req.body;

    if (!schemeId || !rating || !comment) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "All fields (schemeId, rating, comment) are required");
    }

    const review = await Review.create({
        userId: req.user._id,
        schemeId,
        rating,
        comment
    });

    if (!review) throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create review");

    await logActivity(req.user._id, "ADD_REVIEW", `User added a review for scheme ${schemeId}`);

    res.status(HttpStatus.CREATED).json(new ApiResponse(HttpStatus.CREATED, review, "Review submitted for approval"));
});

const getApprovedReviews = asyncHandler(async (req, res) => {

    const { schemeId } = req.params;
    
    if (!schemeId) throw new ApiError(HttpStatus.BAD_REQUEST, "Scheme ID is required");

    const reviews = await Review.find({ schemeId, status: 'Approved' })
        .populate("userId", "fullName") 
        .sort({ createdAt: -1 });

    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, reviews, "Reviews fetched"));
});

const getAllApprovedReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ status: 'Approved' })
        .populate("userId", "fullName")
        .populate("schemeId", "title") 
        .sort({ createdAt: -1 })
        .limit(5); 

    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, reviews, "All approved reviews fetched"));
});

const toggleHelpful = asyncHandler(async (req, res) => {

    const { reviewId } = req.params;
    
    if (!reviewId) throw new ApiError(HttpStatus.BAD_REQUEST, "Review ID is required");

    const review = await Review.findByIdAndUpdate(
        reviewId, 
        { $inc: { helpfulCount: 1 } }, 
        { new: true }
    );

    if (!review) throw new ApiError(HttpStatus.NOT_FOUND, "Review not found");

    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, review, "Helpful count updated"));
});

const updateReviewStatus = asyncHandler(async (req, res) => {

    const { reviewId } = req.params;
    const { status } = req.body; 

    if (!['Approved', 'Rejected'].includes(status)) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Invalid status");
    }

    const review = await Review.findByIdAndUpdate(
        reviewId,
        { status },
        { new: true }
    );

    if (!review) throw new ApiError(HttpStatus.NOT_FOUND, "Review not found");

    await logActivity(req.user._id, "UPDATE_REVIEW_STATUS", `Review ${reviewId} status changed to ${status}`);

    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, review, `Review ${status} successfully`));
});

const getPendingReviews = asyncHandler(async (req, res) => {

    const reviews = await Review.find({
        status: "Pending"
    })
    .populate("userId", "fullName")
    .populate("schemeId", "title")
    .sort({
        createdAt:-1
    });


    res.status(HttpStatus.OK).json(
        new ApiResponse(
            HttpStatus.OK,
            reviews,
            "Pending reviews fetched"
        )
    );
});

export { 
    addReview, 
    getApprovedReviews, 
    toggleHelpful,
    updateReviewStatus,
    getPendingReviews,
    getAllApprovedReviews
};