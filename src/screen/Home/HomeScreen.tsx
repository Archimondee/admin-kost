import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import HeaderMenu from '../../utils/Headers/Headers';

const HomeScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <HeaderMenu title={'Home'} navigation={navigation} />
      <View>
        <Text>HOme</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
});
