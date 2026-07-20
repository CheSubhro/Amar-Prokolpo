
import { useDispatch, useSelector } from "react-redux";
import { fetchSchemeBySlug, clearSchemeState,fetchSchemesByCategory  } from "../features/scheme/schemeSlice";

const useScheme = () => {
    
    const dispatch = useDispatch();
    const { scheme, schemes, relatedSchemes, loading, error } = useSelector((state) => state.scheme);

    const getSchemesByCategory = (categoryId) => dispatch(fetchSchemesByCategory(categoryId));    
    
    const getSchemeBySlug = (slug) => {
        return dispatch(fetchSchemeBySlug(slug));
    };

    const resetScheme = () => {
        dispatch(clearSchemeState());
    };

    return {
        scheme,
        schemes, 
        relatedSchemes,
        loading,
        error,
        getSchemeBySlug,
        getSchemesByCategory, 
        resetScheme
    };
};

export default useScheme;