
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import HttpStatus from '../utils/HttpStatus.js';
import { SavedScheme } from '../models/savedScheme.model.js';

const toggleSaveScheme = asyncHandler(async (req, res) => {
    
    const { schemeId } = req.body;
    const userId = req.user._id;

    const existing = await SavedScheme.findOne({ user: userId, scheme: schemeId });

    if (existing) {
        await SavedScheme.findByIdAndDelete(existing._id);
        return res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, { isSaved: false }, "Scheme removed from saved list"));
    } else {
        const saved = await SavedScheme.create({ user: userId, scheme: schemeId });
        return res.status(HttpStatus.CREATED).json(new ApiResponse(HttpStatus.CREATED, { isSaved: true }, "Scheme saved successfully"));
    }
});

const getSavedSchemes = asyncHandler(async (req, res) => {
    const savedSchemes = await SavedScheme.find({ user: req.user._id })
        .populate({
            path: "scheme",
            select: "title image shortDescription slug"
        });

    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, savedSchemes, "Saved schemes fetched"));
});

export { toggleSaveScheme, getSavedSchemes };