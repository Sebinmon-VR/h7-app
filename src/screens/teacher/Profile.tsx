import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

const kColors = {
    ProfileCardBg: '#F3F0F7',
    ProfileIconContainer: '#DED5EC',
    ProfileIconColor: '#8E54C1',
    ButtonText: '#5D4087',
};

const ProfileButton = ({ label, onPress }: { label: string; onPress?: () => void }) => (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
);

export default function ProfileScreen({ navigation }: { navigation: NavigationProp<any> }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileCard}>
                <View style={styles.profileIconContainer}>
                    <Ionicons name="person-outline" size={40} color={kColors.ProfileIconColor} />
                </View>
                <View style={{ height: 10 }} />
                <Text style={styles.profileName}>Name</Text>
                <Text style={styles.profilePosition}>Position</Text>
            </View>

            <View style={{ height: 12 }} />
            <ProfileButton label="CIRCULARS" onPress={() => {}} />
            <View style={{ height: 12 }} />
            <ProfileButton label="EVENTS" onPress={() => navigation.navigate('Events')} />
            <View style={{ height: 12 }} />
            <ProfileButton label="ACCOUNT SETTINGS" onPress={() => {}} />

            <View style={{ flex: 1 }} />

            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>LOGOUT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16,
    },
    profileCard: {
        backgroundColor: kColors.ProfileCardBg,
        borderRadius: 12,
        paddingVertical: 30,
        alignItems: 'center',
        width: '100%',
    },
    profileIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: kColors.ProfileIconContainer,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    profilePosition: {
        color: 'grey',
        fontSize: 14,
    },
    btn: {
        backgroundColor: kColors.ProfileCardBg,
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        width: '100%',
    },
    btnText: {
        color: kColors.ButtonText,
        fontSize: 12,
        fontWeight: '600',
    },
    logoutButton: {
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        width: '100%',
        marginBottom: 20
    },
    logoutButtonText: {
        color: 'red',
        fontWeight: 'bold',
    },
});
