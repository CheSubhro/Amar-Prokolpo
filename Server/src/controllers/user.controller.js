
import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import HttpStatus from '../utils/HttpStatus.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary, deleteFromCloudinary }  from '../utils/Cloudinary.js'
import { lowercase } from '../utils/StringUtils.js'
import { generateUserTokens } from "../utils/TokenManager.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/Email.js";


const registerUser = asyncHandler ( async (req,res) =>{

    const {fullName, email, username, password, role } = req.body
    //console.log("email: ", email);

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(HttpStatus.CONFLICT, "User with email or username already exists")
    }

    // Convert username to lowercase
    const lowercaseUsername = lowercase(username);

    //console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Avatar file is required")
    }


    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Avatar file is required")
    }

    const userRole = role ? role.toLowerCase() : "admin";

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: lowercaseUsername,
        role: userRole
    })

    

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong while registering the user")
    }

    return res.status(HttpStatus.CREATED).json(
        new ApiResponse(HttpStatus.OK, createdUser, "User registered Successfully")
    )


})

const loginUser = asyncHandler(async (req, res) => {

    const { email, username, password } = req.body;

    if (!username && !email) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Username or email is required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new ApiError(HttpStatus.NOT_FOUND, "User does not exist");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateUserTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(HttpStatus.OK)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                HttpStatus.OK,
                { user: loggedInUser, accessToken, refreshToken },
                "User logged in successfully"
            )
        );
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, req.user, "User fetched successfully"));
});

const getAllUser = asyncHandler(async (req, res) => {
    const staffs = await User.find({
        role: { $in: ['user', 'admin', 'moderator'] }
    }).select("-password -refreshToken");

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, staffs, "System users fetched successfully"));
});

const updateUser = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { fullName, email, username, password, role } = req.body;

    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Staff member not found");
    }

    const updateData = {};

    if (fullName) updateData.fullName = fullName;
    
    if (role) {
        const validRoles = ['user', 'admin', 'moderator']; 
        if (!validRoles.includes(role.toLowerCase())) {
            throw new ApiError(HttpStatus.BAD_REQUEST, "Invalid role configuration");
        }
        updateData.role = role.toLowerCase();
    }
    
    if (email) {
        const emailExists = await User.findOne({ email: email.toLowerCase(), _id: { $ne: id } });
        if (emailExists) throw new ApiError(HttpStatus.CONFLICT, "Email is already taken");
        updateData.email = email.toLowerCase().trim();
    }

    if (username) {
        const usernameExists = await User.findOne({ username: username.toLowerCase(), _id: { $ne: id } });
        if (usernameExists) throw new ApiError(HttpStatus.CONFLICT, "Username is already taken");
        updateData.username = username.toLowerCase().trim();
    }

    if (password && password.trim() !== "") {
        updateData.password = password; 
    }

    // image Update Logic
    if (req.files) {
        // Avatar Update
        if (req.files.avatar && req.files.avatar[0]) {
            const avatarLocalPath = req.files.avatar[0].path;
            const uploadedAvatar = await uploadOnCloudinary(avatarLocalPath);
            if (uploadedAvatar) {
                // old image delete logic
                if (user.avatar) await deleteFromCloudinary(user.avatar);
                updateData.avatar = uploadedAvatar.url;
            }
        }

        // Cover Image Update
        if (req.files.coverImage && req.files.coverImage[0]) {
            const coverImageLocalPath = req.files.coverImage[0].path;
            const uploadedCover = await uploadOnCloudinary(coverImageLocalPath);
            if (uploadedCover) {
                // old image delete logic
                if (user.coverImage) await deleteFromCloudinary(user.coverImage);
                updateData.coverImage = uploadedCover.url;
            }
        }
    }

    const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    ).select("-password -refreshToken");

    return res.status(HttpStatus.OK).json(
        new ApiResponse(HttpStatus.OK, updatedUser, "User profile updated successfully")
    );
});

const changeCurrentPassword = asyncHandler(async (req, res) => {

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Both old and new passwords are required");
    }

    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid old password");
    }

    user.password = newPassword; 
    await user.save({ validateBeforeSave: false });

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, {}, "Password changed successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const user = await User.findById(id);
    
    if (!user) {
        throw new ApiError(HttpStatus.NOT_FOUND, "User member not found");
    }

    if (user.avatar) {
        await deleteFromCloudinary(user.avatar);
    }
    
    if (user.coverImage) {
        await deleteFromCloudinary(user.coverImage);
    }

    const deletedUser = await User.findByIdAndDelete(id);

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, {}, "User removed successfully"));
});


const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        { $unset: { refreshToken: 1 } },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(HttpStatus.OK)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(HttpStatus.OK, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, "Unauthorized request");
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    
    const user = await User.findById(decodedToken?._id);

    if (!user || incomingRefreshToken !== user.refreshToken) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, "Refresh token is expired or invalid");
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateUserTokens(user._id);

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(HttpStatus.OK)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(HttpStatus.OK, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed")
        );
});

const forgotPassword = asyncHandler(async (req, res) => {

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw new ApiError(HttpStatus.NOT_FOUND, "User not found");

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpiry = Date.now() + 15 * 60 * 1000; 
    await user.save();

    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/users/reset-password/${resetToken}`;
    const message = `You requested a password reset. Click here: ${resetUrl}`;

    await sendEmail({ email: user.email, subject: "Password Reset", message });
    
    return res.status(200).json(new ApiResponse(200, {}, "Email sent successfully"));
});

const resetPassword = asyncHandler(async (req, res) => {

    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpiry: { $gt: Date.now() }
    });

    if (!user) throw new ApiError(HttpStatus.BAD_REQUEST, "Token is invalid or expired");

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    return res.status(200).json(new ApiResponse(200, {}, "Password reset successful"));
});


export {
    registerUser,
    loginUser,
    getCurrentUser,
    getAllUser,
    updateUser,
    changeCurrentPassword,
    deleteUser,
    logoutUser,
    refreshAccessToken,
    forgotPassword,
    resetPassword
}




