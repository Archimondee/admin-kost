import * as React from 'react';
import {Button, View, YellowBox} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screen/Home/HomeScreen';
import KostScreen from './src/screen/Kost/KostScreen';
import AddKostScreen from './src/screen/Kost/AddKostScreen';
import EditKostScreen from './src/screen/Kost/EditKostScreen';
import DetailKostScreen from './src/screen/Kost/DetailKostScreen';

import UserScreen from './src/screen/User/UserScreen';
import AddUserScreen from './src/screen/User/AddUserScreen';
import DetailUserScreen from './src/screen/User/DetailUserScreen';
import ManageKostScreen from './src/screen/ManageKost/ManageKostScreen';
import AddGuestScreen from './src/screen/ManageKost/AddGuestScreen';
import ConfirmationScreen from './src/screen/ManageKost/ConfirmationScreen';
import KeluhanScreen from './src/screen/Keluhan/KeluhanScreen';
import LihatKeluhanScreen from './src/screen/Keluhan/LihatKeluhanScreen';
import ConfirmationPaymentScreen from './src/screen/ManageKost/ConfirmPaymentScreen';
import SharePaymentScreen from './src/screen/ManageKost/SharePaymentScreen';

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
        <Stack.Screen name="DetailUser" component={DetailUserScreen} />
      </Stack.Navigator>
    );
  };

  const ManageKostStack = () => {
    return (
      <Stack.Navigator headerMode={'none'} initialRouteName="ManageKost">
        <Stack.Screen name="ManageKost" component={ManageKostScreen} />
        <Stack.Screen name="AddGuest" component={AddGuestScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        <Stack.Screen
          name="ConfirmationPayment"
          component={ConfirmationPaymentScreen}
        />
        <Stack.Screen name="SharePayment" component={SharePaymentScreen} />
      </Stack.Navigator>
    );
  };

  const KeluhanStack = () => {
    return (
      <Stack.Navigator headerMode={'none'} initialRouteName="KeluhanScreen">
        <Stack.Screen name="KeluhanScreen" component={KeluhanScreen} />
        <Stack.Screen
          name="LihatKeluhanScreen"
          component={LihatKeluhanScreen}
        />
      </Stack.Navigator>
    );
  };

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen
              options={{title: 'Home', drawerIcon: iconHome}}
              name="Home"
              component={HomeScreen}
            />
            <Drawer.Screen
              options={{title: 'Kost', drawerIcon: iconKost}}
              name="Kost"
              component={KostStack}
            />
            <Drawer.Screen
              options={{title: 'User', drawerIcon: iconUser}}
              name="User"
              component={UserStack}
            />
            <Drawer.Screen
              options={{title: 'Manage Kost', drawerIcon: iconManageKost}}
              name="ManageKost"
              component={ManageKostStack}
            />
            <Drawer.Screen
              options={{title: 'Keluhan', drawerIcon: iconKeluhan}}
              name="Keluhan"
              component={KeluhanStack}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

const iconHome = () => {
  return <Icon name="ios-home" size={28} color={'green'} />;
};

const iconKost = () => {
  return <Icon name="bed-outline" size={28} color={'green'} />;
};

const iconUser = () => {
  return <Icon name="people-outline" size={28} color={'green'} />;
};

const iconManageKost = () => {
  return <Icon name="construct-outline" size={28} color={'green'} />;
};

const iconKeluhan = () => {
  return <Icon name="skull-outline" size={28} color={'green'} />;
};

export default App;
