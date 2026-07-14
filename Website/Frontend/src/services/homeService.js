
import api from "./api";

const homeService = {
    // Fetch All Categories
    getCategories: async (activeOnly = false) => {
        try {
            const response = await api.get(
                "/category/all"
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};

export default homeService;