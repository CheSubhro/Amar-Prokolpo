
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const router = useRouter();

    return (
        <View style={styles.container}>
            {isLoggedIn ? (
                <View style={styles.center}>
                    <Text style={styles.title}>Welcome, User!</Text>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => setIsLoggedIn(false)}>
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
    title: { fontSize: 20, marginBottom: 20, fontWeight: 'bold' },
    loginButton: { backgroundColor: '#000', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center' },
    logoutButton: { backgroundColor: '#ff4444', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});