
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Login from '../pages/Auth/Login';
import Dashboard from '../pages/Dashboard/Dashboard';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
                <AdminLayout>
                    <Dashboard />
                </AdminLayout>
            } />
        </Routes>
    );
};

export default AppRoutes;