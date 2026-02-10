import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

interface Task {
  id: string;
  title: string;
  tag: string;
}

const tasks: Task[] = [
  { id: '1', title: 'Math 101', tag: 'Test Grading' },
  { id: '2', title: 'Physics 101', tag: 'Test Grading' },
  { id: '3', title: 'Physics 102', tag: 'Assignment Grading' },
  { id: '4', title: 'Chem 101', tag: 'Test Grading' },
  { id: '5', 'title': 'Chem 102', tag: 'Test Grading' },
  { id: '6', title: 'Physics 104', tag: 'Assignment Grading' },
];

const kColors = {
  BottomNavPurple: '#844EC6',
  PrimaryPurple: '#8E54C1',
};

const PendingTaskScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <View style={styles.tagContainer}>
        <Text style={styles.tagText}>{item.tag}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../../assets/h77.png')} style={styles.logo} />
        <Ionicons name="person-circle-outline" size={32} color="#5D4087" />
      </View>
      <View style={styles.body}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Pending Tasks</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>6</Text>
          </View>
        </View>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
        />
      </View>
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={32} color="white" />
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
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: kColors.PrimaryPurple,
  },
  badge: {
    backgroundColor: kColors.PrimaryPurple,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 10,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  grid: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#F3F0F7',
    borderRadius: 12,
    padding: 12,
    width: '48%',
    aspectRatio: 1.6,
    justifyContent: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  tagContainer: {
    backgroundColor: '#9166CC',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  tagText: {
    color: 'white',
    fontSize: 11,
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

export default PendingTaskScreen;
