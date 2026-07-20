
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '@/constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Support() {
    const [formData, setFormData] = useState({
        name: '', email: '', phoneNumber: '', subject: '', message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            Alert.alert("Error", "Please fill all required fields");
            return;
        }

        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('accessToken');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            await axios.post(`${BASE_URL}/support/create`, formData, { headers });
            
            Alert.alert("Success", "Support ticket submitted successfully!");
            setFormData({ name: '', email: '', phoneNumber: '', subject: '', message: '' });
        } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Help & Support</Text>
            
            <TextInput style={styles.input} placeholder="Name" value={formData.name} onChangeText={(val) => setFormData({...formData, name: val})} />
            <TextInput style={styles.input} placeholder="Email" value={formData.email} onChangeText={(val) => setFormData({...formData, email: val})} keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Phone Number" value={formData.phoneNumber} onChangeText={(val) => setFormData({...formData, phoneNumber: val})} keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="Subject" value={formData.subject} onChangeText={(val) => setFormData({...formData, subject: val})} />
            <TextInput style={[styles.input, { height: 100 }]} placeholder="Message" value={formData.message} onChangeText={(val) => setFormData({...formData, message: val})} multiline />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit Ticket</Text>}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#f9f9f9' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
    submitButton: { backgroundColor: "#000000", padding: 15, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});