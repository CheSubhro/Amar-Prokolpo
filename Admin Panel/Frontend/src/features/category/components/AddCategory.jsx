
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../categorySlice';

const AddCategory = () => {
    
    const [formData, setFormData] = useState({ name: '', description: '', order: 1, isActive: true, icon: null, image: null });
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        Object.keys(formData).forEach(key => fd.append(key, formData[key]));
        dispatch(addCategory(fd));
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <input type="text" placeholder="Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <input type="file" onChange={(e) => setFormData({...formData, icon: e.target.files[0]})} />
            <input type="file" onChange={(e) => setFormData({...formData, image: e.target.files[0]})} />
            <button type="submit">Create Category</button>
        </form>
    );
};
export default AddCategory;