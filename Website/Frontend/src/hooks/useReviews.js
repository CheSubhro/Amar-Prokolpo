
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, fetchAllReviews } from "../features/reviews/reviewSlice";

export const useReviews = (schemeId) => {

    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.reviews);

    useEffect(() => {
        if (schemeId) {
            dispatch(fetchReviews(schemeId));
        } else {
            dispatch(fetchAllReviews()); 
        }
    }, [dispatch, schemeId]);

    return { reviews: items, loading, error };
};