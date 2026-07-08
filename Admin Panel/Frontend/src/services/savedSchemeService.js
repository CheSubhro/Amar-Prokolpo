
import api from './api';

const toggleSaveScheme = async (schemeId) => {
    const response = await api.post('/saved-schemes/toggle', { schemeId });
    return response.data;
};

const savedSchemeService = { toggleSaveScheme };
export default savedSchemeService;