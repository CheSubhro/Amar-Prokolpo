
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '@/constants/api';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

export default function TabLayout() {

	const [savedCount, setSavedCount] = useState(0);

	const fetchSavedCount = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            if (token) {
                const response = await axios.get(`${BASE_URL}/saved-schemes/list`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSavedCount(response.data.data ? response.data.data.length : 0);
            }
        } catch (error) {
            console.log("Error fetching badge count");
        }
    };

	useFocusEffect(
        useCallback(() => {
            fetchSavedCount();
        }, [])
    );

	return (
		<Tabs screenOptions={{ 
            tabBarActiveTintColor: '#343a40', 
            tabBarInactiveTintColor: '#6c757d',
            headerShown: false,
            tabBarStyle: { height: 60, paddingBottom: 5 }
        }}>
            <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color} /> }} />
            
            <Tabs.Screen 
				name="saved" 
				options={{ 
					title: 'Saved', 
					tabBarIcon: ({color}) => <Ionicons name="heart" size={24} color={color} />,
					tabBarBadge: savedCount > 0 ? savedCount : undefined 
				}} 
			/>

            <Tabs.Screen name="wishlist" options={{ title: 'Wishlist', tabBarIcon: ({color}) => <Ionicons name="list" size={24} color={color} /> }} />
            <Tabs.Screen name="support" options={{ title: 'Support', tabBarIcon: ({color}) => <Ionicons name="chatbubble" size={24} color={color} /> }} />
            <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({color}) => <Ionicons name="person" size={24} color={color} /> }} />
        </Tabs>
	);
}