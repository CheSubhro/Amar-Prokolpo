
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useScheme } from '../../../hooks/useScheme';
import { schemeSchema } from '../../../utils/validation';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Checkbox } from '../../../components/ui/checkbox';
import { Label } from '../../../components/ui/label';

const AddScheme = () => {

	const { addScheme, loading } = useScheme();
	const [image, setImage] = useState(null);

	const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
		resolver: zodResolver(schemeSchema)
	});

	const onSubmit = async (data) => {

		const formData = new FormData();
		
		Object.keys(data).forEach(key => formData.append(key, data[key]));
		
		if (image) formData.append("image", image);

		formData.append("status", data.status || "Active");
		formData.append("featured", data.featured ? "true" : "false"); 

		formData.append("benefits", JSON.stringify(data.benefits ? data.benefits.split(',') : []));
		formData.append("eligibility", JSON.stringify(data.eligibility ? data.eligibility.split(',') : []));
		formData.append("requiredDocuments", JSON.stringify(data.requiredDocuments ? data.requiredDocuments.split(',') : []));
		formData.append("applicationProcess", JSON.stringify(data.applicationProcess ? data.applicationProcess.split(',') : []));
		formData.append("faqs", data.faqs || JSON.stringify([])); 
		
		formData.append("isPublished", data.isPublished || "true");

		const result = await addScheme(formData);
		
		if (result.meta.requestStatus === 'fulfilled') {
			alert("Scheme created successfully!");
			reset();
			setImage(null);
		} else {
			alert("Error: " + (result.payload || "Something went wrong"));
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border rounded-xl shadow-sm bg-white">
		<h3 className="text-xl font-bold mb-4">Add New Scheme</h3>
		
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			<Input {...register("title")} placeholder="Scheme Title" />
			<Input type="file" onChange={(e) => setImage(e.target.files[0])} />
			
			<Input {...register("category")} placeholder="Category ID" />
			<Input {...register("deadline")} type="date" />
			
			<Input {...register("applicationLink")} placeholder="Application Link" />
			<Input {...register("helplineNumber")} placeholder="Helpline Number" />
			
			<Input {...register("officialEmail")} placeholder="Official Email" />
			<Input {...register("benefits")} placeholder="Benefits (comma separated)" />
			
			<Input {...register("eligibility")} placeholder="Eligibility (comma separated)" />
			<Input {...register("requiredDocuments")} placeholder="Required Documents (comma separated)" />
			
			<Input {...register("applicationProcess")} placeholder="Application Process (comma separated)" />
			<Select onValueChange={(value) => setValue("status", value)}>
			<SelectTrigger>
				<SelectValue placeholder="Select Status" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="Active">Active</SelectItem>
				<SelectItem value="Expired">Expired</SelectItem>
				<SelectItem value="Upcoming">Upcoming</SelectItem>
			</SelectContent>
			</Select>

			<Checkbox 
				id="featured" 
				onCheckedChange={(checked) => setValue("featured", checked)} 
			/>
			<Label htmlFor="featured" className="cursor-pointer">
				Is Featured?
			</Label>
		</div>

		<Textarea {...register("shortDescription")} placeholder="Short Description" className="w-full" />
		<Textarea {...register("description")} placeholder="Detailed Description" className="w-full" />
		
		<Button type="submit" disabled={loading} className="w-full">
			{loading ? "Creating..." : "Create Scheme"}
		</Button>
		</form>
	);
};

export default AddScheme;