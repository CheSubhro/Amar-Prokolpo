
import api from "./api";

const wishlistService = {
    addToWishlist: async (data) => {
        const response = await api.post("/wishlist", data);
        return response.data;
    },
    getWishlist: async () => {
        const response = await api.get("/wishlist");
        return response.data;
    },
    removeFromWishlist: async (wishlistId) => {
        const response = await api.delete(`/wishlist/${wishlistId}`);
        return response.data;
    }
};

export default wishlistService;