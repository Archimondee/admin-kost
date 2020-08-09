import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import HeaderDefault from '../../utils/Headers/HeaderDefault';
import {Picker} from '@react-native-community/picker';
import {Item, Label, Input} from 'native-base';
import moment from 'moment';
import SharePayment from '../../api/manage-kost/SharePayment';
import {useNavigation} from '@react-navigation/native';
interface SharePaymentScreenProps {}

const SharePaymentScreen = (props: SharePaymentScreenProps) => {
  const [dataBulan, setDataBulan] = useState([
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ]);
  const [selectedBulan, setSelectedBulan] = useState('');
  const [pesan, setPesan] = useState('');
  const navigation = useNavigation();

  const share = () => {
    let tgl = moment().format('YYYY[-]MM[-]DD');
    let error = 0;
    if (selectedBulan == '') {
      error = +1;
    }
    if (pesan == '') {
      error = +1;
    }
    if (error == 0) {
      SharePayment(selectedBulan, tgl, pesan).then((values) => {
        if (values.code == 200) {
          navigation.goBack();
          Alert.alert('Blast pembayaran berhasil.');
        } else {
          Alert.alert('Oops, terjadi kesalahan');
        }
      });
    } else {
      Alert.alert('Oops, terjadi kesalahan.');
    }
  };
  return (
    <View style={styles.container}>
      <HeaderDefault title="Share Payment" />
      <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
        <View style={{borderWidth: 0.5, borderColor: 'gray', marginTop: 5}}>
          <Picker
            selectedValue={selectedBulan}
            style={{height: 50}}
            mode={'dialog'}
            onValueChange={(itemValue: any, itemIndex) =>
              setSelectedBulan(itemValue)
            }>
            <Picker.Item label="Silahkan pilih bulan" value="" />
            {dataBulan.length !== 0
              ? dataBulan.map((item: any, index: number) => {
                  return <Picker.Item label={item} value={item} />;
                })
              : null}
          </Picker>
        </View>
        <Item floatingLabel style={{marginTop: 15}}>
          <Label>Pesan</Label>
          <Input value={pesan} onChangeText={(pesan) => setPesan(pesan)} />
        </Item>
        <TouchableOpacity
          onPress={share}
          style={{
            marginVertical: 20,
            alignSelf: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: '#00aa13',
            borderRadius: 4,
          }}>
          <Text style={{color: 'white'}}>Sebar pembayaran</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SharePaymentScreen;

const styles = StyleSheet.create({
  container: {},
});
