import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from './screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack'
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

import { LogBox } from 'react-native';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';

LogBox.ignoreLogs(['Setting a timer']);

const Stack = createStackNavigator() //para que desaparezca la advertencia amarrilla

const globalScreenOptions = {
  headerStyle: {backgroundColor: '#2c6bed'},
  headerTitleStyle: {color: 'white'},
  headerTintColor: 'white'
}

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={globalScreenOptions}
      >
        <Stack.Screen
          name='Login' 
          component={LoginScreen} 
          options={{headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name='Register' 
          component={RegisterScreen} 
          options={{headerTitleAlign: 'center', headerBackTitleVisible: true, headerBackTitle: 'Login'}}
        />
        <Stack.Screen
          name='Home' 
          component={HomeScreen} 
          options={{headerTitleAlign: 'center', headerBackTitleVisible: true, headerBackTitle: 'Login'}}
        />
        <Stack.Screen
          name='AddChat' 
          component={AddChatScreen} 
          options={{headerTitleAlign: 'center', headerBackTitleVisible: true, headerBackTitle: 'Login'}}
        />
        <Stack.Screen
          name='Chat' 
          component={ChatScreen} 
          options={{headerTitleAlign: 'center', headerBackTitleVisible: true, headerBackTitle: 'Login'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
