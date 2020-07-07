import * as React from 'react';
import {Button, View, YellowBox} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './src/screen/Home/HomeScreen';
import KostScreen from './src/screen/Kost/KostScreen';
import AddKostScreen from './src/screen/Kost/AddKostScreen';
import EditKostScreen from './src/screen/Kost/EditKostScreen';
import DetailKostScreen from './src/screen/Kost/DetailKostScreen';

import UserScreen from './src/screen/User/UserScreen';
import AddUserScreen from './src/screen/User/AddUserScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const App = () => {
  YellowBox.ignoreWarnings(['']);

  const KostStack = () => {
    return (
      <Stack.Navigator headerMode={'none'} initialRouteName="KostScreen">
        <Stack.Screen name="KostScreen" component={KostScreen} />
        <Stack.Screen name="AddKost" component={AddKostScreen} />
        <Stack.Screen name="EditKost" component={EditKostScreen} />
        <Stack.Screen name="DetailKost" component={DetailKostScreen} />
      </Stack.Navigator>
    );
  };

  const UserStack = () => {
    return (
      <Stack.Navigator headerMode={'none'} initialRouteName="UserScreen">
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="AddUser" component={AddUserScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Kost" component={KostStack} />
            <Drawer.Screen name="User" component={UserStack} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default App;
