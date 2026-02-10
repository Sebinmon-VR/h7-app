import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StudentNavBar from '../components/StudentNavBar';

// Import all student screens
import StudentHomeScreen from '../screens/student/HomeScreen';
import AttendanceScreen from '../screens/student/AttendanceScreen';
import PendingTaskScreen from '../screens/student/PendingTaskScreen';
import EventsScreen from '../screens/student/EventScreen';
import ProfileScreen from '../screens/student/ProfileScreen';
import TaskDetailsScreen from '../screens/student/TaskDetails';
import EventDetailsScreen from '../screens/student/EventDetails';
import LibraryScreen from '../screens/student/Library';
import LibraryDetails from '../screens/student/LibraryDetails';
import SubjectsScreen from '../screens/student/SubjectsScreen';
import InboxScreen from '../screens/student/Inbox';
import SubmissionDetailScreen from '../screens/student/InboxDetails';
import CalendarScreen from '../screens/student/CalendarScreen';
import CalendarDetailsScreen from '../screens/student/CalendarDetails';
import ClassroomsScreen from '../screens/student/ClassroomsScreen';
import ClassDetailsScreen from '../screens/student/ClassDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack navigator for the Home tab
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Classrooms" component={ClassroomsScreen} />
      <Stack.Screen name="ClassDetails" component={ClassDetailsScreen} />
      <Stack.Screen name="StudentDashboard" component={StudentHomeScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="PendingTask" component={PendingTaskScreen} />
      <Stack.Screen name="Events" component={EventsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen name="Subjects" component={SubjectsScreen} />
    </Stack.Navigator>
  );
}

// Stack navigator for the Calendar tab
function CalendarStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="CalendarDetails" component={CalendarDetailsScreen} />
    </Stack.Navigator>
  );
}

// Stack navigator for the Library tab
function LibraryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Library" component={LibraryScreen} />
      <Stack.Screen name="LibraryDetails" component={LibraryDetails} />
    </Stack.Navigator>
  );
}

// Stack navigator for the Inbox tab
function InboxStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inbox" component={InboxScreen} />
      <Stack.Screen name="SubmissionDetail" component={SubmissionDetailScreen} />
    </Stack.Navigator>
  );
}

export default function StudentAppStack() {
  return (
    <Tab.Navigator
      tabBar={(props) => <StudentNavBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Calendar" component={CalendarStack} />
      <Tab.Screen name="Library" component={LibraryStack} />
      <Tab.Screen name="Inbox" component={InboxStack} />
    </Tab.Navigator>
  );
}
