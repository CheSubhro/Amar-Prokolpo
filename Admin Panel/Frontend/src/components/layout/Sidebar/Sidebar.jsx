
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Drawer, 
    List, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    Box, 
    Divider, 
    Avatar, 
    Typography 
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import ListAltIcon from '@mui/icons-material/ListAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ReviewsIcon from '@mui/icons-material/Reviews';
import SupportIcon from '@mui/icons-material/Support';
import { useAuth } from '../../../hooks/useAuth';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { text: 'Users', icon: <PeopleIcon />, path: '/users' },
        { text: 'Categories', icon: <CategoryIcon />, path: '/categories' },
        { text: 'Schemes', icon: <ListAltIcon />, path: '/schemes' },
        { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
        { text: 'Reviews', icon: <ReviewsIcon />, path: '/reviews' },
        { text: 'Support Tickets', icon: <SupportIcon />, path: '/support' },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 260,
                flexShrink: 0,
                '& .MuiDrawer-paper': { 
                    width: 260, 
                    boxSizing: 'border-box', 
                    bgcolor: '#ffffff',
                    borderRight: '1px solid #e0e0e0'
                },
            }}
        >
            {/* প্রোফাইল সেকশন */}
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#f8f9fa' }}>
                <Avatar 
                    src={user?.avatar} 
                    sx={{ width: 60, height: 60, mb: 1, bgcolor: 'primary.main', fontSize: '1.5rem', fontWeight: 'bold' }}
                >
                    {!user?.avatar && (user?.fullName?.charAt(0) || 'A')}
                </Avatar>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {user?.fullName || 'Admin'}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {user?.email || 'admin@example.com'}
                </Typography>
            </Box>
            
            <Divider />
            
            {/* মেনু লিস্ট */}
            <List sx={{ mt: 1, px: 1 }}>
                {menuItems.map((item) => (
                    <ListItemButton 
                        key={item.text} 
                        onClick={() => navigate(item.path)}
                        selected={location.pathname === item.path}
                        sx={{ 
                            borderRadius: 1,
                            mb: 0.5,
                            '&.Mui-selected': {
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': { bgcolor: 'primary.dark' },
                                '& .MuiListItemIcon-root': { color: 'white' }
                            }
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 40, color: location.pathname === item.path ? 'white' : 'text.secondary' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;