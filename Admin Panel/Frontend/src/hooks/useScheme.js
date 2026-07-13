
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllSchemes,
    createNewScheme,
    updateSchemeThunk,
    deleteSchemeThunk
} from "../features/scheme/schemeSlice";

export const useScheme = () => {

    const dispatch = useDispatch();
    const { items, isLoading, isError, message } = useSelector((state) => state.scheme);
    
    const getSchemes = (params) => dispatch(fetchAllSchemes(params));
    
    const addScheme = async (formData) => {
        return await dispatch(createNewScheme(formData));
    };

    const updateScheme = (id, formData) =>
        dispatch(updateSchemeThunk({ id, formData }));

    const deleteScheme = (id) =>
        dispatch(deleteSchemeThunk(id));
    
    return {
        schemes: items || [],
        loading: isLoading,
        error: isError,
        message,
        getSchemes,
        addScheme,
        updateScheme,
        deleteScheme
    };
};