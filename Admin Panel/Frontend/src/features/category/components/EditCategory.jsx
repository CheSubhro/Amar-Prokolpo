
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCategory } from '../../../hooks/useCategory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/Checkbox';

const EditCategory = ({ category, onCancel }) => {
    const { update } = useCategory();
    const { register, handleSubmit, control } = useForm({ 
        defaultValues: {
            name: category.name,
            description: category.description,
            order: category.order,
            isActive: category.isActive
        } 
    });

    const onSubmit = async (data) => {

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("order", data.order);
        formData.append("isActive", data.isActive);
        
        
        await update(category._id, formData);
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label>Name</Label>
                <Input {...register("name")} />
            </div>
            <div>
                <Label>Description</Label>
                <Input {...register("description")} />
            </div>
            <div>
                <Label>Order</Label>
                <Input type="number" {...register("order")} />
            </div>
            <div className="flex items-center space-x-2">
                <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                        <Checkbox 
                            id="isActive"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    )}
                />
                <Label htmlFor="isActive">Is Active</Label>
            </div>
            <Button type="submit">Update Category</Button>
        </form>
    );
};

export default EditCategory;