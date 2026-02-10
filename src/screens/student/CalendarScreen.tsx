import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import StudentNavBar from '../../components/StudentNavBar';

const calendarData = [
  { date: '10', day: 'Today', event: 'Assignment due.' },
  { date: '11', day: 'Tomorrow', event: 'English Test' },
  { date: '12', day: 'Wednesday', event: '-' },
  { date: '13', day: 'Thursday', event: '-' },
  { date: '14', day: 'Friday', event: '-' },
  { date: '15', day: 'Saturday', event: 'Test' },
  { date: '16', day: 'Sunday', event: '-' },
];

export default function CalendarScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../../assets/h77.png')} style={styles.logo} resizeMode="contain" />
        <Ionicons name="person-circle-outline" size={28} color="#4A4E69" />
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.h1}>Calendar</Text>
        <View style={styles.calendarWrapper}>
          {calendarData.map((item, index) => (
            <TouchableOpacity key={index} style={styles.calendarItem} onPress={() => navigation.navigate('CalendarDetails', { item })}>
              <Text style={styles.date}>{item.date}</Text>
              <View style={styles.details}>
                <Text style={styles.day}>{item.day}</Text>
                <Text style={styles.event}>{item.event}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <StudentNavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  content: {
    paddingHorizontal: 20,
    flex: 1,
  },
  h1: {
    color: '#4A4E69',
    fontSize: 20,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  calendarWrapper: {
    borderWidth: 1,
    borderColor: '#efefef',
    borderRadius: 10,
    padding: 8,
  },
  calendarItem: {
    backgroundColor: '#f6f3fa',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  date: {
    fontSize: 18,
    width: 40,
    color: '#333',
  },
  details: {
    flexDirection: 'column',
  },
  day: {
    fontWeight: '600',
    color: '#333',
    fontSize: 15,
  },
  event: {
    color: '#888',
    fontSize: 14,
    marginTop: 2,
  },
});