
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import HttpStatus from '../utils/HttpStatus.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Scheme } from '../models/scheme.model.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/Cloudinary.js';
import { logActivity } from "../utils/Logger.js";
import { DeviceToken } from "../models/deviceToken.model.js";
import { sendPushNotification } from "../services/notification.service.js";
import { Notification } from "../models/notification.model.js";

const createScheme = asyncHandler(async (req, res) => {
    
    try {
        const { 
            title, shortDescription, description, category, applicationLink, 
            helplineNumber, officialEmail, deadline, status, featured,
            benefits, eligibility, requiredDocuments, applicationProcess,
            isPublished 
        } = req.body;
    
        const imagePath = req.file?.path;
        if (!imagePath) throw new ApiError(HttpStatus.BAD_REQUEST, "Scheme image is required");
    
        const uploadResult = await uploadOnCloudinary(imagePath);
        if (!uploadResult) throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Image upload failed");
    
        const parseArray = (data) => {
            try {
                return typeof data === 'string' ? JSON.parse(data) : (Array.isArray(data) ? data : []);
            } catch (error) {
                return [];
            }
        };
    
        const scheme = await Scheme.create({
            title, 
            shortDescription, 
            description, 
            category,
            image: uploadResult.url,
            benefits: parseArray(benefits),
            eligibility: parseArray(eligibility),
            requiredDocuments: parseArray(requiredDocuments),
            applicationProcess: parseArray(applicationProcess),
            applicationLink, 
            helplineNumber, 
            officialEmail,
            deadline: deadline ? new Date(deadline) : null, 
            status, 
            featured,
            isPublished: isPublished === 'true' 
        });
    
        await logActivity(req.user?._id, "CREATE_SCHEME", `Scheme ${title} created`);
    
        if (isPublished === 'true') {
            const deviceTokens = await DeviceToken.find({});
            
            deviceTokens.forEach(async (device) => {
                await sendPushNotification(
                    device.token, 
                    "New Scheme Arrived!", 
                    `New Scheme : ${title} Show।`
                );
    
                await Notification.create({
                    user: device.user,
                    title: "New Scheme Arrived!",
                    message: `New Scheme : ${title} show।`,
                    type: 'NEW_SCHEME'
                });
            });
        }
    
        res.status(HttpStatus.CREATED).json(
            new ApiResponse(HttpStatus.CREATED, scheme, "Scheme created successfully")
        );
    } catch (error) {
        console.error("Server-side error:", error); 
        throw error;
    }
    
});

const getAllSchemes = asyncHandler(async (req, res) => {

    const { search, category, status, featured, page = 1, limit = 10, isAdmin, compact } = req.query;
    
    let query = isAdmin === 'true' ? {} : { isPublished: true };

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { shortDescription: { $regex: search, $options: 'i' } }
        ];
    }

    if (category) query.category = category;
    if (status) query.status = status;
    if (featured !== undefined) query.featured = featured === 'true';

    const skip = (parseInt(page) - 1) * parseInt(limit);

    let queryBuilder = Scheme.find(query)
        .populate("category", "name")
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

    if (compact === 'true') {
        queryBuilder = queryBuilder.select("title image shortDescription slug category");
    }

    const schemes = await queryBuilder;
    const total = await Scheme.countDocuments(query); 

    res.status(HttpStatus.OK).json(
        new ApiResponse(HttpStatus.OK, { 
            schemes, 
            total, 
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)) 
        }, "Schemes fetched successfully")
    );
});

const getSchemeBySlug = asyncHandler(async (req, res) => {

    const scheme = await Scheme.findOne({ slug: req.params.slug }).populate("category");
    if (!scheme) throw new ApiError(HttpStatus.NOT_FOUND, "Scheme not found");
    
    scheme.viewCount += 1;
    await scheme.save();

    const relatedSchemes = await Scheme.find({
        category: scheme.category._id, 
        _id: { $ne: scheme._id },      
        isPublished: true              
    })
    .limit(4) 
    .select("title shortDescription image slug"); 

    res.status(HttpStatus.OK).json(
        new ApiResponse(HttpStatus.OK, { scheme, relatedSchemes }, "Scheme fetched successfully")
    );
});

const updateScheme = asyncHandler(async (req, res) => {
    
    const { id } = req.params;
    
    const scheme = await Scheme.findById(id);
    if (!scheme) throw new ApiError(HttpStatus.NOT_FOUND, "Scheme not found");

    if (req.file) {
        if (scheme.image) await deleteFromCloudinary(scheme.image);
        const uploadResult = await uploadOnCloudinary(req.file.path);
        scheme.image = uploadResult.url;
    }

    const { 
        title, 
        description, 
        shortDescription, 
        applicationLink, 
        helplineNumber, 
        officialEmail, 
        status, 
        featured 
    } = req.body;

    if (title !== undefined) scheme.title = title;
    if (description !== undefined) scheme.description = description;
    if (shortDescription !== undefined) scheme.shortDescription = shortDescription;
    if (applicationLink !== undefined) scheme.applicationLink = applicationLink;
    if (helplineNumber !== undefined) scheme.helplineNumber = helplineNumber;
    if (officialEmail !== undefined) scheme.officialEmail = officialEmail;
    if (status !== undefined) scheme.status = status;
    if (featured !== undefined) scheme.featured = featured;

    await scheme.save();
    await logActivity(req.user?._id, "UPDATE_SCHEME", `Scheme ${scheme.title} updated`);

    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, scheme, "Scheme updated"));
});

const deleteScheme = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const scheme = await Scheme.findByIdAndDelete(id);
    if (!scheme) throw new ApiError(HttpStatus.NOT_FOUND, "Scheme not found");

    if (scheme.image) await deleteFromCloudinary(scheme.image);
    await logActivity(req.user?._id, "DELETE_SCHEME", `Scheme ${scheme.title} deleted`);

    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, {}, "Scheme deleted"));
});

const getTopViewedSchemes = asyncHandler(async (req, res) => {

    const limit = parseInt(req.query.limit) || 5; 

    const topSchemes = await Scheme.find({ isPublished: true })
        .sort({ viewCount: -1 }) 
        .limit(limit)
        .select("title viewCount slug image"); 

    res.status(HttpStatus.OK).json(
        new ApiResponse(HttpStatus.OK, topSchemes, "Top viewed schemes fetched successfully")
    );
});

export { 
    createScheme,
    getAllSchemes, 
    getSchemeBySlug, 
    updateScheme,
    deleteScheme,
    getTopViewedSchemes 
};