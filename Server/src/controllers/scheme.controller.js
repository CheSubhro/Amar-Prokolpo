
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import HttpStatus from '../utils/HttpStatus.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Scheme } from '../models/scheme.model.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/Cloudinary.js';
import { logActivity } from "../utils/Logger.js";

const createScheme = asyncHandler(async (req, res) => {
    
    const { 
        title, shortDescription, description, category, applicationLink, 
        helplineNumber, officialEmail, faqs, deadline, status, featured,
        benefits, eligibility, requiredDocuments, applicationProcess 
    } = req.body;

    const imagePath = req.file?.path;
    if (!imagePath) throw new ApiError(HttpStatus.BAD_REQUEST, "Scheme image is required");

    const uploadResult = await uploadOnCloudinary(imagePath);
    if (!uploadResult) throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Image upload failed");

    const parseArray = (data) => (typeof data === 'string' ? JSON.parse(data) : data);

    const scheme = await Scheme.create({
        title, shortDescription, description, category,
        image: uploadResult.url,
        benefits: parseArray(benefits) || [],
        eligibility: parseArray(eligibility) || [],
        requiredDocuments: parseArray(requiredDocuments) || [],
        applicationProcess: parseArray(applicationProcess) || [],
        applicationLink, helplineNumber, officialEmail,
        faqs: parseArray(faqs) || [],
        deadline, status, featured
    });

    await logActivity(req.user?._id, "CREATE_SCHEME", `Scheme ${title} created`);

    res.status(HttpStatus.CREATED).json(
        new ApiResponse(HttpStatus.CREATED, scheme, "Scheme created successfully")
    );
});

const getAllSchemes = asyncHandler(async (req, res) => {
    const schemes = await Scheme.find().populate("category", "name"); 
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, schemes, "Schemes fetched"));
});

const getSchemeBySlug = asyncHandler(async (req, res) => {

    const scheme = await Scheme.findOne({ slug: req.params.slug }).populate("category");
    if (!scheme) throw new ApiError(HttpStatus.NOT_FOUND, "Scheme not found");
    
    scheme.viewCount += 1;
    await scheme.save();

    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, scheme, "Scheme fetched"));
});

export { createScheme, getAllSchemes, getSchemeBySlug };