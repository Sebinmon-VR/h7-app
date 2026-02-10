import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TextInput, 
  ScrollView,
  TouchableOpacity,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 
import Svg, { Circle, G } from 'react-native-svg';

// --- MOCK DATABASE ---
const MOCK_DB = {
  studentName: "John Doe",
  attendance: {
    presentDays: 13,    
    absentDays: 1,       
    lastDayStatus: 'P'   
  },
  pendingTasks: [
    { id: 1, subject: "Math 101", type: "Test", timeLeft: "1hr", color: "#7E57C2" },
    { id: 2, subject: "Physics 101", type: "Test", timeLeft: "10hr", color: "#7E57C2" },
    { id: 3, subject: "Physics 102", type: "Assignment", timeLeft: "1d", color: "#AB47BC" },
    { id: 4, subject: "Chem 101", type: "Test", timeLeft: "1d", color: "#7E57C2" },
  ]
};

// --- REUSABLE COMPONENT: DONUT CHART ---
const DonutChart = ({ percentage = 0, radius = 35, strokeWidth = 8, color = "#4FC3F7", absentColor = "#ffffffff" }) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;
  const center = radius + strokeWidth;

  return (
    <View style={{ width: center * 2, height: center * 2, alignItems: 'center', justifyContent: 'center' }}>
      <Svg height={center * 2} width={center * 2} viewBox={`0 0 ${center * 2} ${center * 2}`}>
        <G rotation="90" origin={`${center}, ${center}`} scaleX={-1}>
          <Circle cx="50%" cy="50%" r={radius} stroke={absentColor} strokeWidth={strokeWidth} fill="transparent" />
          <Circle cx="50%" cy="50%" r={radius} stroke={color} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" fill="transparent" />
        </G>
      </Svg>
      <Text style={{ position: 'absolute', color: color, fontWeight: 'bold', fontSize: 15 }}>{percentage}%</Text>
    </View>
  );
};

export default function StudentHomeScreen({ route, navigation }: any) {
  const { userId } = route.params || { userId: 'Guest' }; 
  const data = MOCK_DB; 

  const present = data.attendance.presentDays;
  const absent = data.attendance.absentDays;
  const totalDays = present + absent;
  const calculatedPercentage = totalDays > 0 ? Math.round((present / totalDays) * 100) : 0;

  const MENU_LINKS = [
    { id: 1, title: "Circulars", icon: "document-text-outline" },
    { id: 2, title: "Calendar",    icon: "calendar-outline" },
    { id: 3, title: "Syllabus",  icon: "book-outline" },
    { id: 4, title: "Progress",  icon: "bar-chart-outline" },
  ];

  const handleMenuPress = (title: string) => {
    switch(title) {
      case 'Calendar': navigation.navigate('Calendar'); break;
      default: Alert.alert("Coming Soon", `The ${title} module is under development.`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* HEADER WITH NOTIFICATION ICON */}
        <View style={styles.headerRow}>
          <Image source={require('../../../assets/h77.png')} style={styles.logo} resizeMode="contain" />
          
          <View style={styles.headerIcons}>
            <TouchableOpacity 
              style={styles.notificationBtn} 
              onPress={() => navigation.navigate('Inbox')} // Matches your screenshot "Inbox"
            >
              <Ionicons name="notifications-outline" size={28} color="#4A4A4A" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Ionicons name="person-circle-outline" size={35} color="#4A4A4A" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.greetingText}>Hello, {userId}</Text>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput placeholder="Search.." placeholderTextColor="#999" style={styles.searchInput} />
        </View>

        {/* ATTENDANCE SECTION */}
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Attendance</Text></View>
        <View style={styles.cardsRow}>
           <View style={[styles.cardBase, styles.chartCard]}>
              <DonutChart percentage={calculatedPercentage} radius={32} color="#4FC3F7" absentColor="#f32e8d" />
           </View>
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
           <View style={[styles.cardBase, styles.lastDayCard]}>
               <Text style={styles.lastDayLabel}>LAST DAY</Text>
               <Text style={styles.lastDaySubLabel}>STATUS</Text>
               <View style={[styles.statusBox, data.attendance.lastDayStatus === 'P' ? styles.statusP : styles.statusA]}>
                  <Text style={styles.statusText}>{data.attendance.lastDayStatus}</Text>
               </View>
           </View>
        </View>

        <TouchableOpacity style={styles.viewMoreBtn} onPress={() => navigation.navigate('Attendance')}>
            <Text style={styles.viewMoreText}>View More</Text>
        </TouchableOpacity>

        {/* PENDING TASKS SECTION */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Pending Tasks</Text>
          <View style={styles.countBadge}><Text style={styles.countText}>{data.pendingTasks.length}</Text></View>
        </View>

        <View style={styles.tasksGrid}>
          {data.pendingTasks.slice(0, 4).map((task) => (
            <TouchableOpacity key={task.id} style={styles.taskCard} onPress={() => navigation.navigate('TaskDetails', { task })}>
              <Text style={styles.taskSubject}>{task.subject}</Text>
              <View style={styles.taskFooter}>
                <View style={[styles.taskTag, { backgroundColor: task.color }]}><Text style={styles.taskTagText}>{task.type}</Text></View>
                <View style={styles.timeRow}>
                  <Ionicons name="time-outline" size={14} color="#D32F2F" style={{ marginRight: 4 }} />
                  <Text style={styles.timeText}>{task.timeLeft}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.viewMoreBtn} onPress={() => navigation.navigate('PendingTask')}>
            <Text style={styles.viewMoreText}>View All</Text>
        </TouchableOpacity>

        {/* QUICK ACCESS MENU */}
        <View style={styles.menuGrid}>
          {MENU_LINKS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuCard} onPress={() => handleMenuPress(item.title)}>
              <View style={styles.menuContent}>
                <Ionicons name={item.icon as any} size={22} color="#7E57C2" style={styles.menuIcon} />
                <Text style={styles.menuText}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={18} color="#C4C4C4" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scrollContent: { padding: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  notificationBtn: { marginRight: 15, position: 'relative' },
  notificationDot: { position: 'absolute', top: 2, right: 2, backgroundColor: '#FF4081', width: 8, height: 8, borderRadius: 4, borderWidth: 1, borderColor: 'white' },
  logo: { width: 40, height: 40 }, 
  greetingText: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, paddingHorizontal: 15, height: 50 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
  sectionHeader: { marginTop: 25, marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#4A4A4A' },
  cardsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  cardBase: { backgroundColor: '#ebf3f8', borderRadius: 12, padding: 12, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  chartCard: { flex: 1 },
  statsCard: { flex: 1.5, alignItems: 'flex-start', paddingLeft: 15 },
  lastDayCard: { flex: 0.7, alignItems: 'center' },
  statRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, width: '100%' },
  badgePresent: { backgroundColor: '#4FC3F7', paddingVertical: 4, borderRadius: 6, width: 60, alignItems: 'center', marginRight: 8 },
  badgeAbsent: { backgroundColor: '#FF4081', paddingVertical: 4, borderRadius: 6, width: 60, alignItems: 'center', marginRight: 8 },
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
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', marginTop: 25, marginBottom: 10 },
  countBadge: { backgroundColor: '#7E57C2', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2, marginLeft: 10 },
  countText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  tasksGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  taskCard: { width: '48%', backgroundColor: '#ebf3f8', borderRadius: 12, padding: 15, elevation: 2 },
  taskSubject: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  taskFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  taskTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  taskTagText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  timeRow: { flexDirection: 'row', alignItems: 'center' },
  timeText: { color: '#D32F2F', fontSize: 12, fontWeight: '600' },
  menuGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, marginTop: 30 },
  menuCard: { width: '48%', backgroundColor: '#ffffff', borderRadius: 12, paddingVertical: 15, paddingHorizontal: 12, borderWidth: 1, borderColor: '#F0F0F0', elevation: 2 },
  menuContent: { flexDirection: 'row', alignItems: 'center' },
  menuIcon: { marginRight: 10 },
  menuText: { flex: 1, fontSize: 14, fontWeight: '600', color: '#333' },
});