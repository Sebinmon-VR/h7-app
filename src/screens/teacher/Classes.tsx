import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface ClassTileProps {
  title: string;
  subtitle: string;
  onPress: () => void;
}

const ClassTile: React.FC<ClassTileProps> = ({ title, subtitle, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#A573D6', '#8E54B8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.classTileContainer}
      >
        <View style={styles.classTileContent}>
          <View>
            <Text style={styles.classTitle}>{title}</Text>
            <Text style={styles.classSubtitle}>{subtitle}</Text>
          </View>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const Classes = ({ navigation }) => {
  const classes = [
    { title: '10th', subtitle: 'Text' },
    { title: '9th', subtitle: 'Text' },
    { title: '8th', subtitle: 'Text' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Classrooms</Text>
      <ScrollView>
        {classes.map((cls, index) => (
          <ClassTile
            key={index}
            title={cls.title}
            subtitle={cls.subtitle}
            onPress={() => navigation.navigate('StudentDetails')}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8E54B8',
    marginBottom: 20,
  },
  classTileContainer: {
    borderRadius: 15,
    marginBottom: 15,
  },
  classTileContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  classTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  classSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginTop: 4,
  },
});

export default Classes;
