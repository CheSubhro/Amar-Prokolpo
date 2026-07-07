
import api from './api';

const getAllUsers = async () => {
    const response = await api.get('/users/all-user');
    return response.data;
};

const getUserProfile = async (username) => {
    const response = await api.get(`/users/profile/${username}`);
    return response.data;
};

const updateUserDetails = async (userId, userData) => {
    const response = await api.patch(`/users/update-user/${userId}`, userData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

const userService = { 
    getAllUsers,
    getUserProfile,
    updateUserDetails
};
export default userService;