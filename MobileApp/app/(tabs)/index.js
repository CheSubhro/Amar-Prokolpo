
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {

    const router = useRouter();

    const categories = [
        { name: 'Suraksha', icon: 'shield' },
        { name: 'Kaushal', icon: 'build' },
        { name: 'Shiksha', icon: 'school' },
        { name: 'Krishi', icon: 'leaf' },
        { name: 'Griha', icon: 'home' },
        { name: 'Nari', icon: 'woman' },
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Hero Section */}
            <View style={styles.heroSection}>
                <Text style={styles.heroTitle}>Amar Prokolpo</Text>
                <Text style={styles.heroSubtitle}>Access all government schemes right at your fingertips.</Text>
                <TouchableOpacity style={styles.heroButton} onPress={() => router.push('/login')}>
                    <Text style={styles.heroButtonText}>Login to Apply</Text>
                </TouchableOpacity>
            </View>

            {/* Main Content Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Latest Updates</Text>
                <Text style={styles.cardText}>Check out the newest schemes and apply based on your eligibility.</Text>
            </View>

            {/* Categories Section */}
            <Text style={styles.sectionTitle}>Browse by Categories</Text>
            <View style={styles.gridContainer}>
                {categories.map((cat, index) => (
                    <TouchableOpacity key={index} style={styles.box}>
                        <Ionicons name={cat.icon} size={24} color="#0056b3" />
                        <Text style={styles.boxText}>{cat.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f4f7f6' },
    heroSection: { 
        backgroundColor: '#0056b3', 
        padding: 40, 
        paddingTop: 60,
        borderBottomLeftRadius: 30, 
        borderBottomRightRadius: 30,
        alignItems: 'center',
        marginBottom: 20
    },
    heroTitle: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
    heroSubtitle: { color: '#e0e0e0', textAlign: 'center', marginVertical: 10, fontSize: 14 },
    heroButton: { backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 25, borderRadius: 20, marginTop: 10 },
    heroButtonText: { color: '#0056b3', fontWeight: 'bold' },
    card: { backgroundColor: '#fff', padding: 20, marginHorizontal: 20, borderRadius: 15, elevation: 3 },
    cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    cardText: { fontSize: 14, color: '#444' },
    section: { marginTop: 20, paddingHorizontal: 20 },
    sectionTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 15, 
        color: '#333',
        marginLeft: 15, 
    },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    gridContainer: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between', 
        paddingHorizontal: 20 
    },
    box: { 
        backgroundColor: '#fff', 
        padding: 15, 
        borderRadius: 12, 
        alignItems: 'center', 
        width: '30%', 
        marginBottom: 15, 
        elevation: 2 
    },
    boxText: { marginTop: 8, fontSize: 10, fontWeight: '600', textAlign: 'center' }
});