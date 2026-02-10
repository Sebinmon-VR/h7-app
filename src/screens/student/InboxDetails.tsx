import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const SubmissionDetailScreen = ({ navigation }: any) => {

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.container}>
        
        {/* --- Header --- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#555" />
          </TouchableOpacity>
          
          <Text style={styles.logoText}>H</Text> 
          
          <Ionicons name="person-circle-outline" size={32} color="#555" />
        </View>

        {/* --- Assignment Detail Card --- */}
        <View style={styles.card}>
          {/* Header Icon + Title */}
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle-outline" size={24} color="#757575" style={{ marginRight: 8 }} />
            <Text style={styles.cardTitle}>Submission Pending</Text>
          </View>

          {/* Details Row 1 */}
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Assignment</Text>
              <Text style={styles.subLabel}>Not submitted</Text>
            </View>
            <Text style={styles.courseText}>Maths 101</Text>
          </View>

          {/* Details Row 2 (Dates) */}
          <View style={[styles.row, { marginTop: 15 }]}>
            <Text style={styles.dateLabel}>Last Date</Text>
            <Text style={styles.dateValue}>December 20</Text>
          </View>
        </View>

        {/* --- Action Buttons --- */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>UPLOAD FILE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>

      {/* --- Bottom Navigation Bar --- */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Subjects')}>
          <Ionicons name="home-outline" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="calendar-outline" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="book-outline" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="chatbox-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  backButton: {
    paddingRight: 10,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#87CEEB',
    fontStyle: 'italic',
    // Center logic adjustment
    marginLeft: -30, 
  },

  // Card Styles
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    // Shadows
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600', // Semi-bold
    color: '#444',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 15,
    color: '#444',
    fontWeight: '500',
  },
  subLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  courseText: {
    fontSize: 15,
    color: '#444',
    fontWeight: '500',
  },
  dateLabel: {
    fontSize: 15,
    color: '#FF6B81', // Pinkish Red
    fontWeight: '500',
  },
  dateValue: {
    fontSize: 15,
    color: '#FF6B81', // Pinkish Red
    fontWeight: '500',
  },

  // Button Styles
  actionContainer: {
    marginTop: 10,
  },
  uploadButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadButtonText: {
    color: '#555',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  submitButton: {
    backgroundColor: '#7a56c2', // The theme purple
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // Bottom Navigation Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: '#7a56c2',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
  },
});

export default SubmissionDetailScreen;