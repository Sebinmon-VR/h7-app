import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import ALL your screens
import LoginScreen from './src/screens/LoginScreen';
import StudentHomeScreen from './src/screens/student/HomeScreen';
import AttendanceScreen from './src/screens/student/AttendanceScreen';
import PendingTaskScreen from './src/screens/student/PendingTaskScreen';
import EventsScreen from './src/screens/student/EventScreen';
import ProfileScreen from './src/screens/student/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* We start at Login */}
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          
          {/* 1. Login Screen */}
          <Stack.Screen name="Login" component={LoginScreen} />
          
          {/* 2. Student Dashboard (Renamed from "Home" to match your LoginScreen code) */}
          <Stack.Screen name="StudentDashboard" component={StudentHomeScreen} />
          
          {/* 3. Attendance Screen */}
          <Stack.Screen name="Attendance" component={AttendanceScreen} />

          {/* 4. Pending Tasks Screen */}
          <Stack.Screen name="PendingTasks" component={PendingTaskScreen} />

          {/* 5. Events Screen */}
          <Stack.Screen name="Events" component={EventsScreen} />

          {/* 6. Profile Screen */}
          <Stack.Screen name="Profile" component={ProfileScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}