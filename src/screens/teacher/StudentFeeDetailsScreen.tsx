import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

const kColors = {
  BrandPurple: '#8E54B8',
  InfoBoxBg: '#F3F0F7',
  TextSecondary: '#616161',
  BottomNavPurple: '#844EC6',
};

const FeeRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.feeRow}>
    <Text style={styles.feeLabel}>{label}</Text>
    <Text style={styles.feeValue}>{value}</Text>
  </View>
);

const StudentFeeDetailsScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="grey" />
        </TouchableOpacity>
        <Ionicons name="person-circle-outline" size={30} color="#4A4A4A" />
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>Student Fee Details</Text>
        
        <View style={styles.rowsContainer}>
            <FeeRow label="NAME" value="NAME" />
            <FeeRow label="FEE STATUS" value="STATUS" />
            <FeeRow label="PENDING AMOUNT" value="AMOUNT" />
        </View>

        <View style={styles.spacer} />
        
        <View style={styles.byMonthContainer}>
            <Text style={styles.byMonthText}>By month</Text>
        </View>
      </View>

      <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={26} color="white" />
        <Ionicons name="calendar-outline" size={26} color="white" />
        <Ionicons name="book-outline" size={26} color="white" />
        <Ionicons name="chatbubble-outline" size={26} color="white" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: kColors.BrandPurple,
    marginBottom: 20,
  },
  rowsContainer: {
      marginBottom: 20
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: kColors.InfoBoxBg,
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  feeLabel: {
    color: kColors.TextSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  feeValue: {
    color: kColors.TextSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  spacer: {
      flex: 1,
  },
  byMonthContainer: {
      alignItems: 'center',
      marginBottom: 40,
  },
  byMonthText: {
      fontSize: 14,
      color: 'black',
  },
  bottomNav: {
    flexDirection: 'row',
    height: 75,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: kColors.BottomNavPurple,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});

export default StudentFeeDetailsScreen;