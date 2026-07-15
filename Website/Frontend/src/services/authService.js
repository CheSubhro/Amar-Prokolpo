
import api from "./api"; 

const authService = {
    
    register: async (userData) => {
        const response = await api.post("/users/register", userData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    },
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