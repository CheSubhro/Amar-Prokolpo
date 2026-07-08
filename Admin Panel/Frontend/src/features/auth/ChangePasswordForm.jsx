
import React, { useState } from 'react';
import { Box, Typography, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Spinner } from '../../components/common'; 

const ChangePasswordForm = ({ onSubmit, isLoading }) => {
    
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [error, setError] = useState('');
    
    const [showPassword, setShowPassword] = useState({ old: false, new: false, confirm: false });

    const toggle = (field) => setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));

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

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Change Password</Typography>
            
            {error && <Typography color="error" variant="body2">{error}</Typography>}

            {/* Old Password */}
            <TextField 
                label="Old Password"
                fullWidth
                type={showPassword.old ? 'text' : 'password'}
                onChange={(e) => setPasswords({...passwords, oldPassword: e.target.value})}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => toggle('old')} edge="end">
                                    {showPassword.old ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}
            />

            {/* New Password */}
            <TextField 
                label="New Password"
                fullWidth
                type={showPassword.new ? 'text' : 'password'}
                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => toggle('new')} edge="end">
                                    {showPassword.new ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}
            />

            {/* Confirm Password */}
            <TextField 
                label="Confirm New Password"
                fullWidth
                type={showPassword.confirm ? 'text' : 'password'}
                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => toggle('confirm')} edge="end">
                                    {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}
            />
            
            <Button type="submit" disabled={isLoading}>
                {isLoading ? <Spinner /> : "Update Password"}
            </Button>
        </Box>
    );
};

export default ChangePasswordForm;