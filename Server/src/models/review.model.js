
import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    schemeId: { type: Schema.Types.ObjectId, ref: "Scheme", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    helpfulCount: { type: Number, default: 0 }
}, { timestamps: true });

export const Review = mongoose.model("Review", reviewSchema);