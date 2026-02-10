import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import StudentNavBar from '../../components/StudentNavBar';

export default function EventDetails({ route, navigation }: any) {
  const { event } = route.params;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#4A4A4A" />
        </TouchableOpacity>
        <Image
          source={require('../../../assets/h77.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={35} color="#4A4A4A" />
        </TouchableOpacity>
      </View>

      <Text style={styles.pageTitle}>Event Details</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color="#666" style={styles.icon} />
          <Text style={styles.infoText}>{event.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color="#666" style={styles.icon} />
          <Text style={styles.infoText}>{event.time}</Text>
        </View>
      </View>

      <StudentNavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  backButton: {
    marginRight: 15,
  },
  logo: {
    width: 35,
    height: 35,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A4A4A',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
  },
});
