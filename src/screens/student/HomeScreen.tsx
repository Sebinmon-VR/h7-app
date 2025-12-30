import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TextInput, 
  ScrollView,
  TouchableOpacity,
  Alert // Added for the "Coming Soon" popup
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 
import Svg, { Circle, G } from 'react-native-svg';

// =====================================================================
// 1. MOCK DATABASE (THE BLUEPRINT)
// =====================================================================
// FUTURE DATABASE PLAN:
// 1. The Backend will provide an API endpoint (e.g., GET /api/student/dashboard).
// 2. That API will return a JSON object exactly like this 'MOCK_DB'.
// 3. You will replace this constant with a state variable (see 'StudentHomeScreen' below).
const MOCK_DB = {
  studentName: "John Doe",
  studentId: "STU01",
  attendance: {
    // The backend usually sends raw numbers; we calculate the percentage in the app.
    presentDays: 13,    
    absentDays: 1,       
    lastDayStatus: 'P'   
  },

  // The backend will send an array of tasks. 
  // If the array is empty [], the app should show "No pending tasks".
  pendingTasks: [
    { id: 1, subject: "Math 101", type: "Test", timeLeft: "1hr", color: "#7E57C2" },
    { id: 2, subject: "Physics 101", type: "Test", timeLeft: "10hr", color: "#7E57C2" },
    { id: 3, subject: "Physics 102", type: "Assignment", timeLeft: "1d", color: "#AB47BC" },
    { id: 4, subject: "Chem 101", type: "Test", timeLeft: "1d", color: "#7E57C2" },
    { id: 5, subject: "Biology 101", type: "Homework", timeLeft: "2d", color: "#5C6BC0" },
    { id: 6, subject: "English", type: "Test", timeLeft: "3d", color: "#7E57C2" },
  ]
};

// =====================================================================
// 2. REUSABLE COMPONENT: DONUT CHART
// =====================================================================
// This component draws the circular progress bar using SVG math.
const DonutChart = ({ 
  percentage = 0, 
  radius = 35, 
  strokeWidth = 8, 
  color = "#4FC3F7",       
  absentColor = "#ffffffff"  
}) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;
  const center = radius + strokeWidth;

  return (
    <View style={{ width: center * 2, height: center * 2, alignItems: 'center', justifyContent: 'center' }}>
      <Svg 
        height={(radius + strokeWidth) * 2} 
        width={(radius + strokeWidth) * 2} 
        viewBox={`0 0 ${(radius + strokeWidth) * 2} ${(radius + strokeWidth) * 2}`}
      >
        <G rotation="90" origin={`${center}, ${center}`} scaleX={-1}>
          <Circle cx="50%" cy="50%" r={radius} stroke={absentColor} strokeWidth={strokeWidth} fill="transparent" strokeOpacity={1} />
          <Circle cx="50%" cy="50%" r={radius} stroke={color} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" fill="transparent" />
        </G>
      </Svg>
      <Text style={{ position: 'absolute', color: color, fontWeight: 'bold', fontSize: 15 }}>
        {percentage}%
      </Text>
    </View>
  );
};

// =====================================================================
// 3. MAIN SCREEN
// =====================================================================
export default function StudentHomeScreen({ route, navigation }: any) {
  // Receives the User ID from the Login Screen
  const { userId } = route.params || { userId: 'Guest' }; 
  
  // FUTURE DATA LOADING:
  // const [data, setData] = useState(null);
  // useEffect(() => { fetchDashboardData().then(response => setData(response)); }, []);
  // For now, we use MOCK_DB directly:
  const data = MOCK_DB; 

  // --- ATTENDANCE CALCULATION LOGIC ---
  // In the future, if the backend sends the percentage directly, you can skip this math.
  const present = data.attendance.presentDays;
  const absent = data.attendance.absentDays;
  const totalDays = present + absent;
  const calculatedPercentage = totalDays > 0 
    ? Math.round((present / totalDays) * 100) 
    : 0;

  // --- MENU LINKS CONFIGURATION ---
  // This array defines the buttons at the bottom.
  const MENU_LINKS = [
    { id: 1, title: "Circulars", icon: "document-text-outline" },
    { id: 2, title: "Events",    icon: "calendar-outline" }, // <--- We will connect this
    { id: 3, title: "Syllabus",  icon: "book-outline" },
    { id: 4, title: "Progress",  icon: "bar-chart-outline" },
  ];

  // --- NAVIGATION HANDLER (The Brains of the Menu) ---
  const handleMenuPress = (title: string) => {
    switch(title) {
      case 'Events':
        // Navigates to the EventScreen.tsx we created
        navigation.navigate('Events'); 
        break;
      case 'Circulars':
      case 'Syllabus':
      case 'Progress':
        // Placeholder for features we haven't built yet
        Alert.alert("Coming Soon", `The ${title} module is under development.`);
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container} >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* HEADER */}
        <View style={styles.headerRow}>
          <Image source={require('../../../assets/h77.png')} style={styles.logo} resizeMode="contain" />
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle-outline" size={35} color="#4A4A4A" />
          </TouchableOpacity>
        </View>

        <Text style={styles.greetingText}>Hello, {userId}</Text>

        {/* SEARCH BAR (Visual Only for now) */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput placeholder="Search.." placeholderTextColor="#999" style={styles.searchInput} />
        </View>

        {/* --- ATTENDANCE SECTION --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Attendance</Text>
        </View>

        <View style={styles.cardsRow}>
           {/* CARD 1: DONUT CHART */}
           <View style={[styles.cardBase, styles.chartCard]}>
              <DonutChart 
                 percentage={calculatedPercentage} 
                 radius={32} 
                 color="#4FC3F7" 
                 absentColor="#f32e8dff" 
              />
           </View>

           {/* CARD 2: STATS */}
           <View style={[styles.cardBase, styles.statsCard]}>
              <View style={styles.statRow}>
                 <View style={styles.badgePresent}><Text style={styles.badgeText}>Present</Text></View>
                 <Text style={styles.statNumber}>{present}</Text>
              </View>
              <View style={styles.statRow}>
                 <View style={styles.badgeAbsent}><Text style={styles.badgeText}>Absent</Text></View>
                 <Text style={styles.statNumberError}>{absent}</Text>
              </View>
           </View>

           {/* CARD 3: STATUS */}
           <View style={[styles.cardBase, styles.lastDayCard]}>
               <Text style={styles.lastDayLabel}>LAST DAY</Text>
               <Text style={styles.lastDaySubLabel}>STATUS</Text>
               {/* Logic to change color based on P (Present) or A (Absent) */}
               <View style={[styles.statusBox, data.attendance.lastDayStatus === 'P' ? styles.statusP : styles.statusA]}>
                  <Text style={styles.statusText}>{data.attendance.lastDayStatus}</Text>
               </View>
           </View>
        </View>

        {/* VIEW MORE BUTTON - Navigates to AttendanceScreen.tsx */}
        <TouchableOpacity 
           style={styles.viewMoreBtn} 
           onPress={() => navigation.navigate('Attendance')}
        >
           <Text style={styles.viewMoreText}>View More</Text>
        </TouchableOpacity>


        {/* --- PENDING TASKS SECTION --- */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Pending Tasks</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{data.pendingTasks.length}</Text>
          </View>
        </View>

        <View style={styles.tasksGrid}>
          {/* We use .slice(0, 4) to only show the top 4 tasks on Home Screen */}
          {data.pendingTasks.slice(0, 4).map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <Text style={styles.taskSubject}>{task.subject}</Text>
              <View style={styles.taskFooter}>
                <View style={[styles.taskTag, { backgroundColor: task.color }]}>
                  <Text style={styles.taskTagText}>{task.type}</Text>
                </View>
                <View style={styles.timeRow}>
                  <Ionicons name="time-outline" size={14} color="#D32F2F" style={{ marginRight: 4 }} />
                  <Text style={styles.timeText}>{task.timeLeft}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* View All Button - Navigates to PendingTaskScreen.tsx */}
        <TouchableOpacity 
          style={styles.viewMoreBtn} 
          onPress={() => navigation.navigate('PendingTasks')} 
        >
            <Text style={styles.viewMoreText}>View All</Text>
        </TouchableOpacity>


        {/* --- QUICK ACCESS MENU (Events, etc.) --- */}
        <View style={styles.menuGrid}>
          {MENU_LINKS.map((item) => (
            <TouchableOpacity 
                key={item.id} 
                style={styles.menuCard}
                // THIS CONNECTS THE BUTTON TO THE NAVIGATION HANDLER
                onPress={() => handleMenuPress(item.title)}
            >
              <View style={styles.menuContent}>
                <Ionicons name={item.icon as any} size={22} color="#7E57C2" style={styles.menuIcon} />
                <Text style={styles.menuText}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={18} color="#C4C4C4" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* BOTTOM SPACER to make scrolling easier */}
        <View style={{ height: 40 }} />

      </ScrollView>


      {/* --- BOTTOM NAVIGATION BAR (Static/Visual for now) --- */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
           <Image source={require('../../../assets/home1 icon.png')} style={styles.navIcon} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
           <Image source={require('../../../assets/calendar icon.png')} style={styles.navIcon} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
           <Image source={require('../../../assets/library icon.png')} style={styles.navIcon} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
           <Image source={require('../../../assets/inbox icon.png')} style={styles.navIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

// =====================================================================
// 4. STYLES
// =====================================================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 20 },
  
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  logo: { width: 40, height: 40 }, 
  greetingText: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 15 },

  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, paddingHorizontal: 15, height: 50,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },

  sectionHeader: { marginTop: 25, marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#4A4A4A' },

  // --- CARD LAYOUT ---
  cardsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch', gap: 12 },
  
  cardBase: {
    backgroundColor: '#ebf3f8ff', 
    borderRadius: 12, padding: 12, justifyContent: 'center', alignItems: 'center',
    shadowColor: "#000000ff", shadowOffset: { width: -5, height: 2}, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
  },
  chartCard:   { flex: 1 },
  statsCard:   { flex: 1.5, alignItems: 'flex-start', paddingLeft: 15 },
  lastDayCard: { flex: 0.7, alignItems: 'center' },

  statRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, width: '100%' },
  badgePresent: { backgroundColor: '#4FC3F7', paddingVertical: 4, borderRadius: 6, width: 60, alignItems: 'center', marginRight: 8 },
  badgeAbsent:  { backgroundColor: '#FF4081', paddingVertical: 4, borderRadius: 6, width: 60, alignItems: 'center', marginRight: 8 },
  badgeText: { color: 'white', fontSize: 11, fontWeight: 'bold' },
  statNumber: { fontSize: 16, fontWeight: 'bold', color: '#4FC3F7' },
  statNumberError: { fontSize: 16, fontWeight: 'bold', color: '#FF4081' },

  lastDayLabel: { fontSize: 10, color: '#888', fontWeight: '600' },
  lastDaySubLabel: { fontSize: 10, color: '#888', fontWeight: '600', marginBottom: 5 },
  statusBox: { width: 30, height: 30, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  statusP: { backgroundColor: '#4FC3F7' }, 
  statusA: { backgroundColor: '#FF4081' }, 
  statusText: { color: 'white', fontWeight: 'bold' },

  viewMoreBtn: { alignSelf: 'flex-end', marginTop: 10 },
  viewMoreText: { color: '#9575CD', fontWeight: '600' },
  
  // --- PENDING TASKS STYLES ---
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', marginTop: 25, marginBottom: 10 },
  countBadge: { backgroundColor: '#7E57C2', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2, marginLeft: 10 },
  countText: { color: 'white', fontWeight: 'bold', fontSize: 12 },

  tasksGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  taskCard: {
    width: '48%', 
    backgroundColor: '#ebf3f8ff', 
    borderRadius: 12, padding: 15,
    shadowColor: "#000000ff", shadowOffset: { width: -5, height: 2}, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
  },
  taskSubject: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  taskFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  taskTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  taskTagText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  timeRow: { flexDirection: 'row', alignItems: 'center' },
  timeText: { color: '#D32F2F', fontSize: 12, fontWeight: '600' },

  // --- MENU GRID STYLES ---
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 30,
  },
  menuCard: {
    width: '48%', 
    backgroundColor: '#ffffffff',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    flex: 1, 
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  },
  // --- BOTTOM NAVIGATION STYLES ---
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'center',
    backgroundColor: '#7e57c2ff',
    paddingTop: 10,

    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: -2 }, 
  
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, 
  },
  navIcon: {
    width: 25,  
    height: 20,
    tintColor: '#ffffffff', 
  },
});