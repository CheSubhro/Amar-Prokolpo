
import api from './api';

const createScheme = async (schemeData) => {
    const response = await api.post('/scheme/create', schemeData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

const schemeService = { createScheme };
export default schemeService;