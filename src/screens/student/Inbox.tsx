import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import StudentNavBar from '../../components/StudentNavBar';

const InboxScreen = ({ navigation }: any) => {

  const inboxData = [
    { 
      id: '1', 
      type: 'assignment', 
      title: 'Submission Pending', 
      subTitle: 'Assignment', 
      course: 'Maths 101', 
      label: 'Last Date', 
      date: 'December 20',
      icon: 'information-circle-outline',
      iconColor: '#757575',
      accentColor: '#FF6B81' 
    },
    { 
      id: '2', 
      type: 'test', 
      title: 'Test Graded', 
      subTitle: 'English Test', 
      course: null, 
      score: '40/50',
      icon: 'checkmark-circle-outline',
      iconColor: '#4dabf5', 
      accentColor: '#4dabf5' 
    },
  ];

  const renderInboxItem = ({ item }: any) => (
    // 1. CHANGED: Changed View to TouchableOpacity and added onPress
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => {
        // Navigate to the Details Page and pass data if needed
        navigation.navigate('SubmissionDetail', { item: item });
      }}
    >
      <View style={styles.cardHeader}>
        <Ionicons name={item.icon} size={22} color={item.iconColor} style={{ marginRight: 8 }} />
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.subText}>{item.subTitle}</Text>
        {item.type === 'assignment' ? (
          <Text style={styles.courseText}>{item.course}</Text>
        ) : (
          <Text style={[styles.scoreText, { color: item.accentColor }]}>{item.score}</Text>
        )}
      </View>

      {item.type === 'assignment' && (
        <View style={styles.row}>
          <Text style={[styles.dateLabel, { color: item.accentColor }]}>{item.label}</Text>
          <Text style={[styles.dateText, { color: item.accentColor }]}>{item.date}</Text>
        </View>
      )}

      <View style={styles.viewButton}>
        <Text style={styles.viewText}>View</Text>
        <Ionicons name="chevron-forward" size={14} color="#888" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.container}>
        
        <View style={styles.header}>
          <Image source={require('../../../assets/h77.png')} style={styles.logo} resizeMode="contain" />
          <Ionicons name="person-circle-outline" size={32} color="#555" />
        </View>

        <Text style={styles.pageTitle}>Inbox</Text>

        <FlatList
          data={inboxData}
          renderItem={renderInboxItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

      </SafeAreaView>

      <StudentNavBar/>

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  listContent: {
    paddingBottom: 100, 
  },
  
  // Card Styles
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  subText: {
    color: '#666',
    fontSize: 14,
  },
  courseText: {
    color: '#444',
    fontSize: 14,
    fontWeight: '500',
  },
  scoreText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  viewText: {
    color: '#888',
    fontSize: 13,
    marginRight: 2,
  },
});

export default InboxScreen;