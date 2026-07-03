
import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import HttpStatus from '../utils/HttpStatus.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary }  from '../utils/Cloudinary.js'
import { lowercase } from '../utils/StringUtils.js'
import { generateUserTokens } from "../utils/TokenManager.js"
import bcrypt from "bcrypt";


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

export {
    registerUser,
    loginUser,
    getCurrentUser,
    getAllUser
}




