
import api from './api';

const register = async (userData) => {
    const response = await api.post('/users/register', userData); 
    return response.data;
};

const login = async (userData) => {
    const response = await api.post('/users/login', userData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('token');
};

const authService = { login, logout, getCurrentUser, register };
export default authService;