
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import RegisterForm from '../../features/auth/RegisterForm';
import { registerUser } from '../../features/auth/authSlice';
import bgImage from '../../assets/images/loginbg.jpg'; 

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
        <Box 
            sx={{
                width: '100%', minHeight: '100vh',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgImage})`,
                backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'
            }}
        >
            <RegisterForm onRegister={handleRegister} />
        </Box>
    );
};

export default RegisterPage;