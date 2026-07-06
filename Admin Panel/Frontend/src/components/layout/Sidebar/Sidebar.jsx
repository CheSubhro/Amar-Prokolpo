
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = ({ open, onClose }) => {

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon /> },
        { text: 'Users', icon: <PeopleIcon /> },
        { text: 'Settings', icon: <SettingsIcon /> },
    ];

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
            }}
        >
        <Box p={2} textAlign="center" fontWeight="bold" fontSize="1.2rem">
            Admin Panel
        </Box>
        <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem button key={item.text} onClick={onClose}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;