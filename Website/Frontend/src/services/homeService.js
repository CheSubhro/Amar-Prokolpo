
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
    getFeaturedSchemes: async()=>{
        try{
            const response = await api.get(
                "/scheme/all?featured=true&limit=6"
            );
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;
        }
    },
    getTopViewedSchemes: async()=>{
        try{
            const response = await api.get(
                "/scheme/top-viewed?limit=6"
            );
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;
        }
    }
};



export default homeService;