
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchCategories, 
    addCategory, 
    updateCategoryThunk, 
    deleteCategoryThunk 
} from '../features/category/categorySlice';

export const useCategory = () => {
    
    const dispatch = useDispatch();
    const { list, loading } = useSelector((state) => state.category);

    const getAll = () => dispatch(fetchCategories());
    const create = (formData) => dispatch(addCategory(formData));
    const update = (id, formData) => dispatch(updateCategoryThunk({ id, formData }));
    const remove = (id) => {
        console.log("remove", id);
        return dispatch(deleteCategoryThunk(id));
    };

    return { list, loading, getAll, create, update, remove };
};