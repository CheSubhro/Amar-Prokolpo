
import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    schemeId: { type: Schema.Types.ObjectId, ref: "Scheme", required: true },
    notes: { type: String, trim: true },
    reminderDate: { type: Date },
    folderName: { type: String, default: "Favorites" }
}, { timestamps: true });

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);