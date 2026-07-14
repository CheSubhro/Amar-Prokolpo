
import { useDispatch, useSelector } from "react-redux";
import { 
    fetchCategories, 
    fetchFeaturedSchemes,
    fetchTopViewedSchemes 
} from "../features/home/homeSlice";

const useHome = () => {
    
    const dispatch = useDispatch();
    const {
        categories,
        featuredSchemes,
        topViewedSchemes,
        loading,
        error
    }=useSelector(state=>state.home);

    const getCategories = () => {
        dispatch(fetchCategories());
    };

    const getFeaturedSchemes = () => {
        dispatch(fetchFeaturedSchemes());
    };

    const getTopViewedSchemes = ()=>{
        dispatch(fetchTopViewedSchemes());
    }

    return {

        categories,
        featuredSchemes,
        topViewedSchemes,
        loading,
        error,
        getCategories,
        getFeaturedSchemes,
        getTopViewedSchemes
    
    }
};

export default useHome;