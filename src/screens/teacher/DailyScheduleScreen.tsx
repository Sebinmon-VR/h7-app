import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

const kColors = {
  BottomNavPurple: '#844EC6',
};

const ScheduleRow = ({ time, subject }: { time: string; subject: string }) => (
  <View style={styles.scheduleRow}>
    <Text style={styles.scheduleTime}>{time}</Text>
    <Text style={styles.scheduleSubject}>{subject}</Text>
  </View>
);

const DailyScheduleScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="grey" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>H</Text>
          </View>
        </View>
        <Ionicons name="person-circle-outline" size={32} color="#7540C1" />
      </View>
      <View style={styles.body}>
        <View style={styles.scheduleContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View style={styles.scheduleHeader}>
              <Text style={styles.scheduleDate}>10</Text>
              <Text style={styles.scheduleDay}>Today</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.scheduleItems}>
            <ScheduleRow time="10 am" subject="English" />
            <ScheduleRow time="11 am" subject="Maths" />
            <ScheduleRow time="-" subject="" />
            <ScheduleRow time="-" subject="" />
            <ScheduleRow time="-" subject="" />
          </View>
        </View>
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
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 12,
    color: '#3498db',
  },
  body: {
    flex: 1,
    padding: 16,
  },
  scheduleContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: 'white',
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F7F4F9',
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
  },
  scheduleDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scheduleDay: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 20,
  },
  scheduleItems: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  scheduleTime: {
    fontSize: 16,
    color: '#333',
  },
  scheduleSubject: {
    fontSize: 14,
    color: 'grey',
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

export default DailyScheduleScreen;