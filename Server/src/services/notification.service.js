
import admin from '../config/firebase.js';

export const sendPushNotification = async (token, title, message) => {
    try {
        const payload = {
            token: token,
            notification: { title, body: message }
        };
        await admin.messaging().send(payload);
        return true;
    } catch (error) {
        console.error("FCM Error:", error);
        return false;
    }
};