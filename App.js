import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SearchBar } from 'react-native-elements';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View,Image,SafeAreaView,ScrollView,Button,Footer,FooterTab} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import axios from 'axios';
import Jobs from './Jobs';
import { NavigationContainer } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
function SettingsScreen(){
  return(
    <View>
      <Text>Settingscreen</Text>
    </View>
  )
}
function ExploreScreen(){
  return(
    <View>
      <Text>ExploreScreen</Text>
    </View>
  )
}
export default function App() {
  return (
  <NavigationContainer>
  <Tab.Navigator>
     < Tab.Screen  name="Home" options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}     component={Jobs}/>
      <Tab.Screen  name="Search" options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}   component={Jobs}/>
      <Tab.Screen  name="Course" options={{
          tabBarLabel: 'Course',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="presentation-play" color={color} size={size} />
          ),
        }}   component={SettingsScreen} />
      <Tab.Screen  name ="Profile" options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}  component={ExploreScreen}/>
  </Tab.Navigator>
  </NavigationContainer>
  );
}




