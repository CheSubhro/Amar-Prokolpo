
import api from './api';

export const getAllSchemes = async (params) => {
    const isAdmin = params?.isAdmin || true; 
    const response = await api.get(`/scheme/all?isAdmin=${isAdmin}`);
    return response.data.data.schemes || [];
};

export const createScheme = async (formData) => {
    try {
        const response = await api.post('/scheme/create', formData);
        return response.data;
    } catch (error) {
        console.error("Axios Error Details:", error.response || error); 
        throw error; 
    }
};

const schemeService = {
    getAllSchemes,
    createScheme
};

export default schemeService;
