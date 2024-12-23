import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, StyleSheet} from 'react-native';

import WelcomeScreen from '../screens/WelcomeScreen';
import GenreSelectionScreen from '../screens/GenreSelectionScreen';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    // <Tab.Navigator
    //   screenOptions={({route}) => ({
    //     tabBarIcon: ({focused, color, size}) => {
    //       //   let iconName;
    //       if (route.name === 'Home') {
    //         // iconName = focused ? 'home' : 'home-outline';
    //         <Image
    //           source={require('../Assest/home (3).png')}
    //           style={{width: 30, height: 30}}
    //         />;
    //       } else if (route.name === 'Favorites') {
    //         // iconName = focused ? 'heart' : 'heart-outline';
    //         <Image
    //           source={require('../Assest/heart-rate.png')}
    //           style={{width: 30, height: 30}}
    //         />;
    //       }
    //       //   return <Icon name={iconName} size={size} color={color} />;
    //       return null;
    //     },
    //     tabBarActiveTintColor: '#E21221',
    //     tabBarInactiveTintColor: 'gray',
    //   })}>
    //   <Tab.Screen
    //     name="Home"
    //     component={HomeScreen}
    //     options={{headerShown: false}}
    //   />
    //   <Tab.Screen
    //     name="Favorites"
    //     component={FavoriteScreen}
    //     options={{headerShown: false}}
    //   />
    // </Tab.Navigator>
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return (
              <Image
                source={require('../icons8-home-50.png')}
                style={{width: 30, height: 30}}
              />
            );
          } else if (route.name === 'Favorites') {
            return (
              <Image
                source={require('../heart-rate.png')}
                style={{width: 30, height: 30}}
              />
            );
          }
          return null;
        },
        tabBarActiveTintColor: '#E21221',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      setInitialRoute(hasLaunched === 'true' ? 'MainApp' : 'Welcome');
    } catch (error) {
      setInitialRoute('Welcome');
    }
  };

  if (initialRoute === null) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GenreSelection"
        component={GenreSelectionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={{
          headerShown: true,
          title: 'Movie Details',
          headerTintColor: '#E21221',
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
