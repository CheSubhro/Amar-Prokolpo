
import api from './api';

const addToWishlist = async (wishlistData) => {
    const response = await api.post('/wishlist', wishlistData);
    return response.data;
};

const wishlistService = { addToWishlist };
export default wishlistService;