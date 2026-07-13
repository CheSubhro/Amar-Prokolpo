
import api from './api';

export const getAllCategories = async () => {
    const response = await api.get('/category/all');
    return response.data.data;
};

export const createCategory = async (formData) => {
    const response = await api.post('/category/create', formData);
    return response.data;
};

