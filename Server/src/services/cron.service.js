
import cron from 'node-cron';
import { Wishlist } from '../models/wishlist.model.js';
import { DeviceToken } from '../models/deviceToken.model.js'; 
import { messaging } from '../config/firebase.js';

export const initReminderCron = () => {

    cron.schedule('0 8 * * *', async () => {
        console.log("Running daily reminder cron job...");

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const reminders = await Wishlist.find({
            reminderDate: { $gte: today, $lt: tomorrow }
        });

        for (const item of reminders) {
            const device = await DeviceToken.findOne({ user: item.userId });

            if (device && device.token) {
                const message = {
                    token: device.token,
                    notification: {
                        title: "Reminder: Scheme Deadline",
                        body: `Your reminder for ${item.folderName || 'scheme'} is today!`
                    }
                };
                
                try {
                    await messaging.send(message);
                    console.log(`Notification sent to user ${item.userId}`);
                } catch (error) {
                    console.error("FCM Error:", error);
                }
            }
        }
    });
};