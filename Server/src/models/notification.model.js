
import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    type: { type: String, enum: ['NEW_SCHEME', 'DEADLINE_ALERT'], required: true }
}, { timestamps: true });

export const Notification = mongoose.model("Notification", notificationSchema);