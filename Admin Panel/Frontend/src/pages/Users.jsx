
import React, { useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const Users = () => {

    const { users, loading, getUsers } = useUser();

    useEffect(() => { getUsers(); }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Users Management</h2>
            <div className="border rounded-xl">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            {/* <TableHead>Actions</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.isArray(users) && users.length > 0 ? (
                            users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell className="font-medium">{user.fullName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Badge className={
                                            user.role === 'admin' ? "bg-red-500" : 
                                            user.role === 'moderator' ? "bg-yellow-500" : "bg-blue-500"
                                        }>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    {/* <TableCell>
                                        <Button variant="ghost" size="sm" onClick={() => handleEdit(user._id)}>Edit</Button>
                                    </TableCell> */}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    {loading ? "Loading users..." : "No users found."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
export default Users;