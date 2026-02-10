import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';


// =====================================================================
// 1. MOCK DATABASE (TEMPORARY)
// =====================================================================
// FUTURE DATABASE PLAN:
// 1. The Backend Team will give you an API endpoint (e.g., GET /api/student/tasks/pending).
// 2. You will delete this 'FULL_TASK_LIST' constant.
// 3. The data structure below (id, subject, type, etc.) is what you should ask 
//    the backend team to send you.
const FULL_TASK_LIST = [
  { id: 1, subject: "Math 101", type: "Test", title: "Algebra Mid-Term", timeLeft: "1hr", color: "#7E57C2" },
  { id: 2, subject: "Physics 101", type: "Test", title: "Thermodynamics Quiz", timeLeft: "10hr", color: "#7E57C2" },
  { id: 3, subject: "Physics 102", type: "Assignment", title: "Lab Report: Gravity", timeLeft: "1d", color: "#780a8cff" },
  { id: 4, subject: "Chem 101", type: "Test", title: "Periodic Table Test", timeLeft: "1d", color: "#7E57C2" },
  { id: 5, subject: "Biology 101", type: "Homework", title: "Cell Structure Essay", timeLeft: "2d", color: "#20329bff" },
  { id: 6, subject: "English", type: "Test", title: "Grammar Pop Quiz", timeLeft: "3d", color: "#7E57C2" },
];

export default function PendingTaskScreen({ navigation }: any) {
  // =================================================================
  // 2. STATE MANAGEMENT
  // =================================================================
  // We use 'useState' so that if the database sends new tasks, 
  // the screen automatically re-renders to show them.
  const [tasks, setTasks] = useState(FULL_TASK_LIST);

  // =================================================================
  // 3. FUTURE API CONNECTION IDEA
  // =================================================================
  /*
  useEffect(() => {
     // This code runs once when the screen loads.
     const fetchPendingTasks = async () => {
        try {
           // A. Ask the server for data
           // const response = await fetch('https://your-school-api.com/tasks/pending');
           // const realData = await response.json();
           
           // B. Update the screen
           // setTasks(realData);
        } catch (error) {
           console.error("Connection Error:", error);
           // Optional: alert("Could not load tasks");
        }
     };

     fetchPendingTasks();
  }, []);
  */

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      
      {/* ============================================================
          HEADER SECTION (Logo + Back + Profile)
         ============================================================ */}
      <View style={styles.headerRow}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#4A4A4A" />
        </TouchableOpacity>
        
        {/* APP LOGO */}
        <Image 
          source={require('../../../assets/h77.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
        
        {/* Flexible Spacer: Pushes the Profile Icon to the far right */}
        <View style={{flex:1}} />
        
        {/* PROFILE ICON (Visual only for now) */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle-outline" size={35} color="#4A4A4A" />
        </TouchableOpacity>
      </View>

      {/* PAGE TITLE */}
      <Text style={styles.pageTitle}>Pending Tasks</Text>

      {/* ============================================================
          SCROLLABLE TASK LIST
         ============================================================ */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* LIST RENDERING LOGIC:
            We map through the 'tasks' state. 
            If the state is updated by the database, this list grows automatically.
        */}
        {tasks.map((task) => (
           <TouchableOpacity 
            key={task.id} 
            style={styles.taskRow}
            onPress={() => navigation.navigate('TaskDetails', { task })}
          >
            
            {/* 1. Left Color Strip (Visual Indicator for Subject) */}
            <View style={[styles.colorStrip, { backgroundColor: task.color }]} />

            {/* 2. Middle Content Area */}
            <View style={styles.taskContent}>
              
              {/* Row 1: Subject Name + Type Badge */}
              <View style={styles.rowTop}>
                <Text style={styles.subjectText}>{task.subject}</Text>
                
                {/* Dynamic Badge: We add '20' to hex color for transparency */}
                <View style={[styles.typeBadge, { backgroundColor: task.color + '20' }]}> 
                   <Text style={[styles.typeText, { color: task.color }]}>{task.type}</Text>
                </View>
              </View>
              
              {/* Row 2: Main Task Title */}
              <Text style={styles.taskTitle}>{task.title}</Text>
              
              {/* Row 3: Due Date */}
              <View style={styles.rowBottom}>
                <Ionicons name="time-outline" size={14} color="#D32F2F" />
                <Text style={styles.timeText}> Due in {task.timeLeft}</Text>
              </View>
            </View>

            {/* 3. Right Arrow */}
            <Ionicons name="chevron-forward" size={20} color="#CCC" />

          </TouchableOpacity>
        ))}
      </ScrollView>
      
    </SafeAreaView>
  );
}

// =====================================================================
// 4. STYLES
// =====================================================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  
  // Header Layout
  headerRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    marginTop: 10,
    marginBottom: 20 
  },
  backButton: { marginRight: 15 },
  logo: { width: 35, height: 35 },
  
  // Title Layout
  pageTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333', 
    paddingHorizontal: 20,
    marginBottom: 15 
  },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },

  // Task Card Design
  taskRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderRadius: 12, marginBottom: 15, paddingRight: 15,
    // Drop Shadow
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2,
    borderWidth: 1, borderColor: '#F5F5F5', overflow: 'hidden'
  },
  
  // Visual Elements
  colorStrip: { width: 6, height: '100%', marginRight: 12 },
  taskContent: { flex: 1, paddingVertical: 15 },
  
  // Text Styles
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  subjectText: { fontSize: 12, fontWeight: 'bold', color: '#888', textTransform: 'uppercase' },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  typeText: { fontSize: 10, fontWeight: 'bold' },
  taskTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8 },
  rowBottom: { flexDirection: 'row', alignItems: 'center' },
  timeText: { fontSize: 12, color: '#D32F2F', fontWeight: '500' }
});