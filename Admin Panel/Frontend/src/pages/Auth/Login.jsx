
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import LoginForm from '../../features/auth/LoginForm';
import { loginUser } from '../../features/auth/authSlice';
import bgImage from '../../assets/images/loginbg.jpg';


const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (formData) => {
        const resultAction = await dispatch(loginUser(formData));
        
        if (loginUser.fulfilled.match(resultAction)) {
            navigate('/'); 
        }
    };

    return (
        <Box 
            sx={{
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            <Box sx={{ width: '100%', maxWidth: 450, px: 2 }}>
                <LoginForm onLogin={handleLogin}/>
            </Box>
        </Box>    
        
        
    );
};

export default LoginPage;