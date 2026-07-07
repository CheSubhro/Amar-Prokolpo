
import api from './api';

const getAllUsers = async () => {
    const response = await api.get('/users/all-user');
    return response.data;
};

const getUserProfile = async (username) => {
    const response = await api.get(`/users/profile/${username}`);
    return response.data;
};

const userService = { 
    getAllUsers,
    getUserProfile
};
export default userService;