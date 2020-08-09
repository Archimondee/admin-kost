import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import HeaderDefault from '../../utils/Headers/HeaderDefault';
import {ScrollView} from 'react-native-gesture-handler';
import GetUserDetail from '../../api/GetUserDetail';
import DetailKost from '../../api/DetailKost';
import {GetNoKamar} from '../../api/manage-kost/GetNoKamar';
import moment from 'moment';
import PostPemesanan from '../../api/manage-kost/PostPemesanan';
import {useNavigation} from '@react-navigation/native';

interface ConfirmationScreenProps {}

const ConfirmationScreen = ({navigation, route}: any) => {
  const {id_kost, id_kamar, id_user} = route.params;
  const [dataUser, setDataUser] = useState([]);
  const [dataKost, setDataKost] = useState([] as any);
  const [dataKamar, setDataKamar] = useState([]);

  useEffect(() => {
    getUser();
    getKost();
    getNoKamar();
  }, []);

  const getUser = () => {
    GetUserDetail(id_user).then((values) => {
      console.log(id_user);

      if (values.code == 200) {
        setDataUser(values.data);
      } else {
        Alert.alert('Terjadi kesalahan user');
      }
    });
  };

  const getKost = () => {
    DetailKost(parseInt(id_kost)).then((values) => {
      if (values.code == 200) {
        setDataKost(values.data);
      } else {
        Alert.alert('Terjadi kesalahan');
      }
    });
  };

  const getNoKamar = () => {
    GetNoKamar(id_kamar).then((values) => {
      if (values.code == 200) {
        setDataKamar(values.data);
      } else {
        Alert.alert('Terjadi kesalahan');
      }
    });
  };

  const submit = () => {
    //2020-07-09
    let tgl = moment().format('YYYY[-]MM[-]DD');
    let mon = moment().format('MMMM');
    PostPemesanan(
      tgl,
      parseInt(id_user),
      parseInt(id_kost),
      parseInt(id_kamar),
      //dataKost[0].harga_bulanan,
      mon,
      'Pembayaran awal',
    ).then((values) => {
      console.log(values);
      if (values.code == 200) {
        navigation.navigate('ManageKost');
        Alert.alert('Pesanan telah dibuat. Mohon segera di lunasi.');
      } else {
        Alert.alert('Terjadi kesalahan');
      }
    });
  };
  return (
    <View style={styles.container}>
      <HeaderDefault title={'Confirmation'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {dataUser.length != 0
            ? dataUser.map((item: any, index: any) => {
                return (
                  <View>
                    <View>
                      <Image
                        source={{uri: item.img}}
                        style={{
                          height: 150,
                          width: 150,
                          backgroundColor: 'red',
                          alignSelf: 'center',
                          marginTop: 30,
                        }}
                      />
                    </View>
                    <View style={{paddingVertical: 10}}>
                      <Text style={{textAlign: 'center'}}>--- Biodata ---</Text>
                      <Text style={{paddingTop: 10}}>Email : {item.email}</Text>
                      <Text>Nama : {item.nama_user}</Text>
                      <Text>No Telpon : {item.no_telpon}</Text>
                      <Text>Alamat : {item.alamat}</Text>
                    </View>
                  </View>
                );
              })
            : null}

          {dataKost.length != 0
            ? dataKost.map((item: any, index: any) => {
                return (
                  <View>
                    <View>
                      <Image
                        source={{uri: item.gambar_kost}}
                        style={{
                          height: 150,
                          width: 150,
                          backgroundColor: 'red',
                          alignSelf: 'center',
                          marginTop: 30,
                        }}
                      />
                    </View>
                    <View style={{paddingVertical: 10}}>
                      <Text style={{textAlign: 'center'}}>--- Kost ---</Text>
                      <Text style={{paddingTop: 10}}>
                        Nama Kost: {item.nama_kost}
                      </Text>
                      <Text>Nama Pemilik : {item.nama_pemilik}</Text>
                      <Text>Alamat : {item.alamat}</Text>
                      {dataKamar.length != 0
                        ? dataKamar.map((a: any, index: number) => {
                            return <Text>No Kamar : {a.no_kamar}</Text>;
                          })
                        : null}
                      <Text>Harga perbulan : Rp {item.harga_bulanan}</Text>
                    </View>
                  </View>
                );
              })
            : null}
        </View>

        <TouchableOpacity
          onPress={submit}
          style={{
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 50,
            paddingVertical: 10,
            paddingHorizontal: 30,
            backgroundColor: '#00AA13',
          }}>
          <Text style={{color: 'white'}}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  container: {},
});
