
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../categorySlice';

const CategoryList = () => {
    
    const dispatch = useDispatch();
    const { list } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div>
            {list.map(cat => <div key={cat._id}>{cat.name}</div>)}
        </div>
    );
};
export default CategoryList;