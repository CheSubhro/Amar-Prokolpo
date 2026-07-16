
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlistThunk } from "../features/wishlist/wishlistSlice";

export const useWishlist = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.wishlist);
    const { user } = useSelector((state) => state.auth); 

    useEffect(() => {
        if (user) {
            dispatch(fetchWishlist());
        }
    }, [dispatch, user]);

    const remove = (id) => dispatch(removeFromWishlistThunk(id));

    return { wishlist: items, loading, error, remove, user }; 
};