
import api from './api';

const createScheme = async (schemeData) => {
    const response = await api.post('/scheme/create', schemeData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

const getAllSchemes = async () => {
    const response = await api.get('/scheme/all');
    return response.data;
};

const deleteScheme = async (schemeId) => {
    const response = await api.delete(`/scheme/delete/${schemeId}`);
    return response.data;
};

const getSchemeBySlug = async (slug) => {
    const response = await api.get(`/scheme/${slug}`);
    return response.data;
};

const getTopViewedSchemes = async () => {
    const response = await api.get('/scheme/top-viewed');
    return response.data;
};

const schemeService = { 
    createScheme,
    getAllSchemes,
    deleteScheme,
    getSchemeBySlug,
    getTopViewedSchemes
};
export default schemeService;