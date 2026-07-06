
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Login from '../pages/Auth/Login';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<AdminLayout><h1>Welcome to Admin Dashboard</h1></AdminLayout>} />
            <Route path="/users" element={<AdminLayout><h1>Users Page</h1></AdminLayout>} />
        </Routes>
    );
};

export default AppRoutes;