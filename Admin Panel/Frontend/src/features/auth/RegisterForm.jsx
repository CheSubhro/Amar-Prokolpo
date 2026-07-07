
import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';

const RegisterForm = ({ onRegister }) => {
    
    const [formData, setFormData] = useState({
        username: '', email: '', fullName: '', password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(formData);
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', borderRadius: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>Admin Register</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Username" fullWidth onChange={(e) => setFormData({...formData, username: e.target.value})} />
                <TextField label="Full Name" fullWidth onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                <TextField label="Email" type="email" fullWidth onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <TextField label="Password" type="password" fullWidth onChange={(e) => setFormData({...formData, password: e.target.value})} />
                <Button type="submit" variant="contained" size="large">REGISTER</Button>
            </Box>
        </Paper>
    );
};

export default RegisterForm;