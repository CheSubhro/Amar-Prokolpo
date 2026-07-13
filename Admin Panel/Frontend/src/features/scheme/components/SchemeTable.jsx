
import React, { useEffect, useState } from 'react';
import { useScheme } from '../../../hooks/useScheme';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import SchemeFilter from './SchemeFilter';
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EditScheme from './EditScheme';


const SchemeTable = () => {

    const {
        schemes,
        loading,
        getSchemes,
        deleteScheme
    } = useScheme();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getSchemes();
    }, []);

    const filteredSchemes = Array.isArray(schemes)
        ? schemes.filter(s =>
            s.title?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];


    const handleDelete = (id) => {
        toast("Are you sure?", {
            description: "This will permanently delete the scheme.",
            action: {
                label: "Delete",
                onClick: async () => {
                    await deleteScheme(id);
                    toast.success("Scheme deleted successfully!");
                },
            },
            cancel: {
                label: "Cancel"
            },
        });
    };

    if (loading) return <div>Loading schemes...</div>;

    return (
        <div className="p-4">
            <SchemeFilter onSearch={setSearchQuery} />
            <div className="border rounded-xl mt-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSchemes.length > 0 ? (
                            filteredSchemes.map((scheme) => (
                                <TableRow key={scheme._id}>
                                    <TableCell className="font-medium">
                                        {scheme.title}
                                    </TableCell>
                                    <TableCell>
                                        {scheme.category?.name || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                scheme.status === "Active"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                        >
                                            {scheme.status || "N/A"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="mr-3 text-blue-600">
                                                    <Pencil size={18} />
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Edit Scheme
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <EditScheme
                                                    scheme={scheme}
                                                    onCancel={() =>
                                                        document.dispatchEvent(
                                                            new KeyboardEvent(
                                                                'keydown',
                                                                {
                                                                    key: 'Escape'
                                                                }
                                                            )
                                                        )
                                                    }
                                                />
                                            </DialogContent>
                                        </Dialog>
                                        <button
                                            onClick={() => handleDelete(scheme._id)}
                                            className="text-red-600"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    No schemes found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};


export default SchemeTable;