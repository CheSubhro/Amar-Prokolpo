
import React from 'react';
import { Box, Container, CircularProgress, Typography  } from '@mui/material';
import ProfileForm from '../../features/auth/ProfileForm';
import {useAuth}  from '../../hooks/useAuth'; 

const ProfilePage = () => {

    const { user: authUser, isLoading: authLoading,checkAuth } = useAuth();

    if (authLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!authUser) return <Typography>User data not available.</Typography>;

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <ProfileForm user={authUser} onUpdate={(data) => console.log(data)} />
            </Box>
        </Container>
    );
};

export default ProfilePage;