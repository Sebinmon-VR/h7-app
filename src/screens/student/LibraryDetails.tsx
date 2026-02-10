import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Image } from 'react-native';

// 1. Add 'route' to props to receive the data
const LibraryDetails = ({ navigation, route }: any) => {
  const [activeTab, setActiveTab] = useState('modules');
  
  // 2. Extract the passed subject data
  // If no subject is passed (testing), fallback to a default object
  const { subject } = route.params || { subject: { title: 'Science' } };

  // --- DATA ---
  const moduleData = [
    { id: '1', title: 'Module 1 Notes', updated: '05/08/2025' },
    { id: '2', title: 'Module 2 Notes', updated: '10/10/2025' },
  ];

  const notificationData = [
    { id: '1', title: 'Notes Added', date: '10/10/2025' },
    { id: '2', title: 'Assignment Submitted', date: '05/10/2025' },
    { id: '3', title: 'Test Graded', date: '05/10/2025' },
    { id: '4', title: 'Notes Added', date: '05/08/2025' },
    { id: '5', title: 'Test Graded', date: '05/08/2025' },
  ];

  const renderModuleItem = ({ item }: any) => (
    <TouchableOpacity style={styles.moduleCard} activeOpacity={0.7}>
      <Feather name="download" size={24} color="#555" style={styles.downloadIcon} />
      <View style={styles.moduleInfo}>
        <Text style={styles.moduleTitle}>{item.title}</Text>
        <Text style={styles.moduleDate}>Updated: {item.updated}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#555" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.contentContainer}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#555" />
          </TouchableOpacity>
          <Image source={require('../../../assets/h77.png')} style={styles.logo} resizeMode="contain" />
          <Ionicons name="person-circle-outline" size={32} color="#555" />
        </View>

        {/* Title and Toggle Buttons */}
        <View style={styles.titleSection}>
          <View style={styles.tagContainer}>
            {/* 3. Use the dynamic title here instead of hardcoded 'Science' */}
            <Text style={styles.tagText}>{subject.title}</Text>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[
                styles.iconButton, 
                activeTab === 'modules' ? styles.activeButton : styles.inactiveButton
              ]}
              onPress={() => setActiveTab('modules')}
            >
              <Ionicons 
                name="book-outline" 
                size={20} 
                color={activeTab === 'modules' ? "white" : "#555"} 
              />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.iconButton, 
                activeTab === 'notifications' ? styles.activeButton : styles.inactiveButton
              ]}
              onPress={() => setActiveTab('notifications')}
            >
              <Ionicons 
                name="notifications-outline" 
                size={20} 
                color={activeTab === 'notifications' ? "white" : "#555"} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- CONTENT AREA --- */}
        {activeTab === 'modules' ? (
          <FlatList
            data={moduleData}
            renderItem={renderModuleItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ListFooterComponent={
              <TouchableOpacity style={styles.filterButton}>
                <Ionicons name="filter-outline" size={18} color="#7a56c2" style={{ marginRight: 8 }} />
                <Text style={styles.filterButtonText}>Filter</Text>
              </TouchableOpacity>
            }
          />
        ) : (
          <View style={styles.notificationCard}>
            <FlatList 
              data={notificationData}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View style={[
                  styles.notifItem, 
                  index !== notificationData.length - 1 && styles.notifBorder
                ]}>
                  <View style={styles.bulletPoint} />
                  <View>
                    <Text style={styles.notifTitle}>{item.title}</Text>
                    <Text style={styles.notifDate}>{item.date}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        )}

      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity><Ionicons name="home-outline" size={28} color="white" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="calendar-outline" size={28} color="white" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="book-outline" size={28} color="white" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="chatbox-outline" size={28} color="white" /></TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  backButton: {
    paddingRight: 10,
  },
  logo: {
    width: 40,
    height: 40,
    flex: 1,
    textAlign: 'center',
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  tagContainer: {
    backgroundColor: '#9b7ad6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  tagText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 10,
    borderRadius: 12,
    marginLeft: 10,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#9b7ad6',
  },
  inactiveButton: {
    backgroundColor: '#F0F0F0',
  },
  listContent: {
    paddingBottom: 20,
  },
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  downloadIcon: {
    marginRight: 16,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  moduleDate: {
    fontSize: 12,
    color: '#888',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#7a56c2',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginTop: 10,
  },
  filterButtonText: {
    color: '#7a56c2',
    fontSize: 16,
    fontWeight: '500',
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 15,
  },
  notifBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  bulletPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#5d4099',
    marginTop: 6,
    marginRight: 15,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  notifDate: {
    fontSize: 12,
    color: '#888',
  },
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

export default LibraryDetails;