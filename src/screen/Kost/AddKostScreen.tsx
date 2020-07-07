import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Alert, Image} from 'react-native';
import HeaderDefault from '../../utils/Headers/HeaderDefault';
import StepIndicator from 'react-native-step-indicator';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {Item, Form, Input, Label, Textarea} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import AddKost from '../../api/AddKost';
import {FotoDefault} from '../../utils/FotoDefault';
import {useNavigation} from '@react-navigation/native';

interface AddKostScreenProps {}

const AddKostScreen = (props: AddKostScreenProps) => {
  const [currentPosition, useCurrentPosition] = useState(0);
  const [foto, setFoto] = useState(FotoDefault.foto);
  const [namaKost, setNamaKost] = useState('');
  const [namaPemilik, setNamaPemilik] = useState('');
  const [hargaBulanan, setHargaBulanan] = useState('');
  const [alamat, setAlamat] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [fasilitas, setFasilitas] = useState('');
  const [jumlahKamar, setJumlahKamar] = useState(0);
  const navigation = useNavigation();
  const labels = ['Foto Kost', 'Informasi Kost', 'Informasi Kamar'];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#00AA13',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#00AA13',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#00AA13',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#00AA13',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#00AA13',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#00AA13',
  };
  const onStepPress = (position: number) => {
    useCurrentPosition(position);
  };

  const openImagePicker = () => {
    ImagePicker.showImagePicker((response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response.type);
        //useFoto(response.data);
        setFoto('data:' + response.type + ';base64,' + response.data);
      }
    });
  };

  const RenderPage = () => {
    const cmp = [];
    switch (currentPosition) {
      case 0:
        cmp.push(
          <View>
            <Image
              source={
                foto != '' ? {uri: foto} : require('../../assets/home.jpg')
              }
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
          </View>,
        );
        break;
      case 1:
        cmp.push(
          <View>
            <Form>
              <Item floatingLabel style={{marginRight: 20, marginLeft: 15}}>
                <Label>Nama Kost</Label>
                <Input onChangeText={(namaKost) => setNamaKost(namaKost)} />
              </Item>
              <Item
                floatingLabel
                style={{paddingTop: 3, marginRight: 20, marginLeft: 15}}>
                <Label>Nama Pemilik</Label>
                <Input
                  onChangeText={(namaPemilik) => setNamaPemilik(namaPemilik)}
                />
              </Item>
              <Item
                floatingLabel
                style={{paddingTop: 3, marginRight: 20, marginLeft: 15}}>
                <Label>Harga Bulanan</Label>
                <Input
                  onChangeText={(hargaBulanan) => setHargaBulanan(hargaBulanan)}
                />
              </Item>
              <View style={{paddingRight: 20, paddingLeft: 15, marginTop: 10}}>
                <Textarea
                  onChangeText={(alamat) => setAlamat(alamat)}
                  rowSpan={3}
                  bordered
                  placeholder="Alamat"
                  underline={true}
                />
              </View>
              <View style={{paddingRight: 20, paddingLeft: 15, marginTop: 10}}>
                <Textarea
                  onChangeText={(keterangan) => setKeterangan(keterangan)}
                  rowSpan={3}
                  bordered
                  placeholder="Keterangan"
                  underline={true}
                />
              </View>
            </Form>
          </View>,
        );
        break;
      case 2:
        cmp.push(
          <View style={{marginTop: 10}}>
            <Form>
              <Item floatingLabel style={{marginRight: 20, marginLeft: 15}}>
                <Label>Jumlah Kamar</Label>
                <Input
                  onChangeText={(jumlahKamar) =>
                    setJumlahKamar(parseInt(jumlahKamar))
                  }
                />
              </Item>
              <View style={{paddingRight: 20, paddingLeft: 15, marginTop: 10}}>
                <Textarea
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
          </View>,
        );
        break;
    }
    return cmp;
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

    if (jumlahKamar == 0) {
      error += 1;
    }

    if (fasilitas == '') {
      error += 1;
    }

    if (error == 0) {
      AddKost(
        foto,
        namaKost,
        namaPemilik,
        hargaBulanan,
        alamat,
        keterangan,
        fasilitas,
        jumlahKamar,
      ).then((values) => {
        if (values.code === 200) {
          navigation.goBack();
          Alert.alert('Berhasil menambahkan rumah kost');
        } else {
          Alert.alert('Terjadi kesalahan.');
        }
      });
      console.log('Success');
    } else {
      Alert.alert('Periksa kembali data anda.');
    }
  };
  return (
    <View style={styles.container}>
      <HeaderDefault title={'Tambah Kost'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingVertical: 10}}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
            onPress={onStepPress}
            stepCount={3}
          />
          {RenderPage()}
        </View>
      </ScrollView>
    </View>
  );
};

export default AddKostScreen;

const styles = StyleSheet.create({
  container: {},
});
