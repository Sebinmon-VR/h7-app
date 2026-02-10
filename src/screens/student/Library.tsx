import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  SafeAreaView,
  FlatList
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import StudentNavBar from '../../components/StudentNavBar';

const SubjectsScreen = ({ navigation }: any) => {

  const subjects = [
    { id: '1', title: 'Science', files: 2, comments: 8, author: 'Dr. A. Einstein' },
    { id: '2', title: 'Maths', files: 4, comments: 12, author: 'Prof. J. Nash' },
    { id: '3', title: 'English', files: 0, comments: 0, author: 'Ms. J. Austen' },
  ];

  const renderCard = ({ item }: any) => (
    <TouchableOpacity 
      activeOpacity={0.8} 
      style={styles.cardWrapper}
      onPress={() => navigation.navigate('LibraryDetails', { subject: item })}
    >
      <LinearGradient
        colors={['#9b7ad6', '#7a56c2']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Ionicons name="book" size={14} color="white" />
              <Text style={styles.statText}>{item.files}</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="chatbubble" size={14} color="white" />
              <Text style={styles.statText}>{item.comments}</Text>
            </View>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color="white" />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../../../assets/h77.png')} style={styles.logo} resizeMode="contain" />
          <Ionicons name="person-circle-outline" size={32} color="#555" />
        </View>

        {/* Page Title */}
        <Text style={styles.pageHeader}>Subjects</Text>

        {/* List */}
        <FlatList
          data={subjects}
          renderItem={renderCard}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 100 }} 
          showsVerticalScrollIndicator={false}
        />

      </SafeAreaView>

      <StudentNavBar />

    </View>
  );
}

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
  pageHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  cardWrapper: {
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  statText: {
    color: 'white',
    fontSize: 13,
    marginLeft: 6,
    fontWeight: '500',
  },
});

export default SubjectsScreen;