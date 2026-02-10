import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function TaskDetailsScreen({ route, navigation }: any) {
  // --- 1. Get the task data passed from the previous screen ---
  const { task } = route.params || {};

  // --- 2. Handle case where no task is found ---
  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#4A4A4A" />
          </TouchableOpacity>
        </View>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Task not found.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.goBackLink}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // --- 3. Main Render ---
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      
      {/* HEADER: Back Button, Logo, Profile Icon */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#4A4A4A" />
        </TouchableOpacity>
        <Image 
          source={require('../../../assets/h77.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
        <View style={{flex: 1}} />
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle-outline" size={35} color="#4A4A4A" />
        </TouchableOpacity>
      </View>

      {/* PAGE TITLE */}
      <Text style={styles.pageTitle}>Task Details</Text>

      {/* --- CONTENT CONTAINER --- */}
      <View style={styles.content}>
        
        {/* Subject and Type Badge */}
        <View style={styles.detailRow}>
          <Text style={styles.subjectText}>{task.subject}</Text>
          <View style={[styles.typeBadge, { backgroundColor: task.color + '20' }]}>
            <Text style={[styles.typeText, { color: task.color }]}>{task.type}</Text>
          </View>
        </View>

        {/* Task Title */}
        <Text style={styles.taskTitle}>{task.title}</Text>
        
        {/* Due Date */}
        <View style={styles.dueDateRow}>
          <Ionicons name="time-outline" size={20} color="#D32F2F" />
          <Text style={styles.timeText}>Due in {task.timeLeft}</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />
        
        {/* Placeholder for more details */}
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>
            No specific description has been added for this task yet. This area can be used to display more detailed instructions, attached files, or any other relevant information provided by the instructor.
        </Text>
        
      </View>

    </SafeAreaView>
  );
}

// --- 4. STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  errorText: { fontSize: 18, color: '#333', marginBottom: 10 },
  goBackLink: { fontSize: 16, color: '#7E57C2', fontWeight: 'bold' },

  // Header
  headerRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    marginTop: 10,
    marginBottom: 20 
  },
  backButton: { marginRight: 15 },
  logo: { width: 35, height: 35 },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  // Content
  content: {
    paddingHorizontal: 25,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subjectText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
    textTransform: 'uppercase',
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginTop: 5,
    marginBottom: 15,
  },
  dueDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 25
  },
  timeText: {
    fontSize: 16,
    color: '#D32F2F',
    fontWeight: '600',
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
});