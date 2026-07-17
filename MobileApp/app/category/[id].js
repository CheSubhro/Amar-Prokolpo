
import React, { useEffect, useState } from 'react'; 
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router'; 
import axios from 'axios';
import { BASE_URL } from '@/constants/api';

export default function CategorySchemes() {

    const { id, name } = useLocalSearchParams();
    const router = useRouter(); 
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchemes = async () => {
            if (!id) return;
            try {
                const response = await axios.get(`${BASE_URL}/scheme/category/${id}`);
                setSchemes(response.data.data || []); 
            } catch (error) {
                console.error("Error fetching schemes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSchemes();
    }, [id]);

    if (loading) return <ActivityIndicator size="large" color="#0056b3" style={{ marginTop: 50 }} />;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{name ? name : "Category"} Schemes</Text>
            
            <FlatList 
                data={schemes}
                contentContainerStyle={styles.listContent} 
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.card}
                        onPress={() => router.push(`/schemes/${item.slug}`)}
                    >
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.subTitle}>{item.shortDescription}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No schemes found in this category.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#f4f7f6', 
        paddingHorizontal: 20,
        paddingTop: 50, 
    },
    header: { 
        fontSize: 22, 
        fontWeight: 'bold', 
        marginBottom: 20, 
        color: '#333' 
    },
    listContent: {
        paddingBottom: 20,
    },
    card: { 
        backgroundColor: '#fff', 
        padding: 15, 
        borderRadius: 10, 
        marginBottom: 10, 
        elevation: 3 
    },
    title: { fontSize: 16, fontWeight: 'bold', color: '#0056b3' },
    subTitle: { fontSize: 13, color: '#666', marginTop: 5 },
    emptyText: { textAlign: 'center', marginTop: 20, color: '#999' }
});