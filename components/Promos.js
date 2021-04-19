/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon4 from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {Button} from 'react-native-paper';

function Promos({navigation}) {
  const handleOpenDrawer = () => {
    navigation.toggleDrawer();
  };
  const CurrentUser = useSelector(state => state.user.currentUser);
  const userData = CurrentUser && CurrentUser.userData;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={styles.Container}>
        <Text style={styles.HeadText2}>Promos</Text>
        <View
          style={{
            width: 100 + '%',
            height: 1,
            backgroundColor: 'dodgerblue',
            marginBottom: 10,
            marginTop: 4,
          }}
        />
        <View style={styles.Margin} />
        <View style={styles.Margin} />
        <Text style={styles.MidText}>No promos right now</Text>
        <View style={styles.Margin} />
      </View>

      <Icon4
        name="menu"
        onPress={handleOpenDrawer}
        size={30}
        style={{
          position: 'absolute',
          color: 'tomato',
          zIndex: 0.5,
          left: 10,
          top: 20,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  HeadText2: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#ffffff',
    width: 100 + '%',
    padding: 10,
  },
  MidText: {
    color: 'grey',
    fontSize: 18,
    textAlign: 'left',
    fontWeight: '400',
  },
  Margin: {
    marginVertical: 20,
  },
  Mybutton2: {
    backgroundColor: 'rgb(71, 178, 228)',
    minWidth: 150,
    alignSelf: 'center',
    borderRadius: 20,
    margin: 2,
    color: '#ffffff',
  },
});
export default Promos;
