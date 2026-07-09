
import api from './api';

const login = async (userData) => {
    const response = await api.post('/auth/login', userData);
    return response.data;
};

const logout = async () => {
    await api.post('/auth/logout');
};

const authService = {
    login,
    logout,
};

export default authService;