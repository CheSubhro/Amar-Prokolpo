
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import RegisterForm from '../../features/auth/RegisterForm';
import { registerUser } from '../../features/auth/authSlice';

const RegisterPage = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (formData) => {
        const resultAction = await dispatch(registerUser(formData));
        if (registerUser.fulfilled.match(resultAction)) {
            navigate('/login'); 
        }
    };

    return (
        <Box sx={{ mt: 10 }}>
            <RegisterForm onRegister={handleRegister} />
        </Box>
    );
};

export default RegisterPage;