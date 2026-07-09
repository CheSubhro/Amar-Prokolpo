
import React from 'react';
import { Box } from '@mui/material';
import { Navbar, Sidebar } from '../components/layout/index';

const AdminLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />

            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Navbar />

                <Box component="main" sx={{ p: 3, bgcolor: '#f4f6f8', flexGrow: 1 }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default AdminLayout;