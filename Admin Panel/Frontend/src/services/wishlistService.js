
import api from './api';

const addToWishlist = async (wishlistData) => {
    const response = await api.post('/wishlist', wishlistData);
    return response.data;
};

const removeFromWishlist = async (wishlistId) => {
    const response = await api.delete(`/wishlist/${wishlistId}`);
    return response.data;
};

const getWishlist = async () => {
    const response = await api.get('/wishlist');
    return response.data;
};

const wishlistService = { 
    addToWishlist,
    removeFromWishlist,
    getWishlist
};
export default wishlistService;