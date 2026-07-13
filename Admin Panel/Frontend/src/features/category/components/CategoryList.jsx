
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../categorySlice';

const CategoryList = () => {

    const dispatch = useDispatch();
    const { list, loading } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    if (loading) return <div>Loading categories...</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Categories List</h2>
            <div className="grid gap-4">
                {list.map((cat) => (
                    <div key={cat._id} className="p-4 border rounded shadow flex items-center gap-4">
                        {cat.image && <img src={cat.image} alt={cat.name} className="w-12 h-12 object-cover" />}
                        <div>
                            <h3 className="font-semibold">{cat.name}</h3>
                            <p className="text-sm text-gray-600">{cat.slug}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default CategoryList;