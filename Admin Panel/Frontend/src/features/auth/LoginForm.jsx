
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Card, Input, Button } from '../../components/common/index';

const LoginForm = ({ onLogin }) => {
    
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Card sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3 }}>
            <Typography variant="h5" textAlign="center" mb={2}>Admin Login</Typography>
            <Box component="form" display="flex" flexDirection="column" gap={2}>
                <Input name="email" label="Email" type="email" onChange={handleChange} fullWidth />
                <Input name="password" label="Password" type="password" onChange={handleChange} fullWidth />
                <Button onClick={() => onLogin(formData)} fullWidth>Login</Button>
            </Box>
        </Card>
    );
};

export default LoginForm;