/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import axios from 'axios';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './Home';
import SessionHistory from './SessionHistory';
import Wallet from './Wallet';
import SupportMessage from './Support Message';
import ProfileSettings from './ProfileSettings';
import Promos from './Promos';
import Looking from './Looking';
import Geolocation from '@react-native-community/geolocation';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import Logout from './Logout';
import {useSelector, useDispatch} from 'react-redux';
import {SYNCUSERDATA} from '../redux/action';
import {REACT_APP_API_URL} from '../EnvKeys';
import UserBookingHistory from './UserBookingHistory';

const Drawer = createDrawerNavigator();

export default function DashBoard({navigation}) {
  const CurrentUser = useSelector(state => state.user.currentUser);
  const userData = CurrentUser && CurrentUser.userData;
  const [mylocation, setMylocation] = React.useState(null);
  const token = CurrentUser && CurrentUser.token;
  const dispatch = useDispatch();
  const option = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };
  React.useEffect(() => {
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

  React.useEffect(() => {
    const updateMyLocation = values => {
      axios
        .post(`${REACT_APP_API_URL}/photographer/updateMyLocation`, values, {
          headers: {authorization: token},
        })
        .then(res => {
          console.log(res.data);
          // setIsregistered(true)
          dispatch(SYNCUSERDATA(res.data.userData));
          // history.push('/dashboard')
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response.data.message);
            // err.response.data.message &&

            // err.response.data.error && setIsregistered(false)
          }
          console.log(err);
        });
    };
    const updateClient = () => {
      axios
        .get(`${REACT_APP_API_URL}/users/updateClient`, {
          headers: {authorization: token},
        })
        .then(res => {
          console.log(res.data);
          dispatch(SYNCUSERDATA(res.data.userData));
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response.data.message);
          }
          console.log(err);
        });
    };

    mylocation && userData.isPhotographer
      ? updateMyLocation({lat: mylocation.lat, lng: mylocation.lng})
      : updateClient();
  }, [mylocation]);

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            drawerIcon: ({focused, size}) => (
              <Icon
                name="home"
                size={size}
                color={focused ? '#7cc' : 'tomato'}
              />
            ),
          }}
        />
        {!userData.isPhotographer ? (
          <Drawer.Screen
            name="Hire A Photographer"
            component={Looking}
            options={{
              title: 'Hire A Photographe',
              drawerIcon: ({focused, size}) => (
                <Icon5
                  name="account-search"
                  size={size}
                  color={focused ? '#7cc' : 'tomato'}
                />
              ),
            }}
          />
        ) : null}
        {userData.isPhotographer ? (
          <Drawer.Screen
            name="Booking Received"
            component={SessionHistory}
            options={{
              title: 'Booking Received',
              drawerIcon: ({focused, size}) => (
                <Icon
                  name="camerao"
                  size={size}
                  color={focused ? '#7cc' : 'tomato'}
                />
              ),
            }}
          />
        ) : null}

        {!userData.isPhotographer ? (
          <Drawer.Screen
            name="Session History"
            component={UserBookingHistory}
            options={{
              title: 'Session History',
              drawerIcon: ({focused, size}) => (
                <Icon
                  name="camerao"
                  size={size}
                  color={focused ? '#7cc' : 'tomato'}
                />
              ),
            }}
          />
        ) : null}
        <Drawer.Screen
          name="Wallet"
          component={Wallet}
          options={{
            title: 'Wallet',
            drawerIcon: ({focused, size}) => (
              <Icon
                name="camerao"
                size={size}
                color={focused ? '#7cc' : 'tomato'}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Promos"
          component={Promos}
          options={{
            title: 'Promos',
            drawerIcon: ({focused, size}) => (
              <Icon
                name="tag"
                size={size}
                color={focused ? '#7cc' : 'tomato'}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Support Message"
          component={SupportMessage}
          options={{
            title: 'Support Message',
            drawerIcon: ({focused, size}) => (
              <Icon3
                name="support-agent"
                size={size}
                color={focused ? '#7cc' : 'tomato'}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile Settings"
          component={ProfileSettings}
          options={{
            title: 'Profile Settings',
            drawerIcon: ({focused, size}) => (
              <Icon2
                name="settings"
                size={size}
                color={focused ? '#7cc' : 'tomato'}
              />
            ),
          }}
        />

        <Drawer.Screen
          options={{
            title: `Log Out  (${userData.fname})`,
            drawerIcon: ({focused, size}) => (
              <Icon
                name="logout"
                size={size}
                color={focused ? '#7cc' : 'tomato'}
              />
            ),
          }}
          name="Log Out"
          component={Logout}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
