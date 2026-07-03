
import mongoose, { Schema } from "mongoose";

const activityLogSchema = new Schema({
    adminId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true }, 
    targetUserId: { type: Schema.Types.ObjectId, ref: "User" },
    details: { type: String },
    ipAddress: { type: String },
    timestamp: { type: Date, default: Date.now }
});

export const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);