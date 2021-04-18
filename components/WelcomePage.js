/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
const Backgroundimg = require('../assets/back.jpg');
import {TextInput} from 'react-native-paper';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Pressable,
  Modal,
} from 'react-native';
import ClentModal from './ClientModal';
import PhotographerModal from './PhotographerModal';
import {REACT_APP_API_URL} from '../EnvKeys';
import Client from './ClientLogin';
import Photograpger from './PhotographerLogin';

const WelcomePage = () => {
  const [ClientScreen, setClientScreen] = useState(true);
  const [RegisterVisible, setRegisterVisible] = useState(false);
  const [RegisterPhotoVisible, setRegisterPhotoVisible] = useState(false);

  const handleSwitch = () => {
    setClientScreen(!ClientScreen);
  };

  return (
    <View style={styles.Container}>
      <ImageBackground source={Backgroundimg} style={styles.image}>
        <View style={styles.headerContainer}>
          <Text style={styles.HeadText}>OGAPHOTO</Text>
          <Text style={styles.HeadTextFoot}>event, photography, Videos</Text>
        </View>
        {!ClientScreen ? (
          <Photograpger
            handleSwitch={handleSwitch}
            setRegisterVisible={setRegisterPhotoVisible}
          />
        ) : (
          <Client
            handleSwitch={handleSwitch}
            setRegisterVisible={setRegisterVisible}
          />
        )}

        <Modal
          visible={RegisterVisible}
          animationType="slide"
          onRequestClose={() => setRegisterVisible(false)}>
          <ClentModal setRegisterVisible={setRegisterVisible} />
        </Modal>
        <Modal
          visible={RegisterPhotoVisible}
          animationType="slide"
          onRequestClose={() => setRegisterPhotoVisible(false)}>
          <PhotographerModal setRegisterVisible={setRegisterPhotoVisible} />
        </Modal>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  HeadText: {
    color: '#fff',
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  ClientModal: {
    backgroundColor: 'rgb(71, 178, 228)',
    flex: 1,
  },
  ClientModalInput: {
    backgroundColor: 'rgb(71, 178, 228)',
    color: '#ffff',
    width: 90 + '%',
    alignSelf: 'center',
  },

  Input: {backgroundColor: '#fff', width: 90 + '%', alignSelf: 'center'},
  BottomText1: {color: 'rgb(71, 178, 228)', fontSize: 15, fontWeight: 'bold'},
  Mybutton: {
    backgroundColor: 'rgb(71, 178, 228)',
    width: 150,
    alignSelf: 'center',
    borderRadius: 20,
    margin: 8,
  },
  Mybutton2: {
    backgroundColor: '#ffff',
    width: 150,
    alignSelf: 'center',
    borderRadius: 20,
    margin: 8,
    color: 'rgb(71, 178, 228)',
    marginTop: 18,
  },

  HeadText2: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  HeadText3: {
    color: '#ffff',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '200',
  },

  Container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'rgba(255,99,71,0.2)',
  },

  HeadTextFoot: {
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  image: {
    padding: 1,
    paddingTop: 30,
    flex: 1,
    position: 'relative',
    resizeMode: 'cover',
    justifyContent: 'flex-start',
  },
  AuthContainer: {
    width: Dimensions.get('window').width / 1.24,
    minHeight: 200,
    backgroundColor: '#ffff',
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 4,
    bottom: 30,
    padding: 10,
    zIndex: 8,
  },
  footDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default WelcomePage;
