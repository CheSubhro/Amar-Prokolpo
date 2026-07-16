
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { addCategory } from '../categorySlice';
import { categorySchema } from '../../../utils/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/Checkbox'; 

const AddCategory = ({ onCancel }) => {
    
    const dispatch = useDispatch();
    const [icon, setIcon] = useState(null);
    const [image, setImage] = useState(null);
    
    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors}
    } = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues:{
            isActive:true
        }
    });

    const onSubmit = async (data) => {
        
        const formData = new FormData();
        
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append(
            "order",
            Number(data.order || 0)
        );
        formData.append(
            "isActive",
            data.isActive ?? true
        );
        
        if (icon) formData.append("icon", icon);
        if (image) formData.append("image", image);

        await dispatch(addCategory(formData));
        onCancel(); 
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border rounded-xl shadow-sm bg-white">
            <h3 className="text-xl font-bold mb-4">Add New Category</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Category Name</Label>
                    <Input {...register("name", { required: true })} placeholder="Category Name" />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                
                <div className="space-y-2">
                    <Label>Order</Label>
                    <Input {...register("order")} type="number" placeholder="Order" />
                </div>

                <div className="space-y-2">
                    <Label>Icon (File)</Label>
                    <Input type="file" onChange={(e) => setIcon(e.target.files[0])} />
                </div>

                <div className="space-y-2">
                    <Label>Image (File)</Label>
                    <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Description</Label>
                <Textarea {...register("description")} placeholder="Short description" />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox
                    defaultChecked
                    onCheckedChange={(checked)=>{
                        setValue("isActive", checked);
                    }}
                />
                <Label htmlFor="isActive">Is Active?</Label>
            </div>
            
            <div className="flex gap-2 pt-4">
                <Button type="submit">Create Category</Button>
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            </div>
        </form>
    );
};

export default AddCategory;