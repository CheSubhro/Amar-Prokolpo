
import React, { useState } from 'react';
import { Card, Input, Button, Spinner } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { Box, Typography } from '@mui/material';

const ChangePasswordPage = () => {
    
    const { changePassword, isLoading } = useAuth();
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        await changePassword({ 
            oldPassword: passwords.oldPassword, 
            newPassword: passwords.newPassword 
        });
    };

    return (
        <Card title="Change Password">
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Input label="Old Password" type="password" onChange={(e) => setPasswords({...passwords, oldPassword: e.target.value})} />
                <Input label="New Password" type="password" onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})} />
                <Input label="Confirm New Password" type="password" onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})} />
                
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Spinner size={20} /> : "Update Password"}
                </Button>
            </Box>
        </Card>
    );
};

export default ChangePasswordPage;