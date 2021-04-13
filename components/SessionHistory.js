/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Button, View, Text} from 'react-native';
import Icon4 from 'react-native-vector-icons/Entypo';
function SessionHistory({navigation}) {
  const handleOpenDrawer = () => {
    navigation.toggleDrawer();
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

export default SessionHistory;
