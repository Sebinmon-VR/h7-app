import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native'; // Needed for Reset Action
import StudentNavBar from '../../components/StudentNavBar';

// =====================================================================
// 1. MOCK USER DATA
// =====================================================================
// FUTURE DB CONNECTION:
// You will fetch this info from your backend (e.g., GET /api/student/profile)
const MOCK_PROFILE = {
  name: "Feba",
  position: "Student", // Or "Class 10-A"
};

export default function ProfileScreen({ navigation }: any) {
  const user = MOCK_PROFILE;

  // =================================================================
  // 2. LOGOUT LOGIC (CRITICAL)
  // =================================================================
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: 'destructive',
          onPress: () => {
             // RESET ACTION: This wipes the history so the back button doesn't work.
             navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                })
             );
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      
      {/* HEADER ROW */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#4A4A4A" />
        </TouchableOpacity>
        <Image 
          source={require('../../../assets/h77.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
        <View style={{flex:1}} /> 
        <Ionicons name="person-circle-outline" size={35} color="#4A4A4A" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* --- SECTION 1: BLUE PROFILE CARD --- */}
        <View style={styles.profileCard}>
           {/* Purple Avatar Circle */}
           <View style={styles.avatarContainer}>
              <Ionicons name="person-outline" size={30} color="#7E57C2" />
           </View>
           
           <Text style={styles.userName}>{user.name}</Text>
           <Text style={styles.userPosition}>{user.position}</Text>
        </View>

        {/* --- SECTION 2: PLACEHOLDERS (White Boxes) --- */}
        {/* Large Empty Box */}
        <View style={styles.largeBox} />

        {/* Small Empty Box */}
        <View style={styles.smallBox} />

        {/* ACCOUNT SETTINGS BUTTON */}
        <TouchableOpacity style={styles.settingsButton}>
           <Text style={styles.settingsText}>ACCOUNT SETTINGS</Text>
        </TouchableOpacity>

        {/* --- SECTION 3: LOGOUT BUTTON --- */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
           <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* --- BOTTOM NAVIGATION BAR (Visual Only) --- */}
        <StudentNavBar />

    </SafeAreaView>
  );
}

// =====================================================================
// STYLES
// =====================================================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  
  // Header
  headerRow: { 
    flexDirection: 'row', alignItems: 'center', 
    paddingHorizontal: 20, marginTop: 10, marginBottom: 20 
  },
  backButton: { marginRight: 15 },
  logo: { width: 35, height: 35 },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },

  // --- PROFILE CARD (Blue Border) ---
  profileCard: {
    borderWidth: 2,
    borderColor: '#2196F3', // The specific Blue from screenshot
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20
  },
  avatarContainer: {
    width: 60, height: 60,
    borderRadius: 30,
    backgroundColor: '#F3E5F5', // Light purple bg for avatar
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 10
  },
  userName: { fontSize: 16, fontWeight: 'bold', color: '#555' },
  userPosition: { fontSize: 14, color: '#888' },

  // --- PLACEHOLDERS ---
  largeBox: {
    height: 150,
    borderWidth: 1, borderColor: '#E0E0E0',
    borderRadius: 12,
    marginBottom: 15
  },
  smallBox: {
    height: 50,
    borderWidth: 1, borderColor: '#E0E0E0',
    borderRadius: 12,
    marginBottom: 15
  },
  settingsButton: {
    height: 50,
    borderWidth: 1, borderColor: '#E0E0E0',
    borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 40 // Space before logout
  },
  settingsText: { color: '#555', fontWeight: '600', fontSize: 13 },

  // --- LOGOUT BUTTON ---
  logoutButton: {
    height: 55,
    borderWidth: 1, 
    borderColor: '#D32F2F', // Red Border
    borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 20
  },
  logoutText: { color: '#D32F2F', fontWeight: 'bold', fontSize: 14 },

  
});