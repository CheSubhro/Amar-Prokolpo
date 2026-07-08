
import React, { useEffect, useState } from 'react';
import { Box, Container, CircularProgress } from '@mui/material';
import ProfileForm from '../../features/auth/ProfileForm';
import getCurrentUser  from '../../hooks/useAuth'; 

const ProfilePage = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await getCurrentUser();
                setUser(userData);
            } catch (error) {
                console.error("Failed to load profile", error);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <ProfileForm user={user} onUpdate={(data) => console.log(data)} />
            </Box>
        </Container>
    );
};

export default ProfilePage;