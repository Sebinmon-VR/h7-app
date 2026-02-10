import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const kColors = {
    PrimaryPurple: '#8E54C1',
    TextGrey: '#666',
    BorderColor: '#eee',
    DangerRed: 'red',
};

export default function TeacherInboxScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Inbox</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle-outline" color={kColors.TextGrey} size={20} />
            <Text style={styles.cardTitle}>Grading Pending</Text>
          </View>

          <View style={styles.row}>
            <Text style={{ color: kColors.TextGrey }}>Assignment</Text>
            <Text>Maths 101</Text>
          </View>

          <View style={styles.row}>
            <Text style={{ color: kColors.DangerRed }}>Last Date</Text>
            <Text style={{ color: kColors.DangerRed }}>December 20</Text>
          </View>

          <Text style={styles.viewMore}>View &gt;</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: kColors.PrimaryPurple,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: kColors.BorderColor,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'white',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  viewMore: {
    color: kColors.TextGrey,
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 8,
  },
});
