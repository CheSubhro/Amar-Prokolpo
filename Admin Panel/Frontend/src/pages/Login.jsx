
import React from 'react';
import LoginForm from '../../features/auth/LoginForm';
import { Container } from '@mui/material';

const LoginPage = () => {

    const handleLogin = (data) => {
        console.log("Login data:", data);
    };

    return (
        <Container>
            <LoginForm onLogin={handleLogin} />
        </Container>
    );
};

export default LoginPage;