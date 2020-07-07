import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import HeaderMenu from '../../utils/Headers/Headers';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import GetKost from '../../api/GetKost';

interface KostScreenProps {}

const KostScreen = ({navigation}: any) => {
  const navigasi = useNavigation();
  const [dataKost, setDataKost] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataKost();
    });

    return unsubscribe;
  }, [navigation]);

  const getDataKost = () => {
    GetKost().then((values) => {
      if (values.code === 200) {
        setDataKost(values.data);
      } else {
        Alert.alert('Terjadi kesalahan');
      }
    });
  };
  return (
    <View style={styles.container}>
      <HeaderMenu title={'Kost'} navigation={navigation} />
      <View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigasi.navigate('AddKost')}
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
              Tambah Kost
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
        <View>
          {dataKost.length != 0
            ? dataKost.map((item: any, index: number) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate('DetailKost', {id_kost: item.id_kost})
                    }
                    style={{
                      marginHorizontal: 20,
                      paddingVertical: 10,
                      paddingLeft: 10,
                      marginTop: 10,
                      flexDirection: 'row',
                      borderRadius: 4,
                      borderWidth: 0.5,
                    }}>
                    <Image
                      source={{uri: item.gambar_kost}}
                      style={{height: 50, width: 50}}
                    />
                    <View
                      style={{paddingLeft: 10, alignSelf: 'center', flex: 1}}>
                      <Text>{item.nama_kost}</Text>
                      <Text>Rp. {item.harga_bulanan}</Text>
                    </View>
                    <View style={{alignSelf: 'center', paddingRight: 10}}>
                      <Icon
                        name="chevron-forward-outline"
                        size={25}
                        color="black"
                      />
                    </View>
                  </TouchableOpacity>
                );
              })
            : null}
        </View>
      </View>
    </View>
  );
};

export default KostScreen;

const styles = StyleSheet.create({
  container: {},
});
