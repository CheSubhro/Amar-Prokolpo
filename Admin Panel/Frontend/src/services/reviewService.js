
import api from './api';

const addReview = async (reviewData) => {
    const response = await api.post('/reviews/add', reviewData);
    return response.data;
};

const getReviewsBySchemeId = async (schemeId) => {
    const response = await api.get(`/reviews/${schemeId}`);
    return response.data;
};

const toggleHelpful = async (reviewId) => {
    const response = await api.patch(`/reviews/helpful/${reviewId}`);
    return response.data;
};

const getPendingReviews = async () => {
    const response = await api.get('/reviews/admin/pending');
    return response.data;
};

const updateReviewStatus = async (reviewId, statusData) => {
    const response = await api.patch(`/reviews/admin/status/${reviewId}`, statusData);
    return response.data;
};

const reviewService = { 
    addReview,
    getReviewsBySchemeId,
    toggleHelpful,
    getPendingReviews,
    updateReviewStatus
};
export default reviewService;