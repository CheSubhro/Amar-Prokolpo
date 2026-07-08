
import React, { useState } from 'react';
import { Box, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Input, Button, Spinner } from '../../components/common'; 

const ChangePasswordForm = ({ onSubmit, isLoading }) => {

    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [error, setError] = useState('');
    
    const [showPassword, setShowPassword] = useState({ old: false, new: false, confirm: false });

    const toggleShowPassword = (field) => {
        setShowPassword({ ...showPassword, [field]: !showPassword[field] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (passwords.newPassword.length < 6) {
            setError("New password must be at least 6 characters long.");
            return;
        }
        if (passwords.newPassword !== passwords.confirmPassword) {
            setError("New passwords do not match.");
            return;
        }
        onSubmit(passwords);
    };

    const getPasswordProps = (field, isVisible) => ({
        type: isVisible ? 'text' : 'password',
        InputProps: {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={() => toggleShowPassword(field)} edge="end">
                        {isVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            ),
        }
    });

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Change Password</Typography>
            {error && <Typography color="error" variant="body2">{error}</Typography>}

            <Input 
                label="Old Password" 
                {...getPasswordProps('old', showPassword.old)} 
                onChange={(e) => setPasswords({...passwords, oldPassword: e.target.value})} 
            />
            <Input 
                label="New Password" 
                {...getPasswordProps('new', showPassword.new)} 
                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})} 
            />
            <Input 
                label="Confirm New Password" 
                {...getPasswordProps('confirm', showPassword.confirm)} 
                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})} 
            />
            
            <Button type="submit" disabled={isLoading}>
                {isLoading ? <Spinner /> : "Update Password"}
            </Button>
        </Box>
    );
};

export default ChangePasswordForm;