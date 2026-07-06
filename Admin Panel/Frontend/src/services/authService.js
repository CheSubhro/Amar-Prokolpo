
import api from './api';

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

const authService = { login, logout };
export default authService;