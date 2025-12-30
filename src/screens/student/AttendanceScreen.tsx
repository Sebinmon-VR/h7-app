import React, { useMemo } from 'react';
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
// 1. DATABASE MOCK (Minimal Info Needed)
// =====================================================================
const ATTENDANCE_DB = {
  month: "SEPTEMBER",
  year: 2025,
  today: 18, // The app knows "Today" is the 18th
  
  // Notice: We removed the hardcoded "stats" object. 
  // We will calculate it live.
  
  dailyStatus: {
    11: 'A', // Absent
    16: 'H', // Half-Day
    // 18 is handled as "Today" automatically
  }
};

export default function AttendanceScreen({ navigation }: any) {
  const data = ATTENDANCE_DB;
  
  // Calendar Configuration
  const daysInMonth = 30; 
  const startDayOffset = 0; // Monday start

  // =================================================================
  // 2. SMART GRID GENERATION & CALCULATION
  // =================================================================
  // We use useMemo so this only runs when data changes
  const { grid, stats } = useMemo(() => {
    let newGrid = [];
    let nextMonthDay = 1;
    
    // Counters
    let countPresent = 0;
    let countAbsent = 0;
    let countHalf = 0;
    let countNotMarked = 0;

    for (let i = 0; i < 35; i++) {
      let dayNumber = i - startDayOffset + 1;
      let isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      
      // Determine if it is a Sunday (Columns 7, 14, 21...)
      // index i=6 is Sunday (0-based index)
      let isSunday = (i + 1) % 7 === 0;

      if (isCurrentMonth) {
        let status = 'FUTURE'; 

        // LOGIC: Status for Past & Today
        if (dayNumber === data.today) {
           status = 'TODAY'; 
        } else if (dayNumber < data.today) {
           
           if (isSunday) {
             status = 'WEEKEND'; // Sundays are not "Present"
           } else {
             // Check DB or default to Present
             status = (data.dailyStatus as any)[dayNumber] || 'P';
             
             // --- LIVE COUNTING ---
             if (status === 'P') countPresent++;
             else if (status === 'A') countAbsent++;
             else if (status === 'H') countHalf++;
             else if (status === 'N') countNotMarked++;
           }
        } 
        
        newGrid.push({ type: 'current', day: dayNumber, status: status });
      } else {
        // Next/Prev Month logic
        if (dayNumber > daysInMonth) {
             newGrid.push({ type: 'next', day: nextMonthDay++ });
        } else {
             newGrid.push({ type: 'empty', day: '' });
        }
      }
    }

    return { 
      grid: newGrid, 
      stats: { p: countPresent, a: countAbsent, h: countHalf, n: countNotMarked } 
    };
  }, []);

  // =================================================================
  // 3. STYLING HELPERS
  // =================================================================
  const getBoxStyle = (item: any, index: number) => {
    if (item.type === 'next') return styles.dayBoxNextMonth;
    
    // Sundays (Column 7) always look plain
    const isSunday = (index + 1) % 7 === 0;
    if (isSunday) return styles.dayBoxSunday;

    switch (item.status) {
      case 'TODAY': return styles.dayEvent;   // Solid Purple (Day 18)
      case 'FUTURE': return styles.dayBox;    // Plain White
      case 'WEEKEND': return styles.dayBoxSunday; // Safety check
      
      case 'P': return styles.dayPresent; 
      case 'A': return styles.dayAbsent;  
      case 'H': return styles.dayHalf;    
      
      default: return styles.dayBox;
    }
  };

  const getTextStyle = (item: any, index: number) => {
    if (item.type === 'next') return styles.textNextMonth;
    const isSunday = (index + 1) % 7 === 0;
    if (isSunday) return styles.textSunday;

    if (item.status === 'TODAY') return styles.textWhite; 
    return styles.textDark;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* HEADER */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
             <Ionicons name="chevron-back" size={28} color="#4A4A4A" />
          </TouchableOpacity>
          <Image source={require('../../../assets/h77.png')} style={styles.logo} resizeMode="contain" />
          <View style={{flex:1}} /> 
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle-outline" size={35} color="#4A4A4A" />
        </TouchableOpacity>
        </View>

        <Text style={styles.pageTitle}>Attendance</Text>

        {/* --- DYNAMIC STATS GRID --- */}
        <View style={styles.statsGrid}>
           <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <View style={[styles.badge, { backgroundColor: '#4FC3F7' }]}>
                  <Text style={styles.badgeText}>Present</Text>
                </View>
                {/* AUTOMATIC NUMBER */}
                <Text style={[styles.statCount, { color: '#4FC3F7' }]}>{stats.p}</Text>
              </View>

              <View style={styles.statCard}>
                <View style={[styles.badge, { backgroundColor: '#FF4081' }]}>
                  <Text style={styles.badgeText}>Absent</Text>
                </View>
                {/* AUTOMATIC NUMBER */}
                <Text style={[styles.statCount, { color: '#FF4081' }]}>{stats.a}</Text>
              </View>
           </View>

           <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <View style={[styles.badge, { backgroundColor: '#FFF176' }]}>
                  <Text style={[styles.badgeText, {color:'#555'}]}>Half-Day</Text>
                </View>
                {/* AUTOMATIC NUMBER */}
                <Text style={[styles.statCount, { color: '#FBC02D' }]}>{stats.h}</Text>
              </View>

              <View style={styles.statCard}>
                <View style={[styles.badge, { backgroundColor: '#7E57C2' }]}>
                  <Text style={styles.badgeText}>Not Marked</Text>
                </View>
                {/* AUTOMATIC NUMBER */}
                <Text style={[styles.statCount, { color: '#7E57C2' }]}>{stats.n}</Text>
              </View>
           </View>
        </View>

        {/* CALENDAR WIDGET */}
        <View style={styles.calendarContainer}>
           <View style={styles.calHeader}>
              <Ionicons name="chevron-back" size={24} color="#CCC" />
              <Text style={styles.calMonthText}>{data.month} {data.year}</Text>
              <Ionicons name="chevron-forward" size={24} color="#CCC" />
           </View>

           <View style={styles.weekRow}>
              {['Mo','Tu','We','Th','Fr','Sa','Su'].map((d, i) => (
                <Text key={i} style={styles.weekDayText}>{d}</Text>
              ))}
           </View>

           <View style={styles.daysGrid}>
              {grid.map((item, index) => (
                <View 
                  key={index} 
                  style={[styles.dayBoxBase, getBoxStyle(item, index)]}
                >
                  <Text style={[styles.dayTextBase, getTextStyle(item, index)]}>
                    {item.day}
                  </Text>
                </View>
              ))}
           </View>
        </View>

      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('StudentDashboard')}>
           <Image source={require('../../../assets/home icon.png')} style={styles.navIcon} resizeMode="contain" />
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
// STYLES
// =====================================================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backButton: { marginRight: 15 },
  logo: { width: 35, height: 35 },
  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#4A4A4A', marginBottom: 20 },

  // STATS
  statsGrid: { gap: 12, marginBottom: 25 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  statCard: {
    flex: 1, backgroundColor: '#ebf3f8ff', borderRadius: 12, padding: 12,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    shadowColor: "#000", shadowOffset: { width: -3, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1
  },
  badge: { paddingVertical: 5, paddingHorizontal: 10, borderRadius: 6, minWidth: 70, alignItems: 'center' },
  badgeText: { color: 'white', fontSize: 11, fontWeight: 'bold' },
  statCount: { fontSize: 18, fontWeight: 'bold' },

  // CALENDAR
  calendarContainer: {
    backgroundColor: '#ebf3f8ff', 
    borderRadius: 16,
    padding: 15,
    paddingBottom: 25
  },
  calHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingHorizontal: 10 },
  calMonthText: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50' },
  
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  weekDayText: { width: '13.5%', textAlign: 'center', fontWeight: 'bold', fontSize: 13, color: '#000' },

  daysGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  
  dayBoxBase: {
    width: '13.5%', 
    aspectRatio: 1,
    justifyContent: 'center', alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  dayTextBase: { fontSize: 15, fontWeight: '500' },

  dayBox:       { backgroundColor: '#FFFFFF' },
  dayBoxSunday: { backgroundColor: '#FFFFFF', borderColor: '#aba4a4ff' }, 
  dayBoxNextMonth: { backgroundColor: '#e7e8e9ff' },

  dayPresent: { backgroundColor: '#FFFFFF', borderColor: '#4FC3F7' }, 
  dayAbsent:  { backgroundColor: '#FFFFFF', borderColor: '#FF4081' }, 
  dayHalf:    { backgroundColor: '#FFFFFF', borderColor: '#FBC02D' }, 
  dayEvent:   { backgroundColor: '#4c4c6d', borderColor: '#4c4c6d' }, 

  textDark:   { color: '#333' },
  textSunday: { color: '#CCC' }, 
  textNextMonth: { color: '#d1d1d1ff' }, 
  textWhite:  { color: '#FFF', fontWeight: 'bold' },

  // BOTTOM NAV
  bottomNav: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    backgroundColor: '#7E57C2', padding: 10,
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 10,
  },
  navItem: { alignItems: 'center', padding: 10 },
  navIcon: { width: 25, height: 20, tintColor: '#FFFFFF' },
});