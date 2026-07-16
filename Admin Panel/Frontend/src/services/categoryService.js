
import api from './api';

export const getAllCategories = async () => {
    const response = await api.get('/category/all');
    return response.data.data;
};

export const createCategory = async (formData) => {
    const response = await api.post(
        "/category/create",
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
    )
    return response.data;
};

export const updateCategory = async (id, formData) => {
    const response = await api.patch(`/category/update/${id}`, formData);
    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await api.delete(`/category/delete/${id}`);
    return response.data;
};