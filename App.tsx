import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 1. IMPORT THE SCREENS
import LoginScreen from './src/screens/LoginScreen';
// This is the new file you just created:
import StudentHomeScreen from './src/screens/student/HomeScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Screen 1: Login (The Default) */}
        <Stack.Screen name="Login" component={LoginScreen} />
        
        {/* Screen 2: Student Dashboard */}
        {/* The name here "StudentDashboard" must match what you wrote in LoginScreen */}
        <Stack.Screen name="StudentDashboard" component={StudentHomeScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}