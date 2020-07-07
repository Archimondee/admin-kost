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

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Kost" component={KostStack} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default App;
