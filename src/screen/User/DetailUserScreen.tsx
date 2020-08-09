import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import HeaderDefault from '../../utils/Headers/HeaderDefault';
import {Item, Label, Input, Textarea} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import GetUserDetail from '../../api/GetUserDetail';
import DeleteUser from '../../api/DeleteUser';
import CekUserKost from '../../api/manage-kost/CekUserKost';
import KeluarKost from '../../api/manage-kost/KeluarKost';

interface DetailUserScreenProps {}

const DetailUserScreen = ({navigation, route}: any) => {
  const {id_user} = route.params;
  const [dataUser, setDataUser] = useState([]);
  const [dataPenghuni, setDataPenghuni] = useState([] as any);
  console.log(id_user);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      //getDataUser();
      getDetailUser();
      cekUserKost();
    });

    return unsubscribe;
  }, [navigation]);

  const getDetailUser = () => {
    GetUserDetail(id_user).then((values) => {
      if (values.code == 200) {
        setDataUser(values.data);
      } else {
        Alert.alert('Terjadi kesalahan');
      }
    });
  };

  const cekUserKost = () => {
    CekUserKost(id_user).then((values) => {
      if (values.code == 200) {
        setDataPenghuni(values.data);
        console.log(values.data);
      }
    });
  };

  const deleteUser = () => {
    DeleteUser(id_user).then((values) => {
      if (values == 200) {
        navigation.goBack();
        Alert.alert('User tersebut telah di hapus');
      } else {
        Alert.alert('Terjadi kesalahan');
      }
    });
  };

  const keluarKost = (id_user: number, id_kost: number, id_kamar: number) => {
    //console.log(id_user);
    KeluarKost(id_user, id_kost, id_kamar).then((values) => {
      if (values.code == 200) {
        navigation.goBack();
        Alert.alert('User telah keluar dari kost');
      } else {
        Alert.alert('Terjadi kesalahan');
      }
    });
  };
  return (
    <View style={styles.container}>
      <HeaderDefault title={'Detail user'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {dataUser.length !== 0
          ? dataUser.map((item: any, index: number) => {
              return (
                <View>
                  <Image
                    source={{uri: item.img}}
                    style={{
                      height: 150,
                      //backgroundColor: 'red',
                      width: 150,
                      alignSelf: 'center',
                      marginTop: 20,
                    }}
                  />
                  <View style={{marginTop: 20, paddingHorizontal: 10}}>
                    <Item
                      floatingLabel
                      style={{marginRight: 20, marginLeft: 15, marginTop: 10}}>
                      <Label>Email</Label>
                      <Input value={item.email} />
                    </Item>
                    <Item
                      floatingLabel
                      style={{marginRight: 20, marginLeft: 15, marginTop: 10}}>
                      <Label>Nama</Label>
                      <Input value={item.nama_user} />
                    </Item>
                    <Item
                      floatingLabel
                      style={{marginRight: 20, marginLeft: 15, marginTop: 10}}>
                      <Label>No Telpon</Label>
                      <Input value={item.no_telpon} />
                    </Item>
                    <Item
                      floatingLabel
                      style={{marginRight: 20, marginLeft: 15, marginTop: 10}}>
                      <Label>No Rekening</Label>
                      <Input value={item.no_rekening} />
                    </Item>
                    <Item
                      floatingLabel
                      style={{marginRight: 20, marginLeft: 15, marginTop: 10}}>
                      <Label>Nama Rekening</Label>
                      <Input value={item.nama_rekening} />
                    </Item>
                    <Item
                      floatingLabel
                      style={{marginRight: 20, marginLeft: 15, marginTop: 10}}>
                      <Label>Nama Bank</Label>
                      <Input value={item.nama_bank} />
                    </Item>
                    <View
                      style={{
                        paddingRight: 20,
                        paddingLeft: 15,
                        marginTop: 10,
                      }}>
                      <Textarea
                        //onChangeText={(alamat) => setAlamat(alamat)}
                        rowSpan={3}
                        bordered
                        value={item.alamat}
                        placeholder="Alamat"
                        underline={true}
                      />
                    </View>
                    <View
                      style={{
                        paddingHorizontal: 20,
                        flexDirection: 'row',
                        marginVertical: 70,
                        justifyContent: 'space-between',
                      }}>
                      {/* <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate('EditKost', {
              //     id_kost: id_kost,
              //     nama_kost: item.nama_kost,
              //     gambar_kost: item.gambar_kost,
              //     nama_pemilik: item.nama_pemilik,
              //     harga_bulanan: item.harga_bulanan,
              //     alamat1: item.alamat,
              //     keterangan1: item.keterangan,
              //     fasilitas1: item.nama_fasilitas,
              //   })
              // }
              style={{
                borderRadius: 4,
                backgroundColor: '#ffc107',
                paddingHorizontal: 30,
                paddingVertical: 15,
              }}>
              <Text style={{color: 'white'}}>User Out</Text>
            </TouchableOpacity> */}
                      <TouchableOpacity
                        onPress={deleteUser}
                        style={{
                          borderRadius: 4,
                          backgroundColor: '#dc3545',
                          paddingHorizontal: 30,
                          paddingVertical: 15,
                        }}>
                        <Text style={{color: 'white'}}>Delete User</Text>
                      </TouchableOpacity>
                      {dataPenghuni.length !== 0 ? (
                        <TouchableOpacity
                          onPress={() =>
                            keluarKost(
                              dataPenghuni[0].id_user,
                              dataPenghuni[0].id_kost,
                              dataPenghuni[0].id_kamar,
                            )
                          }
                          style={{
                            borderRadius: 4,
                            backgroundColor: '#ffc107',
                            paddingHorizontal: 30,
                            paddingVertical: 15,
                          }}>
                          <Text style={{color: 'white'}}>Keluar Kost</Text>
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  </View>
                </View>
              );
            })
          : null}
      </ScrollView>
    </View>
  );
};

export default DetailUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
