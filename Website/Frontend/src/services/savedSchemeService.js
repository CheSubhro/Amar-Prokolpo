
import api from "./api";

const savedSchemeService = {
    // Save / Unsave Scheme
    toggleSaveScheme: async (schemeId) => {
        const response = await api.post("/saved-schemes/toggle", {
            schemeId,
        });
        return response.data;
    },

    // Get Saved Schemes
    getSavedSchemes: async () => {
        const response = await api.get("/saved-schemes/list");
        return response.data;
    },
};

export default savedSchemeService;