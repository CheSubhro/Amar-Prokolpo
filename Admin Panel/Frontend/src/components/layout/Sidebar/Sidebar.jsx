
import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Divider, Avatar, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Sidebar = ({ open, onClose }) => {
    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon /> },
        { text: 'Users', icon: <PeopleIcon /> },
        { text: 'Settings', icon: <SettingsIcon /> },
        { text: 'Logout', icon: <LogoutIcon /> },
    ];

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
                    <ListItemButton key={item.text} onClick={onClose} sx={{ mb: 0.5, '&:hover': { bgcolor: 'primary.light', color: 'white' } }}>
                        <ListItemIcon sx={{ color: 'primary.main' }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 600 }} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;