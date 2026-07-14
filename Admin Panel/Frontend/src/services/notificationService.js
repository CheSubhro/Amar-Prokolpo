
import api from "./api";


const getNotifications = async () => {
    const response = await api.get(
        "/notifications/list"
    );
    return response.data.data;
};

const markAsRead = async (notificationId) => {
    const response = await api.patch(
        `/notifications/read/${notificationId}`
    );
    return response.data.data;
};

const notificationService = {
    getNotifications,
    markAsRead
};

export default notificationService;