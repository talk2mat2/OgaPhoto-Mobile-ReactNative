/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import OneSignal from 'react-native-onesignal';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import WelcomePage from './components/WelcomePage';
import DashBoard from './components/DashBoard';

import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const MainApp = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  const CurrentUser = useSelector(state => state.user.currentUser);
  const userData = CurrentUser && CurrentUser.userData;
  useEffect(() => {
    SplashScreen.hide();
  });
  useEffect(() => {
    if (userData) {
      OneSignal.setExternalUserId(userData._id);
    } else {
      OneSignal.removeExternalUserId(results => console.log(results));
    }
  }, [userData]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />
      <View style={{flex: 1}}>
        {/* <WelcomePage /> */}
        <Stack.Navigator headerMode="none">
          <Stack.Screen
            name="Home"
            component={userData ? DashBoard : WelcomePage}
          />
          {/* // <Stack.Screen name="welcome" component={} /> */}
        </Stack.Navigator>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default MainApp;
