
import api from './api';

const login = async (userData) => {
    const response = await api.post('/users/login', userData); 
    return response.data.data; 
};

const logout = async () => {
    const response = await api.post('/users/logout');
    return response.data;
};

const authService = {
    login,
    logout,
};

export default authService;