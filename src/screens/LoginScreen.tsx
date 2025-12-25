import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  Alert,
  Image,
  ImageSourcePropType 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

type UserRole = 'student' | 'parent' | 'staff';

// --- FAKE DATABASE ---
// This acts as our temporary backend.
const FAKE_DB = {
  student: { id: 'Feba', pass: '123' },
  parent:  { id: 'parent', pass: '123' },
  staff:   { id: 'staff', pass: '123' }
};

export default function LoginScreen({ navigation }: any) {
  const [role, setRole] = useState<UserRole>('student');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idError, setIdError] = useState('');
  const [passError, setPassError] = useState('');

  const getPlaceholder = () => {
    switch(role) {
      case 'student': return 'Student ID';
      case 'parent': return 'Parent ID';
      case 'staff': return 'Staff ID';
      default: return 'ID';
    }
  };

  const handleLogin = () => {
    // 1. Reset Errors
    setIdError('');
    setPassError('');
    let isValid = true;

    // 2. Basic Empty Check
    if (!id.trim()) {
      setIdError(`${getPlaceholder()} is required`);
      isValid = false;
    }
    if (!password.trim()) {
      setPassError('Password is required');
      isValid = false;
    }

    if (!isValid) return;

    // 3. FAKE DB LOGIC
    const targetUser = FAKE_DB[role]; // Get the allowed credentials for the current role

    // Check ID
    if (id !== targetUser.id) {
      setIdError(`Invalid ${role} ID`); // e.g. "Invalid student ID"
      return; 
    }

    // Check Password
    if (password !== targetUser.pass) {
      setPassError('Incorrect Password');
      return;
    }

    // 4. Success & Navigation
    if (role === 'student') {
      // Go to Student Dashboard
      navigation.replace('StudentDashboard', { userId: id });
    } else {
      // For Parent/Staff (We will activate these routes later)
      Alert.alert("Success", `Logged in as ${role} (Dashboard coming soon)`);
    }
  };


  // --- FORGOT PASSWORD FUNCTION ---
  const handleForgotPassword = () => {
    // Empty clickable action for now
    Alert.alert("Forgot Password", "This feature will be connected to the backend later.");
  };


  return (
    <LinearGradient colors={['#F9F4FC', '#aedefcff', '#fcc5edff']} style={styles.background}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.contentContainer}>
          
          {/* LOGO AREA - UPDATED */}
          <View style={styles.logoArea}>
             {/* This requires the file to be named 'logo.png' in the assets folder */}
             <Image 
                source={require('../../assets/h77.png')} 
                style={styles.logoImage} 
                resizeMode="contain"
             />
          </View>

          {/* INPUT FORM */}
          <View style={styles.formArea}>
            <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, idError ? styles.inputError : null]} 
                  placeholder={getPlaceholder()}
                  placeholderTextColor="#8F8F8F"
                  value={id}
                  onChangeText={(text) => { setId(text); setIdError(''); }} 
                />
                {idError ? <Text style={styles.errorText}>{idError}</Text> : null}
            </View>

            <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, passError ? styles.inputError : null]}
                  placeholder="Password"
                  placeholderTextColor="#8F8F8F"
                  value={password}
                  onChangeText={(text) => { setPassword(text); setPassError(''); }}
                  secureTextEntry={true} 
                />
                {passError ? <Text style={styles.errorText}>{passError}</Text> : null}
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginBtnText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotBtn} onPress={handleForgotPassword}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* 3. BUTTONS WITH CUSTOM IMAGES */}
          <View style={styles.roleRow}>
            <RoleButton 
              label="Student" 
              // MAKE SURE YOU HAVE THIS FILE IN ASSETS:
              imageSource={require('../../assets/student icon.png')} 
              isActive={role === 'student'} 
              onPress={() => setRole('student')} 
            />
            <RoleButton 
              label="Parent" 
              // MAKE SURE YOU HAVE THIS FILE IN ASSETS:
              imageSource={require('../../assets/parent icon.png')} 
              isActive={role === 'parent'} 
              onPress={() => setRole('parent')} 
            />
            <RoleButton 
              label="Staff" 
              // MAKE SURE YOU HAVE THIS FILE IN ASSETS:
              imageSource={require('../../assets/staff icon.png')} 
              isActive={role === 'staff'} 
              onPress={() => setRole('staff')} 
            />
          </View>

        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function RoleButton({ label, imageSource, isActive, onPress }: { label: string, imageSource: ImageSourcePropType, isActive: boolean, onPress: () => void }) {
  return (
    <TouchableOpacity 
      style={[styles.roleBtn, isActive ? styles.roleBtnActive : styles.roleBtnInactive]} 
      onPress={onPress}
    >
      {/* This renders your custom PNG image */}
      <Image 
        source={imageSource} 
        style={[styles.roleIcon, { tintColor: isActive ? '#5D5D5D' : '#6A5F80' }]} 
        resizeMode="contain"
      />
      <Text style={[styles.roleText, isActive ? styles.roleTextActive : styles.roleTextInactive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1 },
  contentContainer: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 30, paddingBottom: 50 },
  
  // Updated Logo Styles
  logoArea: { flex: 0.5, justifyContent: 'center', alignItems: 'center' },
  logoImage: { width: 150, height: 150 }, // Adjusted size for the logo

  formArea: { width: '100%', marginBottom: 50 },
  inputWrapper: { marginBottom: 15 }, 
  input: { backgroundColor: '#FFFFFF', height: 55, borderRadius: 12, paddingHorizontal: 20, fontSize: 15, borderWidth: 1, borderColor: '#E6E6E6' },
  inputError: { borderColor: '#FF4444', borderWidth: 1.5 },
  errorText: { color: '#FF4444', fontSize: 12, marginTop: 4 },
  loginBtn: { backgroundColor: '#fbbbf6ff', height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  loginBtnText: { color: '#4a4a4aff', fontSize: 16, fontWeight: '500' },

  // Forgot Password Styles
  forgotBtn: { alignSelf: 'flex-end', marginTop: 10 },
  forgotText: { color: '#666', fontSize: 13 },

  roleRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 30 },
  roleBtn: { flex: 1, aspectRatio: 1, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  roleBtnInactive: { backgroundColor: '#e7d7feff' },
  roleBtnActive: { backgroundColor: '#ffffffff', borderWidth: 1.5, borderColor: '#D1C4E9' },
  roleIcon: { width: 28, height: 40 },
  roleText: { fontSize: 13, fontWeight: '500' },
  roleTextInactive: { color: '#0d0d0fff' },
  roleTextActive: { color: '#06bafcff', fontWeight: '600' },
});