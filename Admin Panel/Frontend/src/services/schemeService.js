
import api from './api';

export const getAllSchemes = async (params) => {
    const isAdmin = params?.isAdmin || true; 
    const response = await api.get(`/scheme/all?isAdmin=${isAdmin}`);
    return response.data.data.schemes || [];
};

export const createScheme = async (formData) => {
    const response = await api.post('/scheme/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

const schemeService = {
    getAllSchemes,
    createScheme
};

export default schemeService;
