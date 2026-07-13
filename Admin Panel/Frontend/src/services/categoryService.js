
import api from './api';

export const getAllCategories = async () => {
    const response = await api.get('/category/all');
    return response.data.data;
};

