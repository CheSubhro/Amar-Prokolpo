
import api from "./api"; 

const authService = {
    
    login: async (credentials) => {
        const response = await api.post("/users/login", credentials);
        return response.data; 
    },
    logout: async () => {
        await api.delete("/users/logout");
    },
    getCurrentUser: async () => {
        const response = await api.get("/users/current-user");
        return response.data;
    }
};

export default authService;