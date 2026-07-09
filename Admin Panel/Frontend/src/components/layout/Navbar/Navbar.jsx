
import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '../../ui/separator';

const Navbar = () => {
    return (
        <nav className="w-full bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="text-xl font-bold tracking-tight">
            <Link to="/">AdminPanel</Link>
            </div>

            <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
            <Link to="/users" className="hover:text-primary transition-colors">Users</Link>
            <Link to="/analytics" className="hover:text-primary transition-colors">Analytics</Link>
            </div>

            <div className="flex items-center gap-4">
            <button className="text-sm font-medium hover:text-primary">Logout</button>
            </div>
        </div>
        
        <Separator orientation="horizontal" />
        </nav>
    );
};

export default Navbar;