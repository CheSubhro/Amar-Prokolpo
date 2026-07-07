
import api from './api';

const register = async (userData) => {
    const response = await api.post('/users/register', userData); 
    return response.data;
};

const login = async (userData) => {
    const response = await api.post('/users/login', userData);
    return response.data;
};

const getCurrentUser = async () => {
    const response = await api.get('/users/current-user');
    return response.data;
};

const logout = async () => {
    await api.delete('/users/logout');
};

const authService = { login, logout, getCurrentUser, register };
export default authService;