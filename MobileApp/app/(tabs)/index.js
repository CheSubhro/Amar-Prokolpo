
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.subtitle}>Explore our latest schemes</Text>
            </View>

            {/* Main Content Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Latest Update</Text>
                <Text style={styles.cardText}>Check out the new schemes available for you today.</Text>
                
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => router.push('/login')} 
                >
                    <Text style={styles.buttonText}>Go to Login</Text>
                </TouchableOpacity>
            </View>

            {/* Simple List Placeholder */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <View style={styles.box}><Text>Health Schemes</Text></View>
                <View style={styles.box}><Text>Education Schemes</Text></View>
                <View style={styles.box}><Text>Business Loans</Text></View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
    header: { marginBottom: 30, marginTop: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#333' },
    subtitle: { fontSize: 16, color: '#666' },
    card: { backgroundColor: '#fff', padding: 20, borderRadius: 15, marginBottom: 20, elevation: 3 },
    cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    cardText: { fontSize: 14, color: '#444', marginBottom: 15 },
    button: { backgroundColor: '#000', padding: 12, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    section: { marginTop: 10 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    box: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#eee' }
});