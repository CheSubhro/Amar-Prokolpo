
import { DeviceToken } from "../models/deviceToken.model.js";
import { Notification } from "../models/notification.model.js"; 
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

const getNotifications = asyncHandler(async (req, res) => {

    const notifications = await Notification.find({ user: req.user._id })
        .sort({ createdAt: -1 });

    res.status(HttpStatus.OK).json(
        new ApiResponse(HttpStatus.OK, notifications, "Notifications fetched successfully")
    );
});

const markAsRead = asyncHandler(async (req, res) => {
    
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(
        notificationId,
        { isRead: true },
        { new: true }
    );

    if (!notification) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Notification not found");
    }

    res.status(HttpStatus.OK).json(
        new ApiResponse(HttpStatus.OK, {}, "Notification marked as read")
    );
});

export { updateDeviceToken, getNotifications, markAsRead };