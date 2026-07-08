
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '../../common/index'; 

const Navbar = ({ toggleSidebar }) => {
    
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleNavigate = (path) => {
        navigate(path);
        handleMenuClose();
    };

    return (
        <AppBar position="sticky" sx={{ bgcolor: 'background.paper', color: 'text.primary', boxShadow: 1 }}>
            <Toolbar>
                <IconButton edge="start" onClick={toggleSidebar} sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    Amar Prokolpo
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Tooltip title="Notifications">
                        <IconButton color="inherit">
                            <NotificationsIcon />
                        </IconButton>
                    </Tooltip>
                    
                    {/* Avatar with Clickable Menu */}
                    <Avatar 
                        onClick={handleMenuOpen} 
                        sx={{ bgcolor: 'primary.main', width: 35, height: 35, cursor: 'pointer' }}
                    >
                        A
                    </Avatar>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => handleNavigate('/profile')}>Profile</MenuItem>
                        <MenuItem onClick={() => handleNavigate('/change-password')}>Change Password</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;