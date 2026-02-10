import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

const kColors = {
    HeaderOlive: '#C5CB78',
    PrimaryPurple: '#8E63CF',
    DarkPurple: '#7540C1',
    CardBgLight: '#F4F1F9',
    CardIconPurple: '#9E77D8',
    BottomNavPurple: '#844EC6',
    AppBarIcon: '#51417A'
};

const MetricCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <LinearGradient
      colors={[kColors.PrimaryPurple, kColors.DarkPurple]}
      style={styles.metricCard}
    >
      <View style={styles.metricTitleContainer}>
        <Text style={styles.metricTitle}>{title}</Text>
      </View>
      <View style={styles.spacer} />
      <Text style={styles.metricValue}>{value}</Text>
      <View style={styles.spacer} />
      <View style={styles.chevron}>
        <Ionicons name="chevron-forward" color="rgba(255, 255, 255, 0.6)" size={18} />
      </View>
    </LinearGradient>
  );
};

const AttendanceCard = ({ title, percentage }: { title: string; percentage: string }) => {
    const size = 75;
    const strokeWidth = 4;
    const radius = (size - strokeWidth) / 2;
    const circum = radius * 2 * Math.PI;
    const value = parseFloat(percentage) / 100;

    return (
        <LinearGradient
            colors={[kColors.PrimaryPurple, kColors.DarkPurple]}
            style={[styles.attendanceCardContainer]}
        >
            <View style={styles.metricTitleContainer}>
                <Text style={styles.metricTitle}>{title}</Text>
            </View>
            <View style={{height: 15}} />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <Circle
                        stroke="rgba(255, 255, 255, 0.2)"
                        fill="none"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                    />
                    <Circle
                        stroke="#FFF"
                        fill="none"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeDasharray={`${circum} ${circum}`}
                        strokeDashoffset={circum - (circum * value)}
                        strokeLinecap="round"
                        transform={`rotate(-90, ${size / 2}, ${size / 2})`}
                        strokeWidth={strokeWidth}
                    />
                </Svg>
                <Text style={styles.circularValue}>{percentage}</Text>
            </View>
            <View style={styles.spacer} />
            <View style={styles.chevron}>
                <Ionicons name="chevron-forward" color="rgba(255, 255, 255, 0.6)" size={18} />
            </View>
        </LinearGradient>
    )
}

const ActionCard = ({ title, iconName, onPress }: { title: string; iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name']; onPress?: () => void }) => {
    return (
      <TouchableOpacity style={styles.actionCard} onPress={onPress} disabled={!onPress}>
        <MaterialCommunityIcons name={iconName} size={30} color={kColors.CardIconPurple} />
        <View style={{ height: 10 }} />
        <Text style={styles.actionTitle}>{title}</Text>
      </TouchableOpacity>
    );
};
  

export default function TeacherHomeScreen({ navigation }: { navigation: NavigationProp<any> }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Feather name="activity" color="cyan" size={28} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('TeacherInbox')} style={{marginRight: 15}}>
            <Ionicons name="chatbubble-outline" color={kColors.AppBarIcon} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle" color={kColors.AppBarIcon} size={36} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.greeting}>Hello, Teacher</Text>
        
        <View style={styles.row}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => navigation.navigate('TeacherClasses')}
          >
            <MetricCard title="Classes Today" value="6" />
          </TouchableOpacity>
          <View style={{ width: 15 }} />
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => navigation.navigate('PendingTasks')}
          >
            <MetricCard title="Pending Tasks" value="6" />
          </TouchableOpacity>
        </View>
        
        <View style={{height: 15}}/>

        <AttendanceCard title="Attendance" percentage="90%" />

        <View style={{height: 25}}/>

        <View style={styles.actionGrid}>
          <ActionCard title={"Upload\nMaterial"} iconName="file-upload-outline" />
          <ActionCard title={"Upload\nResults"} iconName="file-upload-outline" />
          <ActionCard title={"Student\nDetails"} iconName="information-outline" onPress={() => navigation.navigate('StudentDetails')} />
          <ActionCard title={"Student\nAttendance"} iconName="file-upload-outline" />
        </View>
      </ScrollView>
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={32} color="white" />
        <TouchableOpacity onPress={() => navigation.navigate('TeacherCalendar')}>
          <Ionicons name="calendar-outline" size={26} color="white" />
        </TouchableOpacity>
        <Ionicons name="book-outline" size={26} color="white" />
        <TouchableOpacity onPress={() => navigation.navigate('TeacherInbox')}>
          <Ionicons name="chatbubble-outline" size={26} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: kColors.HeaderOlive,
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
  },
  metricCard: {
    flex: 1,
    height: 140,
    padding: 16,
    borderRadius: 16,
  },
  attendanceCardContainer: {
    height: 185,
    padding: 16,
    borderRadius: 16,
    width: width * 0.44, 
    alignSelf: 'flex-end'
  },
  metricTitleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  metricTitle: {
    color: 'white',
    fontSize: 13,
  },
  metricValue: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  circularValue: {
    position: 'absolute',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  chevron: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: kColors.CardBgLight,
    borderRadius: 12,
    width: (width - 55) / 2,
    aspectRatio: 1.35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  actionTitle: {
    textAlign: 'center',
    color: kColors.CardIconPurple,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 12 * 1.1,
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
  spacer: {
      flex: 1
  }
});
