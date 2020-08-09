import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import HeaderMenu from '../../utils/Headers/Headers';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {
  GetPemesanan,
  GetSelesai,
  GetTunggakan,
} from '../../api/manage-kost/GetPemesanan';
import Icon from 'react-native-vector-icons/Ionicons';
import {DataTable} from 'react-native-paper';

const initialLayout = {width: Dimensions.get('window').width};

interface ManageKostScreenProps {}

const ManageKostScreen = ({navigation, route}: any) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'third', title: 'Tunggakan'},
    {key: 'first', title: 'Penerimaan'},
    {key: 'second', title: 'Selesai'},
  ]);

  const [dataPenerimaan, setDataPenerimaan] = useState([]);
  const [dataSelesai, setDataSelesai] = useState([]);
  const [dataTunggakan, setDataTunggakan] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataPenerimaan();
      getSelesai();
      getDataTunggakan();
    });

    return unsubscribe;
  }, [navigation]);

  const getDataPenerimaan = () => {
    GetPemesanan().then((values) => {
      //console.log('val', values);
      if (values.code == 200) {
        setDataPenerimaan(values.data);
      }
    });
  };

  const getDataTunggakan = () => {
    GetTunggakan().then((values) => {
      if (values.code == 200) {
        setDataTunggakan(values.data);
      }
    });
  };

  const getSelesai = () => {
    GetSelesai().then((values) => {
      //console.log(values);
      if (values.code == 200) {
        setDataSelesai(values.data);
      }
    });
  };

  const ThirdRoute = () => (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={{flex: 0.4}}>No</DataTable.Title>
        <DataTable.Title style={{flex: 1.5}}>Nama</DataTable.Title>
        <DataTable.Title style={{flex: 1}}>Tagihan</DataTable.Title>
        <DataTable.Title style={{flex: 1}}>Status</DataTable.Title>
      </DataTable.Header>
      {dataTunggakan.length !== 0 ? (
        dataTunggakan.map((item: any, index: number) => {
          return (
            <DataTable.Row>
              <DataTable.Cell style={{flex: 0.4}}>
                <Text>{index + 1}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{flex: 1.5}}>
                <Text>{item.nama_user}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{flex: 1}}>
                <Text>{item.tagihan_bulan}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{flex: 1}}>
                <Text>{item.status_pesanan == 0 ? 'Belum Bayar' : ''}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          );
        })
      ) : (
        <View
          style={{
            paddingTop: 50,
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <Text>Data tidak tersedia</Text>
        </View>
      )}
    </DataTable>
  );
  // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //   <Text>Data tidak tersedia</Text>
  // </View>

  const FirstRoute = () => (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={{flex: 0.4}}>No</DataTable.Title>
        <DataTable.Title style={{flex: 1.5}}>Nama</DataTable.Title>
        <DataTable.Title style={{flex: 1}}>Tagihan</DataTable.Title>
        <DataTable.Title style={{flex: 1}}>Status</DataTable.Title>
        <DataTable.Title style={{flex: 0.8}}>Action</DataTable.Title>
      </DataTable.Header>
      {dataPenerimaan.length !== 0 ? (
        dataPenerimaan.map((item: any, index: number) => {
          return (
            <DataTable.Row>
              <DataTable.Cell style={{flex: 0.4}}>
                <Text>{index + 1}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{flex: 1.5}}>
                <Text>{item.nama_user}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{flex: 1}}>
                <Text>{item.tagihan_bulan}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{flex: 1}}>
                <Text>{'Proses'}</Text>
              </DataTable.Cell>
              <View style={{flex: 0.8, justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ConfirmationPayment', {
                      id_pemesanan: item.id_pemesanan,
                      id_user: item.id_user,
                      id_kost: item.id_kost,
                      id_kamar: item.id_kamar,
                      status_pesanan: item.status_pesanan,
                    })
                  }
                  style={{
                    backgroundColor: '#00AA13',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    Lihat
                  </Text>
                </TouchableOpacity>
              </View>
            </DataTable.Row>
          );
        })
      ) : (
        <View
          style={{
            paddingTop: 50,
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <Text>Data tidak tersedia</Text>
        </View>
      )}
    </DataTable>
  );

  const SecondRoute = () => (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={{flex: 0.4}}>No</DataTable.Title>
        <DataTable.Title style={{flex: 1.5}}>Nama</DataTable.Title>
        <DataTable.Title style={{flex: 1}}>Tagihan</DataTable.Title>
        <DataTable.Title style={{flex: 1}}>Status</DataTable.Title>
        <DataTable.Title style={{flex: 0.8}}>Action</DataTable.Title>
      </DataTable.Header>
      {dataSelesai.length !== 0 ? (
        dataSelesai.map((item: any, index: number) => {
          return (
            <DataTable.Row>
              <DataTable.Cell style={{flex: 0.4}}>
                <Text>{index + 1}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{flex: 1.5}}>
                <Text>{item.nama_user}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{flex: 1}}>
                <Text>{item.tagihan_bulan}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{flex: 1}}>
                <Text>{'Lunas'}</Text>
              </DataTable.Cell>
              <View style={{flex: 0.8, justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ConfirmationPayment', {
                      id_pemesanan: item.id_pemesanan,
                      id_user: item.id_user,
                      id_kost: item.id_kost,
                      id_kamar: item.id_kamar,
                      status_pesanan: item.status_pesanan,
                    })
                  }
                  style={{
                    backgroundColor: '#00AA13',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    Lihat
                  </Text>
                </TouchableOpacity>
              </View>
            </DataTable.Row>
          );
        })
      ) : (
        <View
          style={{
            paddingTop: 50,
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <Text>Data tidak tersedia</Text>
        </View>
      )}
    </DataTable>
  );
  const renderScene = SceneMap({
    third: ThirdRoute,
    first: FirstRoute,
    second: SecondRoute,
  });
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'white'}}
      style={{backgroundColor: '#00aa13'}}
    />
  );
  return (
    <View style={styles.container}>
      <HeaderMenu title={'Manage Kost'} navigation={navigation} />
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddGuest')}
          style={{
            flex: 1,
            paddingVertical: 20,
            justifyContent: 'center',
            marginHorizontal: 20,
            marginVertical: 20,
            backgroundColor: '#00AA13',
            borderRadius: 5,
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>
            Tambah tamu kost
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SharePayment')}
          style={{
            flex: 1,
            paddingVertical: 20,
            justifyContent: 'center',
            marginHorizontal: 20,
            marginVertical: 20,
            backgroundColor: '#00AA13',
            borderRadius: 5,
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>
            Siarkan tagihan
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
            onPress={() => navigation.navigate('EditKost')}
            style={{
              flex: 1,
              paddingVertical: 40,
              justifyContent: 'center',
              marginHorizontal: 20,
              marginVertical: 20,
              backgroundColor: '#00AA13',
              borderRadius: 5,
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>
              Edit Data Kost
            </Text>
          </TouchableOpacity> */}
      </View>
      <View style={{flex: 1}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          style={styles.container}
        />
      </View>
    </View>
  );
};

export default ManageKostScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
});
