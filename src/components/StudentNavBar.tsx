import React from 'react';
import { 
  View, 
  TouchableOpacity, 
  Image, 
  StyleSheet 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function StudentNavBar({ navigation }) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.bottomNav, { paddingBottom: 15 + insets.bottom }]}>
      
      {/* 1. HOME BUTTON */}
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate('Home')}
      >
         <Image 
           source={require('../../assets/home icon.png')} 
           style={styles.navIcon} 
           resizeMode="contain" 
         />
      </TouchableOpacity>

      {/* 2. CALENDAR / EVENTS BUTTON */}
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate('Calendar')}
      >
         <Image 
           source={require('../../assets/calendar icon.png')} 
           style={styles.navIcon} 
           resizeMode="contain" 
         />
      </TouchableOpacity>

      {/* 3. LIBRARY BUTTON */}
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('Library')}
      >
         <Image 
           source={require('../../assets/library icon.png')} 
           style={styles.navIcon} 
           resizeMode="contain" 
         />
      </TouchableOpacity>

      {/* 4. INBOX BUTTON */}
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('Inbox')} // Uncomment when Inbox is ready
      >
         <Image 
           source={require('../../assets/inbox icon.png')} 
           style={styles.navIcon} 
           resizeMode="contain" 
         />
      </TouchableOpacity>

    </View>
  );
}

// =====================================================================
// SHARED STYLES
// =====================================================================
const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0, 
    left: 0, 
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'center',
    backgroundColor: '#7e57c2ff', // Purple Color
    paddingTop: 6,
    // paddingBottom is handled dynamically in the component return

    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15,
    
    // Shadow
   // shadowColor: "#000", 
    //shadowOffset: { width: 0, height: -5 }, 
    //shadowOpacity: 0.15, 
    //shadowRadius: 10, 
    //elevation: 20,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6, 
  },
  navIcon: {
    width: 25,  
    height: 20,
    tintColor: '#ffffffff', // White icons
  },
});