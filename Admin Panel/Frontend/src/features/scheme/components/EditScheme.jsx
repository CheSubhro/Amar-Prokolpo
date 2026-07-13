
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useScheme } from '../../../hooks/useScheme';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

const EditScheme = ({ scheme, onCancel }) => {
    const { updateScheme } = useScheme();
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            title: scheme.title || "",
            description: scheme.description || "",
            shortDescription: scheme.shortDescription || "",
            applicationLink: scheme.applicationLink || "",
            helplineNumber: scheme.helplineNumber || "",
            officialEmail: scheme.officialEmail || "",
            status: scheme.status || "Active",
            featured: scheme.featured || false
        }
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("shortDescription", data.shortDescription);
        formData.append("applicationLink", data.applicationLink);
        formData.append("helplineNumber", data.helplineNumber);
        formData.append("officialEmail", data.officialEmail);
        formData.append("status", data.status);
        formData.append("featured", data.featured);

        await updateScheme(scheme._id, formData);
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label>Title</Label>
                <Input {...register("title")} />
            </div>
            
            <div>
                <Label>Description</Label>
                <Textarea {...register("description")} />
            </div>

            <div>
                <Label>Short Description</Label>
                <Input {...register("shortDescription")} />
            </div>

            <div>
                <Label>Application Link</Label>
                <Input {...register("applicationLink")} />
            </div>

            <div>
                <Label>Helpline Number</Label>
                <Input {...register("helplineNumber")} />
            </div>

            <div>
                <Label>Official Email</Label>
                <Input type="email" {...register("officialEmail")} />
            </div>

            <div>
                <Label>Status</Label>
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                    )}
                />
            </div>

            <div className="flex items-center space-x-2">
                <Controller
                    name="featured"
                    control={control}
                    render={({ field }) => (
                        <Checkbox 
                            id="featured"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    )}
                />
                <Label htmlFor="featured">Is Featured?</Label>
            </div>

            <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                <Button type="submit">Update Scheme</Button>
            </div>
        </form>
    );
};

export default EditScheme;