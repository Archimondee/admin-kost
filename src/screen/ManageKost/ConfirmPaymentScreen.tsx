import * as React from 'react';
import {Text, View, StyleSheet, ScrollView, Alert, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TerimaPayment from '../../api/manage-kost/TerimaPayment';
import GetIdKamar from '../../api/manage-kost/GetIdKamar';
import GetIdPemesanan from '../../api/manage-kost/GetIdPemesanan';
import HeaderDefault from '../../utils/Headers/HeaderDefault';
import TolakPayment from '../../api/manage-kost/TolakPayment';

interface ConfirmationPaymentScreenProps {}

const ConfirmationPaymentScreen = ({navigation, route}: any) => {
  const {
    id_pemesanan,
    id_user,
    id_kost,
    id_kamar,
    status_pesanan,
  } = route.params;
  const [dataPemesanan, setDataPemesanan] = React.useState([] as any[]);
  const [dataKost, setDataKost] = React.useState([] as any[]);

  React.useEffect(() => {
    getIdPesanan();
    getIdKamar();
  }, []);

  const getIdPesanan = () => {
    GetIdPemesanan(id_pemesanan).then((values) => {
      if (values.code == 200) {
        setDataPemesanan(values.data);
      } else {
        Alert.alert('Ooops look like something error');
      }
    });
  };

  const getIdKamar = () => {
    GetIdKamar(id_kost, id_kamar).then((values) => {
      if (values.code == 200) {
        setDataKost(values.data);
      } else {
        Alert.alert('Oops look like something error');
      }
    });
  };

  const terimaPayment = () => {
    TerimaPayment(id_pemesanan, id_user, id_kost, id_kamar).then((values) => {
      console.log(values);
      if (values.code == 200) {
        Alert.alert('Pembayaran di konfirmasi');
        navigation.goBack();
      }
    });
  };

  const tolakPayment = () => {
    TolakPayment(id_pemesanan).then((values) => {
      if (values.code == 200) {
        Alert.alert('Pembayaran di tolak');
        navigation.goBack();
      }
    });
  };

  return (
    <View style={styles.container}>
      <HeaderDefault title="Konfirmasi Pembayaran" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {dataPemesanan.length !== 0 ? (
          <View>
            <View style={{alignSelf: 'center', paddingVertical: 20}}>
              <Text style={{textAlign: 'center'}}>--- Data Pembayaran ---</Text>
              {/* {console.log(dataPemesanan[0].nama_user)} */}
              <Image
                source={{uri: dataPemesanan[0].img_pembayaran}}
                style={{
                  width: 250,
                  height: 250,
                  backgroundColor: 'red',
                  marginTop: 10,
                }}
              />
            </View>
            <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
              <Text style={{marginTop: 5}}>--- Data Rekening ---</Text>
              <Text style={{marginTop: 5}}>
                Nomor Rekening : {dataPemesanan[0].nomor_rekening}
              </Text>
              <Text style={{marginTop: 5}}>
                Nama Rekening : {dataPemesanan[0].nama_rekening}
              </Text>
              <Text style={{marginTop: 5}}>
                Nama Bank : {dataPemesanan[0].nama_bank}
              </Text>
              <Text style={{marginTop: 5}}>
                Total Bayar : Rp. {dataPemesanan[0].nominal}
              </Text>
            </View>
            <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
              <Text style={{marginTop: 5}}>--- Data Tamu ---</Text>
              <Text style={{marginTop: 5}}>
                Nama : {dataPemesanan[0].nama_user}
              </Text>
              <Text style={{marginTop: 5}}>
                Tanggal Bayar : {dataPemesanan[0].tgl_bayar}
              </Text>
              {dataKost.length != 0
                ? dataKost.map((item, index) => {
                    return (
                      <View>
                        <Text style={{marginTop: 5}}>
                          Nama Kost : {item.nama_kost}
                        </Text>
                        <Text style={{marginTop: 5}}>
                          No Kamar : {item.no_kamar}
                        </Text>
                      </View>
                    );
                  })
                : null}
            </View>

            {status_pesanan == 1 ? (
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  marginBottom: 100,
                }}>
                <TouchableOpacity
                  onPress={tolakPayment}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: 'red',
                    marginRight: 10,
                  }}>
                  <Text style={{color: 'white'}}>Tolak</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={terimaPayment}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: '#00AA13',
                    marginLeft: 10,
                  }}>
                  <Text style={{color: 'white'}}>Terima</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ConfirmationPaymentScreen;

const styles = StyleSheet.create({
  container: {},
});
