
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button'; 

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-xl text-gray-600 mt-4">Page not found</p>
        
            <Button asChild className="mt-6">
                <Link to="/">Go Home</Link>
            </Button>
        </div>
    );
};

export default NotFound;