
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
    
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm">
            <Box sx={{ 
                height: '100vh', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                textAlign: 'center' 
            }}>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Typography variant="h1" sx={{ fontWeight: 800, fontSize: '8rem', color: 'primary.main' }}>
                        404
                    </Typography>
                    <Typography variant="h4" sx={{ mb: 2, color: 'text.secondary' }}>
                        Page Not Found
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                        Oops! The page you are looking for does not exist.
                    </Typography>
                    <Button 
                        variant="contained" 
                        size="large"
                        onClick={() => navigate('/')}
                        sx={{ borderRadius: '25px', px: 5, py: 1.5 }}
                    >
                        Go Back Home
                    </Button>
                </motion.div>
            </Box>
        </Container>
    );
};

export default NotFound;