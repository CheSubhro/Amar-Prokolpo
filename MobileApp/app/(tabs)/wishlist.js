
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import axios from 'axios';
import { BASE_URL } from '@/constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WishlistScreen() {
    
    const router = useRouter();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            if (!token) {
                router.replace('/login');
                return;
            }

            const response = await axios.get(`${BASE_URL}/wishlist`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWishlist(response.data.data || []);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
            Alert.alert("Error", "Could not load wishlist");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchWishlist();
        }, [])
    );

    if (loading) return <ActivityIndicator size="large" color="#0056b3" style={{ marginTop: 50 }} />;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Wishlist</Text>
            
            {wishlist.length === 0 ? (
                <Text style={styles.emptyText}>No items in wishlist.</Text>
            ) : (
                <FlatList
                    data={wishlist}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity 
                            style={styles.card}
                            onPress={() => router.push(`/schemes/${item.schemeId.slug}`)}
                        >
                            <View style={styles.indexContainer}>
                                <Text style={styles.indexText}>{index + 1}</Text>
                            </View>
                            <Image source={{ uri: item.schemeId.image }} style={styles.image} />
                            <View style={styles.info}>
                                <Text style={styles.title}>{item.schemeId.title}</Text>
                                <Text numberOfLines={2} style={styles.desc}>{item.schemeId.shortDescription}</Text>
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
    card: { flexDirection: 'row', backgroundColor: '#fff', marginBottom: 15, padding: 10, borderRadius: 12, elevation: 2, alignItems: 'center' },
    indexContainer: { width: 30, alignItems: 'center' },
    indexText: { fontSize: 16, fontWeight: 'bold', color: '#0056b3' },
    image: { width: 80, height: 80, borderRadius: 8 },
    info: { flex: 1, marginLeft: 10, justifyContent: 'center' },
    title: { fontSize: 16, fontWeight: 'bold' },
    desc: { fontSize: 12, color: '#666', marginTop: 4 }
});