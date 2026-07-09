
import React from 'react';
import { Navbar, Footer } from '../components/layout/index'; 

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 p-4">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;