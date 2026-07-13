
import api from './api';

export const getAllSchemes = async (params) => {
    const isAdmin = params?.isAdmin || true; 
    const response = await api.get(`/scheme/all?isAdmin=${isAdmin}`);
    return response.data.data.schemes || [];
};

const schemeService = {
    getAllSchemes
};

export default schemeService;
