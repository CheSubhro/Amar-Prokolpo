
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../features/wishlist/wishlistSlice";

export const useWishlist = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.wishlist);

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);

    return { wishlist: items, loading, error };
};