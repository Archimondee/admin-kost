import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import HeaderMenu from '../../utils/Headers/Headers';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  GetJumlahKost,
  GetJumlahUser,
  GetJumlahKamar,
  GetJumlahKeluhan,
} from '../../api/home/GetCount';

const width = Dimensions.get('screen').width;

const HomeScreen = ({navigation}: any) => {
  const navigasi = useNavigation();

  const [jumlahUser, setJumlahUser] = useState(0);
  const [jumlahKost, setJumlahKost] = useState(0);
  const [jumlahKeluhan, setJumlahKeluhan] = useState(0);
  const [jumlahKamar, setJumlahKamar] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getJumlahUser();
      getJumlahKost();
      getJumlahKamar();
      getJumlahKeluhan();
    });

    return unsubscribe;
  }, [navigation]);

  const getJumlahUser = () => {
    GetJumlahUser().then((values) => {
      if (values.code == 200) {
        setJumlahUser(values.data[0].jumlah_user);
      }
    });
  };

  const getJumlahKost = () => {
    GetJumlahKost().then((values) => {
      if (values.code == 200) {
        setJumlahKost(values.data[0].jumlah_kost);
      }
    });
  };

  const getJumlahKamar = () => {
    GetJumlahKamar().then((values) => {
      if (values.code == 200) {
        setJumlahKamar(values.data[0].jumlah_kamar);
      }
    });
  };

  const getJumlahKeluhan = () => {
    GetJumlahKeluhan().then((values) => {
      if (values.code == 200) {
        setJumlahKeluhan(values.data[0].jumlah_keluhan);
      }
    });
  };
  return (
    <View style={styles.container}>
      <HeaderMenu title={'Home'} navigation={navigation} />
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 20,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => navigasi.navigate('Kost')}
          style={{
            backgroundColor: '#00AA13',
            marginRight: 10,
            alignItems: 'center',
            width: width / 2 - 50,
          }}>
          <View style={{paddingVertical: 10}}>
            <Icon name="ios-home" size={36} color="white" />
          </View>
          <Text style={{textAlign: 'center', paddingBottom: 5, color: 'white'}}>
            {jumlahKost}
          </Text>
          <Text
            style={{textAlign: 'center', paddingBottom: 10, color: 'white'}}>
            Jumlah Kost
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigasi.navigate('Kost')}
          style={{
            backgroundColor: '#00AA13',
            marginLeft: 10,
            alignItems: 'center',
            width: width / 2 - 50,
          }}>
          <View style={{paddingVertical: 10}}>
            <Icon name="bed-outline" size={36} color="white" />
          </View>
          <Text style={{textAlign: 'center', paddingBottom: 5, color: 'white'}}>
            {jumlahKamar}
          </Text>
          <Text
            style={{textAlign: 'center', paddingBottom: 10, color: 'white'}}>
            Jumlah Kamar
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 20,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => navigasi.navigate('User')}
          style={{
            backgroundColor: '#00AA13',
            marginRight: 10,
            alignItems: 'center',
            width: width / 2 - 50,
          }}>
          <View style={{paddingVertical: 10}}>
            <Icon name="person-circle-outline" size={36} color="white" />
          </View>
          <Text style={{textAlign: 'center', paddingBottom: 5, color: 'white'}}>
            {jumlahUser}
          </Text>
          <Text
            style={{textAlign: 'center', paddingBottom: 10, color: 'white'}}>
            Jumlah User
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigasi.navigate('Keluhan')}
          style={{
            backgroundColor: '#00AA13',
            marginLeft: 10,
            alignItems: 'center',
            width: width / 2 - 50,
          }}>
          <View style={{paddingVertical: 10}}>
            <Icon name="warning-outline" size={36} color="white" />
          </View>
          <Text style={{textAlign: 'center', paddingBottom: 5, color: 'white'}}>
            {jumlahKeluhan}
          </Text>
          <Text
            style={{textAlign: 'center', paddingBottom: 10, color: 'white'}}>
            Jumlah Keluhan
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
});
