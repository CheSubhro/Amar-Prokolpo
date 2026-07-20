
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator,
         Linking, TouchableOpacity,Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { BASE_URL } from '@/constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SchemeDetails() {

    const { slug } = useLocalSearchParams();
    const [scheme, setScheme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/scheme/${slug}`);
                setScheme(response.data.data.scheme);
            } catch (error) {
                console.log("Detailed Error:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [slug]);

    const toggleSave = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            if (!token) {
                Alert.alert("Login Required", "Please login to save schemes");
                return;
            }

            const response = await axios.post(`${BASE_URL}/saved-schemes/toggle`, 
                { schemeId: scheme._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            setIsSaved(response.data.data.isSaved);
            Alert.alert("Success", response.data.message);
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Something went wrong");
        }
    };

    if (loading) return <ActivityIndicator size="large" color="#0056b3" style={{ marginTop: 50 }} />;
    if (!scheme) return <Text style={styles.errorText}>Scheme not found!</Text>;

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: scheme.image }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{scheme.title}</Text>
                <Text style={styles.shortDesc}>{scheme.shortDescription}</Text>
                <Text style={styles.desc}>{scheme.description}</Text>

                <View style={styles.infoBox}>
                    <Text style={styles.label}>Deadline: <Text style={styles.value}>{new Date(scheme.deadline).toLocaleDateString()}</Text></Text>
                    <Text style={styles.label}>Status: <Text style={[styles.value, {color: 'green'}]}>{scheme.status}</Text></Text>
                    <Text style={styles.label}>Helpline: <Text style={styles.value}>{scheme.helplineNumber}</Text></Text>
                    <Text style={styles.label}>Email: <Text style={styles.value}>{scheme.officialEmail}</Text></Text>
                </View>

                <Text style={styles.sectionHeading}>Benefits</Text>
                {scheme.benefits.map((item, index) => <Text key={index} style={styles.bullet}>• {item}</Text>)}

                <Text style={styles.sectionHeading}>Eligibility</Text>
                {scheme.eligibility.map((item, index) => <Text key={index} style={styles.bullet}>• {item}</Text>)}

                <Text style={styles.sectionHeading}>Application Process</Text>
                {scheme.applicationProcess.map((item, index) => <Text key={index} style={styles.bullet}>{index + 1}. {item}</Text>)}

                <Text style={styles.sectionHeading}>Required Documents</Text>
                {scheme.requiredDocuments.map((item, index) => <Text key={index} style={styles.bullet}>• {item}</Text>)}

                <TouchableOpacity style={styles.saveButton} onPress={toggleSave}>
                    <Text style={styles.saveButtonText}>
                        {isSaved ? "★ Saved" : "☆ Save Scheme"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.applyButton} onPress={() => Linking.openURL(scheme.applicationLink)}>
                    <Text style={styles.applyButtonText}>Apply Now</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9', paddingTop: 40 },
    image: { 
        width: '90%', 
        height: 250, 
        borderRadius: 20, 
        alignSelf: 'center', 
        marginTop: 20 
    },
    content: { padding: 20 },
    title: { fontSize: 26, fontWeight: 'bold', color: '#0056b3', marginBottom: 5 },
    shortDesc: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 10, fontStyle: 'italic' },
    desc: { fontSize: 16, color: '#555', marginBottom: 20, lineHeight: 22 },
    infoBox: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20, elevation: 2 },
    label: { fontWeight: 'bold', color: '#333', marginBottom: 5 },
    value: { fontWeight: 'normal', color: '#666' },
    sectionHeading: { fontSize: 20, fontWeight: 'bold', marginTop: 15, marginBottom: 10, color: '#0056b3' },
    bullet: { fontSize: 15, color: '#555', marginBottom: 5, paddingLeft: 10 },
    errorText: { textAlign: 'center', marginTop: 50, fontSize: 16 },
    saveButton: { 
        backgroundColor: '#f0f0f0', 
        padding: 15, 
        borderRadius: 10, 
        alignItems: 'center', 
        marginTop: 10, 
        borderWidth: 1,
        borderColor: '#ccc'
    },
    saveButtonText: { 
        color: '#333', 
        fontSize: 18, 
        fontWeight: 'bold' 
    },
    applyButton: { 
        backgroundColor: '#000000', 
        padding: 15, 
        borderRadius: 10, 
        alignItems: 'center', 
        marginTop: 15, 
        marginBottom: 50 
    },
    applyButtonText: { 
        color: '#fff', 
        fontSize: 18, 
        fontWeight: 'bold' 
    },

});