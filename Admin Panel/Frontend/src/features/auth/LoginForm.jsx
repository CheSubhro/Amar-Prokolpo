
import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button as MuiButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginForm = ({ onLogin }) => {
    
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault(); 
        onLogin(formData);
    };

    return (
        <Paper elevation={3} sx={{ maxWidth: 400, mx: 'auto', mt: 10, p: 4, borderRadius: 3, textAlign: 'center' }}>
            <Box sx={{ mb: 2, color: 'primary.main' }}>
                <LockOutlinedIcon fontSize="large" />
            </Box>
            <Typography variant="h5" fontWeight="700" sx={{ mb: 1 }}>Admin Login</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Enter your credentials to continue</Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField 
                    label="Username" 
                    variant="outlined" 
                    fullWidth 
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
                <TextField 
                    label="Password" 
                    type="password" 
                    variant="outlined" 
                    fullWidth 
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <MuiButton 
                    type="submit" 
                    variant="contained" 
                    size="large" 
                    sx={{ py: 1.5, mt: 1, fontWeight: 'bold' }}
                >
                    LOGIN
                </MuiButton>
            </Box>
        </Paper>
    );
};

export default LoginForm;