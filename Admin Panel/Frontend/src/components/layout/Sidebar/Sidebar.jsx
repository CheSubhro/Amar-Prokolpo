
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Divider, Avatar, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import ListAltIcon from '@mui/icons-material/ListAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ReviewsIcon from '@mui/icons-material/Reviews';
import SupportIcon from '@mui/icons-material/Support';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Sidebar = ({ open, onClose }) => {
    const navigate = useNavigate();

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { text: 'Users', icon: <PeopleIcon />, path: '/users' },
        { text: 'Categories', icon: <CategoryIcon />, path: '/categories' },
        { text: 'Schemes', icon: <ListAltIcon />, path: '/schemes' },
        { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
        { text: 'Reviews', icon: <ReviewsIcon />, path: '/reviews' },
        { text: 'Support Tickets', icon: <SupportIcon />, path: '/support' },
        { text: 'Logout', icon: <LogoutIcon />, path: '/logout' },
    ];

    const handleNavigation = (path) => {
        if (path === '/logout') {
            console.log("Logging out...");
        } else {
            navigate(path);
        }
        onClose();
    };

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': { width: 250, boxSizing: 'border-box', bgcolor: '#fcfcfc' },
            }}
        >
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'primary.main', color: 'white' }}>
                <Avatar sx={{ width: 60, height: 60, mb: 1, bgcolor: 'secondary.main' }}>
                    <AdminPanelSettingsIcon fontSize="large" />
                </Avatar>
                <Typography variant="h6">Admin Name</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>admin@example.com</Typography>
            </Box>
            
            <Divider />
            
            <List sx={{ mt: 1 }}>
                {menuItems.map((item) => (
                    <ListItemButton 
                        key={item.text} 
                        onClick={() => handleNavigation(item.path)} 
                        sx={{ mb: 0.5, '&:hover': { bgcolor: 'primary.light', color: 'white' } }}
                    >
                        <ListItemIcon sx={{ color: 'primary.main' }}>{item.icon}</ListItemIcon>
                        <ListItemText>
                            <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.text}</Typography>
                        </ListItemText>
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;