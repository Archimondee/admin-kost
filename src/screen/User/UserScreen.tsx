import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import HeaderMenu from '../../utils/Headers/Headers';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import GetUser from '../../api/GetUser';
interface UserScreenProps {}

const UserScreen = ({navigation, route}: any) => {
  const navigasi = useNavigation();
  const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataUser();
    });

    return unsubscribe;
  }, [navigation]);

  const getDataUser = () => {
    GetUser().then((values) => {
      if (values.code == 200) {
        setDataUser(values.data);
      } else {
        Alert.alert('Terjadi kesalahan');
      }
    });
  };
  return (
    <View style={styles.container}>
      <HeaderMenu title={'User'} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigasi.navigate('AddUser')}
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
              Tambah User
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
        <View style={{marginBottom: 100}}>
          {dataUser.length != 0
            ? dataUser.map((item: any, index: number) => {
                console.log(item.nama);
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate('DetailUser', {id_user: item.id_user})
                    }
                    style={{
                      marginHorizontal: 20,
                      paddingVertical: 10,
                      paddingLeft: 10,
                      marginTop: 10,
                      flexDirection: 'row',
                      borderRadius: 4,
                      borderWidth: 0.5,
                    }}>
                    <Image
                      source={{uri: item.img}}
                      style={{height: 50, width: 50}}
                    />
                    <View
                      style={{paddingLeft: 10, alignSelf: 'center', flex: 1}}>
                      <Text>{item.nama_user}</Text>
                      <Text>{item.jenkel}</Text>
                    </View>
                    <View style={{alignSelf: 'center', paddingRight: 10}}>
                      <Icon
                        name="chevron-forward-outline"
                        size={25}
                        color="black"
                      />
                    </View>
                  </TouchableOpacity>
                );
              })
            : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {},
});
