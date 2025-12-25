import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TextInput, 
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 
import Svg, { Circle, G } from 'react-native-svg';

// --- CUSTOM SVG DONUT COMPONENT ---
// This draws a circle using standard math. No crashy libraries.
const DonutChart = ({ percentage = 0, radius = 35, strokeWidth = 8, color = "#4FC3F7" }) => {
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <View style={{ width: halfCircle * 2, height: halfCircle * 2, alignItems: 'center', justifyContent: 'center' }}>
      <Svg 
        height={halfCircle * 2} 
        width={halfCircle * 2} 
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          {/* Background Circle (Light Blue) */}
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeOpacity={0.2}
            fill="transparent"
          />
          {/* Progress Circle (Dark Blue) */}
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </G>
      </Svg>
      {/* Text in the middle */}
      <Text style={{ position: 'absolute', color: color, fontWeight: 'bold', fontSize: 16 }}>
        {percentage}%
      </Text>
    </View>
  );
};

export default function StudentHomeScreen({ route, navigation }: any) {
  const { userId } = route.params || { userId: 'Guest' }; 

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* --- HEADER --- */}
        <View style={styles.headerRow}>
          <Image 
            source={require('../../../assets/h77.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
          <TouchableOpacity>
             <Ionicons name="person-circle-outline" size={35} color="#4A4A4A" />
          </TouchableOpacity>
        </View>

        <Text style={styles.greetingText}>Hello, {userId}</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search.." 
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

        {/* --- ATTENDANCE SECTION --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Attendance</Text>
        </View>

        <View style={styles.attendanceCard}>
           
           {/* THE NEW STABLE CHART */}
           <DonutChart percentage={90} radius={35} color="#4FC3F7" />

           {/* Stats */}
           <View style={styles.statsContainer}>
              <View style={styles.statRow}>
                 <View style={styles.badgePresent}>
                    <Text style={styles.badgeText}>Present</Text>
                 </View>
                 <Text style={styles.statNumber}>15</Text>
              </View>
              
              <View style={styles.statRow}>
                 <View style={styles.badgeAbsent}>
                    <Text style={styles.badgeText}>Absent</Text>
                 </View>
                 <Text style={styles.statNumberError}>1</Text>
              </View>
           </View>

           {/* Last Day */}
           <View style={styles.lastDayContainer}>
               <Text style={styles.lastDayLabel}>LAST DAY</Text>
               <View style={styles.pSquare}>
                  <Text style={styles.pText}>P</Text>
               </View>
           </View>

        </View>

        <TouchableOpacity style={styles.viewMoreBtn}>
           <Text style={styles.viewMoreText}>View More</Text>
        </TouchableOpacity>

        {/* NEXT SECTION PLACEHOLDER */}
        <View style={{ marginTop: 20 }}>
          <Text style={{color: '#ccc', textAlign: 'center'}}>... Pending Tasks Coming Next ...</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

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

  sectionHeader: { marginTop: 25, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#4A4A4A' },

  attendanceCard: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2,
  },

  statsContainer: { flexDirection: 'column', gap: 10 },
  statRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  
  badgePresent: { backgroundColor: '#4FC3F7', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6, width: 70, alignItems: 'center' },
  badgeAbsent:  { backgroundColor: '#FF4081', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6, width: 70, alignItems: 'center' },
  badgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#4FC3F7' },
  statNumberError: { fontSize: 18, fontWeight: 'bold', color: '#FF4081' },

  lastDayContainer: { alignItems: 'center', justifyContent: 'center', paddingLeft: 10, borderLeftWidth: 1, borderLeftColor: '#EEE' },
  lastDayLabel: { fontSize: 10, color: '#888', marginBottom: 5 },
  pSquare: { width: 30, height: 30, backgroundColor: '#4FC3F7', borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  pText: { color: 'white', fontWeight: 'bold' },

  viewMoreBtn: { alignSelf: 'flex-end', marginTop: 10 },
  viewMoreText: { color: '#9575CD', fontWeight: '600' } 
});