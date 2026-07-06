
import mongoose, { Schema } from "mongoose";

const savedSchemeSchema = new Schema(
    {
        user: { 
            type: Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        scheme: { 
            type: Schema.Types.ObjectId, 
            ref: "Scheme", 
            required: true 
        }
    }, 
    { timestamps: true }
);

savedSchemeSchema.index({ user: 1, scheme: 1 }, { unique: true });

export const SavedScheme = mongoose.model("SavedScheme", savedSchemeSchema);