
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '@/constants/api'; 

export default function ProfileScreen() {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null); 
    const router = useRouter();

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            if (token) {
                const response = await apiClient.get('/users/current-user');
                setUserData(response.data.data);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await apiClient.delete('/users/logout');
            await AsyncStorage.removeItem('accessToken');
            setUserData(null);
            setIsLoggedIn(false);
            Alert.alert("Logged Out", "You have been logged out successfully.");
        } catch (error) {
            Alert.alert("Error", "Logout failed");
        }
    };

    if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

    return (
        <View style={styles.container}>
            {isLoggedIn && userData ? (
                <View style={styles.center}>
                    <Image source={{ uri: userData.avatar }} style={styles.avatar} />
                    <Text style={styles.title}>Welcome, {userData.fullName}!</Text>
                    <Text style={styles.info}>@{userData.username}</Text>
                    <Text style={styles.info}>{userData.email}</Text>
                    
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.center}>
                    <Text style={styles.title}>You are not logged in</Text>
                    <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/login')}>
                        <Text style={styles.buttonText}>Go to Login</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center' },
    center: { alignItems: 'center', padding: 20 },
    avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
    info: { fontSize: 16, color: '#666', marginBottom: 5 },
    loginButton: { backgroundColor: '#000', padding: 15, borderRadius: 8, width: '80%', alignItems: 'center', marginTop: 20 },
    logoutButton: { backgroundColor: '#ff4444', padding: 15, borderRadius: 8, width: '80%', alignItems: 'center', marginTop: 20 },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});