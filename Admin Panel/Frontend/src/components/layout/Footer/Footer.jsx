
import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Card, Tooltip } from '../../common/index'; 
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
    return (
        <Card sx={{ mt: 4, borderRadius: 0, bgcolor: 'grey.50' }}>
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    py: 2 
                }}
            >
                <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    Developed with <FavoriteIcon color="error" sx={{ mx: 0.5, fontSize: 16 }} /> by CheSubhro © {new Date().getFullYear()}
                </Typography>
                
                <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
                    <Tooltip title="View Documentation">
                        <Link href="#" underline="hover">Docs</Link>
                    </Tooltip>
                    <Tooltip title="Report a Bug">
                        <Link href="#" underline="hover">Support</Link>
                    </Tooltip>
                </Box>
            </Box>
        </Card>
    );
};

export default Footer;