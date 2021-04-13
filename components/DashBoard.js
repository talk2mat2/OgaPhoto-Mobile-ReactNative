/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';

import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './Home';
import SessionHistory from './SessionHistory';
import Wallet from './Wallet';
import SupportMessage from './Support Message';
import ProfileSettings from './ProfileSettings';
import Promos from './Promos';
import Looking from './Looking';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import Logout from './Logout';

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function DashBoard({navigation}) {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            drawerIcon: ({focused, size}) => (
              <Icon name="home" size={size} color={focused ? '#7cc' : '#ccc'} />
            ),
          }}
        />
        <Drawer.Screen
          name="Hire A Photographer"
          component={Looking}
          options={{
            title: 'Hire A Photographe',
            drawerIcon: ({focused, size}) => (
              <Icon5
                name="account-search"
                size={size}
                color={focused ? '#7cc' : '#ccc'}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Session History"
          component={SessionHistory}
          options={{
            title: 'Session History',
            drawerIcon: ({focused, size}) => (
              <Icon
                name="camerao"
                size={size}
                color={focused ? '#7cc' : '#ccc'}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Wallet"
          component={Wallet}
          options={{
            title: 'Wallet',
            drawerIcon: ({focused, size}) => (
              <Icon
                name="camerao"
                size={size}
                color={focused ? '#7cc' : '#ccc'}
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
              <Icon name="tag" size={size} color={focused ? '#7cc' : '#ccc'} />
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
                color={focused ? '#7cc' : '#ccc'}
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
                color={focused ? '#7cc' : '#ccc'}
              />
            ),
          }}
        />

        <Drawer.Screen
          options={{
            title: 'Log Out',
            drawerIcon: ({focused, size}) => (
              <Icon
                name="logout"
                size={size}
                color={focused ? '#7cc' : '#ccc'}
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
