
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPendingReviews,
    changeReviewStatus
} from "../features/review/reviewSlice";

export const useReview = () => {
    
    const dispatch = useDispatch();

    const { reviews, loading, error } = useSelector(
        (state) => state.review
    );

    const getReviews = () => {
        dispatch(fetchPendingReviews());
    };

    const updateStatus = (reviewId, status) => {
        return dispatch(
            changeReviewStatus({
                reviewId,
                status
            })
        );
    };

    return {
        reviews,
        loading,
        error,
        getReviews,
        updateStatus
    };
};