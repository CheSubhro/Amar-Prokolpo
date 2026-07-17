
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import apiClient from '@/constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

export default function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {

        if (!email || !password) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        setLoading(true);
        
        try {
            const response = await apiClient.post('/users/login', {
                email: email, 
                username: email, 
                password: password
            });
            
            const token = response.data.data.accessToken;
            await AsyncStorage.setItem('accessToken', token);
            
            Alert.alert("Success", "Login Successful!");
            router.replace('/(tabs)'); 
        } catch (error) {
            console.log("Full Error Object:", JSON.stringify(error, null, 2));
            const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
            Alert.alert("Login Failed", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Email or Username"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword} 
                    autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons 
                        name={showPassword ? "eye-off" : "eye"} 
                        size={24} 
                        color="gray" 
                        style={{ paddingRight: 5 }}
                    />
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Login</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity 
                style={{ marginTop: 20 }} 
                onPress={() => router.push('/register')}
            >
                <Text style={styles.registerText}>
                    Don't have an account? <Text style={{ fontWeight: 'bold', color: '#0056b3' }}>Register</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        padding: 20, 
        backgroundColor: '#fff' 
    },
    title: { 
        fontSize: 28, 
        fontWeight: 'bold', 
        marginBottom: 30, 
        textAlign: 'center' 
    },
    input: { 
        height: 50, 
        borderColor: '#ccc', 
        borderWidth: 1, 
        borderRadius: 8, 
        paddingHorizontal: 15, 
        marginBottom: 15 
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        height: 50,
    },
    passwordInput: {
        flex: 1,
        height: 50,
    },
    button: { 
        backgroundColor: '#000000', 
        height: 50, 
        borderRadius: 8, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    buttonText: { 
        color: '#fff', 
        fontSize: 18, 
        fontWeight: 'bold' 
    },
    registerText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#555',
    },
});