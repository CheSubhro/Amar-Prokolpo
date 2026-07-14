
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../layouts/ProtectedRoute';
import NotFound from '../pages/NotFound';
import LoginPage from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import CategoryPage from '../pages/CategoryPage';
import Schemes from '../pages/Schemes';
import SupportManagement from '@/pages/SupportManagement';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route path="/" element={<ProtectedRoute allowedRoles={['admin', 'editor']}><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute allowedRoles={['admin', 'editor']}><MainLayout><Users /></MainLayout></ProtectedRoute>} />
            <Route path="/categories" element={<ProtectedRoute allowedRoles={['admin', 'editor']}><MainLayout><CategoryPage /></MainLayout></ProtectedRoute>} />
            <Route path="/schemes" element={<ProtectedRoute allowedRoles={['admin', 'editor']}><MainLayout><Schemes /></MainLayout></ProtectedRoute>} />
            <Route path="/support" element={<ProtectedRoute allowedRoles={['admin', 'editor']}><MainLayout><SupportManagement /></MainLayout></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;