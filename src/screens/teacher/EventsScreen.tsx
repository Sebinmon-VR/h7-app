import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const kColors = {
    PrimaryPurple: '#8E54C1',
    CardBg: '#F3F0F7',
    TextGrey: '#4A4A4A',
};

const events = [
    { date: "December 10", time: "14:00", title: "Program Program" },
    { date: "December 25", time: "14:00", title: "Christmas" },
];

const EventItem = ({ event }: { event: { date: string; time: string; title: string } }) => (
    <View style={styles.eventItem}>
        <View style={styles.eventHeader}>
            <Text style={styles.eventDate}>{event.date}</Text>
            <Text style={styles.eventDate}>{event.time}</Text>
        </View>
        <View style={{ height: 4 }} />
        <Text style={styles.eventTitle}>{event.title}</Text>
    </View>
);

export default function EventsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Events</Text>
            <View style={{ height: 12 }} />
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="grey" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search.."
                    style={styles.searchInput}
                />
            </View>
            <View style={{ height: 16 }} />
            <FlatList
                data={events}
                renderItem={({ item }) => <EventItem event={item} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: kColors.PrimaryPurple,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 12,
        paddingHorizontal: 10,
    },
    searchIcon: {
        marginRight: 5,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
    eventItem: {
        backgroundColor: kColors.CardBg,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    eventHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    eventDate: {
        color: 'grey',
        fontSize: 13,
    },
    eventTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: kColors.TextGrey,
    },
});
