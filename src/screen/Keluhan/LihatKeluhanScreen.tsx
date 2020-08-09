import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import GetIdKeluhan from '../../api/keluhan/GetIdKeluhan';
import HeaderDefault from '../../utils/Headers/HeaderDefault';
import GetUserDetail from '../../api/GetUserDetail';
import DetailKost from '../../api/DetailKost';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ChangeStatusKeluhan from '../../api/keluhan/ChangeStatusKeluhan';

interface LihatKeluhanScreenProps {}

const LihatKeluhanScreen = ({navigation, route}: any) => {
  const {id_keluhan, id_user, id_kost} = route.params;
  const [nama, setNama] = useState('');
  const [idKost, setIdKost] = useState('');
  const [detailKeluhan, setDetailKeluhan] = useState([]);
  const [detailKost, setDetailKost] = useState([]);

  useEffect(() => {
    getKeluhan();
    getUser();
    getKost();
  }, []);

  const getKeluhan = () => {
    GetIdKeluhan(id_keluhan).then((values) => {
      if (values.code == 200) {
        setDetailKeluhan(values.data);
      }
    });
  };

  const getUser = () => {
    GetUserDetail(id_user).then((values) => {
      if (values.code == 200) {
        setNama(values.data[0].nama_user);
      }
    });
  };

  const getKost = () => {
    DetailKost(id_kost).then((values) => {
      if (values.code == 200) {
        setDetailKost(values.data);
      }
    });
  };

  const submit = () =>
    Alert.alert(
      'Keluhan',
      'Pastikan keluhan dari user telah diperbaiki.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: changeStatus},
      ],
      {cancelable: false},
    );

  const changeStatus = () => {
    console.log('jalan');
    ChangeStatusKeluhan(id_keluhan).then((values) => {
      if (values.code == 200) {
        Alert.alert('Terimakasih.');
        navigation.goBack();
      }
    });
  };
  return (
    <View style={styles.container}>
      <HeaderDefault title={'Detail Keluhan'} />
      <View style={{alignSelf: 'center'}}>
        <Text style={{fontSize: 18, paddingVertical: 20}}>Keluhan</Text>
      </View>
      {detailKeluhan.length != 0
        ? detailKeluhan.map((item: any, index: number) => {
            return (
              <View>
                <View style={{paddingHorizontal: 20}}>
                  <Text style={{paddingTop: 5}}>Nama : {nama}</Text>
                  <Text style={{paddingTop: 5}}>
                    Nama Kost :{' '}
                    {detailKost.length != 0
                      ? detailKost.map((item: any, index: number) => {
                          return item.nama_kost;
                        })
                      : '-'}
                  </Text>
                  <Text style={{paddingTop: 5}}>
                    Tanggal : {item.tanggal_keluhan}
                  </Text>
                  <Text style={{paddingTop: 5}}>
                    Status Keluhan :
                    {item.status_keluhan == 0 ? 'Terdaftar' : 'Selesai'}
                  </Text>
                </View>
                <View style={{paddingHorizontal: 20, paddingTop: 15}}>
                  <Text style={{paddingTop: 5}}>
                    Judul : {item.nama_keluhan}
                  </Text>
                  <Text style={{paddingTop: 5}}>
                    Keluhan : {item.pesan_keluhan}
                  </Text>
                </View>
                {item.status_keluhan == 0 ? (
                  <TouchableOpacity
                    onPress={submit}
                    style={{
                      alignSelf: 'center',
                      backgroundColor: '#00AA13',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 4,
                      marginVertical: 50,
                    }}>
                    <Text style={{color: 'white'}}>Selesai</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            );
          })
        : null}
    </View>
  );
};

export default LihatKeluhanScreen;

const styles = StyleSheet.create({
  container: {},
});
