
import React,{ useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,ActivityIndicator,Image } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { BASE_URL } from '@/constants/api';

export default function HomeScreen() {

    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/category/all`); 
            setCategories(response.data.data || response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSchemes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/scheme/top-viewed`); 
            setSchemes(response.data.data || response.data);
        } catch (error) {
            console.error("Error fetching schemes:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchSchemes();
    }, []);

    if (loading) return <ActivityIndicator size="large" color="#0056b3" style={{ marginTop: 50 }} />;

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
                    <TouchableOpacity 
                        key={cat.id ? cat.id.toString() : index.toString()} 
                        style={styles.box}
                    >
                        <Image 
                            source={{ uri: cat.icon }} 
                            style={{ width: 30, height: 30 }} 
                            resizeMode="contain"
                        />
                        <Text style={styles.boxText}>{cat.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.sectionTitle}>Trending Schemes</Text>
            {schemes.map((scheme) => (
                <TouchableOpacity key={scheme._id} style={styles.schemeCard}>
                    <Image source={{ uri: scheme.image }} style={styles.schemeImage} />
                    <View style={styles.schemeInfo}>
                        <Text style={styles.schemeName}>{scheme.title}</Text>
                        <Text numberOfLines={2} style={styles.schemeDesc}>{scheme.description}</Text>
                    </View>
                </TouchableOpacity>
            ))}
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
    boxText: { marginTop: 8, fontSize: 10, fontWeight: '600', textAlign: 'center' },
    schemeCard: { 
        flexDirection: 'row', 
        backgroundColor: '#fff', 
        marginHorizontal: 20, 
        marginBottom: 10, 
        padding: 10, 
        borderRadius: 12,
        elevation: 2 
    },
    schemeImage: { width: 80, height: 80, borderRadius: 8 },
    schemeInfo: { flex: 1, marginLeft: 10, justifyContent: 'center' },
    schemeName: { fontSize: 16, fontWeight: 'bold' },
    schemeDesc: { fontSize: 12, color: '#666', marginTop: 4 }
});