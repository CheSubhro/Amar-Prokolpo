
import React, { useState } from 'react';
import CategoryList from '../features/category/components/CategoryList';
import AddCategory from '../features/category/components/AddCategory'; 
import { Button } from '../components/ui/button'; 

const CategoryPage = () => {
    const [isAdding, setIsAdding] = useState(false);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Categories Management</h2>
                <Button onClick={() => setIsAdding(!isAdding)}>
                    {isAdding ? "Cancel" : "Add New Category"}
                </Button>
            </div>

            {isAdding ? (
                <AddCategory onCancel={() => setIsAdding(false)} /> 
            ) : (
                <CategoryList />
            )}
        </div>
    );
};

export default CategoryPage;