
import axios from "./api"; 

const getApprovedReviews = async (schemeId) => {
    const response = await axios.get(`/reviews/${schemeId}`);
    return response.data;
};

const addReview = async (reviewData) => {
    const response = await axios.post("/reviews/add", reviewData);
    return response.data;
};

const getAllApprovedReviews = async () => {
    const response = await axios.get("/reviews/all/approved");
    return response.data;
};

const reviewService = { getApprovedReviews, addReview, getAllApprovedReviews };
export default reviewService;