
import mongoose, { Schema } from "mongoose";

const schemeSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        slug: { 
            type: String, 
            required: true, 
            unique: true, 
            lowercase: true 
        },
        shortDescription: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: Schema.Types.ObjectId, ref: "Category", required: true }, 
        image: { type: String, required: true },
        benefits: [{ type: String }],
        eligibility: [{ type: String }],
        requiredDocuments: [{ type: String }],
        applicationProcess: [{ type: String }],
        applicationLink: { type: String },
        helplineNumber: { type: String }, 
        officialEmail: { type: String },
        faqs: [{ 
            question: { type: String }, 
            answer: { type: String } 
        }],
        deadline: { type: Date },
        status: { 
            type: String, 
            enum: ['Active', 'Expired', 'Upcoming'], 
            default: 'Active' 
        },
        viewCount: { type: Number, default: 0 },
        featured: { type: Boolean, default: false }
    }, 
    { timestamps: true }
);

// Slug Generation Middleware
schemeSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
    next();
});

export const Scheme = mongoose.model("Scheme", schemeSchema);