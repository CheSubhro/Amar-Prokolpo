
import mongoose, { Schema } from "mongoose";

const deviceTokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    deviceType: { type: String, enum: ['android', 'ios', 'web'] }
}, { timestamps: true });

export const DeviceToken = mongoose.model("DeviceToken", deviceTokenSchema);