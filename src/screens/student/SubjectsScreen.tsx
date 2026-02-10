import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  FlatList, 
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import StudentNavBar from '../../components/StudentNavBar';

const SubjectCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.cardContainer} onPress={() => onPress(item)}>
      <LinearGradient
        colors={['#9D7CC1', '#7B4BB7']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.cardGradient}
      >
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Ionicons name="book" size={16} color="white" />
                <Text style={styles.statText}>{item.files}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="chatbubble-ellipses" size={16} color="white" />
                <Text style={styles.statText}>{item.comments}</Text>
              </View>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={28} color="white" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default function SubjectsScreen({ navigation }) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // We are using static data for now.
    // In the future, this could be replaced with a real API call.
    setSubjects([
      { id: '1', title: 'Math', files: 10, comments: 22 },
      { id: '2', title: 'Science', files: 12, comments: 19 },
      { id: '3', title: 'English', files: 8, comments: 13 },
      { id: '4', title: 'Social Studies', files: 4, comments: 9 },
      { id: '5', title: 'Art', files: 2, comments: 6 },
      { id: '6', title: 'Music', files: 3, comments: 7 },
      { id: '7', title: 'Physical Education', files: 1, comments: 4 },
      { id: '8', title: 'Health', files: 5, comments: 11 },
    ]);
    setLoading(false);
  }, []);

  const handleCardPress = (item) => {
    navigation.navigate('LibraryDetails', { subject: item });
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#7B4BB7" style={styles.centered} />;
    }

    if (error) {
      return <Text style={styles.centered}>{error}</Text>;
    }

    if (subjects.length === 0) {
      return <Text style={styles.centered}>No subjects found.</Text>;
    }

    return (
      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SubjectCard item={item} onPress={handleCardPress} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#554E63" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={32} color="#554E63" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>Subjects</Text>
      </View>

      {renderContent()}

      <StudentNavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#554E63',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  cardContainer: {
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: '#7B4BB7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  cardGradient: {
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  statText: {
    color: '#FFFFFF',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});