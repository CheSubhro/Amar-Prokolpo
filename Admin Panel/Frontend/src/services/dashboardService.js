
import api from "./api";

const getDashboardData = async () => {
    
    try {
        const [
            schemes,
            topSchemes,
            tickets,
            reviews,
            notifications
        ] = await Promise.all([
            api.get("/scheme/all?isAdmin=true"),
            api.get("/scheme/top-viewed"),
            api.get("/support/all"),
            api.get("/reviews/admin/pending"),
            api.get("/notifications/list")
        ]);
        
        return {
            schemes: schemes.data.data.schemes || [],
            topSchemes: topSchemes.data.data || [],
            tickets: tickets.data.data || [],
            reviews: reviews.data.data || [],
            notifications: notifications.data.data || []
        };
        
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error; 
    }
};

export default {
    getDashboardData
};