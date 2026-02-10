import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

const events = [
  { date: '10', day: 'Today', task: 'Assignment grading due.' },
  { date: '11', day: 'Tomorrow', task: 'English Test' },
  { date: '12', day: 'Wednesday', task: '-' },
  { date: '13', day: 'Thursday', task: '-' },
  { date: '14', day: 'Friday', task: '-' },
  { date: '15', day: 'Saturday', task: 'Test' },
  { date: '16', day: 'Sunday', task: '-' },
  { date: '17', day: 'Monday', task: '-' },
];

const kColors = {
  BottomNavPurple: '#844EC6',
};

const TeacherCalendarScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeading}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>H</Text>
          </View>
        </View>
        <Ionicons
          name="person-circle"
          color={'#51417A'}
          size={36}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>Calendar</Text>
        <FlatList
          data={events}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('DailySchedule')}>
              <View style={styles.card}>
                <Text style={styles.date}>{item.date}</Text>
                <View style={styles.eventDetails}>
                  <Text style={styles.day}>{item.day}</Text>
                  <Text style={styles.task}>{item.task}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={26} color="white" />
        <Ionicons name="calendar" size={32} color="white" />
        <Ionicons name="book-outline" size={26} color="white" />
        <Ionicons name="chatbubble-outline" size={26} color="white" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerLeading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#7540C1',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#F7F4F9',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  date: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    width: 30,
  },
  eventDetails: {
    marginLeft: 20,
    flex: 1,
  },
  day: {
    fontSize: 18,
    fontWeight: '500',
  },
  task: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    height: 75,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: kColors.BottomNavPurple,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});

export default TeacherCalendarScreen;