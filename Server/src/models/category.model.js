
import mongoose, { Schema } from "mongoose";

// Define the schema for the Category
const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        icon: {
            type: String 
        },
        image: {
            type: String 
        },
        description: {
            type: String, 
        },
        isActive: {
            type: Boolean,
            default: true 
        },
        order: {
            type: Number,
            default: 0 
        }
    },    
    // Additional options
    {
        timestamps: true // Adds createdAt and updatedAt fields
    }
 
);

// Slug Generation Middleware
categorySchema.pre('validate', function(next) {
    if (this.name) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
    next();
});

// Create and export the Category model
export const Category = mongoose.model("Category", categorySchema);
