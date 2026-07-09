
import React, { useState, useEffect } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { 
    Box, 
    Typography, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper
} from '@mui/material';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {Spinner,Badge, Modal} from '../../components/common'

const UserList = () => {
    
    const { users, isLoading, fetchAllUsers } = useUsers();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setEditModalOpen(true);
    };

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    if (isLoading) {
        return <Spinner size={50} />;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Users List</Typography>
        
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0px 2px 10px rgba(0,0,0,0.05)' }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f9f9f9' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <TableRow key={user._id} hover>
                                    <TableCell>{user.fullName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Badge label={user.isActive ? 'Active' : 'Inactive'} color={user.isActive ? 'success' : 'error'} />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEditClick(user)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">No users found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal 
                open={editModalOpen} 
                onClose={() => setEditModalOpen(false)}
                title="Edit User"
            >
                <p>Editing: {selectedUser?.fullName}</p>
            </Modal>
        </Box>
    );
};

export default UserList;