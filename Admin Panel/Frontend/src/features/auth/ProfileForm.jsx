
import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { Button } from '../../components/common';

const ProfileForm = ({ user, onUpdate }) => {

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5">Edit Profile</Typography>
            <TextField 
                label="Name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
            <TextField 
                label="Email" 
                value={formData.email} 
                disabled 
            />
            <Button type="submit">Update Profile</Button>
        </Box>
    );
};

export default ProfileForm;