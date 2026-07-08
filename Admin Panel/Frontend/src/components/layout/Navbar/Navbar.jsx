
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import { Menu as MenuIcon, Notifications, Person, Lock, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Tooltip } from '../../common/index'; 

const Navbar = ({ toggleSidebar }) => {

    const navigate = useNavigate();
    const { logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = async () => {
        await logout();
        handleMenuClose();
        navigate('/login');
    };

    return (
        <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'text.primary', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <Toolbar>
                <IconButton onClick={toggleSidebar} sx={{ mr: 2, color: 'primary.main' }}>
                    <MenuIcon />
                </IconButton>
                
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: '800', letterSpacing: '0.5px', color: 'primary.dark' }}>
                    AMAR PROKOLPO
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip title="Notifications">
                        <IconButton sx={{ color: 'text.secondary' }}>
                            <Notifications />
                        </IconButton>
                    </Tooltip>
                    
                    <Avatar 
                        onClick={handleMenuOpen} 
                        sx={{ ml: 1, bgcolor: 'primary.main', width: 40, height: 40, cursor: 'pointer', border: '2px solid #e0e0e0' }}
                    >
                        A
                    </Avatar>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.12))',
                                mt: 1.5,
                                width: 200,
                                '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={() => {navigate('/profile'); handleMenuClose();}}>
                            <ListItemIcon><Person fontSize="small" /></ListItemIcon> Profile
                        </MenuItem>
                        <MenuItem onClick={() => {navigate('/change-password'); handleMenuClose();}}>
                            <ListItemIcon><Lock fontSize="small" /></ListItemIcon> Change Password
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                            <ListItemIcon><Logout fontSize="small" color="error" /></ListItemIcon> Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;