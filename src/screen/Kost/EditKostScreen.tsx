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
import {FotoDefault} from '../../utils/FotoDefault';
import {Item, Form, Input, Label, Textarea} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import EditKost from '../../api/EditKost';

interface EditKostScreenProps {}

const EditKostScreen = ({navigation, route}: any) => {
  const {
    id_kost,
    nama_kost,
    gambar_kost,
    nama_pemilik,
    harga_bulanan,
    alamat1,
    keterangan1,
    fasilitas1,
  } = route.params;
  const [foto, setFoto] = useState(gambar_kost);
  const [namaKost, setNamaKost] = useState(nama_kost);
  const [namaPemilik, setNamaPemilik] = useState(nama_pemilik);
  const [hargaBulanan, setHargaBulanan] = useState(harga_bulanan);
  const [alamat, setAlamat] = useState(alamat1);
  const [keterangan, setKeterangan] = useState(keterangan1);
  const [fasilitas, setFasilitas] = useState(fasilitas1);

  const openImagePicker = () => {
    ImagePicker.showImagePicker((response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setFoto('data:' + response.type + ';base64,' + response.data);
      }
    });
  };

  const submit = () => {
    let error = 0;
    if (namaKost == '') {
      error += 1;
    }

    if (namaPemilik == '') {
      error += 1;
    }

    if (hargaBulanan == '') {
      error += 1;
    }

    if (alamat == '') {
      error += 1;
    }

    if (keterangan == '') {
      error += 1;
    }

    if (fasilitas == '') {
      error += 1;
    }

    if (error == 0) {
      EditKost(
        id_kost,
        foto,
        namaKost,
        namaPemilik,
        hargaBulanan,
        alamat,
        keterangan,
        fasilitas,
      ).then((values) => {
        console.log(values.code);
        if (values.code === 200) {
          navigation.goBack();
          Alert.alert('Berhasil memperbaharui rumah kost');
        } else {
          Alert.alert('Terjadi kesalahan');
        }
      });
    } else {
      Alert.alert('Periksa kembali data anda.');
    }
  };
  return (
    <View style={{flex: 1}}>
      <HeaderDefault title={'Edit Kost'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginBottom: 30}}>
          <Image
            source={foto != '' ? {uri: foto} : require('../../assets/home.jpg')}
            style={{
              height: 150,
              width: 150,
              backgroundColor: 'red',
              alignSelf: 'center',
              marginTop: 30,
            }}
          />
          <TouchableOpacity
            onPress={openImagePicker}
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginVertical: 10,
              backgroundColor: '#00AA13',
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <Text style={{color: 'white'}}>Upload</Text>
          </TouchableOpacity>
          <Form>
            <Item floatingLabel style={{marginRight: 20, marginLeft: 15}}>
              <Label>Nama Kost</Label>
              <Input
                value={namaKost}
                onChangeText={(namaKost) => setNamaKost(namaKost)}
              />
            </Item>
            <Item
              floatingLabel
              style={{paddingTop: 3, marginRight: 20, marginLeft: 15}}>
              <Label>Nama Pemilik</Label>
              <Input
                value={namaPemilik}
                onChangeText={(namaPemilik) => setNamaPemilik(namaPemilik)}
              />
            </Item>
            <Item
              floatingLabel
              style={{paddingTop: 3, marginRight: 20, marginLeft: 15}}>
              <Label>Harga Bulanan</Label>
              <Input
                value={hargaBulanan}
                onChangeText={(hargaBulanan) => setHargaBulanan(hargaBulanan)}
              />
            </Item>
            <View style={{paddingRight: 20, paddingLeft: 15, marginTop: 10}}>
              <Textarea
                value={alamat}
                onChangeText={(alamat) => setAlamat(alamat)}
                rowSpan={3}
                bordered
                placeholder="Alamat"
                underline={true}
              />
            </View>
            <View style={{paddingRight: 20, paddingLeft: 15, marginTop: 10}}>
              <Textarea
                value={keterangan}
                onChangeText={(keterangan) => setKeterangan(keterangan)}
                rowSpan={3}
                bordered
                placeholder="Keterangan"
                underline={true}
              />
            </View>
            <View style={{paddingRight: 20, paddingLeft: 15, marginTop: 10}}>
              <Textarea
                value={fasilitas}
                onChangeText={(fasilitas) => setFasilitas(fasilitas)}
                rowSpan={3}
                bordered
                placeholder="Fasilitas"
                underline={true}
              />
            </View>
            <TouchableOpacity
              onPress={submit}
              style={{
                alignSelf: 'center',
                marginVertical: 20,
                paddingVertical: 10,
                paddingHorizontal: 30,
                backgroundColor: '#00AA13',
              }}>
              <Text style={{color: 'white'}}>Submit</Text>
            </TouchableOpacity>
          </Form>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditKostScreen;

const styles = StyleSheet.create({
  container: {},
});
