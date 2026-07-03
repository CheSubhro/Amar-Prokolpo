
import { ApiError } from "../utils/ApiError.js";
import HttpStatus from "../utils/HttpStatus.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const verifyAdmin = asyncHandler(async (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        throw new ApiError(HttpStatus.FORBIDDEN, "Access denied! Only admin can perform this action.");
    }
    next();
});

export const verifyModerator = asyncHandler(async (req, res, next) => {
    if (!req.user || (req.user.role !== "admin" && req.user.role !== "moderator")) {
        throw new ApiError(HttpStatus.FORBIDDEN, "Access denied! Admins or Moderators only.");
    }
    next();
});