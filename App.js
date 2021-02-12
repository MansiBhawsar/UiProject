import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SearchBar } from 'react-native-elements';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View,Image,SafeAreaView,ScrollView,Button,Footer,FooterTab,Icon} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import axios from 'axios';
import Jobs from './Jobs';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

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
      <Tab.Screen name="Home" component={Jobs} />
      <Tab.Screen name="Search" component={Jobs} />
      <Tab.Screen name="Course" component={SettingsScreen} />
      <Tab.Screen name ="Profile" component={ExploreScreen}/>
   </Tab.Navigator>
   </NavigationContainer>
    
  );
}




