import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import HeaderDefault from '../../utils/Headers/HeaderDefault';
import {Picker} from '@react-native-community/picker';
import {
  GetGuest,
  GetGuestKost,
  GetGuestKamar,
} from '../../api/manage-kost/AddGuest';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

interface AddGuestScreenProps {}

const AddGuestScreen = (props: AddGuestScreenProps) => {
  const [dataUser, setDataUser] = useState([]);
  const [dataKost, setDataKost] = useState([]);
  const [dataKamar, setDataKamar] = useState([]);

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedKost, setSelectedKost] = useState('');
  const [selectedKamar, setSelectedKamar] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    getGuest();
    getKost();
  }, []);

  const getGuest = () => {
    GetGuest().then((values) => {
      if (values.code == 200) {
        //console.log(values.data);
        setDataUser(values.data);
      } else {
        Alert.alert('Terjadi kesalahan');
      }
    });
  };

  const getKost = () => {
    GetGuestKost().then((values) => {
      if (values.code == 200) {
        setDataKost(values.data);
      } else {
        Alert.alert('Terjadi kesalahan');
      }
    });
  };

  const setKost = (id_kost: string) => {
    setSelectedKost(id_kost);
    getKamar(id_kost);
  };

  const getKamar = (id_kost: string) => {
    GetGuestKamar(parseInt(id_kost)).then((values) => {
      if (values.code == 200) {
        setDataKamar(values.data);
      } else {
        Alert.alert('Terjadi kesalahan');
      }
    });
  };

  const submit = () => {
    let error = 0;
    if (selectedUser == '') {
      error += 1;
    }
    if (selectedKost == '') {
      error += 1;
    }
    if (selectedKamar == '') {
      error += 1;
    }

    console.log('aaa', selectedUser);
    if (error == 0) {
      navigation.navigate('Confirmation', {
        id_user: selectedUser,
        id_kost: selectedKost,
        id_kamar: selectedKamar,
      });
    } else {
      Alert.alert('Pastikan form terisi semua');
    }
  };
  return (
    <View style={styles.container}>
      <HeaderDefault title={'Add Guest'} />
      <View style={{marginTop: 20, paddingHorizontal: 20}}>
        <View style={{paddingVertical: 5}}>
          <Text style={{fontSize: 16}}>Nama Tamu</Text>
        </View>
        <View style={{borderWidth: 0.5, borderColor: 'gray', marginTop: 5}}>
          <Picker
            selectedValue={selectedUser}
            style={{height: 50}}
            mode={'dropdown'}
            onValueChange={(itemValue: any, itemIndex) =>
              setSelectedUser(itemValue)
            }>
            <Picker.Item label="Silahkan pilih nama tamu" value="" />
            {dataUser.length !== 0
              ? dataUser.map((item: any, index: number) => {
                  if (item.status_pesanan == 0) {
                    return null;
                  } else {
                    return (
                      <Picker.Item
                        label={item.nama_user}
                        value={item.user_id}
                      />
                    );
                  }
                })
              : null}
          </Picker>
        </View>
        <View style={{paddingVertical: 5}}>
          <Text style={{fontSize: 16}}>Nama Kost</Text>
        </View>
        <View style={{borderWidth: 0.5, borderColor: 'gray', marginTop: 5}}>
          <Picker
            selectedValue={selectedKost}
            style={{height: 50}}
            mode={'dropdown'}
            onValueChange={(itemValue: any, itemIndex) => setKost(itemValue)}>
            <Picker.Item label="Silahkan pilih nama kost" value="" />
            {dataKost.length !== 0
              ? dataKost.map((item: any, index: number) => {
                  return (
                    <Picker.Item
                      label={item.nama_kost + ' - Rp.' + item.harga_bulanan}
                      value={item.id_kost}
                    />
                  );
                })
              : null}
          </Picker>
        </View>
        <View style={{paddingVertical: 5}}>
          <Text style={{fontSize: 16}}>No Kamar</Text>
        </View>
        <View style={{borderWidth: 0.5, borderColor: 'gray', marginTop: 5}}>
          <Picker
            enabled={selectedKost === '' ? false : true}
            selectedValue={selectedKamar}
            style={{height: 50}}
            mode={'dropdown'}
            onValueChange={(itemValue: any, itemIndex) =>
              setSelectedKamar(itemValue)
            }>
            <Picker.Item label="Silahkan pilih no kamar" value="" />
            {dataKamar.length !== 0
              ? dataKamar.map((item: any, index: number) => {
                  return (
                    <Picker.Item label={item.no_kamar} value={item.id_kamar} />
                  );
                })
              : null}
          </Picker>
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
    </View>
  );
};

export default AddGuestScreen;

const styles = StyleSheet.create({
  container: {},
});
