
import api from "./api";

const getPendingReviews = async () => {
    const response = await api.get("/reviews/admin/pending");
    return response.data.data;
};

const updateReviewStatus = async (reviewId, status) => {
    const response = await api.patch(`/reviews/admin/status/${reviewId}`,{status});
    return response.data.data;
};

const reviewService = {
    getPendingReviews,
    updateReviewStatus
};
export default reviewService;