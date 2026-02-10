import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TeacherHomeScreen from '../screens/teacher/HomeScreen';
import TeacherCalendarScreen from '../screens/teacher/Calender';
import DailyScheduleScreen from '../screens/teacher/DailyScheduleScreen';
import PendingTaskScreen from '../screens/teacher/PendingTask';
import ProfileScreen from '../screens/teacher/Profile';
import EventsScreen from '../screens/teacher/EventsScreen';
import TeacherInboxScreen from '../screens/teacher/Inbox';
import Classes from '../screens/teacher/Classes';
import StudentDetailsScreen from '../screens/teacher/StudentDetailsScreen';
import StudentAttendanceScreen from '../screens/teacher/StudentAttendanceScreen';
import StudentPerformanceScreen from '../screens/teacher/StudentPerformanceScreen';
import StudentFeeDetailsScreen from '../screens/teacher/StudentFeeDetailsScreen';

const Stack = createNativeStackNavigator();

export default function TeacherAppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TeacherDashboard" component={TeacherHomeScreen} />
      <Stack.Screen name="TeacherClasses" component={Classes} />
      <Stack.Screen name="StudentDetails" component={StudentDetailsScreen} />
      <Stack.Screen name="StudentAttendance" component={StudentAttendanceScreen} />
      <Stack.Screen name="StudentPerformance" component={StudentPerformanceScreen} />
      <Stack.Screen name="StudentFeeDetails" component={StudentFeeDetailsScreen} />
      <Stack.Screen name="TeacherCalendar" component={TeacherCalendarScreen} />
      <Stack.Screen name="DailySchedule" component={DailyScheduleScreen} />
      <Stack.Screen name="PendingTasks" component={PendingTaskScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Events" component={EventsScreen} />
      <Stack.Screen name="TeacherInbox" component={TeacherInboxScreen} />
    </Stack.Navigator>
  );
}
