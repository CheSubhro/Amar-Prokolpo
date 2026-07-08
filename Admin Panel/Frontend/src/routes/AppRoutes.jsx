
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/RegisterPage';
import Dashboard from '../pages/Dashboard/Dashboard';
import ChangePasswordPage from '../pages/Profile/ChangePasswordPage';
import NotFound from '../pages/NotFound/NotFound';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Route */}
            <Route path="/" element={<ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
            <Route path="/change-password" element={<ProtectedRoute><AdminLayout><ChangePasswordPage /></AdminLayout></ProtectedRoute>} />
            {/* 404 Not Found Route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;