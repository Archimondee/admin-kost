import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderMenuProps {
  title: string;
  navigation: any;
  rightMenu?: boolean;
}

const HeaderMenu = (props: HeaderMenuProps) => {
  const {title, navigation, rightMenu} = props;
  const toggle = () => {
    navigation.toggleDrawer();
  };
  return (
    <View
      style={{height: 52, backgroundColor: '#00AA13', flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={toggle}
        style={{
          justifyContent: 'center',
          paddingHorizontal: 10,
          paddingVertical: 14,
        }}>
        <Icon name="menu-outline" size={28} color="white" />
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text style={{fontSize: 16, color: 'white'}}>{title}</Text>
      </View>
      <TouchableOpacity
        onPress={toggle}
        style={{
          justifyContent: 'center',
          paddingHorizontal: 10,
          paddingVertical: 14,
        }}>
        <View style={{width: 28}}></View>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderMenu;

const styles = StyleSheet.create({
  container: {},
});
