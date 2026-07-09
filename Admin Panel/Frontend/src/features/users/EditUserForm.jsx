
import React, { useState } from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import { Button } from '../../components/common';

const EditUserForm = ({ user, onUpdate, onClose }) => {
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        role: user?.role || ''
    });

    const roles = ['admin', 'user', 'moderator'];

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(user._id, formData);
        onClose();
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField 
                label="Full Name" 
                value={formData.fullName} 
                onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
            />
            <TextField 
                label="Email" 
                value={formData.email} 
                disabled 
            />
            {/* Role Select Input */}
            <TextField 
                select
                label="Role" 
                value={formData.role} 
                onChange={(e) => setFormData({...formData, role: e.target.value})} 
                fullWidth
            >
                {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                    </MenuItem>
                ))}
            </TextField>
            
            <Button type="submit">Save Changes</Button>
        </Box>
    );
};

export default EditUserForm;