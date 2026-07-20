
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { BASE_URL } from '@/constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router'; 
import { useCallback } from 'react';

export default function SavedSchemesScreen() {

    const router = useRouter();
    const [savedSchemes, setSavedSchemes] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            fetchSavedSchemes();
        }, [])
    );
    
    const fetchSavedSchemes = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            if (!token) {
                Alert.alert("Error", "Please login to view saved schemes");
                router.replace('/login');
                return;
            }

            const response = await axios.get(`${BASE_URL}/saved-schemes/list`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSavedSchemes(response.data.data || []);
        } catch (error) {
            console.error("Error fetching saved schemes:", error);
            Alert.alert("Error", "Could not load saved schemes");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <ActivityIndicator size="large" color="#0056b3" style={{ marginTop: 50 }} />;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Saved Schemes</Text>
            
            {savedSchemes.length === 0 ? (
                <Text style={styles.emptyText}>No schemes saved yet.</Text>
            ) : (
                <FlatList
                    data={savedSchemes}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.card}
                            onPress={() => router.push(`/schemes/${item.scheme.slug}`)}
                        >
                            <Image source={{ uri: item.scheme.image }} style={styles.image} />
                            <View style={styles.info}>
                                <Text style={styles.title}>{item.scheme.title}</Text>
                                <Text numberOfLines={2} style={styles.desc}>{item.scheme.shortDescription}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f4f7f6', padding: 20, paddingTop: 60 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#666' },
    card: { flexDirection: 'row', backgroundColor: '#fff', marginBottom: 15, padding: 10, borderRadius: 12, elevation: 2 },
    image: { width: 80, height: 80, borderRadius: 8 },
    info: { flex: 1, marginLeft: 10, justifyContent: 'center' },
    title: { fontSize: 16, fontWeight: 'bold' },
    desc: { fontSize: 12, color: '#666', marginTop: 4 }
});