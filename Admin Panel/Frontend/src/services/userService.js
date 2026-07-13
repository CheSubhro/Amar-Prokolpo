
import api from './api';

export const getAllUsers = async (params) => {
    const response = await api.get('/users/all-user', { params });
    return response.data.data || [];
};


const userService = {
    getAllUsers,
};
export default userService;