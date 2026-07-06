
import React, { useState } from 'react';
import {Navbar,Sidebar} from '../components/layout/index';


const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main style={{ padding: '20px' }}>{children}</main>
        </>
    );
};

export default AdminLayout;