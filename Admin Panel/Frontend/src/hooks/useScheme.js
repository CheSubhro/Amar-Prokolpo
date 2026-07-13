
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSchemes } from '../features/scheme/schemeSlice';

export const useScheme = () => {

    const dispatch = useDispatch();
    const { items, isLoading } = useSelector((state) => state.scheme);
    
    const getSchemes = (params) => dispatch(fetchAllSchemes(params));
    
    return { schemes: items || [], loading: isLoading, getSchemes };
};