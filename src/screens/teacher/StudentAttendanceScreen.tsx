import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StudentAttendanceScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#4A4A4A" />
        </TouchableOpacity>
        <Text style={styles.title}>Student Attendance</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  container: { flex: 1, padding: 20 },
  backButton: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#8E54B8' },
});

export default StudentAttendanceScreen;
