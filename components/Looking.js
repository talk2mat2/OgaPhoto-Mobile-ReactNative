/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {REACT_APP_API_URL} from '../EnvKeys';
import axios from 'axios';
import {Button} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Image,
  ActivityIndicator,
  // KeyboardAvoidingView,
} from 'react-native';

import Icon4 from 'react-native-vector-icons/Entypo';
import Icon5 from 'react-native-vector-icons/AntDesign';
import Icon6 from 'react-native-vector-icons/Fontisto';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  // MapViewAnimated,
} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useDispatch, useSelector} from 'react-redux';
import {GETPHOTOGRAPHERSSUCCESS, SETMYLOCATION} from '../redux/action';

function Looking({navigation}) {
  const [MapVisible, setMapVisiblle] = useState(false);
  const [sendingRequest, setsendingRequest] = useState(false);
  const [sessionVenue, setsessionVenue] = useState({});
  const [ConfirmAgreeVisible, setConfirmAgreeVisible] = useState(false);
  const [locations, setLocations] = useState([]);
  const [CardVisible, setCardVisible] = useState(true);
  const [successBookedCardVisible, setsuccessBookedCardVisible] = useState(
    false,
  );
  const [Searching, setSearching] = useState(false);
  const [PhotoDetails, setPhotoDetails] = useState(false);
  const [PhotoInfo, setPhotoInfo] = useState(null);
  const [mylocation, setMylocation] = useState(null);
  const CurrentUser = useSelector(state => state.user.currentUser);
  const token = CurrentUser && CurrentUser.token;
  const photographers = useSelector(state => state.photographers);
  const [PriceTag, setPriceTag] = useState(null);

  const userData = CurrentUser && CurrentUser.userData;
  const dispatch = useDispatch();
  const handleOpenDrawer = () => {
    navigation.toggleDrawer();
  };
  let mapRef = null;
  const CloserPhotoGrapher = photographer => {
    if (photographers && photographers.length > 0) {
      const CloserPhotoGrapheritem =
        photographer &&
        photographer.reduce(function (prev, curr) {
          return prev.distance < curr.distance ? prev : curr;
        });
      return CloserPhotoGrapheritem;
    } else {
      return {};
    }
  };
  const Greetings = () => {
    var d = new Date();
    var time = d.getHours();

    if (time < 12) {
      return 'Good morning!';
    }
    if (time > 12 && time < 18) {
      return 'Good afternoon!';
    }
    if (time > 18) {
      return 'Good Evening';
    }
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
          // console.log(position.coords.latitude);
          // console.log(position.coords.longitude);
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

  const handleBooking = async _id => {
    setsessionVenue({});
    setCardVisible(true);
    setConfirmAgreeVisible(false);
    setPhotoDetails(false);
    if (!_id) {
      return null;
    }
    setsendingRequest(true);
    // /bookSession
    await axios
      .post(
        `${REACT_APP_API_URL}/users/bookSession`,
        {phographerId: _id, address: sessionVenue.name},
        {headers: {authorization: token}},
      )
      .then(res => {
        setsendingRequest(false);
        console.log(res.data);
        setsuccessBookedCardVisible(true);
      })
      .catch(err => {
        setsendingRequest(false);
        if (err.response) {
          console.log(err.response.data.message);
        }
        console.log(err);
      });
    //api post request to book appointment with drivers id
  };
  const MatchPhotographer = () => {
    const CloserPhotoGraphers = photographers.reduce(function (prev, curr) {
      return prev.distance < curr.distance ? prev : curr;
    });
    setPhotoInfo(CloserPhotoGraphers);
    console.log(CloserPhotoGraphers);
  };

  const handleSearchPhotoGrphers = async values => {
    setSearching(true);
    setMapVisiblle(false);
    console.log(token);
    await axios
      .post(`${REACT_APP_API_URL}/users/SearchPhotogrAphersCloser`, values, {
        headers: {authorization: token},
      })
      .then(res => {
        setMapVisiblle(true);
        setSearching(false);
        console.log(res.data);
        // setIsregistered(true)
        // history.push('/dashboard')
        dispatch(GETPHOTOGRAPHERSSUCCESS(res.data.userData));
        setConfirmAgreeVisible(true);
      })
      .catch(err => {
        setSearching(false);
        setMapVisiblle(true);
        if (err.response) {
          // setErrorMessage(err.response.data.message)
          console.log(err.response.data.message);
          // err.response.data.message &&

          // err.response.data.error && setIsregistered(false)
        }
        console.log(err);
      });
  };
  const handleToClick = async (long1, lat1, address) => {
    // console.log(typeof long)
    let lng = parseFloat(long1);
    let lat = parseFloat(lat1);
    console.log(lng, lat, typeof lng, typeof lat);
    setCardVisible(false);
    setsessionVenue({
      name: address,

      lat: lat,
      lng: lng,
    });
    await handleSearchPhotoGrphers({
      sesionlocation: {lat: lat, lng: lng, address},
    });
  };
  const handleplaces = async placeid => {
    // console.log(place.formatted_address)
    // console.log(place.geometry.location.lat())
    // console.log(place.geometry.location.lng())
    await axios
      .get(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=AIzaSyAPvhnz2J6HiUuHj41jc5wgT9xpAKZzgOk`,
      )
      .then(async res => {
        const lng = res.data.result.geometry.location.lng;
        const lat = res.data.result.geometry.location.lat;
        const address = res.data.result.formatted_address;
        console.log(lng, lat, address);
        return await handleToClick(lng, lat, address);
      })
      .catch(err => console.log(err));

    // return await handleToClick(lng, lat, address)
  };
  const GetPricePriceTag = async () => {
    await axios
      .get(`${REACT_APP_API_URL}/users/GetPricePriceTag`)
      .then(res => {
        console.log(res.data.userData.price);
        setPriceTag(res.data.userData.price);
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.message);
        }
        console.log(err);
      });
  };
  // const GetPricePriceTag = async () => {
  // 	await axios
  // 		.get(`${process.env.REACT_APP_API_URL}/users/GetPricePriceTag`)
  // 		.then((res) => {
  // 			console.log(res.data.userData.price)
  // 			setPriceTag(res.data.userData.price)
  // 		})
  // 		.catch((err) => {
  // 			if (err.response) {
  // 				console.log(err.response.data.message)
  // 			}
  // 			console.log(err)
  // 		})
  // }
  useEffect(() => {
    setCardVisible(true);
    GetPricePriceTag();
    setTimeout(() => {
      setMapVisiblle(true);
    }, 2000);
  }, []);

  // useEffect(() => {
  //   if (sessionVenue.lat && photographers.length > 0) {
  //     mapRef.fitToCoordinates(
  //       [
  //         {latitude: sessionVenue.lat, longitude: sessionVenue.lng},
  //         {
  //           latitude: CloserPhotoGrapher(photographers).lat,
  //           longitude: CloserPhotoGrapher(photographers).lng,
  //         },
  //       ],
  //       {
  //         edgePadding: {
  //           bottom: 200,
  //           right: 50,
  //           top: 150,
  //           left: 50,
  //         },
  //         animated: true,
  //       },
  //     );
  //   }
  // }, [photographers, mapRef, sessionVenue]);
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View
        style={{
          flex: 1,
          width: 100 + '%',
          height: 90 + '%',
          backgroundColor: '#ffffff',
        }}>
        {MapVisible ? (
          <MapView
            ref={ref => {
              mapRef = ref;
            }}
            onLayout={() =>
              photographers.length > 0 && sessionVenue.lat
                ? mapRef.fitToCoordinates(
                    [
                      {latitude: sessionVenue.lat, longitude: sessionVenue.lng},
                      {
                        latitude: CloserPhotoGrapher(photographers).lat,
                        longitude: CloserPhotoGrapher(photographers).lng,
                      },
                    ],
                    {
                      edgePadding: {top: 10, right: 10, bottom: 10, left: 10},
                      animated: true,
                    },
                  )
                : null
            }
            focusable
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={
              mylocation && mylocation.lat
                ? {
                    latitude: mylocation.lat,
                    longitude: mylocation.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }
                : {
                    latitude: 6.5194683,
                    longitude: 3.3674491,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }
            }
            zoomEnabled={true}
            showsUserLocation={true}>
            {photographers && photographers.length > 0
              ? photographers.map(item => (
                  <Marker
                    key={item._id}
                    coordinate={{latitude: item.lat, longitude: item.lng}}
                    title={item.fname}
                    description={item.fname}>
                    <>
                      <Image
                        source={require('../assets/cameraIcon.png')}
                        style={{width: 30}}
                        resizeMode="contain"
                      />
                      <Text>{item.fname}</Text>

                      {typeof item.distance !== 'undefined' ? (
                        <Text>{(item.distance / 1000).toFixed(1)}km</Text>
                      ) : (
                        <Text>null</Text>
                      )}
                    </>
                  </Marker>
                ))
              : null}
            {sessionVenue.lat && photographers.length > 0 && (
              <Polyline
                coordinates={[
                  {latitude: sessionVenue.lat, longitude: sessionVenue.lng},
                  {
                    latitude: CloserPhotoGrapher(photographers).lat,
                    longitude: CloserPhotoGrapher(photographers).lng,
                  },
                ]}
                strokeColor="grey" // fallback for when `strokeColors` is not supported by the map-provider
                strokeColors={['#7F0000']}
                strokeWidth={6}
              />
            )}

            {sessionVenue.lat ? (
              <Marker
                // position={{
                // 	lat: sessionVenue.lat,
                // 	lng: sessionVenue.lng,
                // }}
                // color='blue'
                // label='me'

                coordinate={{
                  latitude: sessionVenue.lat,
                  longitude: sessionVenue.lng,
                }}
                title={'me'}
                description={'me'}
                pinColor={'green'}
              />
            ) : null}
          </MapView>
        ) : (
          <View>
            <ActivityIndicator
              style={{alignSelf: 'center', marginTop: 50}}
              size="large"
              color="tomato"
            />
            <Text style={{...styles.HeadText2, fontSize: 15}}>
              Searching...
            </Text>
          </View>
        )}
      </View>
      {sendingRequest ? (
        <View style={styles.SendingRequest}>
          <ActivityIndicator
            style={{alignSelf: 'center', marginTop: 50}}
            size="large"
            color="tomato"
          />
          <Text style={{...styles.HeadText2, fontSize: 15}}>
            Sending Request...
          </Text>
        </View>
      ) : null}
      {ConfirmAgreeVisible && PriceTag && !CardVisible ? (
        <View style={styles.ConfirmExpress}>
          <Text style={{textAlign: 'center'}}>
            Select A matched Photograpger/videographer
          </Text>
          <View style={styles.ConfirmExpressStrip}>
            <Icon6 color="grey" size={30} name="camera" />
            {PriceTag ? <Text>Rate -NGA {PriceTag}/per minutes</Text> : null}
          </View>
          <Button
            style={styles.Mybutton2}
            onPress={() => {
              MatchPhotographer();
              setPhotoDetails(true);
              setConfirmAgreeVisible(false);
            }}>
            <Text style={{color: '#ffffff'}}>Confirm PhotoExpress</Text>
          </Button>
          <View style={styles.Margin} />
          <Text style={styles.HeadText3}>OGAPHOTO 2021</Text>
        </View>
      ) : null}
      {CardVisible ? (
        <View style={styles.SearchContainer}>
          <Text>
            {Greetings()}, {userData.fname}
          </Text>
          <Text style={styles.HeadText2}>Select Session Location ?</Text>

          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details = true) => {
              // 'details' is provided when fetchDetails = true
              // console.log(data.place_id);
              handleplaces(data.place_id, data.description);
            }}
            query={{
              key: 'AIzaSyAPvhnz2J6HiUuHj41jc5wgT9xpAKZzgOk',
              language: 'en',
              components: 'country:ng',
            }}
            pl
            // types={['address']}
            // componentRestrictions={{country: 'ng'}}
          />
        </View>
      ) : null}
      {successBookedCardVisible ? (
        <View style={styles.SuccessbookedContainer}>
          <Icon5 color="#32CD32" size={40} name="smileo" />
          <Text>request sent .check Under history for progress'</Text>
          <Button
            onPress={() => setsuccessBookedCardVisible(false)}
            style={styles.Mybutton2}>
            ok
          </Button>
        </View>
      ) : null}
      <Modal
        visible={PhotoDetails}
        animationType="slide"
        onRequestClose={() => setPhotoDetails(false)}>
        {PhotoInfo && (
          <View style={styles.PhotoDetails}>
            <Text style={{...styles.HeadText2}}>
              PhotoGrapher/videographer details
            </Text>
            <View style={{marginVertical: 6}} />
            <Text style={styles.MidText}>name:{PhotoInfo.fname}</Text>
            <Text style={styles.MidText}>phone:{PhotoInfo.mobile}</Text>
            <Text style={styles.MidText}>
              distance : around{' '}
              {PhotoInfo.mobile && (PhotoInfo.distance / 1000).toFixed(1)} km
            </Text>
            <Text style={styles.MidText}>email:{PhotoInfo.Email}</Text>
            <Text style={styles.MidText}>address:</Text>
            {/* <Text style={styles.MidText}>location:</Text> */}
            <View style={styles.Margin} />
            <Button
              style={styles.Mybutton2}
              onPress={() => {
                handleBooking(PhotoInfo._id);
              }}>
              <Text style={{color: '#ffffff'}}> Book Now</Text>
            </Button>
            <Pressable
              onPress={() => {
                setPhotoDetails(false);
                setsessionVenue({});
                setCardVisible(true);
                setConfirmAgreeVisible(false);
              }}>
              <Icon5
                name="arrowleft"
                size={40}
                style={{padding: 10}}
                color="grey"
              />
            </Pressable>
          </View>
        )}
      </Modal>
      <Pressable
        onPress={handleOpenDrawer}
        style={{
          zIndex: 3,
          elevation: 3,
          left: 10,
          top: 5,
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
      {!CardVisible ? (
        <Pressable
          onPress={() => {
            setsessionVenue({});
            setCardVisible(true);
            setConfirmAgreeVisible(false);
          }}
          style={{
            zIndex: 3,
            elevation: 3,
            right: 10,
            top: 20,
            position: 'absolute',
          }}>
          <Icon5
            name="arrowleft"
            size={34}
            style={{
              //   position: 'absolute',
              color: 'tomato',
            }}
          />
        </Pressable>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  Mybutton2: {
    backgroundColor: 'rgb(71, 178, 228)',
    minWidth: 150,
    alignSelf: 'center',
    borderRadius: 20,
    margin: 2,
    color: '#ffffff',
  },
  ConfirmExpress: {
    height: 200,
    width: 100 + '%',
    backgroundColor: '#ffffff',
  },
  PhotoDetails: {
    paddingTop: 20,
    padding: 10,
  },
  ConfirmExpressStrip: {
    height: 60,
    width: 100 + '%',
    backgroundColor: '#f1f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  SearchContainer: {
    minHeight: 150,
    width: 270,
    position: 'absolute',
    zIndex: 2,
    elevation: 2,
    top: 20,
    backgroundColor: '#ffff',
    padding: 10,
    borderRadius: 2,
    shadowColor: 'rgba(0, 0, 0, 0.75)',
    shadowOffset: {width: -11, height: 2},
    shadowRadius: 10,
  },
  SuccessbookedContainer: {
    minHeight: 150,
    width: 270,
    position: 'absolute',
    zIndex: 3,
    textAlign: 'center',
    alignItems: 'center',
    elevation: 3,
    top: 40 + '%',
    backgroundColor: '#ffff',
    padding: 10,
    borderRadius: 2,
    shadowColor: 'rgba(0, 0, 0, 0.75)',
    shadowOffset: {width: -11, height: 2},
    shadowRadius: 10,
  },
  HeadText2: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  HeadText3: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '300',
  },
  MidText: {
    color: 'black',
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '400',
  },
  Margin: {
    marginVertical: 20,
  },
  SendingRequest: {
    position: 'absolute',
    height: 200,
    width: 200,
    marginRight: 'auto',
    marginLeft: 'auto',
    zIndex: 3,
    elevation: 3,
    backgroundColor: '#ffffff',
  },
});

export default Looking;
