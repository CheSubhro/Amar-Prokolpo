
import api from './api';

const getAllUsers = async () => {
    const response = await api.get('/users/all-user');
    return response.data;
};

const userService = { getAllUsers };
export default userService;