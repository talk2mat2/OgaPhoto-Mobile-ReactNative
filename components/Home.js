/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {Button, View, Text, Pressable} from 'react-native';
import Icon4 from 'react-native-vector-icons/Entypo';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
function HomeScreen({navigation}) {
  const [mylocation, setMylocation] = useState(null);
  const [locations] = useState([]);
  const handleOpenDrawer = () => {
    navigation.toggleDrawer();
  };
  const option = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };
  useEffect(() => {
    if (mylocation == null) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
          setMylocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        err => console.log(err),
        option,
      );
    }
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
      }}>
      {/* <View
        style={{width: 100 + '%', height: 100 + '%', backgroundColor: 'grey'}}>
        {mylocation ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={{
              latitude: mylocation.lat,
              longitude: mylocation.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            zoomEnabled={true}
            showsUserLocation={true}>
            <Marker
              coordinate={{latitude: mylocation.lat, longitude: mylocation.lng}}
              title={'me'}
              description={'me'}
            />
          </MapView>
        ) : (
          <Text>allow location access</Text>
        )}
      </View> */}
      <Pressable
        onPress={handleOpenDrawer}
        style={{
          zIndex: 3,
          elevation: 3,
          left: 10,
          top: 20,
          position: 'absolute',
        }}>
        <Icon4
          name="menu"
          size={30}
          style={{
            //   position: 'absolute',
            color: 'tomato',
          }}
        />
      </Pressable>
    </View>
  );
}

export default HomeScreen;
