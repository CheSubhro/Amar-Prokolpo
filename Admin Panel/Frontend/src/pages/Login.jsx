
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../features/auth/components/LoginForm';

const Login = () => {
	
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <LoginForm onLoginSuccess={() => navigate('/')} />
        </div>
    );
};

export default Login;