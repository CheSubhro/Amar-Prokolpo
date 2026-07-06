
import { DeviceToken } from "../models/deviceToken.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import HttpStatus from "../utils/HttpStatus.js";

const updateDeviceToken = asyncHandler(async (req, res) => {
    const { token, deviceType } = req.body;
    const userId = req.user._id;

    await DeviceToken.findOneAndUpdate(
        { token }, 
        { user: userId, deviceType }, 
        { upsert: true, new: true }
    );
    
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, {}, "Device registered"));
});

export { updateDeviceToken };