
import api from './api'; 

const createCategory = async (categoryData) => {
    const response = await api.post('/category/create', categoryData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

const categoryService = { 
    createCategory
};
export default categoryService;