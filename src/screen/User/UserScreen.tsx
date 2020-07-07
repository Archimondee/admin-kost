import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import HeaderMenu from '../../utils/Headers/Headers';
import {useNavigation} from '@react-navigation/native';

interface UserScreenProps {}

const UserScreen = ({navigation, route}: any) => {
  const navigasi = useNavigation();
  return (
    <View style={styles.container}>
      <HeaderMenu title={'User'} navigation={navigation} />
      <View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigasi.navigate('AddUser')}
            style={{
              flex: 1,
              paddingVertical: 20,
              justifyContent: 'center',
              marginHorizontal: 20,
              marginVertical: 20,
              backgroundColor: '#00AA13',
              borderRadius: 5,
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>
              Tambah User
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('EditKost')}
            style={{
              flex: 1,
              paddingVertical: 40,
              justifyContent: 'center',
              marginHorizontal: 20,
              marginVertical: 20,
              backgroundColor: '#00AA13',
              borderRadius: 5,
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>
              Edit Data Kost
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {},
});
