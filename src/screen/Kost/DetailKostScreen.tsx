import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, Alert} from 'react-native';
import HeaderDefault from '../../utils/Headers/HeaderDefault';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import DetailKost from '../../api/DetailKost';
import GetKamar from '../../api/GetKamar';
import DeleteKost from '../../api/DeleteKost';

interface DetailKostScreenProps {}

const DetailKostScreen = ({navigation, route}: any) => {
  const {id_kost} = route.params;
  const [detailKost, setDetailKost] = useState([]);
  const [jumlahKamar, setJumlahKamar] = useState(0);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDetailKost();
      getJumlahKamar();
    });

    return unsubscribe;
  }, [navigation]);
  const getDetailKost = () => {
    DetailKost(parseInt(id_kost)).then((values) => {
      if (values.code == 200) {
        setDetailKost(values.data);
      }
    });
  };

  const getJumlahKamar = () => {
    GetKamar(id_kost).then((values) => {
      //console.log(values.data[0].jumlah);
      setJumlahKamar(values.data[0].jumlah);
    });
  };

  const deleteKost = () =>
    Alert.alert(
      'Hapus!',
      'Apakah anda ingin menghapus rumah kost ini ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: hapus},
      ],
      {cancelable: false},
    );
  const hapus = () => {
    DeleteKost(id_kost).then((values) => {
      console.log(values);
      if (values.code === 200) {
        navigation.goBack();
        Alert.alert('Berhasil menghapus rumah kost');
      } else {
        Alert.alert('Terjadi kesalahan');
      }
    });
  };
  return (
    <View style={styles.container}>
      <HeaderDefault title={'Detail Kost'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {detailKost.length !== 0
          ? detailKost.map((item: any, index: number) => {
              return (
                <View>
                  <Image
                    source={{uri: item.gambar_kost}}
                    style={{height: 200, backgroundColor: 'red'}}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>
                      {item.keterangan}
                    </Text>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>
                      {' '}
                      - Tinggal {jumlahKamar} kamar
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 5,
                      paddingHorizontal: 20,
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>
                      {item.nama_kost}
                    </Text>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>
                      - {item.alamat}
                    </Text>
                  </View>
                  <View style={{paddingHorizontal: 20}}>
                    <Text>Detail Kost</Text>
                    <Text></Text>
                    <Text>Biaya : Rp. {item.harga_bulanan}</Text>
                    <Text>Fasilitas : {item.nama_fasilitas}</Text>
                    <Text>Alamat : {item.alamat}</Text>
                  </View>
                  <View
                    style={{
                      paddingHorizontal: 20,
                      flexDirection: 'row',
                      marginTop: 70,
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EditKost', {
                          id_kost: id_kost,
                          nama_kost: item.nama_kost,
                          gambar_kost: item.gambar_kost,
                          nama_pemilik: item.nama_pemilik,
                          harga_bulanan: item.harga_bulanan,
                          alamat1: item.alamat,
                          keterangan1: item.keterangan,
                          fasilitas1: item.nama_fasilitas,
                        })
                      }
                      style={{
                        borderRadius: 4,
                        backgroundColor: '#ffc107',
                        paddingHorizontal: 30,
                        paddingVertical: 15,
                      }}>
                      <Text style={{color: 'white'}}>Edit Kost</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={deleteKost}
                      style={{
                        borderRadius: 4,
                        backgroundColor: '#dc3545',
                        paddingHorizontal: 30,
                        paddingVertical: 15,
                      }}>
                      <Text style={{color: 'white'}}>Delete Kost</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          : null}
      </ScrollView>
    </View>
  );
};

export default DetailKostScreen;

const styles = StyleSheet.create({
  container: {},
});
