import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import HeaderMenu from '../../utils/Headers/Headers';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {DataTable} from 'react-native-paper';
import {
  GetKeluhanRegistered,
  GetKeluhanDone,
} from '../../api/keluhan/GetKeluhan';

interface KeluhanScreenProps {}

const initialLayout = {width: Dimensions.get('window').width};

const KeluhanScreen = ({navigation, route}: any) => {
  const [index, setIndex] = useState(0);
  const [keluhan, setKeluhan] = useState([]);
  const [keluhanDone, setKeluhanDone] = useState([]);
  const [routes] = useState([
    {key: 'first', title: 'Daftar Keluhan'},
    {key: 'second', title: 'Keluhan Selesai'},
  ]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getKeluhan();
      getKeluhanDone();
    });

    return unsubscribe;
  }, [navigation]);

  const getKeluhan = () => {
    GetKeluhanRegistered().then((value) => {
      //console.log(value);
      if (value.code == 200) {
        setKeluhan(value.data);
      }
    });
  };

  const getKeluhanDone = () => {
    GetKeluhanDone().then((value) => {
      if (value.code == 200) {
        setKeluhanDone(value.data);
      }
    });
  };
  const FirstRoute = () => (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{flex: 0.4}}>No</DataTable.Title>
          <DataTable.Title style={{flex: 1.5}}>Nama keluhan</DataTable.Title>
          <DataTable.Title style={{flex: 0.8}}>Urgency</DataTable.Title>
          <DataTable.Title style={{flex: 0.8}}>Status</DataTable.Title>
          <DataTable.Title style={{flex: 0.8}}>Action</DataTable.Title>
        </DataTable.Header>
        {keluhan.length !== 0 ? (
          keluhan.map((item: any, index: number) => {
            return (
              <DataTable.Row>
                <DataTable.Cell style={{flex: 0.4}}>
                  <Text>{index + 1}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 1.5}}>
                  <Text>{item.nama_keluhan}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 0.8}}>
                  <Text>{item.urgency}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 0.8}}>
                  <Text>
                    {item.status_keluhan == 0 ? 'Terdaftar' : 'Selesai'}
                  </Text>
                </DataTable.Cell>
                {/* <DataTable.Cell style={{flex: 0.8}}>
                      <Text>{index + 1}</Text>
                    </DataTable.Cell> */}
                <View style={{flex: 0.8, justifyContent: 'center'}}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('LihatKeluhanScreen', {
                        id_keluhan: item.id_keluhan,
                        id_user: item.id_user,
                        id_kost: item.id_kost,
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
    </View>
  );

  const SecondRoute = () => (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{flex: 0.4}}>No</DataTable.Title>
          <DataTable.Title style={{flex: 1.5}}>Nama keluhan</DataTable.Title>
          <DataTable.Title style={{flex: 0.8}}>Urgency</DataTable.Title>
          <DataTable.Title style={{flex: 0.8}}>Status</DataTable.Title>
          <DataTable.Title style={{flex: 0.8}}>Action</DataTable.Title>
        </DataTable.Header>
        {keluhanDone.length !== 0 ? (
          keluhanDone.map((item: any, index: number) => {
            return (
              <DataTable.Row>
                <DataTable.Cell style={{flex: 0.4}}>
                  <Text>{index + 1}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 1.5}}>
                  <Text>{item.nama_keluhan}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 0.8}}>
                  <Text>{item.urgency}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 0.8}}>
                  <Text>
                    {item.status_keluhan == 0 ? 'Terdaftar' : 'Selesai'}
                  </Text>
                </DataTable.Cell>
                {/* <DataTable.Cell style={{flex: 0.8}}>
                      <Text>{index + 1}</Text>
                    </DataTable.Cell> */}
                <View style={{flex: 0.8, justifyContent: 'center'}}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('LihatKeluhanScreen', {
                        id_keluhan: item.id_keluhan,
                        id_user: item.id_user,
                        id_kost: item.id_kost,
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
    </View>
  );
  const renderScene = SceneMap({
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
      <HeaderMenu title={'Keluhan'} navigation={navigation} />
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

export default KeluhanScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
});
