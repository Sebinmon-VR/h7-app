import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Import your primary screens
import LoginScreen from './src/screens/LoginScreen';
import StudentAppStack from './src/navigation/StudentAppStack'; // Import the new student stack
import TeacherAppStack from './src/navigation/TeacherAppStack'; // Import the new teacher stack

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar hidden />
        {/* We start at Login */}
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          
          {/* 1. Login Screen */}
          <Stack.Screen name="Login" component={LoginScreen} />
          
          {/* 2. All Student-facing screens are now nested in this stack */}
          <Stack.Screen name="StudentApp" component={StudentAppStack} />

          {/* 3. All Teacher-facing screens are now nested in this stack */}
          <Stack.Screen name="TeacherApp" component={TeacherAppStack} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}