import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useAuthStore } from '../../stores/auth.store';

const ProfileScreen = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.value}>{user?.name}</Text>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{user?.email}</Text>
                <Text style={styles.label}>ID</Text>
                <Text style={styles.value}>{user?.id}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
        marginTop: 15,
    },
    value: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
    },
});

export default ProfileScreen;
