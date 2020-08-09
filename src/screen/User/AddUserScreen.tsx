import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import HeaderDefault from '../../utils/Headers/HeaderDefault';
import {
  Item,
  Form,
  Input,
  Label,
  Textarea,
  ListItem,
  CheckBox,
  Body,
  List,
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import StepIndicator from 'react-native-step-indicator';
import {FotoDefault} from '../../utils/FotoDefault';
import AddUser from '../../api/AddUser';
import {useNavigation} from '@react-navigation/native';

interface AddUserProps {}

const AddUserScreen = (props: AddUserProps) => {
  const [currentPosition, useCurrentPosition] = useState(0);
  const [foto, setFoto] = useState(FotoDefault.person);
  const [btnLaki, setBtnLaki] = useState(true);
  const [btnPerempuan, setBtnPerempuan] = useState(false);
  const [jenkel, setJenkel] = useState('Laki-Laki');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nama, setNama] = useState('');
  const [telpon, setTelpon] = useState('');
  const [alamat, setAlamat] = useState('');
  const [noRek, setNoRek] = useState('');
  const [namaRek, setNamaRek] = useState('');
  const [namaBank, setNamaBank] = useState('');

  const navigation = useNavigation();

  const labels = [
    'Foto Diri',
    'Informasi Login',
    'Informasi Diri',
    'Informasi Rekening',
  ];
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
        return (
          <View>
            <Image
              source={
                foto != '' ? {uri: foto} : require('../../assets/home.jpg')
              }
              style={{
                height: 150,
                width: 150,
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
          </View>
        );
      //<PictureInfo />;
      case 1:
        return (
          <View>
            <Form>
              <Item floatingLabel style={{marginRight: 20, marginLeft: 15}}>
                <Label>Email</Label>
                <Input
                  value={email}
                  onChangeText={(email) => setEmail(email)}
                />
              </Item>
              <Item floatingLabel style={{marginRight: 20, marginLeft: 15}}>
                <Label>Username</Label>
                <Input
                  value={username}
                  onChangeText={(username) => setUsername(username)}
                />
              </Item>
              <Item floatingLabel style={{marginRight: 20, marginLeft: 15}}>
                <Label>Password</Label>
                <Input
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                />
              </Item>
            </Form>
          </View>
        );
      //<LoginInfo />;
      case 2:
        return (
          <View style={{marginTop: 20}}>
            <Item floatingLabel style={{marginRight: 20, marginLeft: 15}}>
              <Label>Nama</Label>
              <Input value={nama} onChangeText={(nama) => setNama(nama)} />
            </Item>
            <Item floatingLabel style={{marginRight: 20, marginLeft: 15}}>
              <Label>No Telpon</Label>
              <Input
                value={telpon}
                onChangeText={(telpon) => setTelpon(telpon)}
              />
            </Item>
            <View style={{paddingVertical: 10}}>
              <ListItem style={{borderBottomWidth: 0, paddingBottom: 5}}>
                <CheckBox
                  onPress={() => changeGender('Laki')}
                  style={{}}
                  checked={btnLaki}
                  color={'#00AA13'}
                />
                <Body>
                  <Text> Lelaki</Text>
                </Body>
              </ListItem>
              <ListItem style={{borderBottomWidth: 0, paddingBottom: 5}}>
                <CheckBox
                  onPress={() => changeGender('Perempuan')}
                  style={{}}
                  checked={btnPerempuan}
                  color={'#00AA13'}
                />
                <Body>
                  <Text> Perempuan</Text>
                </Body>
              </ListItem>
            </View>

            <View style={{paddingRight: 20, paddingLeft: 15, marginTop: 10}}>
              <Textarea
                onChangeText={(alamat) => setAlamat(alamat)}
                rowSpan={3}
                bordered
                placeholder="Alamat"
                underline={true}
              />
            </View>
          </View>
        );
      case 3:
        return (
          <View>
            <Form>
              <Item floatingLabel style={{marginRight: 20, marginLeft: 15}}>
                <Label>No Rekening</Label>
                <Input
                  value={noRek}
                  onChangeText={(noRek) => setNoRek(noRek)}
                />
              </Item>
              <Item floatingLabel style={{marginRight: 20, marginLeft: 15}}>
                <Label>Nama Rekening</Label>
                <Input
                  value={namaRek}
                  onChangeText={(namaRek) => setNamaRek(namaRek)}
                />
              </Item>
              <Item floatingLabel style={{marginRight: 20, marginLeft: 15}}>
                <Label>Nama Bank</Label>
                <Input
                  value={namaBank}
                  onChangeText={(namaBank) => setNamaBank(namaBank)}
                />
              </Item>
            </Form>
            <View style={{marginRight: 20, marginLeft: 15, marginTop: 20}}>
              <Text>
                *Untuk memudahkan transaksi dan pengecekan, mohon diisi.
              </Text>
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
          </View>
        );
    }
  };

  const submit = () => {
    let error = 0;
    if (nama == '') {
      error += 1;
    }
    if (alamat == '') {
      error += 1;
    }
    if (telpon == '') {
      error += 1;
    }
    if (email == '') {
      error += 1;
    }
    if (noRek == '') {
      error += 1;
    }
    if (namaRek == '') {
      error += 1;
    }
    if (namaBank == '') {
      error += 1;
    }
    if (username == '') {
      error += 1;
    }
    if (password == '') {
      error += 1;
    }

    if (error == 0) {
      AddUser(
        nama,
        jenkel,
        alamat,
        telpon,
        email,
        foto,
        noRek,
        namaRek,
        namaBank,
        username,
        password,
      ).then((values) => {
        console.log(values);
        if (values.code == 200) {
          navigation.goBack();
          Alert.alert('User berhasil di tambahkan');
        } else {
          Alert.alert('Terjadi kesalahan');
        }
      });
    } else {
      Alert.alert('Periksa kembali form yang telah di isi.');
    }
  };

  const changeGender = (jenkel: string) => {
    if (jenkel == 'Laki') {
      setBtnLaki(true);
      setBtnPerempuan(false);
      setJenkel('Pria');
    } else if (jenkel == 'Perempuan') {
      setBtnLaki(false);
      setBtnPerempuan(true);
      setJenkel('Wanita');
    }
  };

  return (
    <View style={styles.container}>
      <HeaderDefault title={'Tambah Tamu'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingVertical: 10}}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
            onPress={onStepPress}
            stepCount={4}
          />
          {RenderPage()}
        </View>
      </ScrollView>
    </View>
  );
};

export default AddUserScreen;

const styles = StyleSheet.create({
  container: {},
});
