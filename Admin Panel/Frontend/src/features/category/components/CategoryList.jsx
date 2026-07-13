
import { useEffect } from 'react';
import { useCategory } from '../../../hooks/useCategory';
import { Trash2, Edit2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; 
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';


const CategoryList = () => {

    const { list, loading, getAll, remove } = useCategory();

    useEffect(() => {
        getAll();
    }, []);

    const handleDelete = (id) => {
        toast("Are you sure?", {
            description: "This will permanently delete the category.",
            action: {
                label: "Delete",
                onClick: async () => {
                    await remove(id);
                    toast.success("Category deleted successfully!");
                },
            },
            cancel: { label: "Cancel" },
        });
    };

    if (loading) return <div>Loading categories...</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Categories List</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Image</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Description</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((cat) => (
                        <tr key={cat._id} className="text-center">
                            <td className="p-2 border">
                                <img src={cat.icon} alt={cat.name} className="w-8 h-8 mx-auto" />
                            </td>
                            <td className="p-2 border">{cat.name}</td>
                            <td className="p-2 border text-sm text-gray-600">{cat.description}</td>
                            <td className="p-2 border">
                                <Badge variant={cat.isActive ? "default" : "secondary"}>
                                    {cat.isActive ? "Active" : "Inactive"}
                                </Badge>
                            </td>
                            <td className="p-2 border">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="mr-3 text-blue-600">
                                            <Edit2 size={18} />
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Category</DialogTitle>
                                        </DialogHeader>
                                        <EditCategory 
                                            category={cat} 
                                            onCancel={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))} 
                                        />
                                    </DialogContent>
                                </Dialog>
                                <button 
                                onClick={() => handleDelete(cat._id)} className="text-red-600">
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default CategoryList;