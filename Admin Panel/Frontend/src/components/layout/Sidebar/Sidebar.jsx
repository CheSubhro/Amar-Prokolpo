
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Users, 
    ShoppingBag, 
    FileText, 
    MessageSquare, 
    Bell, 
    Star, 
    Heart 
} from 'lucide-react';
import { Separator } from '../../ui/separator';


const Sidebar = () => {

    const { user } = useSelector((state) => state.auth);

    const menuItems = [
        { name: 'Dashboard', path: '/', roles: ['admin', 'editor'], icon: <LayoutDashboard size={20} /> },
        { name: 'Users', path: '/users', roles: ['admin'], icon: <Users size={20} /> },
        { name: 'Schemes', path: '/schemes', roles: ['admin', 'editor'], icon: <FileText size={20} /> },
        { name: 'Categories', path: '/categories', roles: ['admin', 'editor'], icon: <ShoppingBag size={20} /> },
        { name: 'Support', path: '/support', roles: ['admin', 'editor'], icon: <MessageSquare size={20} /> },
        { name: 'Notifications', path: '/notifications', roles: ['admin'], icon: <Bell size={20} /> },
        { name: 'Reviews', path: '/reviews', roles: ['admin', 'editor'], icon: <Star size={20} /> },
        { name: 'Wishlist', path: '/wishlist', roles: ['admin', 'editor'], icon: <Heart size={20} /> },
    ];

    return (

        <aside className="w-64 h-screen bg-background border-r flex flex-col hidden md:flex">
            {/* Sidebar Header */}
            <div className="p-6">
                <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
            </div>
        
            <Separator />

            {/* Menu Items */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems
                .filter(item => item.roles.includes(user?.role))
                .map((item) => (
                <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                        isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`
                    }
                >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                </NavLink>
                ))}
            </nav>

            <Separator />
        
            {/* Footer */}
            <div className="p-4 text-sm text-muted-foreground text-center">
                v1.0.0
            </div>
        </aside>
    );
};

export default Sidebar;