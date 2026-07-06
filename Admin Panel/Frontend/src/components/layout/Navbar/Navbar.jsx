
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Tooltip } from '../../common/index'; 

const Navbar = ({ toggleSidebar }) => {
    return (
        <AppBar position="sticky" sx={{ bgcolor: 'background.paper', color: 'text.primary', boxShadow: 1 }}>
            <Toolbar>
                <IconButton edge="start" onClick={toggleSidebar} sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    Admin Panel
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Tooltip title="Notifications">
                        <IconButton color="inherit">
                            <NotificationsIcon />
                        </IconButton>
                    </Tooltip>
                    
                    <Avatar sx={{ bgcolor: 'primary.main', width: 35, height: 35 }}>A</Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;