import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const classes = ["10th", "9th", "8th"];

export default function ClassroomsScreen({ navigation }: any) {
  console.log("ClassroomsScreen rendered");

  const handlePress = (className: string) => {
    console.log(`Navigating to ClassDetails for class: ${className}`);
    navigation.navigate('ClassDetails', { className });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Classrooms</Text>
        {classes.map((c) => (
          <TouchableOpacity key={c} onPress={() => handlePress(c)}>
            <LinearGradient
              colors={['#9B68D4', '#814DBA']}
              style={styles.card}
            >
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.classText}>{c}</Text>
                  <Text style={styles.subText}>Text</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="white" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8E54C1',
    marginBottom: 16,
  },
  card: {
    borderRadius: 15,
    marginBottom: 12,
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  classText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
