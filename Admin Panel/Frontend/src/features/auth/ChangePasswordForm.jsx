
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Input, Button, Spinner } from '../../components/common';

const ChangePasswordForm = ({ onSubmit, isLoading }) => {

    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(passwords);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Update Security Credentials</Typography>
            <Input label="Old Password" type="password" onChange={(e) => setPasswords({...passwords, oldPassword: e.target.value})} />
            <Input label="New Password" type="password" onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})} />
            <Input label="Confirm New Password" type="password" onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})} />
            
            <Button type="submit" disabled={isLoading}>
                {isLoading ? <Spinner /> : "Update Password"}
            </Button>
        </Box>
    );
};

export default ChangePasswordForm;