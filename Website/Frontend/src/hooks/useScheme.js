
import { useDispatch, useSelector } from "react-redux";
import { fetchSchemeBySlug, clearSchemeState } from "../features/scheme/schemeSlice";

const useScheme = () => {
    
    const dispatch = useDispatch();
    
    const { 
        scheme, 
        relatedSchemes, 
        loading, 
        error 
    } = useSelector((state) => state.scheme);

    const getSchemeBySlug = (slug) => {
        return dispatch(fetchSchemeBySlug(slug));
    };

    const resetScheme = () => {
        dispatch(clearSchemeState());
    };

    return {
        scheme,
        relatedSchemes,
        loading,
        error,
        getSchemeBySlug,
        resetScheme
    };
};

export default useScheme;