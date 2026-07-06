
import mongoose, { Schema } from "mongoose";

const supportSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" }, 
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phoneNumber: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    status: { type: String, enum: ['Pending', 'In-Progress', 'Resolved'], default: 'Pending' },
    adminResponse: { type: String }
}, { timestamps: true });

export const Support = mongoose.model("Support", supportSchema);