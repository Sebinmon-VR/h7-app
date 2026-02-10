import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import StudentNavBar from '../../components/StudentNavBar';

const timeSlots = [
  { time: '10 am', subject: 'English' },
  { time: '11 am', subject: 'Maths' },
  { time: '12 pm', subject: '-' },
  { time: '1 pm', subject: '-' },
  { time: '2 pm', subject: '-' },
];

export default function CalendarDetailsScreen({ route, navigation }: any) {
  const { item } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#888" />
          </TouchableOpacity>
          <Image source={require('../../../assets/h77.png')} style={styles.logo} resizeMode="contain" />
        </View>
        <Ionicons name="person-circle-outline" size={30} color="#4A4E69" />
      </View>

      <View style={styles.content}>
        <View style={styles.scheduleCard}>
          <View style={styles.scheduleHeader}>
            <Text style={styles.dateNum}>{item.date}</Text>
            <Text style={styles.dayLabel}>{item.day}</Text>
          </View>
          <View style={styles.timeSlots}>
            {timeSlots.map((slot, index) => (
              <View key={index} style={styles.slot}>
                <Text style={styles.time}>{slot.time}</Text>
                <Text style={slot.subject === '-' ? styles.emptySlot : styles.subject}>
                  {slot.subject}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

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
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  scheduleCard: {
    borderWidth: 1,
    borderColor: '#efefef',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  scheduleHeader: {
    backgroundColor: '#f6f3fa',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  dateNum: {
    fontSize: 20,
    color: '#333',
  },
  dayLabel: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  timeSlots: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  slot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
  },
  time: {
    fontSize: 15,
    color: '#333',
    width: 60,
  },
  subject: {
    fontSize: 15,
    color: '#999',
    fontWeight: '400',
  },
  emptySlot: {
    color: '#ccc',
  },
});