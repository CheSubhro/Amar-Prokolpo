
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ 
			tabBarActiveTintColor: '#343a40', 
			tabBarInactiveTintColor: '#6c757d',
			headerShown: false,
			tabBarStyle: { height: 60, paddingBottom: 5 }
		}}>
			<Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color} /> }} />
			<Tabs.Screen name="saved" options={{ title: 'Saved', tabBarIcon: ({color}) => <Ionicons name="heart" size={24} color={color} /> }} />
			<Tabs.Screen name="wishlist" options={{ title: 'Wishlist', tabBarIcon: ({color}) => <Ionicons name="list" size={24} color={color} /> }} />
			<Tabs.Screen name="support" options={{ title: 'Support', tabBarIcon: ({color}) => <Ionicons name="chatbubble" size={24} color={color} /> }} />
			<Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({color}) => <Ionicons name="person" size={24} color={color} /> }} />
		</Tabs>
	);
}