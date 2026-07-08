
import React, { useEffect, useState } from 'react';
import { Box, Container, CircularProgress } from '@mui/material';
import ProfileForm from '../../features/auth/ProfileForm';
import {useAuth}  from '../../hooks/useAuth'; 

const ProfilePage = () => {

    const { user: authUser, checkAuth, isLoading: authLoading } = useAuth();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                await checkAuth();
            } catch (error) {
                console.error("Failed to load profile", error);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, [checkAuth]);

    if (loading || authLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <ProfileForm user={authUser} onUpdate={(data) => console.log(data)} />
            </Box>
        </Container>
    );
};

export default ProfilePage;