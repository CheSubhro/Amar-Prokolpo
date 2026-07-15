
import api from "./api";

const schemeService = {
    getSchemeBySlug: async (slug) => {
        try {
            const response = await api.get(`/scheme/${slug}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching scheme with slug: ${slug}`, error);
            
            throw error.response?.data?.message || 
                  error.response?.data || 
                  error.message || 
                  "An unexpected error occurred";
        }
    }
};

export default schemeService;