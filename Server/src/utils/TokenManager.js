

import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "./ApiError.js";
import HttpStatus from "./HttpStatus.js";


// For Admin
export const generateUserTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = jwt.sign(
            { _id: user._id, email: user.email, username: user.username }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );
        const refreshToken = jwt.sign(
            { _id: user._id }, 
            process.env.REFRESH_TOKEN_SECRET, 
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Error generating user tokens");
    }
};