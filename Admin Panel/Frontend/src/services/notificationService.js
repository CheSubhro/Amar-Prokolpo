
import api from './api';

const registerToken = async (tokenData) => {
    const response = await api.post('/notifications/register-token', tokenData);
    return response.data;
};

const markAsRead = async (notificationId) => {
    const response = await api.patch(`/notifications/read/${notificationId}`);
    return response.data;
};

const notificationService = { 
    registerToken,
    markAsRead
};
export default notificationService;