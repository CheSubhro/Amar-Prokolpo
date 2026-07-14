
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/home/homeSlice";

const useHome = () => {
    
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector((state) => state.home);

    const getCategories = () => {
        dispatch(fetchCategories());
    };

    return {
        categories,
        loading,
        error,
        getCategories,
    };
};

export default useHome;