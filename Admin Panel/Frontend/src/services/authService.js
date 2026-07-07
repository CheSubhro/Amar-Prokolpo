
import api from './api';

const register = async (userData) => {
    const response = await api.post('/users/register', userData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
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

const changePassword = async (passwords) => {
    const response = await api.patch('/users/change-password', passwords);
    return response.data;
};

const deleteUser = async (userId) => {
    const response = await api.delete(`/users/delete-user/${userId}`);
    return response.data;
};

const forgotPassword = async (email) => {
    const response = await api.post('/users/forgot-password', { email });
    return response.data;
};

const authService = { 
    login, 
    logout, 
    getCurrentUser, 
    register, 
    changePassword,
    deleteUser, 
    forgotPassword 
};
export default authService;