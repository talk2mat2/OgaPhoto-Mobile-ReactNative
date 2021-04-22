/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import Icon5 from 'react-native-vector-icons/AntDesign';
import {
  Button,
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import Icon4 from 'react-native-vector-icons/Entypo';
import Swiper from './Swipper';
const imageHead = require('../assets/cameraHead.jpg');
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
const Backgroundimg = require('../assets/back2.jpg');
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

        backgroundColor: 'grey',
      }}>
      <View
        style={{
          // flexBasis: 50 + '%',
          height: Dimensions.get('window').height / 1.6,
          backgroundColor: 'grey',
          width: 100 + '%',
        }}>
        <ImageBackground source={Backgroundimg} style={styles.image}>
          <Text style={styles.headText}>Discover</Text>
          <Text style={styles.headTextmin}>
            the other side of <Text style={{color: 'tomato'}}>Photography</Text>
          </Text>
        </ImageBackground>
      </View>
      <View style={styles.FloatContainer}>
        <ScrollView style={{flex: 1, padding: 10}}>
          {/* <Text style={styles.headText2}>
            <Icon5
              name="staro"
              size={25}
              style={{
                color: 'tomato',
                paddingRight: 30,
              }}
            />{' '}
            Collections
          </Text> */}
          <View style={{height: 6}} />
          {/* <Swiper /> */}
          <ImageBackground source={imageHead} style={styles.imageHead}>
            <Text style={styles.headText5}>
              Schedule a photography sessions
            </Text>
          </ImageBackground>
          <View style={{height: 9}} />
          {/* <Text style={styles.headText2}>
            <Icon5
              name="switcher"
              size={25}
              style={{
                color: 'dodgerblue',
                paddingRight: 30,
              }}
            />{' '}
            Explore
          </Text> */}
          <View style={{height: 6}} />
          <View style={styles.body}>
            <View style={{height: 30}} />
            {/* <Text style={styles.headText5}>
              Schedule a photography sessions
            </Text> */}

            <Text style={styles.headText3}>PHOTOGRAPHY</Text>
            <Text style={styles.MidText}>
              Portraits, Personal Branding, Social Content Headshots, Lifestyle,
              Family Shoots, Fashion, Fitness, Makeup Shoots, School Portraits.
            </Text>
            <View style={{height: 30}} />
            <Text style={styles.headText3}> VIDEOGRAPHY</Text>
            <Text style={styles.MidText}>
              Kickstarter Campaigns, Youtube Videos, Instructional Videos,
              Webisodes, Company Profiles, Video Job Interviews, Family Moments,
              Weddings, Blogs, Sports & Activities, Real Estate Home Tours.
            </Text>
            <View style={{height: 30}} />
            <Text style={styles.headText3}> EVENTS</Text>
            <View />
            <Text style={styles.MidText}>
              Special Events, Parties, Bachelorette Showers, Venues, Concerts &
              Birthdays.
            </Text>
          </View>

          <View style={{height: 20}} />
          {/* <Text style={styles.headText2}>
            <Icon5
              name="barchart"
              size={25}
              style={{
                color: 'purple',
                paddingRight: 30,
              }}
            />{' '}
            Experience New Dimension
          </Text>
          <View style={{height: 20}} />
          <Text style={styles.MidText}>
            Your photographer will bring their professional-grade equipment to
            your location at your chosen time, and you can relax knowing that
            you are in the hands of an experienced creative, a vetted specialist
            who takes your ideas and vision and crafts them into amazing
            visuals. We have local specialists for every kind of shoot or video,
            and work with you to take your brand to the next level
          </Text> */}
          <View style={{height: 30}} />
        </ScrollView>
      </View>
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
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    position: 'relative',
    resizeMode: 'cover',
    flex: 1,
  },
  FloatContainer: {
    backgroundColor: '#ffff',
    position: 'absolute',
    width: 100 + '%',
    overflow: 'hidden',
    paddingTop: 10,
    zIndex: 4,
    elevation: 4,
    bottom: 0,

    height: Dimensions.get('window').height / 1.25,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    // transform: [{translateY: -30}],
  },
  headText: {
    color: '#ffff',
    fontSize: 40,
    textAlign: 'left',
    marginLeft: 60,
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  headText5: {
    color: 'tomato',
    fontSize: 30,
    textAlign: 'left',
    marginLeft: 10,
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  headText2: {
    color: 'black',
    fontSize: 20,
    textAlign: 'left',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontWeight: 'bold',
  },
  headText3: {
    color: 'dodgerblue',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontWeight: 'bold',
  },
  headTextmin: {
    color: '#ffff',
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 60,
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  MidText: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '500',
    textAlign: 'center',
  },
  body: {
    backgroundColor: '#ffffff',
    minHeight: 100,
    width: 100 + '%',
    borderTopRightRadius: 40,
    padding: 10,
  },
  imageHead: {
    height: 200,
    width: 100 + '%',
    borderRadius: 5,
  },
});
export default HomeScreen;
