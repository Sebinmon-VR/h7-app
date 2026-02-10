import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  FlatList, // Optimized list for scrolling large amounts of data
  Image 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import StudentNavBar from '../../components/StudentNavBar';

// =====================================================================
// 1. MOCK DATABASE (THE BLUEPRINT)
// =====================================================================
// FUTURE DB INSTRUCTION:
// When the backend is ready, ask them to send data in this exact format:
// { id: unique_number, title: "Event Name", date: "Month Day", time: "HH:MM" }
const MOCK_EVENTS_DB = [
  { id: '1', title: "Program Program", date: "December 10", time: "14:00" },
  { id: '2', title: "Christmas Celebration", date: "December 25", time: "14:00" },
  { id: '3', title: "Annual Sports Meet", date: "January 15", time: "09:00" },
  { id: '4', title: "Science Exhibition", date: "February 28", time: "10:30" },
  { id: '5', title: "Parent Teacher Meeting", date: "March 10", time: "09:00" },
];

export default function EventsScreen({ navigation }: any) {
  // =================================================================
  // 2. STATE MANAGEMENT
  // =================================================================
  // 'allEvents' holds the full list from the database.
  // 'displayedEvents' holds only what matches the search bar.
  const [allEvents, setAllEvents] = useState(MOCK_EVENTS_DB);
  const [displayedEvents, setDisplayedEvents] = useState(MOCK_EVENTS_DB);
  const [searchQuery, setSearchQuery] = useState('');

  // =================================================================
  // 3. FUTURE DATABASE CONNECTION (Simulated)
  // =================================================================
  /* useEffect(() => {
    // This function runs automatically when the screen opens.
    const fetchEvents = async () => {
       try {
          // A. Call the API
          // const response = await fetch('https://api.school.com/events');
          // const data = await response.json();
          
          // B. Update State
          // setAllEvents(data);
          // setDisplayedEvents(data); // Initially show everything
       } catch (error) {
          console.error("Failed to load events", error);
       }
    };
    fetchEvents();
  }, []);
  */

  // =================================================================
  // 4. SEARCH LOGIC (Client-Side Filtering)
  // =================================================================
  const handleSearch = (text: string) => {
    setSearchQuery(text);

    // Filter logic: Check if the Title OR Date contains the search text
    if (text.trim() === '') {
      setDisplayedEvents(allEvents); // Reset if search is empty
    } else {
      const filtered = allEvents.filter((item) => 
        item.title.toLowerCase().includes(text.toLowerCase()) || 
        item.date.toLowerCase().includes(text.toLowerCase())
      );
      setDisplayedEvents(filtered);
    }
  };

  // =================================================================
  // 5. RENDER ITEM (Design for Single Card)
  // =================================================================
  const renderEventItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => navigation.navigate('EventDetails', { event: item })}>
    <View style={styles.eventCard}>
      {/* Row 1: Date and Time */}
      <View style={styles.cardHeaderRow}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      
      {/* Row 2: Title */}
      <Text style={styles.titleText}>{item.title}</Text>
    </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      
      {/* --- HEADER (Consistent with other screens) --- */}
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
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle-outline" size={35} color="#4A4A4A" />
        </TouchableOpacity>
      </View>

      <Text style={styles.pageTitle}>Events</Text>

      {/* --- SEARCH BAR --- */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search.."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* --- EVENT LIST --- */}
      <FlatList
        data={displayedEvents}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        // If list is empty (Search found nothing), show this:
        ListEmptyComponent={
          <Text style={styles.emptyText}>No events found.</Text>
        }
      />

      <StudentNavBar />

    </SafeAreaView>
  );
}

// =====================================================================
// STYLES (Based on your Uploaded Image)
// =====================================================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  // Header
  headerRow: { 
    flexDirection: 'row', alignItems: 'center', 
    paddingHorizontal: 20, marginTop: 10, marginBottom: 10 
  },
  backButton: { marginRight: 15 },
  logo: { width: 35, height: 35 },
  pageTitle: { 
    fontSize: 22, fontWeight: 'bold', color: '#4A4A4A', 
    paddingHorizontal: 20, marginBottom: 15 
  },

  // Search Bar
  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1, borderColor: '#7E57C2', // Purple border as seen in screenshot concept
    borderRadius: 12,
    marginHorizontal: 20, marginBottom: 20,
    paddingHorizontal: 15, height: 50
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },

  // List Styles
  // 1. UPDATE THIS STYLE
  listContent: { 
    paddingHorizontal: 20, 
    paddingBottom: 100 // <--- Increased padding so last event isn't hidden
  },

  // Event Card Design (Matches Screenshot 2)
  eventCard: {
    backgroundColor: '#dbc9f5ff', // Light purple background
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8
  },
  dateText: { fontSize: 13, color: '#666' }, // Grey date
  timeText: { fontSize: 13, color: '#666' }, // Grey time
  
  titleText: { 
    fontSize: 16, fontWeight: 'bold', color: '#333' 
  },

  emptyText: { textAlign: 'center', marginTop: 30, color: '#999', fontSize: 16 }
});