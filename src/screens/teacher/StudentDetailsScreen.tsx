import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StudentDetailsScreen = ({ navigation }) => {
  const brandPurple = '#8E54B8';
  const lightGreyBg = '#F3F0F7';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#4A4A4A" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="person-circle-outline" size={30} color="#4A4A4A" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Text style={[styles.headerTitle, { color: brandPurple }]}>Student Details</Text>
          
          <View style={[styles.card, { backgroundColor: lightGreyBg }]}>
            <View>
              <Text style={styles.cardTitle}>Name</Text>
              <Text style={styles.cardSubtitle}>Detail</Text>
              <Text style={styles.cardSubtitle}>Detail</Text>
            </View>
            <View style={[styles.avatar, { backgroundColor: `${brandPurple}1A` }]} />
          </View>

          <DetailButton text="ATTENDANCE" bgColor={lightGreyBg} onPress={() => navigation.navigate('StudentAttendance')} />
          <DetailButton text="TEST PERFORMANCE" bgColor={lightGreyBg} onPress={() => navigation.navigate('StudentPerformance')} />
          <DetailButton text="FEE DETAILS" bgColor={lightGreyBg} onPress={() => navigation.navigate('StudentFeeDetails')} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const DetailButton = ({ text, bgColor, onPress }) => (
  <TouchableOpacity style={[styles.detailButton, { backgroundColor: bgColor }]} onPress={onPress}>
    <Text style={styles.detailButtonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0000001A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  cardSubtitle: {
    color: 'grey',
    marginTop: 4,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  detailButton: {
    width: '100%',
    marginBottom: 12,
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailButtonText: {
    fontWeight: '500',
    letterSpacing: 0.5,
    color: '#4A4A4A',
  },
});

export default StudentDetailsScreen;
