
import { View, Text, StyleSheet } from 'react-native';

export default function SavedSchemes() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Saved Schemes Page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 18, fontWeight: 'bold' }
});