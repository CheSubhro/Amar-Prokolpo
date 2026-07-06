

import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import HttpStatus from '../utils/HttpStatus.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Category } from '../models/category.model.js'
import { uploadOnCloudinary, deleteFromCloudinary }  from '../utils/Cloudinary.js'
import { logActivity } from "../utils/Logger.js";


const createCategory = asyncHandler ( async (req,res) =>{

    const { name, description, order = 0, isActive = true } = req.body;

    let imageUrl = "";
    let iconUrl = "";

    if (req.files) {
        if (req.files.image) {
            const uploadImage = await uploadOnCloudinary(req.files.image[0].path);
            imageUrl = uploadImage?.url || "";
        }
        if (req.files.icon) {
            const uploadIcon = await uploadOnCloudinary(req.files.icon[0].path);
            iconUrl = uploadIcon?.url || "";
        }
    }

    const category = await Category.create({
        name,
        description,
        order,
        isActive,
        image: imageUrl,
        icon: iconUrl 
    });

    await logActivity(req.user?._id, "CREATE_CATEGORY",  `Category ${name} created`);

    res.status(HttpStatus.CREATED).json(
        new ApiResponse(HttpStatus.CREATED, category, "Category created successfully")
    );
})

const getAllCategories = asyncHandler ( async (req,res) =>{

    const query = req.query.active === 'true' ? { isActive: true } : {};
    const categories = await Category.find(query).sort({ order: 1 });

    res.status(HttpStatus.OK).json(
        new ApiResponse(HttpStatus.OK, categories, "Categories fetched successfully")
    );
})

const updateCategory = asyncHandler ( async (req,res) =>{

    const { id } = req.params;
    const { name, description, order, isActive } = req.body;

    const category = await Category.findById(id);
    if (!category) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Category not found");
    }

    if (req.files) {
        if (req.files.image) {
            if (category.image) await deleteFromCloudinary(category.image);
            const uploadImage = await uploadOnCloudinary(req.files.image[0].path);
            category.image = uploadImage.url;
        }
        if (req.files.icon) {
            if (category.icon) await deleteFromCloudinary(category.icon);
            const uploadIcon = await uploadOnCloudinary(req.files.icon[0].path);
            category.icon = uploadIcon.url; 
        }
    }

    category.name = name || category.name;
    category.description = description || category.description;
    category.order = order !== undefined ? order : category.order;
    category.isActive = isActive !== undefined ? isActive : category.isActive;

    await category.save();

    await logActivity(req.user?._id, "UPDATE_CATEGORY", `Category ${category.name} updated`);

    res.status(HttpStatus.OK).json(
        new ApiResponse(HttpStatus.OK, category, "Category updated successfully")
    );
})

const getCategoryBySlug = asyncHandler(async (req, res) => {

    const { slug } = req.params;

    const category = await Category.findOne({ slug });

    if (!category) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Category not found");
    }

    res.status(HttpStatus.OK).json(
        new ApiResponse(HttpStatus.OK, category, "Category fetched successfully")
    );
});

const deleteCategory = asyncHandler ( async (req,res) =>{

    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Category not found");
    }

    if (category.image) await deleteFromCloudinary(category.image);
    if (category.icon) await deleteFromCloudinary(category.icon);

    await logActivity(req.user?._id, "DELETE_CATEGORY", `Category ${category.name} deleted`);

    res.status(HttpStatus.OK).json(
        new ApiResponse(HttpStatus.OK, {}, "Category deleted successfully")
    );
})



export {
    createCategory,
    getAllCategories,
    getCategoryBySlug,
    updateCategory,
    deleteCategory
}




