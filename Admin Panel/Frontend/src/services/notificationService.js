
import api from './api';

const registerToken = async (tokenData) => {
    const response = await api.post('/notifications/register-token', tokenData);
    return response.data;
};

const notificationService = { 
    registerToken
};
export default notificationService;