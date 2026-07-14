
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchFeaturedSchemes } from "../features/home/homeSlice";

const useHome = () => {
    
    const dispatch = useDispatch();
    const {
        categories,
        featuredSchemes,
        loading,
        error
    }=useSelector(state=>state.home);

    const getCategories = () => {
        dispatch(fetchCategories());
    };

    const getFeaturedSchemes = () => {
        dispatch(fetchFeaturedSchemes());
    };

    return {

        categories,
        featuredSchemes,
        loading,
        error,
        getCategories,
        getFeaturedSchemes
    
    }
};

export default useHome;