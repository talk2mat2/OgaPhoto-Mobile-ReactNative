/**
 * @format
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {AppRegistry, Alert} from 'react-native';
import MainApp from './App';
import {name as appName} from './app.json';
import OneSignal from 'react-native-onesignal';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    /* O N E S I G N A L   S E T U P */
    OneSignal.setAppId('6419071e-2c4d-43b0-906c-3704961722e1');

    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log('Prompt response:', response);
    });

    /* O N E S I G N A L  H A N D L E R S */
    OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notifReceivedEvent,
      );
      let notif = notifReceivedEvent.getNotification();

      const button1 = {
        text: 'Cancel',
        onPress: () => {
          notifReceivedEvent.complete();
        },
        style: 'cancel',
      };

      const button2 = {
        text: 'Complete',
        onPress: () => {
          notifReceivedEvent.complete(notif);
        },
      };

      Alert.alert('Complete notification?', 'Test', [button1, button2], {
        cancelable: true,
      });
    });
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('OneSignal: notification opened:', notification);
    });
    OneSignal.setInAppMessageClickHandler(event => {
      console.log('OneSignal IAM clicked:', event);
    });
    OneSignal.addEmailSubscriptionObserver(event => {
      console.log('OneSignal: email subscription changed: ', event);
    });
    OneSignal.addSubscriptionObserver(event => {
      console.log('OneSignal: subscription changed:', event);
      this.setState({isSubscribed: event.to.isSubscribed});
    });
    OneSignal.addPermissionObserver(event => {
      console.log('OneSignal: permission changed:', event);
    });

    const deviceState = await OneSignal.getDeviceState();

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      isSubscribed: deviceState.isSubscribed,
    });
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <PaperProvider>
              <MainApp />
            </PaperProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

AppRegistry.registerComponent(appName, () => App);
