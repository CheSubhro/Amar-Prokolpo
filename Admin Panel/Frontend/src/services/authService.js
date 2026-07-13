
import api from './api';

const login = async (userData) => {
    const response = await api.post('/users/login', userData); 
    return response.data.data; 
};

const logout = async () => {
    const response = await api.delete('/users/logout');
    return response.data;
};

const getCurrentUser = async () => {
    const response = await api.get('/users/current-user');
    return response.data.data;
};

const authService = {
    login,
    logout,
    getCurrentUser
};

export default authService;