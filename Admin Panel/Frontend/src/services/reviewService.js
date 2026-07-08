
import api from './api';

const addReview = async (reviewData) => {
    const response = await api.post('/reviews/add', reviewData);
    return response.data;
};

const reviewService = { addReview };
export default reviewService;